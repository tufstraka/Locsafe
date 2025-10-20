package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/tufstraka/Locsafe/api/models"
	"gorm.io/gorm"
)

// DashboardHandler handles dashboard endpoints
type DashboardHandler struct {
	db *gorm.DB
}

// NewDashboardHandler creates a new dashboard handler
func NewDashboardHandler(db *gorm.DB) *DashboardHandler {
	return &DashboardHandler{db: db}
}

// GetStats returns dashboard statistics
func (h *DashboardHandler) GetStats(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	// Get total counts
	var totalShipments, activeShipments, deliveredShipments int64
	h.db.Model(&models.Shipment{}).Where("organization_id = ?", orgID).Count(&totalShipments)
	h.db.Model(&models.Shipment{}).Where("organization_id = ? AND status = ?", orgID, "in_transit").Count(&activeShipments)
	h.db.Model(&models.Shipment{}).Where("organization_id = ? AND status = ?", orgID, "delivered").Count(&deliveredShipments)

	var totalAssets, activeAssets int64
	h.db.Model(&models.Asset{}).Where("organization_id = ?", orgID).Count(&totalAssets)
	h.db.Model(&models.Asset{}).Where("organization_id = ? AND status = ?", orgID, "active").Count(&activeAssets)

	var totalUsers int64
	h.db.Model(&models.User{}).Where("organization_id = ?", orgID).Count(&totalUsers)

	var unresolvedAlerts int64
	h.db.Model(&models.Alert{}).
		Joins("LEFT JOIN shipments ON alerts.shipment_id = shipments.id").
		Where("shipments.organization_id = ? AND alerts.status = ?", orgID, "active").
		Count(&unresolvedAlerts)

	// Calculate success rate
	successRate := float64(0)
	if totalShipments > 0 {
		successRate = float64(deliveredShipments) / float64(totalShipments) * 100
	}

	// Get today's shipments
	today := time.Now().Truncate(24 * time.Hour)
	var todayShipments int64
	h.db.Model(&models.Shipment{}).
		Where("organization_id = ? AND created_at >= ?", orgID, today).
		Count(&todayShipments)

	// Get this month's shipments
	firstOfMonth := time.Date(time.Now().Year(), time.Now().Month(), 1, 0, 0, 0, 0, time.Now().Location())
	var monthShipments int64
	h.db.Model(&models.Shipment{}).
		Where("organization_id = ? AND created_at >= ?", orgID, firstOfMonth).
		Count(&monthShipments)

	stats := gin.H{
		"shipments": gin.H{
			"total":     totalShipments,
			"active":    activeShipments,
			"delivered": deliveredShipments,
			"today":     todayShipments,
			"thisMonth": monthShipments,
		},
		"assets": gin.H{
			"total":  totalAssets,
			"active": activeAssets,
		},
		"users": gin.H{
			"total": totalUsers,
		},
		"alerts": gin.H{
			"unresolved": unresolvedAlerts,
		},
		"metrics": gin.H{
			"successRate": successRate,
			"avgDeliveryTime": "2.5 days", // This would be calculated from actual data
		},
	}

	c.JSON(http.StatusOK, stats)
}

// GetRecentActivity returns recent activity
func (h *DashboardHandler) GetRecentActivity(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	// Get recent events
	var events []models.Event
	h.db.Joins("JOIN shipments ON events.shipment_id = shipments.id").
		Where("shipments.organization_id = ?", orgID).
		Order("events.created_at DESC").
		Limit(10).
		Preload("Shipment").
		Find(&events)

	// Get recent alerts
	var alerts []models.Alert
	h.db.Joins("LEFT JOIN shipments ON alerts.shipment_id = shipments.id").
		Where("shipments.organization_id = ? OR alerts.shipment_id IS NULL", orgID).
		Order("alerts.created_at DESC").
		Limit(10).
		Preload("Shipment").
		Find(&alerts)

	// Get recent shipments
	var shipments []models.Shipment
	h.db.Where("organization_id = ?", orgID).
		Order("created_at DESC").
		Limit(10).
		Find(&shipments)

	activity := gin.H{
		"events":    events,
		"alerts":    alerts,
		"shipments": shipments,
	}

	c.JSON(http.StatusOK, activity)
}

