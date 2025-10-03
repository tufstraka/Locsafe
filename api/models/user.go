package models

import (
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID           uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Email        string         `gorm:"uniqueIndex;not null" json:"email"`
	Username     string         `gorm:"uniqueIndex;not null" json:"username"`
	Password     string         `gorm:"not null" json:"-"`
	FirstName    string         `json:"firstName"`
	LastName     string         `json:"lastName"`
	PhoneNumber  string         `json:"phoneNumber"`
	Role         string         `gorm:"default:'user'" json:"role"` // user, admin, dispatcher, viewer
	IsActive     bool           `gorm:"default:true" json:"isActive"`
	IsVerified   bool           `gorm:"default:false" json:"isVerified"`
	ProfileImage string         `json:"profileImage"`
	Organization *Organization  `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`
	OrganizationID *uuid.UUID   `gorm:"type:uuid" json:"organizationId,omitempty"`
	Preferences  UserPreferences `gorm:"embedded" json:"preferences"`
	LastLogin    *time.Time     `json:"lastLogin"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// UserPreferences embedded struct for user preferences
type UserPreferences struct {
	NotificationsEmail  bool   `json:"notificationsEmail"`
	NotificationsSMS    bool   `json:"notificationsSms"`
	NotificationsPush   bool   `json:"notificationsPush"`
	Theme              string `json:"theme" gorm:"default:'light'"` // light, dark, system
	Language           string `json:"language" gorm:"default:'en'"`
	Timezone           string `json:"timezone" gorm:"default:'UTC'"`
	DashboardLayout    string `json:"dashboardLayout" gorm:"type:jsonb"`
}

// BeforeCreate hook to set UUID
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	
	// Hash password
	if u.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		u.Password = string(hashedPassword)
	}
	
	return nil
}

// CheckPassword verifies password
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

// LoginRequest represents login request
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// RegisterRequest represents registration request
type RegisterRequest struct {
	Email       string `json:"email" binding:"required,email"`
	Username    string `json:"username" binding:"required,min=3,max=50"`
	Password    string `json:"password" binding:"required,min=8"`
	FirstName   string `json:"firstName" binding:"required"`
	LastName    string `json:"lastName" binding:"required"`
	PhoneNumber string `json:"phoneNumber"`
	CompanyName string `json:"companyName"`
	CompanySize string `json:"companySize"`
	Industry    string `json:"industry"`
}

// UpdateUserRequest represents user update request
type UpdateUserRequest struct {
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	PhoneNumber  string `json:"phoneNumber"`
	ProfileImage string `json:"profileImage"`
}

// ChangePasswordRequest represents password change request
type ChangePasswordRequest struct {
	CurrentPassword string `json:"currentPassword" binding:"required"`
	NewPassword     string `json:"newPassword" binding:"required,min=8"`
}

// AuthResponse represents authentication response
type AuthResponse struct {
	Token        string    `json:"token"`
	RefreshToken string    `json:"refreshToken"`
	User         User      `json:"user"`
	ExpiresAt    time.Time `json:"expiresAt"`
}