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

type AssetHandler struct {
	db *gorm.DB
}

func NewAssetHandler(db *gorm.DB) *AssetHandler {
	return &AssetHandler{db: db}
}

func (h *AssetHandler) List(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var assets []models.Asset
	query := h.db.Preload("Organization").Preload("AssignedTo").Preload("Shipment")

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if assetType := c.Query("type"); assetType != "" {
		query = query.Where("type = ?", assetType)
	}

	if err := query.Where("organization_id = ?", orgID).Find(&assets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch assets"})
		return
	}

	c.JSON(http.StatusOK, assets)
}

func (h *AssetHandler) Create(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "Organization not found"})
		return
	}

	var req models.CreateAssetRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	asset := models.Asset{
		Name:           req.Name,
		Type:           req.Type,
		Category:       req.Category,
		Status:         "active",
		OrganizationID: orgID.(uuid.UUID),
		Description:    req.Description,
		Manufacturer:   req.Manufacturer,
		Model:          req.Model,
		SerialNumber:   req.SerialNumber,
		PurchasePrice:  req.PurchasePrice,
		Currency:       req.Currency,
		TrackerID:      req.TrackerID,
		Tags:           pq.StringArray(req.Tags),
	}

	if req.PurchaseDate != "" {
		t, _ := time.Parse(time.RFC3339, req.PurchaseDate)
		asset.PurchaseDate = &t
	}
	if req.WarrantyExpiry != "" {
		t, _ := time.Parse(time.RFC3339, req.WarrantyExpiry)
		asset.WarrantyExpiry = &t
	}

	if err := h.db.Create(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create asset"})
		return
	}

	c.JSON(http.StatusCreated, asset)
}

func (h *AssetHandler) Get(c *gin.Context) {
	assetID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var asset models.Asset
	if err := h.db.Preload("Organization").Preload("AssignedTo").Preload("Shipment").
		Where("id = ? AND organization_id = ?", assetID, orgID).
		First(&asset).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch asset"})
		return
	}

	c.JSON(http.StatusOK, asset)
}

func (h *AssetHandler) Update(c *gin.Context) {
	assetID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var asset models.Asset
	if err := h.db.Where("id = ? AND organization_id = ?", assetID, orgID).First(&asset).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}

	var req models.UpdateAssetRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	if req.Name != "" {
		asset.Name = req.Name
	}
	if req.Status != "" {
		asset.Status = req.Status
	}
	if req.Description != "" {
		asset.Description = req.Description
	}
	if req.CurrentLocation != nil {
		asset.CurrentLocation = req.CurrentLocation
	}
	if req.TrackerID != "" {
		asset.TrackerID = req.TrackerID
	}
	if req.Temperature != nil {
		asset.Temperature = req.Temperature
	}
	if req.Humidity != nil {
		asset.Humidity = req.Humidity
	}
	if req.BatteryLevel != nil {
		asset.BatteryLevel = req.BatteryLevel
	}

	if req.AssignedToID != "" {
		userID, _ := uuid.Parse(req.AssignedToID)
		asset.AssignedToID = &userID
	}
	if req.ShipmentID != "" {
		shipmentID, _ := uuid.Parse(req.ShipmentID)
		asset.ShipmentID = &shipmentID
	}

	if req.LastMaintenance != "" {
		t, _ := time.Parse(time.RFC3339, req.LastMaintenance)
		asset.LastMaintenance = &t
	}
	if req.NextMaintenance != "" {
		t, _ := time.Parse(time.RFC3339, req.NextMaintenance)
		asset.NextMaintenance = &t
	}

	if len(req.Tags) > 0 {
		asset.Tags = pq.StringArray(req.Tags)
	}

	now := time.Now()
	asset.LastSeen = &now

	if err := h.db.Save(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update asset"})
		return
	}

	c.JSON(http.StatusOK, asset)
}

func (h *AssetHandler) Delete(c *gin.Context) {
	assetID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	result := h.db.Where("id = ? AND organization_id = ?", assetID, orgID).Delete(&models.Asset{})
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete asset"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Asset deleted successfully"})
}

func (h *AssetHandler) Assign(c *gin.Context) {
	assetID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var req struct {
		UserID     string `json:"userId"`
		ShipmentID string `json:"shipmentId"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	var asset models.Asset
	if err := h.db.Where("id = ? AND organization_id = ?", assetID, orgID).First(&asset).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}

	if req.UserID != "" {
		userID, _ := uuid.Parse(req.UserID)
		asset.AssignedToID = &userID
	}
	if req.ShipmentID != "" {
		shipmentID, _ := uuid.Parse(req.ShipmentID)
		asset.ShipmentID = &shipmentID
	}

	if err := h.db.Save(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to assign asset"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Asset assigned successfully"})
}

func (h *AssetHandler) UpdateLocation(c *gin.Context) {
	assetID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var req models.Location
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	var asset models.Asset
	if err := h.db.Where("id = ? AND organization_id = ?", assetID, orgID).First(&asset).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}

	asset.CurrentLocation = &req
	now := time.Now()
	asset.LastSeen = &now

	if err := h.db.Save(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update location"})
		return
	}

	event := models.Event{
		Type:        "location_update",
		Description: "Asset location updated",
		AssetID:     &asset.ID,
		Location:    &req,
		CreatedAt:   time.Now(),
	}
	h.db.Create(&event)

	c.JSON(http.StatusOK, gin.H{"message": "Location updated successfully"})
}

func (h *AssetHandler) LogMaintenance(c *gin.Context) {
	assetID := c.Param("id")
	orgID, _ := c.Get("organizationID")

	var req struct {
		MaintenanceType string  `json:"type" binding:"required"`
		Description     string  `json:"description"`
		Cost            float64 `json:"cost"`
		NextMaintenance string  `json:"nextMaintenance"`
		Notes           string  `json:"notes"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	var asset models.Asset
	if err := h.db.Where("id = ? AND organization_id = ?", assetID, orgID).First(&asset).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}

	now := time.Now()
	asset.LastMaintenance = &now
	asset.MaintenanceNotes = req.Notes

	if req.NextMaintenance != "" {
		t, _ := time.Parse(time.RFC3339, req.NextMaintenance)
		asset.NextMaintenance = &t
	}

	if err := h.db.Save(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to log maintenance"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Maintenance logged successfully"})
}