// GetShipmentAnalytics returns shipment analytics
func (h *DashboardHandler) GetShipmentAnalytics(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	// Get daily shipments for the last 7 days
	dailyData := []gin.H{}
	for i := 6; i >= 0; i-- {
		date := time.Now().AddDate(0, 0, -i).Truncate(24 * time.Hour)
		nextDate := date.AddDate(0, 0, 1)
		
		var count int64
		h.db.Model(&models.Shipment{}).
			Where("organization_id = ? AND created_at >= ? AND created_at < ?", orgID, date, nextDate).
			Count(&count)
		
		dailyData = append(dailyData, gin.H{
			"date":  date.Format("2006-01-02"),
			"count": count,
		})
	}

	// Get monthly shipments for the last 6 months
	monthlyData := []gin.H{}
	for i := 5; i >= 0; i-- {
		date := time.Now().AddDate(0, -i, 0)
		firstOfMonth := time.Date(date.Year(), date.Month(), 1, 0, 0, 0, 0, date.Location())
		firstOfNextMonth := firstOfMonth.AddDate(0, 1, 0)
		
		var count int64
		h.db.Model(&models.Shipment{}).
			Where("organization_id = ? AND created_at >= ? AND created_at < ?", orgID, firstOfMonth, firstOfNextMonth).
			Count(&count)
		
		monthlyData = append(monthlyData, gin.H{
			"month": date.Format("January"),
			"year":  date.Year(),
			"count": count,
		})
	}

	// Get shipment status distribution
	var statusCounts []struct {
		Status string
		Count  int64
	}
	h.db.Model(&models.Shipment{}).
		Select("status, count(*) as count").
		Where("organization_id = ?", orgID).
		Group("status").
		Scan(&statusCounts)

	// Get top routes
	var topRoutes []struct {
		Origin      string
		Destination string
		Count       int64
	}
	h.db.Model(&models.Shipment{}).
		Select("origin_city as origin, dest_city as destination, count(*) as count").
		Where("organization_id = ?", orgID).
		Group("origin_city, dest_city").
		Order("count DESC").
		Limit(5).
		Scan(&topRoutes)

	analytics := gin.H{
		"daily":      dailyData,
		"monthly":    monthlyData,
		"byStatus":   statusCounts,
		"topRoutes":  topRoutes,
	}

	c.JSON(http.StatusOK, analytics)
}

// GetAlertsSummary returns alerts summary
func (h *DashboardHandler) GetAlertsSummary(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	// Get alerts by type
	var alertTypes []struct {
		Type  string
		Count int64
	}
	h.db.Model(&models.Alert{}).
		Select("type, count(*) as count").
		Joins("LEFT JOIN shipments ON alerts.shipment_id = shipments.id").
		Where("shipments.organization_id = ? AND alerts.status = ?", orgID, "active").
		Group("type").
		Scan(&alertTypes)

	// Get alerts by severity
	var severities []struct {
		Severity string
		Count    int64
	}
	h.db.Model(&models.Alert{}).
		Select("severity, count(*) as count").
		Joins("LEFT JOIN shipments ON alerts.shipment_id = shipments.id").
		Where("shipments.organization_id = ? AND alerts.status = ?", orgID, "active").
		Group("severity").
		Scan(&severities)

	// Get recent critical alerts
	var criticalAlerts []models.Alert
	h.db.Joins("LEFT JOIN shipments ON alerts.shipment_id = shipments.id").
		Where("shipments.organization_id = ? AND alerts.severity = ? AND alerts.status = ?", orgID, "critical", "active").
		Order("alerts.created_at DESC").
		Limit(5).
		Preload("Shipment").
		Find(&criticalAlerts)

	summary := gin.H{
		"byType":     alertTypes,
		"bySeverity": severities,
		"critical":   criticalAlerts,
	}

	c.JSON(http.StatusOK, summary)
}

