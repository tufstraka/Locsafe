package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/tufstraka/Locsafe/api/models"
	"gorm.io/gorm"
)

type EventHandler struct {
	db *gorm.DB
}

func NewEventHandler(db *gorm.DB) *EventHandler {
	return &EventHandler{db: db}
}

func (h *EventHandler) List(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var events []models.Event
	query := h.db.Preload("Shipment").Preload("Asset").Preload("User")

	// Apply filters
	if eventType := c.Query("type"); eventType != "" {
		query = query.Where("type = ?", eventType)
	}
	if shipmentID := c.Query("shipmentId"); shipmentID != "" {
		query = query.Where("shipment_id = ?", shipmentID)
	}
	if assetID := c.Query("assetId"); assetID != "" {
		query = query.Where("asset_id = ?", assetID)
	}

	// Join with shipments to filter by organization
	if err := query.Joins("JOIN shipments ON events.shipment_id = shipments.id").
		Where("shipments.organization_id = ?", orgID).
		Order("events.created_at DESC").
		Find(&events).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch events"})
		return
	}

	c.JSON(http.StatusOK, events)
}

func (h *EventHandler) Create(c *gin.Context) {
	var req models.CreateEventRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	shipmentID, _ := uuid.Parse(req.ShipmentID)
	event := models.Event{
		Type:        req.Type,
		Description: req.Description,
		ShipmentID:  shipmentID,
		Location:    req.Location,
		Temperature: req.Temperature,
		Humidity:    req.Humidity,
		Battery:     req.Battery,
		Speed:       req.Speed,
		Source:      req.Source,
		DeviceID:    req.DeviceID,
		Metadata:    req.Metadata,
	}

	if req.AssetID != "" {
		assetID, _ := uuid.Parse(req.AssetID)
		event.AssetID = &assetID
	}

	userID, exists := c.Get("userID")
	if exists {
		uid := userID.(uuid.UUID)
		event.UserID = &uid
	}

	if err := h.db.Create(&event).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create event"})
		return
	}

	c.JSON(http.StatusCreated, event)
}

func (h *EventHandler) Get(c *gin.Context) {
	eventID := c.Param("id")

	var event models.Event
	if err := h.db.Preload("Shipment").Preload("Asset").Preload("User").
		First(&event, "id = ?", eventID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch event"})
		return
	}

	c.JSON(http.StatusOK, event)
}

func (h *EventHandler) CreateBatch(c *gin.Context) {
	var req []models.CreateEventRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	var events []models.Event
	for _, r := range req {
		shipmentID, _ := uuid.Parse(r.ShipmentID)
		event := models.Event{
			Type:        r.Type,
			Description: r.Description,
			ShipmentID:  shipmentID,
			Location:    r.Location,
			Temperature: r.Temperature,
			Humidity:    r.Humidity,
			Battery:     r.Battery,
			Speed:       r.Speed,
			Source:      r.Source,
			DeviceID:    r.DeviceID,
			Metadata:    r.Metadata,
		}

		if r.AssetID != "" {
			assetID, _ := uuid.Parse(r.AssetID)
			event.AssetID = &assetID
		}

		events = append(events, event)
	}

	if err := h.db.Create(&events).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create events"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Events created successfully",
		"count":   len(events),
	})
}

func (h *EventHandler) HandleIoTData(c *gin.Context) {
	var req struct {
		DeviceID    string           `json:"deviceId" binding:"required"`
		ShipmentID  string           `json:"shipmentId"`
		AssetID     string           `json:"assetId"`
		Location    *models.Location `json:"location"`
		Temperature *float64         `json:"temperature"`
		Humidity    *float64         `json:"humidity"`
		Battery     *int             `json:"battery"`
		Speed       *float64         `json:"speed"`
		Timestamp   string           `json:"timestamp"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Create event from IoT data
	event := models.Event{
		Type:        "iot_update",
		Description: "IoT sensor data received",
		Location:    req.Location,
		Temperature: req.Temperature,
		Humidity:    req.Humidity,
		Battery:     req.Battery,
		Speed:       req.Speed,
		Source:      "iot",
		DeviceID:    req.DeviceID,
		CreatedAt:   time.Now(),
	}

	if req.ShipmentID != "" {
		shipmentID, _ := uuid.Parse(req.ShipmentID)
		event.ShipmentID = shipmentID
	}
	if req.AssetID != "" {
		assetID, _ := uuid.Parse(req.AssetID)
		event.AssetID = &assetID
	}

	if err := h.db.Create(&event).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process IoT data"})
		return
	}

	// Update shipment or asset with latest data
	if req.ShipmentID != "" {
		h.db.Model(&models.Shipment{}).Where("id = ?", req.ShipmentID).Updates(map[string]interface{}{
			"current_location": req.Location,
			"temperature":      req.Temperature,
			"humidity":         req.Humidity,
		})
	}
	if req.AssetID != "" {
		h.db.Model(&models.Asset{}).Where("id = ?", req.AssetID).Updates(map[string]interface{}{
			"current_location": req.Location,
			"temperature":      req.Temperature,
			"humidity":         req.Humidity,
			"battery_level":    req.Battery,
			"speed":            req.Speed,
			"last_seen":        time.Now(),
		})
	}

	c.JSON(http.StatusOK, gin.H{"message": "IoT data processed successfully"})
}

func (h *EventHandler) HandleBlockchainEvent(c *gin.Context) {
	var req struct {
		TxHash      string                 `json:"txHash" binding:"required"`
		BlockNumber uint64                 `json:"blockNumber"`
		Network     string                 `json:"network"`
		EventType   string                 `json:"eventType"`
		EventData   map[string]interface{} `json:"eventData"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Create blockchain transaction record
	tx := models.BlockchainTransaction{
		TxHash:      req.TxHash,
		BlockNumber: req.BlockNumber,
		Network:     req.Network,
		Type:        req.EventType,
		Status:      "confirmed",
		InputData:   models.JSONB(req.EventData),
	}

	if err := h.db.Create(&tx).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process blockchain event"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blockchain event processed successfully"})
}

