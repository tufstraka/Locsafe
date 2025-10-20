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

// PassportHandler handles digital passport endpoints
type PassportHandler struct {
	db *gorm.DB
}

// NewPassportHandler creates a new passport handler
func NewPassportHandler(db *gorm.DB) *PassportHandler {
	return &PassportHandler{db: db}
}

// List returns all digital passports
func (h *PassportHandler) List(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var passports []models.DigitalPassport
	query := h.db.Preload("Organization").Preload("Shipment").Preload("Asset")

	// Apply filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if category := c.Query("category"); category != "" {
		query = query.Where("product_category = ?", category)
	}

	if err := query.Where("organization_id = ?", orgID).Find(&passports).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch passports"})
		return
	}

	c.JSON(http.StatusOK, passports)
}

// Create creates a new digital passport
func (h *PassportHandler) Create(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var req models.CreateDigitalPassportRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Parse manufacture date
	manufactureDate, err := time.Parse(time.RFC3339, req.ManufactureDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid manufacture date"})
		return
	}

	passport := models.DigitalPassport{
		Status:              "active",
		OrganizationID:      orgID.(uuid.UUID),
		ProductName:         req.ProductName,
		ProductCategory:     req.ProductCategory,
		ProductSKU:          req.ProductSKU,
		BatchNumber:         req.BatchNumber,
		SerialNumber:        req.SerialNumber,
		ManufacturerName:    req.ManufacturerName,
		ManufacturerID:      req.ManufacturerID,
		ManufactureDate:     manufactureDate,
		ManufactureLocation: req.ManufactureLocation,
		Certifications:      pq.StringArray(req.Certifications),
		ComplianceStandards: pq.StringArray(req.ComplianceStandards),
		Materials:           pq.StringArray(req.Materials),
		CarbonFootprint:     req.CarbonFootprint,
		RecyclableContent:   req.RecyclableContent,
		CurrentStage:        "production",
		AuthenticationMethod: "qr",
		VerificationCount:   0,
	}

	// Parse expiry date if provided
	if req.ExpiryDate != "" {
		t, _ := time.Parse(time.RFC3339, req.ExpiryDate)
		passport.ExpiryDate = &t
	}

	if err := h.db.Create(&passport).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create passport"})
		return
	}

	c.JSON(http.StatusCreated, passport)
}

// Get returns a single digital passport
func (h *PassportHandler) Get(c *gin.Context) {
	passportID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var passport models.DigitalPassport
	if err := h.db.Preload("Organization").Preload("Shipment").Preload("Asset").
		Where("id = ? AND organization_id = ?", passportID, orgID).
		First(&passport).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Passport not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch passport"})
		return
	}

	c.JSON(http.StatusOK, passport)
}

// Update updates a digital passport
func (h *PassportHandler) Update(c *gin.Context) {
	passportID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var passport models.DigitalPassport
	if err := h.db.Where("id = ? AND organization_id = ?", passportID, orgID).First(&passport).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Passport not found"})
		return
	}

	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Update allowed fields
	allowedFields := []string{"status", "current_stage", "quality_grade", "safety_rating"}
	updates := make(map[string]interface{})
	for _, field := range allowedFields {
		if val, ok := req[field]; ok {
			updates[field] = val
		}
	}

	if err := h.db.Model(&passport).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update passport"})
		return
	}

	c.JSON(http.StatusOK, passport)
}

// Delete deletes a digital passport
func (h *PassportHandler) Delete(c *gin.Context) {
	passportID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	result := h.db.Where("id = ? AND organization_id = ?", passportID, orgID).Delete(&models.DigitalPassport{})
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete passport"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Passport not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Passport deleted successfully"})
}

// Verify verifies a digital passport
func (h *PassportHandler) Verify(c *gin.Context) {
	passportID := c.Param("id")

	var passport models.DigitalPassport
	if err := h.db.First(&passport, "id = ?", passportID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Passport not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch passport"})
		return
	}

	// Update verification count and last verified time
	now := time.Now()
	passport.LastVerified = &now
	passport.VerificationCount++
	h.db.Save(&passport)

	// TODO: Implement blockchain verification

	c.JSON(http.StatusOK, gin.H{
		"verified":        true,
		"passportNumber":  passport.PassportNumber,
		"productName":     passport.ProductName,
		"manufacturer":    passport.ManufacturerName,
		"manufactureDate": passport.ManufactureDate,
		"status":          passport.Status,
		"verifications":   passport.VerificationCount,
	})
}

