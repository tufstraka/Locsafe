package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/tufstraka/Locsafe/api/models"
	"gorm.io/gorm"
)

type OnboardingHandler struct {
	db *gorm.DB
}

func NewOnboardingHandler(db *gorm.DB) *OnboardingHandler {
	return &OnboardingHandler{db: db}
}

func (h *OnboardingHandler) GetOnboardingData(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var user models.User
	if err := h.db.Preload("Organization").First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	response := models.OnboardingDataResponse{
		User: models.OnboardingUserData{
			ID:          user.ID.String(),
			Email:       user.Email,
			FullName:    user.FirstName + " " + user.LastName,
			PhoneNumber: user.PhoneNumber,
			Position:    user.Position,
			Department:  user.Department,
			IsOnboarded: user.IsOnboarded,
			Preferences: user.Preferences,
		},
	}

	if user.Organization != nil {
		response.Organization = models.OnboardingOrganizationData{
			ID:                   user.Organization.ID.String(),
			Name:                 user.Organization.Name,
			Type:                 user.Organization.Type,
			Size:                 user.Organization.Size,
			Industry:             user.Organization.Industry,
			Website:              user.Organization.Website,
			Logo:                 user.Organization.Logo,
			Address:              user.Organization.Address,
			City:                 user.Organization.City,
			State:                user.Organization.State,
			Country:              user.Organization.Country,
			PostalCode:           user.Organization.PostalCode,
			PrimaryContactName:   user.Organization.PrimaryContactName,
			PrimaryContactEmail:  user.Organization.PrimaryContactEmail,
			PrimaryContactPhone:  user.Organization.PrimaryContactPhone,
			BusinessRegistration: user.Organization.BusinessRegistration,
			TaxID:                user.Organization.TaxID,
		}
		response.Integrations = user.Organization.Integrations
	}

	c.JSON(http.StatusOK, response)
}

func (h *OnboardingHandler) UpdateProfile(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var req models.OnboardingProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if req.FullName != "" {
		names := splitFullName(req.FullName)
		user.FirstName = names[0]
		if len(names) > 1 {
			user.LastName = names[1]
		}
	}
	user.PhoneNumber = req.PhoneNumber
	user.Position = req.Position
	user.Department = req.Department

	if req.Timezone != "" {
		user.Preferences.Timezone = req.Timezone
	}
	if req.Language != "" {
		user.Preferences.Language = req.Language
	}

	user.Preferences.NotificationsEmail = req.Notifications.Email
	user.Preferences.NotificationsSMS = req.Notifications.SMS
	user.Preferences.NotificationsPush = req.Notifications.Push
	user.Preferences.NotificationsShipmentAlerts = req.Notifications.ShipmentAlerts
	user.Preferences.NotificationsSystemUpdates = req.Notifications.SystemUpdates
	user.Preferences.NotificationsMarketing = req.Notifications.Marketing

	if err := h.db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}

func (h *OnboardingHandler) UpdateOrganization(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var req models.OnboardingOrganizationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var org models.Organization
	if user.OrganizationID != nil {
		if err := h.db.First(&org, "id = ?", user.OrganizationID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
			return
		}
	} else {
		org = models.Organization{
			ID: uuid.New(),
		}
	}

	org.Name = req.Name
	org.Type = req.Type
	org.Size = req.Size
	org.Industry = req.Industry
	org.Website = req.Website
	org.Logo = req.Logo
	org.Address = req.Address.Street
	org.City = req.Address.City
	org.State = req.Address.State
	org.Country = req.Address.Country
	org.PostalCode = req.Address.PostalCode
	org.PrimaryContactName = req.PrimaryContact.Name
	org.PrimaryContactEmail = req.PrimaryContact.Email
	org.PrimaryContactPhone = req.PrimaryContact.Phone
	org.BusinessRegistration = req.BusinessRegistration
	org.TaxID = req.TaxID

	if user.OrganizationID != nil {
		if err := h.db.Save(&org).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update organization"})
			return
		}
	} else {
		if err := h.db.Create(&org).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create organization"})
			return
		}
		user.OrganizationID = &org.ID
		if err := h.db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to link organization to user"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Organization updated successfully", "organizationId": org.ID})
}

func (h *OnboardingHandler) UpdateIntegrations(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var req models.OnboardingIntegrationsRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := h.db.Preload("Organization").First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if user.Organization == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Organization not found"})
		return
	}

	user.Organization.Integrations = req.Integrations

	if err := h.db.Save(&user.Organization).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update integrations"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Integrations updated successfully"})
}

func (h *OnboardingHandler) UpdatePreferences(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var req models.OnboardingPreferencesRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if req.DashboardLayout != "" {
		user.Preferences.DashboardLayout = req.DashboardLayout
	}
	if req.DefaultView != "" {
		user.Preferences.DefaultView = req.DefaultView
	}
	if req.DateFormat != "" {
		user.Preferences.DateFormat = req.DateFormat
	}
	if req.TimeFormat != "" {
		user.Preferences.TimeFormat = req.TimeFormat
	}
	if req.MeasurementUnit != "" {
		user.Preferences.MeasurementUnit = req.MeasurementUnit
	}
	if req.MapProvider != "" {
		user.Preferences.MapProvider = req.MapProvider
	}
	if req.Theme != "" {
		user.Preferences.Theme = req.Theme
	}
	if req.ComplianceRegion != "" {
		user.Preferences.ComplianceRegion = req.ComplianceRegion
	}
	if req.DataRetention != "" {
		user.Preferences.DataRetention = req.DataRetention
	}

	if req.Currency != "" && user.OrganizationID != nil {
		var org models.Organization
		if err := h.db.First(&org, "id = ?", user.OrganizationID).Error; err == nil {
			org.Settings.DefaultCurrency = req.Currency
			h.db.Save(&org)
		}
	}

	if err := h.db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update preferences"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Preferences updated successfully"})
}

func (h *OnboardingHandler) CompleteOnboarding(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	user.IsOnboarded = true

	if err := h.db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to complete onboarding"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Onboarding completed successfully",
		"isOnboarded": true,
	})
}

func splitFullName(fullName string) []string {
	parts := []string{"", ""}
	names := []string{}

	for _, part := range strings.Fields(fullName) {
		if part != "" {
			names = append(names, part)
		}
	}

	if len(names) > 0 {
		parts[0] = names[0]
	}
	if len(names) > 1 {
		parts[1] = strings.Join(names[1:], " ")
	}

	return parts
}