type AlertHandler struct {
	db *gorm.DB
}

func NewAlertHandler(db *gorm.DB) *AlertHandler {
	return &AlertHandler{db: db}
}

func (h *AlertHandler) List(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var alerts []models.Alert
	query := h.db.Preload("Shipment").Preload("Asset").Preload("User")

	// Apply filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if severity := c.Query("severity"); severity != "" {
		query = query.Where("severity = ?", severity)
	}
	if alertType := c.Query("type"); alertType != "" {
		query = query.Where("type = ?", alertType)
	}

	// Join with shipments to filter by organization
	if err := query.Joins("LEFT JOIN shipments ON alerts.shipment_id = shipments.id").
		Where("shipments.organization_id = ? OR alerts.shipment_id IS NULL", orgID).
		Order("alerts.created_at DESC").
		Find(&alerts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch alerts"})
		return
	}

	c.JSON(http.StatusOK, alerts)
}

func (h *AlertHandler) Create(c *gin.Context) {
	var req models.CreateAlertRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	alert := models.Alert{
		Type:           req.Type,
		Severity:       req.Severity,
		Title:          req.Title,
		Message:        req.Message,
		Status:         "active",
		TriggerValue:   req.TriggerValue,
		ThresholdValue: req.ThresholdValue,
		Location:       req.Location,
	}

	if req.ShipmentID != "" {
		shipmentID, _ := uuid.Parse(req.ShipmentID)
		alert.ShipmentID = &shipmentID
	}
	if req.AssetID != "" {
		assetID, _ := uuid.Parse(req.AssetID)
		alert.AssetID = &assetID
	}

	userID, exists := c.Get("userID")
	if exists {
		uid := userID.(uuid.UUID)
		alert.UserID = &uid
	}

	if err := h.db.Create(&alert).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create alert"})
		return
	}

	c.JSON(http.StatusCreated, alert)
}

func (h *AlertHandler) Get(c *gin.Context) {
	alertID := c.Param("id")

	var alert models.Alert
	if err := h.db.Preload("Shipment").Preload("Asset").Preload("User").
		First(&alert, "id = ?", alertID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Alert not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch alert"})
		return
	}

	c.JSON(http.StatusOK, alert)
}

func (h *AlertHandler) Acknowledge(c *gin.Context) {
	alertID := c.Param("id")
	userID, _ := c.Get("userID")

	now := time.Now()
	uid := userID.(uuid.UUID)

	result := h.db.Model(&models.Alert{}).Where("id = ?", alertID).Updates(map[string]interface{}{
		"status":          "acknowledged",
		"acknowledged_by": uid,
		"acknowledged_at": now,
	})

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to acknowledge alert"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Alert not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Alert acknowledged successfully"})
}

func (h *AlertHandler) Resolve(c *gin.Context) {
	alertID := c.Param("id")
	userID, _ := c.Get("userID")

	var req struct {
		Resolution string `json:"resolution" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	now := time.Now()
	uid := userID.(uuid.UUID)

	result := h.db.Model(&models.Alert{}).Where("id = ?", alertID).Updates(map[string]interface{}{
		"status":      "resolved",
		"resolved_by": uid,
		"resolved_at": now,
		"resolution":  req.Resolution,
	})

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve alert"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Alert not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Alert resolved successfully"})
}
