package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Organization represents a company/organization
type Organization struct {
	ID              uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Name            string         `gorm:"not null" json:"name"`
	Domain          string         `gorm:"uniqueIndex" json:"domain"`
	Type            string         `json:"type"` // enterprise, sme, startup
	Industry        string         `json:"industry"`
	Size            string         `json:"size"` // 1-10, 11-50, 51-200, 201-500, 500+
	Description     string         `json:"description"`
	Logo            string         `json:"logo"`
	Website         string         `json:"website"`
	Address         string         `json:"address"`
	City            string         `json:"city"`
	State           string         `json:"state"`
	Country         string         `json:"country"`
	PostalCode      string         `json:"postalCode"`
	ContactEmail    string         `json:"contactEmail"`
	ContactPhone    string         `json:"contactPhone"`
	IsActive        bool           `gorm:"default:true" json:"isActive"`
	SubscriptionPlan string        `json:"subscriptionPlan"` // free, starter, professional, enterprise
	SubscriptionEnd *time.Time     `json:"subscriptionEnd"`
	Settings        OrgSettings    `gorm:"embedded" json:"settings"`
	Users           []User         `gorm:"foreignKey:OrganizationID" json:"users,omitempty"`
	Shipments       []Shipment     `gorm:"foreignKey:OrganizationID" json:"shipments,omitempty"`
	Assets          []Asset        `gorm:"foreignKey:OrganizationID" json:"assets,omitempty"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

// OrgSettings embedded struct for organization settings
type OrgSettings struct {
	BlockchainEnabled     bool   `json:"blockchainEnabled"`
	AIAnalyticsEnabled    bool   `json:"aiAnalyticsEnabled"`
	CustomBranding        bool   `json:"customBranding"`
	APIAccess            bool   `json:"apiAccess"`
	MaxShipments         int    `json:"maxShipments"`
	MaxUsers             int    `json:"maxUsers"`
	RetentionDays        int    `json:"retentionDays"`
	DefaultCurrency      string `json:"defaultCurrency" gorm:"default:'USD'"`
	DefaultTemperatureUnit string `json:"defaultTemperatureUnit" gorm:"default:'C'"`
	DefaultWeightUnit    string `json:"defaultWeightUnit" gorm:"default:'kg'"`
	DefaultDistanceUnit  string `json:"defaultDistanceUnit" gorm:"default:'km'"`
}

// BeforeCreate hook to set UUID
func (o *Organization) BeforeCreate(tx *gorm.DB) error {
	if o.ID == uuid.Nil {
		o.ID = uuid.New()
	}
	return nil
}

// CreateOrganizationRequest represents organization creation request
type CreateOrganizationRequest struct {
	Name         string `json:"name" binding:"required"`
	Domain       string `json:"domain"`
	Type         string `json:"type"`
	Industry     string `json:"industry"`
	Size         string `json:"size"`
	Description  string `json:"description"`
	Website      string `json:"website"`
	Address      string `json:"address"`
	City         string `json:"city"`
	State        string `json:"state"`
	Country      string `json:"country"`
	PostalCode   string `json:"postalCode"`
	ContactEmail string `json:"contactEmail" binding:"email"`
	ContactPhone string `json:"contactPhone"`
}