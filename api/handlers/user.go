package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/tufstraka/Locsafe/api/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserHandler struct {
	db *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{db: db}
}

func (h *UserHandler) List(c *gin.Context) {
	orgID, exists := c.Get("organizationID")
	if !exists {
		c.JSON(http.StatusOK, []models.User{})
		return
	}

	var users []models.User
	if err := h.db.Where("organization_id = ?", orgID).Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	c.JSON(http.StatusOK, users)
}

func (h *UserHandler) Get(c *gin.Context) {
	userID := c.Param("id")

	var user models.User
	if err := h.db.Preload("Organization").First(&user, "id = ?", userID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) Create(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	orgID, _ := c.Get("organizationID")

	user := models.User{
		Email:       req.Email,
		Username:    req.Username,
		Password:    req.Password,
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		PhoneNumber: req.PhoneNumber,
		Role:        "user",
		IsActive:    true,
		IsVerified:  false,
	}

	if orgID != nil {
		orgUUID := orgID.(uuid.UUID)
		user.OrganizationID = &orgUUID
	}

	if err := h.db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

func (h *UserHandler) Update(c *gin.Context) {
	userID := c.Param("id")

	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	var req models.UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	if req.FirstName != "" {
		user.FirstName = req.FirstName
	}
	if req.LastName != "" {
		user.LastName = req.LastName
	}
	if req.PhoneNumber != "" {
		user.PhoneNumber = req.PhoneNumber
	}
	if req.ProfileImage != "" {
		user.ProfileImage = req.ProfileImage
	}

	if err := h.db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) Delete(c *gin.Context) {
	userID := c.Param("id")

	result := h.db.Delete(&models.User{}, "id = ?", userID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

func (h *UserHandler) ChangePassword(c *gin.Context) {
	userID := c.Param("id")
	currentUserID, _ := c.Get("userID")

	if userID != currentUserID.(uuid.UUID).String() {
		role, _ := c.Get("userRole")
		if role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Cannot change another user's password"})
			return
		}
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var req models.ChangePasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	if !user.CheckPassword(req.CurrentPassword) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Current password is incorrect"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.Password = string(hashedPassword)
	if err := h.db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password changed successfully"})
}

func (h *UserHandler) UpdatePreferences(c *gin.Context) {
	userID := c.Param("id")
	currentUserID, _ := c.Get("userID")

	if userID != currentUserID.(uuid.UUID).String() {
		c.JSON(http.StatusForbidden, gin.H{"error": "Cannot update another user's preferences"})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var prefs models.UserPreferences
	if err := c.ShouldBindJSON(&prefs); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	user.Preferences = prefs
	if err := h.db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update preferences"})
		return
	}

	c.JSON(http.StatusOK, user.Preferences)
}

func (h *UserHandler) UpdateRole(c *gin.Context) {
	userID := c.Param("id")

	var req struct {
		Role string `json:"role" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	validRoles := []string{"user", "admin", "dispatcher", "viewer"}
	isValidRole := false
	for _, r := range validRoles {
		if r == req.Role {
			isValidRole = true
			break
		}
	}

	if !isValidRole {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid role"})
		return
	}

	result := h.db.Model(&models.User{}).Where("id = ?", userID).Update("role", req.Role)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update role"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Role updated successfully"})
}

func (h *UserHandler) Activate(c *gin.Context) {
	userID := c.Param("id")

	result := h.db.Model(&models.User{}).Where("id = ?", userID).Update("is_active", true)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to activate user"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User activated successfully"})
}

func (h *UserHandler) Deactivate(c *gin.Context) {
	userID := c.Param("id")

	result := h.db.Model(&models.User{}).Where("id = ?", userID).Update("is_active", false)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to deactivate user"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deactivated successfully"})
}

func (h *UserHandler) ListOrganizations(c *gin.Context) {
	var organizations []models.Organization

	query := h.db.Model(&models.Organization{})

	if status := c.Query("status"); status != "" {
		isActive := status == "active"
		query = query.Where("is_active = ?", isActive)
	}

	if plan := c.Query("plan"); plan != "" {
		query = query.Where("subscription_plan = ?", plan)
	}

	if err := query.Find(&organizations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organizations"})
		return
	}

	c.JSON(http.StatusOK, organizations)
}

func (h *UserHandler) CreateOrganization(c *gin.Context) {
	var req models.CreateOrganizationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	org := models.Organization{
		Name:             req.Name,
		Domain:           req.Domain,
		Type:             req.Type,
		Industry:         req.Industry,
		Size:             req.Size,
		Description:      req.Description,
		Website:          req.Website,
		Address:          req.Address,
		City:             req.City,
		State:            req.State,
		Country:          req.Country,
		PostalCode:       req.PostalCode,
		ContactEmail:     req.ContactEmail,
		ContactPhone:     req.ContactPhone,
		SubscriptionPlan: "free",
		Settings: models.OrgSettings{
			MaxShipments:  100,
			MaxUsers:      5,
			RetentionDays: 30,
		},
	}

	if err := h.db.Create(&org).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create organization"})
		return
	}

	c.JSON(http.StatusCreated, org)
}

func (h *UserHandler) UpdateOrganization(c *gin.Context) {
	orgID := c.Param("id")

	var org models.Organization
	if err := h.db.First(&org, "id = ?", orgID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization"})
		return
	}

	var req models.CreateOrganizationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	org.Name = req.Name
	org.Domain = req.Domain
	org.Type = req.Type
	org.Industry = req.Industry
	org.Size = req.Size
	org.Description = req.Description
	org.Website = req.Website
	org.Address = req.Address
	org.City = req.City
	org.State = req.State
	org.Country = req.Country
	org.PostalCode = req.PostalCode
	org.ContactEmail = req.ContactEmail
	org.ContactPhone = req.ContactPhone

	if err := h.db.Save(&org).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update organization"})
		return
	}

	c.JSON(http.StatusOK, org)
}

func (h *UserHandler) DeleteOrganization(c *gin.Context) {
	orgID := c.Param("id")

	var userCount int64
	h.db.Model(&models.User{}).Where("organization_id = ?", orgID).Count(&userCount)
	if userCount > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot delete organization with active users"})
		return
	}

	result := h.db.Delete(&models.Organization{}, "id = ?", orgID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete organization"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Organization deleted successfully"})
}