package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/tufstraka/Locsafe/api/models"
	"github.com/tufstraka/Locsafe/api/utils"
	"gorm.io/gorm"
)

// AuthHandler handles authentication endpoints
type AuthHandler struct {
	db *gorm.DB
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(db *gorm.DB) *AuthHandler {
	return &AuthHandler{db: db}
}

// Register handles user registration
func (h *AuthHandler) Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
			"details": err.Error(),
		})
		return
	}

	// Check if user already exists
	var existingUser models.User
	if err := h.db.Where("email = ? OR username = ?", req.Email, req.Username).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": "User with this email or username already exists",
		})
		return
	}

	// Create organization if company name is provided
	var organization *models.Organization
	if req.CompanyName != "" {
		organization = &models.Organization{
			Name:     req.CompanyName,
			Size:     req.CompanySize,
			Industry: req.Industry,
			SubscriptionPlan: "free",
			Settings: models.OrgSettings{
				MaxShipments:  100,
				MaxUsers:      5,
				RetentionDays: 30,
			},
		}
		if err := h.db.Create(organization).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create organization",
			})
			return
		}
	}

	// Create user
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

	if organization != nil {
		user.OrganizationID = &organization.ID
		user.Role = "admin" // First user in org becomes admin
	}

	// Create user (password will be hashed in BeforeCreate hook)
	if err := h.db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create user",
		})
		return
	}

	// Generate tokens
	accessToken, refreshToken, err := utils.GenerateToken(user.ID, user.Email, user.Role, user.OrganizationID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate tokens",
		})
		return
	}

	// Update last login
	now := time.Now()
	user.LastLogin = &now
	h.db.Save(&user)

	// Load organization if exists
	if user.OrganizationID != nil {
		h.db.Preload("Organization").First(&user, user.ID)
	}

	c.JSON(http.StatusCreated, models.AuthResponse{
		Token:        accessToken,
		RefreshToken: refreshToken,
		User:         user,
		ExpiresAt:    time.Now().Add(time.Hour * 24),
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
			"details": err.Error(),
		})
		return
	}

	var user models.User
	if err := h.db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	if !user.IsActive {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Account is deactivated",
		})
		return
	}

	if !user.CheckPassword(req.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	accessToken, refreshToken, err := utils.GenerateToken(user.ID, user.Email, user.Role, user.OrganizationID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate tokens",
		})
		return
	}

	now := time.Now()
	user.LastLogin = &now
	h.db.Save(&user)

	if user.OrganizationID != nil {
		h.db.Preload("Organization").First(&user, user.ID)
	}

	c.JSON(http.StatusOK, models.AuthResponse{
		Token:        accessToken,
		RefreshToken: refreshToken,
		User:         user,
		ExpiresAt:    time.Now().Add(time.Hour * 24),
	})
}

// RefreshToken handles token refresh
func (h *AuthHandler) RefreshToken(c *gin.Context) {
	var req struct {
		RefreshToken string `json:"refreshToken" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	// Validate and refresh token
	newAccessToken, err := utils.RefreshToken(req.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid or expired refresh token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":     newAccessToken,
		"expiresAt": time.Now().Add(time.Hour * 24),
	})
}

// Logout handles user logout
func (h *AuthHandler) Logout(c *gin.Context) {
	// To Do, blacklist the token
	// For now, we'll just return success
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged out",
	})
}

// ForgotPassword handles password reset request
func (h *AuthHandler) ForgotPassword(c *gin.Context) {
	var req struct {
		Email string `json:"email" binding:"required,email"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email",
		})
		return
	}

	// Find user
	var user models.User
	if err := h.db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		// Don't reveal if email exists or not
		c.JSON(http.StatusOK, gin.H{
			"message": "If the email exists, a password reset link has been sent",
		})
		return
	}

	// TODO: Generate reset token and send email
	// For now, just return success
	c.JSON(http.StatusOK, gin.H{
		"message": "If the email exists, a password reset link has been sent",
	})
}

// ResetPassword handles password reset
func (h *AuthHandler) ResetPassword(c *gin.Context) {
	var req struct {
		Token       string `json:"token" binding:"required"`
		NewPassword string `json:"newPassword" binding:"required,min=8"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	// TODO: Validate reset token and update password
	// For now, just return success
	c.JSON(http.StatusOK, gin.H{
		"message": "Password has been reset successfully",
	})
}

// VerifyEmail handles email verification
func (h *AuthHandler) VerifyEmail(c *gin.Context) {
	token := c.Param("token")
	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Verification token is required",
		})
		return
	}

	// TODO: Validate verification token and update user
	// For now, just return success
	c.JSON(http.StatusOK, gin.H{
		"message": "Email verified successfully",
	})
}

// Me returns current user info
func (h *AuthHandler) Me(c *gin.Context) {
	userID, _ := c.Get("userID")
	
	var user models.User
	if err := h.db.Preload("Organization").First(&user, "id = ?", userID.(uuid.UUID)).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, user)
}