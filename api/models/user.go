package models

import (
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Email        string         `gorm:"uniqueIndex;not null" json:"email"`
	Username     string         `gorm:"uniqueIndex;not null" json:"username"`
	Password     string         `gorm:"not null" json:"-"`
	FirstName    string         `json:"firstName"`
	LastName     string         `json:"lastName"`
	PhoneNumber  string         `json:"phoneNumber"`
	Position     string         `json:"position"`
	Department   string         `json:"department"`
	Role         string         `gorm:"default:'user'" json:"role"`
	IsActive     bool           `gorm:"default:true" json:"isActive"`
	IsVerified   bool           `gorm:"default:false" json:"isVerified"`
	IsOnboarded  bool           `gorm:"default:false" json:"isOnboarded"`
	ProfileImage string         `json:"profileImage"`
	Organization *Organization  `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`
	OrganizationID *uuid.UUID   `gorm:"type:uuid" json:"organizationId,omitempty"`
	Preferences  UserPreferences `gorm:"embedded" json:"preferences"`
	LastLogin    *time.Time     `json:"lastLogin"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

type UserPreferences struct {
	NotificationsEmail      bool   `json:"notificationsEmail" gorm:"default:true"`
	NotificationsSMS        bool   `json:"notificationsSms" gorm:"default:false"`
	NotificationsPush       bool   `json:"notificationsPush" gorm:"default:true"`
	NotificationsShipmentAlerts bool `json:"notificationsShipmentAlerts" gorm:"default:true"`
	NotificationsSystemUpdates  bool `json:"notificationsSystemUpdates" gorm:"default:true"`
	NotificationsMarketing      bool `json:"notificationsMarketing" gorm:"default:false"`

	Theme              string `json:"theme" gorm:"default:'light'"`
	Language           string `json:"language" gorm:"default:'en'"`
	Timezone           string `json:"timezone" gorm:"default:'UTC'"`
	DashboardLayout    string `json:"dashboardLayout" gorm:"default:'default'"`
	DefaultView        string `json:"defaultView" gorm:"default:'overview'"`
	DateFormat         string `json:"dateFormat" gorm:"default:'DD/MM/YYYY'"`
	TimeFormat         string `json:"timeFormat" gorm:"default:'24h'"`
	MeasurementUnit    string `json:"measurementUnit" gorm:"default:'metric'"`
	MapProvider        string `json:"mapProvider" gorm:"default:'google'"`

	ComplianceRegion   string `json:"complianceRegion" gorm:"default:'Kenya'"`
	DataRetention      string `json:"dataRetention" gorm:"default:'3years'"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}

	if u.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		u.Password = string(hashedPassword)
	}

	return nil
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

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
	FirebaseUID string `json:"firebaseUid"`
}

type UpdateUserRequest struct {
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	PhoneNumber  string `json:"phoneNumber"`
	ProfileImage string `json:"profileImage"`
	Position     string `json:"position"`
	Department   string `json:"department"`
}

type OnboardingProfileRequest struct {
	FullName    string                   `json:"fullName"`
	PhoneNumber string                   `json:"phoneNumber" binding:"required"`
	Position    string                   `json:"position" binding:"required"`
	Department  string                   `json:"department" binding:"required"`
	Timezone    string                   `json:"timezone"`
	Language    string                   `json:"language"`
	Notifications NotificationPreferences `json:"notifications"`
}

type NotificationPreferences struct {
	Email          bool `json:"email"`
	SMS            bool `json:"sms"`
	Push           bool `json:"push"`
	ShipmentAlerts bool `json:"shipmentAlerts"`
	SystemUpdates  bool `json:"systemUpdates"`
	Marketing      bool `json:"marketing"`
}

type OnboardingPreferencesRequest struct {
	DashboardLayout  string `json:"dashboardLayout"`
	DefaultView      string `json:"defaultView"`
	Currency         string `json:"currency"`
	DateFormat       string `json:"dateFormat"`
	TimeFormat       string `json:"timeFormat"`
	MeasurementUnit  string `json:"measurementUnit"`
	MapProvider      string `json:"mapProvider"`
	Theme            string `json:"theme"`
	ComplianceRegion string `json:"complianceRegion"`
	DataRetention    string `json:"dataRetention"`
}

type OnboardingCompleteRequest struct {
	IsOnboarded bool `json:"isOnboarded"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"currentPassword" binding:"required"`
	NewPassword     string `json:"newPassword" binding:"required,min=8"`
}

type AuthResponse struct {
	Token        string    `json:"token"`
	RefreshToken string    `json:"refreshToken"`
	User         User      `json:"user"`
	ExpiresAt    time.Time `json:"expiresAt"`
}