// GetPerformanceMetrics returns performance metrics
func (h *DashboardHandler) GetPerformanceMetrics(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	// Calculate average delivery time
	var avgDeliveryTime float64
	h.db.Model(&models.Shipment{}).
		Select("AVG(EXTRACT(EPOCH FROM (actual_delivery - created_at))/3600)").
		Where("organization_id = ? AND actual_delivery IS NOT NULL", orgID).
		Scan(&avgDeliveryTime)

	// Calculate on-time delivery rate
	var totalDelivered, onTimeDelivered int64
	h.db.Model(&models.Shipment{}).
		Where("organization_id = ? AND actual_delivery IS NOT NULL", orgID).
		Count(&totalDelivered)
	h.db.Model(&models.Shipment{}).
		Where("organization_id = ? AND actual_delivery IS NOT NULL AND actual_delivery <= estimated_delivery", orgID).
		Count(&onTimeDelivered)
	
	onTimeRate := float64(0)
	if totalDelivered > 0 {
		onTimeRate = float64(onTimeDelivered) / float64(totalDelivered) * 100
	}

	// Get driver performance
	var driverPerformance []struct {
		DriverID     uuid.UUID
		DriverName   string
		Deliveries   int64
		AvgTime      float64
	}
	h.db.Table("shipments").
		Select("driver_id, users.first_name || ' ' || users.last_name as driver_name, count(*) as deliveries, AVG(EXTRACT(EPOCH FROM (actual_delivery - created_at))/3600) as avg_time").
		Joins("LEFT JOIN users ON shipments.driver_id = users.id").
		Where("shipments.organization_id = ? AND shipments.driver_id IS NOT NULL AND shipments.actual_delivery IS NOT NULL", orgID).
		Group("driver_id, users.first_name, users.last_name").
		Order("deliveries DESC").
		Limit(10).
		Scan(&driverPerformance)

	metrics := gin.H{
		"avgDeliveryTime": avgDeliveryTime,
		"onTimeRate":      onTimeRate,
		"driverPerformance": driverPerformance,
	}

	c.JSON(http.StatusOK, metrics)
}

// GetBlockchainTransactions returns blockchain transactions
func (h *DashboardHandler) GetBlockchainTransactions(c *gin.Context) {
	var transactions []models.BlockchainTransaction
	
	query := h.db.Preload("Shipment").Preload("Passport").Order("created_at DESC")
	
	// Apply filters
	if network := c.Query("network"); network != "" {
		query = query.Where("network = ?", network)
	}
	
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	
	// Pagination
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "20")
	
	if err := query.Scopes(Paginate(c)).Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch transactions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"transactions": transactions,
		"page":         page,
		"limit":        limit,
	})
}

// DeploySmartContract deploys a smart contract
func (h *DashboardHandler) DeploySmartContract(c *gin.Context) {
	// TODO: Implement blockchain integration
	c.JSON(http.StatusNotImplemented, gin.H{"error": "Blockchain integration not yet implemented"})
}

// GetSystemSettings returns system settings
func (h *DashboardHandler) GetSystemSettings(c *gin.Context) {
	// TODO: Implement system settings
	settings := gin.H{
		"defaultCurrency": "USD",
		"defaultWeightUnit": "kg",
		"defaultTemperatureUnit": "C",
		"maxFileUploadSize": 10485760, // 10MB
		"sessionTimeout": 3600, // 1 hour
		"enabledFeatures": []string{
			"shipment_tracking",
			"digital_passports",
			"geofencing",
			"alerts",
			"analytics",
		},
	}

	c.JSON(http.StatusOK, settings)
}

// UpdateSystemSettings updates system settings
func (h *DashboardHandler) UpdateSystemSettings(c *gin.Context) {
	// TODO: Implement system settings update
	c.JSON(http.StatusNotImplemented, gin.H{"error": "System settings update not yet implemented"})
}
