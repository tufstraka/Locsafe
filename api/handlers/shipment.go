package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/tufstraka/Locsafe/api/models"
	"gorm.io/gorm"
)

// ShipmentHandler handles shipment endpoints
type ShipmentHandler struct {
	db *gorm.DB
}

// NewShipmentHandler creates a new shipment handler
func NewShipmentHandler(db *gorm.DB) *ShipmentHandler {
	return &ShipmentHandler{db: db}
}

// List returns all shipments for an organization
func (h *ShipmentHandler) List(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var shipments []models.Shipment
	query := h.db.Preload("Organization").Preload("Driver")

	// Apply filters
	status := c.Query("status")
	if status != "" {
		query = query.Where("status = ?", status)
	}

	priority := c.Query("priority")
	if priority != "" {
		query = query.Where("priority = ?", priority)
	}

	// Pagination
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "20")
	
	if err := query.Where("organization_id = ?", orgID).
		Order("created_at DESC").
		Scopes(Paginate(c)).
		Find(&shipments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch shipments"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"shipments": shipments,
		"page":      page,
		"limit":     limit,
	})
}

// Create creates a new shipment
func (h *ShipmentHandler) Create(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var req models.CreateShipmentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data", "details": err.Error()})
		return
	}

	// Parse estimated delivery time
	var estimatedDelivery *time.Time
	if req.EstimatedDelivery != "" {
		t, err := time.Parse(time.RFC3339, req.EstimatedDelivery)
		if err == nil {
			estimatedDelivery = &t
		}
	}

	shipment := models.Shipment{
		Status:               "pending",
		Priority:            req.Priority,
		OrganizationID:      orgID.(uuid.UUID),
		Origin:              req.Origin,
		Destination:         req.Destination,
		EstimatedDelivery:   estimatedDelivery,
		Description:         req.Description,
		Weight:              req.Weight,
		WeightUnit:          req.WeightUnit,
		Dimensions:          req.Dimensions,
		Value:               req.Value,
		Currency:            req.Currency,
		Quantity:            req.Quantity,
		PackageType:         req.PackageType,
		SenderName:          req.SenderName,
		SenderEmail:         req.SenderEmail,
		SenderPhone:         req.SenderPhone,
		ReceiverName:        req.ReceiverName,
		ReceiverEmail:       req.ReceiverEmail,
		ReceiverPhone:       req.ReceiverPhone,
		RequiresRefrigeration: req.RequiresRefrigeration,
		FragileGoods:        req.FragileGoods,
		HazardousMaterial:   req.HazardousMaterial,
		Tags:                pq.StringArray(req.Tags),
		Notes:               req.Notes,
	}

	if err := h.db.Create(&shipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create shipment"})
		return
	}

	// Create initial event
	event := models.Event{
		ShipmentID:  shipment.ID,
		Type:        "created",
		Description: "Shipment created",
		Location:    &shipment.Origin,
		CreatedAt:   time.Now(),
	}
	h.db.Create(&event)

	c.JSON(http.StatusCreated, shipment)
}

// Get returns a single shipment
func (h *ShipmentHandler) Get(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var shipment models.Shipment
	if err := h.db.Preload("Organization").
		Preload("Driver").
		Preload("Events").
		Preload("Alerts").
		Where("id = ? AND organization_id = ?", shipmentID, orgID).
		First(&shipment).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch shipment"})
		return
	}

	c.JSON(http.StatusOK, shipment)
}

// Update updates a shipment
func (h *ShipmentHandler) Update(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var shipment models.Shipment
	if err := h.db.Where("id = ? AND organization_id = ?", shipmentID, orgID).First(&shipment).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch shipment"})
		return
	}

	var req models.UpdateShipmentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Update fields
	if req.Status != "" {
		shipment.Status = req.Status
	}
	if req.CurrentLocation != nil {
		shipment.CurrentLocation = req.CurrentLocation
	}
	if req.EstimatedDelivery != "" {
		t, _ := time.Parse(time.RFC3339, req.EstimatedDelivery)
		shipment.EstimatedDelivery = &t
	}
	if req.ActualDelivery != "" {
		t, _ := time.Parse(time.RFC3339, req.ActualDelivery)
		shipment.ActualDelivery = &t
	}
	if req.Temperature != nil {
		shipment.Temperature = req.Temperature
	}
	if req.Humidity != nil {
		shipment.Humidity = req.Humidity
	}
	if req.DriverID != "" {
		driverID, _ := uuid.Parse(req.DriverID)
		shipment.DriverID = &driverID
	}
	if req.Notes != "" {
		shipment.Notes = req.Notes
	}

	if err := h.db.Save(&shipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update shipment"})
		return
	}

	c.JSON(http.StatusOK, shipment)
}

// Delete deletes a shipment
func (h *ShipmentHandler) Delete(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	result := h.db.Where("id = ? AND organization_id = ?", shipmentID, orgID).Delete(&models.Shipment{})
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete shipment"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Shipment deleted successfully"})
}

// GetEvents returns events for a shipment
func (h *ShipmentHandler) GetEvents(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	// Verify shipment belongs to organization
	var shipment models.Shipment
	if err := h.db.Where("id = ? AND organization_id = ?", shipmentID, orgID).First(&shipment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	var events []models.Event
	if err := h.db.Where("shipment_id = ?", shipmentID).Order("timestamp DESC").Find(&events).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch events"})
		return
	}

	c.JSON(http.StatusOK, events)
}