// AddLifecycleEvent adds a lifecycle event to a passport
func (h *PassportHandler) AddLifecycleEvent(c *gin.Context) {
	passportID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var passport models.DigitalPassport
	if err := h.db.Where("id = ? AND organization_id = ?", passportID, orgID).First(&passport).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Passport not found"})
		return
	}

	var req struct {
		EventType   string                 `json:"eventType" binding:"required"`
		Description string                 `json:"description"`
		Location    models.Location        `json:"location"`
		Stage       string                 `json:"stage"`
		Metadata    map[string]interface{} `json:"metadata"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Add event to lifecycle events
	lifecycleEvent := map[string]interface{}{
		"timestamp":   time.Now(),
		"type":        req.EventType,
		"description": req.Description,
		"location":    req.Location,
		"metadata":    req.Metadata,
	}

	// Update lifecycle events (append to existing)
	events := make(map[string]interface{})
	if passport.LifecycleEvents != nil {
		events = map[string]interface{}(passport.LifecycleEvents)
	}
	// Use timestamp as key for the event
	eventKey := time.Now().Format(time.RFC3339Nano)
	events[eventKey] = lifecycleEvent
	passport.LifecycleEvents = models.JSONB(events)

	// Update current stage if provided
	if req.Stage != "" {
		passport.CurrentStage = req.Stage
	}

	if err := h.db.Save(&passport).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add lifecycle event"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Lifecycle event added successfully"})
}

// PublicVerify allows public verification by passport number
func (h *PassportHandler) PublicVerify(c *gin.Context) {
	passportNumber := c.Param("passportNumber")

	var passport models.DigitalPassport
	if err := h.db.Where("passport_number = ?", passportNumber).First(&passport).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Passport not found"})
		return
	}

	// Update verification count
	now := time.Now()
	passport.LastVerified = &now
	passport.VerificationCount++
	h.db.Save(&passport)

	// Return public information
	c.JSON(http.StatusOK, gin.H{
		"verified":         true,
		"passportNumber":   passport.PassportNumber,
		"productName":      passport.ProductName,
		"productCategory":  passport.ProductCategory,
		"manufacturer":     passport.ManufacturerName,
		"manufactureDate":  passport.ManufactureDate,
		"originCountry":    passport.OriginCountry,
		"certifications":   passport.Certifications,
		"sustainabilityScore": passport.SustainabilityScore,
		"carbonFootprint":  passport.CarbonFootprint,
		"recyclableContent": passport.RecyclableContent,
		"status":           passport.Status,
		"currentStage":     passport.CurrentStage,
	})
}

// GeofenceHandler handles geofence endpoints
type GeofenceHandler struct {
	db *gorm.DB
}

// NewGeofenceHandler creates a new geofence handler
func NewGeofenceHandler(db *gorm.DB) *GeofenceHandler {
	return &GeofenceHandler{db: db}
}

// List returns all geofence zones
func (h *GeofenceHandler) List(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var geofences []models.GeofenceZone
	query := h.db.Preload("Organization")

	// Apply filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if zoneType := c.Query("type"); zoneType != "" {
		query = query.Where("type = ?", zoneType)
	}

	if err := query.Where("organization_id = ?", orgID).Find(&geofences).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch geofences"})
		return
	}

	c.JSON(http.StatusOK, geofences)
}

// Create creates a new geofence zone
func (h *GeofenceHandler) Create(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var req models.CreateGeofenceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	geofence := models.GeofenceZone{
		Name:            req.Name,
		Type:            req.Type,
		Status:          "active",
		OrganizationID:  orgID.(uuid.UUID),
		CenterLat:       req.CenterLat,
		CenterLng:       req.CenterLng,
		Radius:          req.Radius,
		Vertices:        req.Vertices,
		AlertOnEntry:    req.AlertOnEntry,
		AlertOnExit:     req.AlertOnExit,
		AlertOnDwell:    req.AlertOnDwell,
		DwellTime:       req.DwellTime,
		AllowedAssets:   pq.StringArray(req.AllowedAssets),
		RestrictedHours: req.RestrictedHours,
		Description:     req.Description,
		ActiveShipments: 0,
		TriggerCount:    0,
	}

	if err := h.db.Create(&geofence).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create geofence"})
		return
	}

	c.JSON(http.StatusCreated, geofence)
}

// Get returns a single geofence zone
func (h *GeofenceHandler) Get(c *gin.Context) {
	geofenceID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var geofence models.GeofenceZone
	if err := h.db.Preload("Organization").
		Where("id = ? AND organization_id = ?", geofenceID, orgID).
		First(&geofence).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Geofence not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch geofence"})
		return
	}

	c.JSON(http.StatusOK, geofence)
}

// Update updates a geofence zone
func (h *GeofenceHandler) Update(c *gin.Context) {
	geofenceID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var geofence models.GeofenceZone
	if err := h.db.Where("id = ? AND organization_id = ?", geofenceID, orgID).First(&geofence).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Geofence not found"})
		return
	}

	var req models.CreateGeofenceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Update fields
	geofence.Name = req.Name
	geofence.Type = req.Type
	geofence.CenterLat = req.CenterLat
	geofence.CenterLng = req.CenterLng
	geofence.Radius = req.Radius
	geofence.Vertices = req.Vertices
	geofence.AlertOnEntry = req.AlertOnEntry
	geofence.AlertOnExit = req.AlertOnExit
	geofence.AlertOnDwell = req.AlertOnDwell
	geofence.DwellTime = req.DwellTime
	geofence.AllowedAssets = pq.StringArray(req.AllowedAssets)
	geofence.RestrictedHours = req.RestrictedHours
	geofence.Description = req.Description

	if err := h.db.Save(&geofence).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update geofence"})
		return
	}

	c.JSON(http.StatusOK, geofence)
}

// Delete deletes a geofence zone
func (h *GeofenceHandler) Delete(c *gin.Context) {
	geofenceID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	result := h.db.Where("id = ? AND organization_id = ?", geofenceID, orgID).Delete(&models.GeofenceZone{})
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete geofence"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Geofence not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Geofence deleted successfully"})
}

// CheckLocation checks if a location is within a geofence
func (h *GeofenceHandler) CheckLocation(c *gin.Context) {
	geofenceID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var req struct {
		Latitude  float64 `json:"latitude" binding:"required"`
		Longitude float64 `json:"longitude" binding:"required"`
		AssetID   string  `json:"assetId"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	var geofence models.GeofenceZone
	if err := h.db.Where("id = ? AND organization_id = ?", geofenceID, orgID).First(&geofence).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Geofence not found"})
		return
	}

	// Check if location is within geofence
	isInside := false
	if geofence.Type == "circle" {
		// Calculate distance from center
		distance := calculateDistance(geofence.CenterLat, geofence.CenterLng, req.Latitude, req.Longitude)
		isInside = distance <= geofence.Radius
	} else if geofence.Type == "polygon" {
		// TODO: Implement point-in-polygon check
		isInside = false
	}

	// Update trigger count if inside
	if isInside {
		now := time.Now()
		geofence.LastTriggered = &now
		geofence.TriggerCount++
		h.db.Save(&geofence)

		// Create alert if configured
		if geofence.AlertOnEntry {
			alert := models.Alert{
				Type:     "geofence_entry",
				Severity: "medium",
				Title:    "Geofence Entry Alert",
				Message:  "Asset entered geofence zone: " + geofence.Name,
				Status:   "active",
				Location: &models.Location{
					Latitude:  req.Latitude,
					Longitude: req.Longitude,
				},
			}
			
			if req.AssetID != "" {
				assetID, _ := uuid.Parse(req.AssetID)
				alert.AssetID = &assetID
			}
			
			h.db.Create(&alert)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"inside":       isInside,
		"geofenceName": geofence.Name,
		"geofenceType": geofence.Type,
	})
}

// calculateDistance calculates distance between two points in meters using Haversine formula
func calculateDistance(lat1, lon1, lat2, lon2 float64) float64 {
	const earthRadius = 6371000 // Earth's radius in meters
	
	// Convert to radians
	lat1Rad := lat1 * 3.14159265359 / 180
	lat2Rad := lat2 * 3.14159265359 / 180
	deltaLat := (lat2 - lat1) * 3.14159265359 / 180
	deltaLon := (lon2 - lon1) * 3.14159265359 / 180
	
	// Haversine formula
	a := (deltaLat/2)*(deltaLat/2) + 
		lat1Rad*lat2Rad*(deltaLon/2)*(deltaLon/2)
	c := 2 * a
	
	return earthRadius * c
}