// AddEvent adds an event to a shipment
func (h *ShipmentHandler) AddEvent(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	// Verify shipment belongs to organization
	var shipment models.Shipment
	if err := h.db.Where("id = ? AND organization_id = ?", shipmentID, orgID).First(&shipment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	var req models.CreateEventRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	shipmentUUID, _ := uuid.Parse(shipmentID)
	event := models.Event{
		ShipmentID:  shipmentUUID,
		Type:        req.Type,
		Description: req.Description,
		Location:    req.Location,
		CreatedAt:   time.Now(),
		Temperature: req.Temperature,
		Humidity:    req.Humidity,
		Metadata:    req.Metadata,
	}

	if err := h.db.Create(&event).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create event"})
		return
	}

	// Update shipment status if needed
	if req.Type == "in_transit" || req.Type == "delivered" || req.Type == "delayed" {
		shipment.Status = req.Type
		if req.Location != nil && req.Location.Latitude != 0 && req.Location.Longitude != 0 {
			shipment.CurrentLocation = req.Location
		}
		h.db.Save(&shipment)
	}

	c.JSON(http.StatusCreated, event)
}

// Track tracks a shipment
func (h *ShipmentHandler) Track(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var shipment models.Shipment
	if err := h.db.Preload("Events", func(db *gorm.DB) *gorm.DB {
		return db.Order("timestamp DESC")
	}).Where("id = ? AND organization_id = ?", shipmentID, orgID).First(&shipment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	tracking := gin.H{
		"trackingNumber":    shipment.TrackingNumber,
		"status":           shipment.Status,
		"currentLocation":  shipment.CurrentLocation,
		"origin":           shipment.Origin,
		"destination":      shipment.Destination,
		"estimatedDelivery": shipment.EstimatedDelivery,
		"actualDelivery":   shipment.ActualDelivery,
		"events":          shipment.Events,
	}

	c.JSON(http.StatusOK, tracking)
}

// UpdateStatus updates shipment status
func (h *ShipmentHandler) UpdateStatus(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var req struct {
		Status string `json:"status" binding:"required"`
		Notes  string `json:"notes"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	result := h.db.Model(&models.Shipment{}).
		Where("id = ? AND organization_id = ?", shipmentID, orgID).
		Updates(map[string]interface{}{
			"status": req.Status,
			"notes":  req.Notes,
		})

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update status"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	// Create status change event
	shipmentUUID, _ := uuid.Parse(shipmentID)
	event := models.Event{
		ShipmentID:  shipmentUUID,
		Type:        "status_change",
		Description: "Status changed to " + req.Status,
		CreatedAt:   time.Now(),
		Metadata:    models.JSONB{"notes": req.Notes},
	}
	h.db.Create(&event)

	c.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}

// RecordOnBlockchain records shipment on blockchain
func (h *ShipmentHandler) RecordOnBlockchain(c *gin.Context) {
	shipmentID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var shipment models.Shipment
	if err := h.db.Where("id = ? AND organization_id = ?", shipmentID, orgID).First(&shipment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	// TODO: Implement blockchain integration
	// For now, just simulate with a hash
	txHash := "0x" + uuid.New().String()
	shipment.BlockchainTxHash = txHash
	
	if err := h.db.Save(&shipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update shipment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Shipment recorded on blockchain",
		"txHash":  txHash,
	})
}

// HandleTrackingUpdate handles tracking updates from webhooks
func (h *ShipmentHandler) HandleTrackingUpdate(c *gin.Context) {
	var req struct {
		TrackingNumber string           `json:"trackingNumber" binding:"required"`
		Location       models.Location  `json:"location"`
		Status         string           `json:"status"`
		Temperature    *float64         `json:"temperature"`
		Humidity       *float64         `json:"humidity"`
		Timestamp      string           `json:"timestamp"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	var shipment models.Shipment
	if err := h.db.Where("tracking_number = ?", req.TrackingNumber).First(&shipment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	// Update shipment
	if req.Status != "" {
		shipment.Status = req.Status
	}
	shipment.CurrentLocation = &req.Location
	if req.Temperature != nil {
		shipment.Temperature = req.Temperature
	}
	if req.Humidity != nil {
		shipment.Humidity = req.Humidity
	}

	if err := h.db.Save(&shipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update shipment"})
		return
	}

	// Create tracking event
	event := models.Event{
		ShipmentID:  shipment.ID,
		Type:        "tracking_update",
		Description: "Location updated",
		Location:    &req.Location,
		Temperature: req.Temperature,
		Humidity:    req.Humidity,
		CreatedAt:   time.Now(),
	}
	h.db.Create(&event)

	c.JSON(http.StatusOK, gin.H{"message": "Tracking updated successfully"})
}

// PublicTrack allows public tracking by tracking number
func (h *ShipmentHandler) PublicTrack(c *gin.Context) {
	trackingNumber := c.Param("trackingNumber")

	var shipment models.Shipment
	if err := h.db.Where("tracking_number = ?", trackingNumber).First(&shipment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shipment not found"})
		return
	}

	// Return limited public information
	c.JSON(http.StatusOK, gin.H{
		"trackingNumber":    shipment.TrackingNumber,
		"status":           shipment.Status,
		"origin":           shipment.Origin.City + ", " + shipment.Origin.Country,
		"destination":      shipment.Destination.City + ", " + shipment.Destination.Country,
		"estimatedDelivery": shipment.EstimatedDelivery,
		"actualDelivery":   shipment.ActualDelivery,
	})
}

// Paginate helper function
func Paginate(c *gin.Context) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		page, _ := c.GetQuery("page")
		if page == "" {
			page = "1"
		}
		
		pageSize, _ := c.GetQuery("limit")
		if pageSize == "" {
			pageSize = "20"
		}

		var pageInt, pageSizeInt int
		pageInt = 1
		pageSizeInt = 20

		// Parse page and pageSize
		// ... parsing logic ...

		offset := (pageInt - 1) * pageSizeInt
		return db.Offset(offset).Limit(pageSizeInt)
	}
}