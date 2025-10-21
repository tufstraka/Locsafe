package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Organization struct {
	ID              uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Name            string         `gorm:"not null" json:"name"`
	Domain          string         `gorm:"uniqueIndex" json:"domain"`
	Type            string         `json:"type"` // logistics, manufacturer, retailer, distributor, warehouse, freight, other
	Industry        string         `json:"industry"`
	Size            string         `json:"size"` // small, medium, large, enterprise
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
	// Primary Contact
	PrimaryContactName  string     `json:"primaryContactName"`
	PrimaryContactEmail string     `json:"primaryContactEmail"`
	PrimaryContactPhone string     `json:"primaryContactPhone"`
	// Legal Information
	BusinessRegistration string     `json:"businessRegistration"`
	TaxID               string     `json:"taxId"`
	IsActive        bool           `gorm:"default:true" json:"isActive"`
	SubscriptionPlan string        `json:"subscriptionPlan"` // free, starter, professional, enterprise
	SubscriptionEnd *time.Time     `json:"subscriptionEnd"`
	Settings        OrgSettings    `gorm:"embedded" json:"settings"`
	Integrations    OrgIntegrations `gorm:"type:jsonb" json:"integrations"`
	Users           []User         `gorm:"foreignKey:OrganizationID" json:"users,omitempty"`
	Shipments       []Shipment     `gorm:"foreignKey:OrganizationID" json:"shipments,omitempty"`
	Assets          []Asset        `gorm:"foreignKey:OrganizationID" json:"assets,omitempty"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

type OrgSettings struct {
	BlockchainEnabled     bool   `json:"blockchainEnabled"`
	AIAnalyticsEnabled    bool   `json:"aiAnalyticsEnabled"`
	CustomBranding        bool   `json:"customBranding"`
	APIAccess            bool   `json:"apiAccess"`
	MaxShipments         int    `json:"maxShipments"`
	MaxUsers             int    `json:"maxUsers"`
	RetentionDays        int    `json:"retentionDays"`
	DefaultCurrency      string `json:"defaultCurrency" gorm:"default:'KES'"`
	DefaultTemperatureUnit string `json:"defaultTemperatureUnit" gorm:"default:'C'"`
	DefaultWeightUnit    string `json:"defaultWeightUnit" gorm:"default:'kg'"`
	DefaultDistanceUnit  string `json:"defaultDistanceUnit" gorm:"default:'km'"`
}

// OrgIntegrations stores integration configurations
type OrgIntegrations struct {
	ERP struct {
		Enabled  bool   `json:"enabled"`
		Type     string `json:"type"`
		APIKey   string `json:"apiKey"`
		Endpoint string `json:"endpoint"`
	} `json:"erp"`
	WMS struct {
		Enabled     bool                   `json:"enabled"`
		Type        string                 `json:"type"`
		Credentials map[string]interface{} `json:"credentials"`
	} `json:"wms"`
	Fleet struct {
		Enabled  bool   `json:"enabled"`
		Provider string `json:"provider"`
		APIKey   string `json:"apiKey"`
	} `json:"fleet"`
	Payments struct {
		Enabled   bool   `json:"enabled"`
		Provider  string `json:"provider"`
		PublicKey string `json:"publicKey"`
		SecretKey string `json:"secretKey"`
	} `json:"payments"`
	Notifications struct {
		Slack struct {
			Enabled    bool   `json:"enabled"`
			WebhookURL string `json:"webhookUrl"`
		} `json:"slack"`
		Teams struct {
			Enabled    bool   `json:"enabled"`
			WebhookURL string `json:"webhookUrl"`
		} `json:"teams"`
		Webhook struct {
			Enabled bool   `json:"enabled"`
			URL     string `json:"url"`
			Secret  string `json:"secret"`
		} `json:"webhook"`
	} `json:"notifications"`
}

// BeforeCreate hook to set UUID
func (o *Organization) BeforeCreate(tx *gorm.DB) error {
	if o.ID == uuid.Nil {
		o.ID = uuid.New()
	}
	return nil
}

type CreateOrganizationRequest struct {
	Name         string `json:"name" binding:"required"`
	Domain       string `json:"domain"`
	Type         string `json:"type"`
	Industry     string `json:"industry"`
	Size         string `json:"size"`
	Description  string `json:"description"`
	Website      string `json:"website"`
	Logo         string `json:"logo"`
	Address      string `json:"address"`
	City         string `json:"city"`
	State        string `json:"state"`
	Country      string `json:"country"`
	PostalCode   string `json:"postalCode"`
	ContactEmail string `json:"contactEmail" binding:"email"`
	ContactPhone string `json:"contactPhone"`
	// Primary Contact
	PrimaryContactName  string `json:"primaryContactName"`
	PrimaryContactEmail string `json:"primaryContactEmail"`
	PrimaryContactPhone string `json:"primaryContactPhone"`
	// Legal
	BusinessRegistration string `json:"businessRegistration"`
	TaxID               string `json:"taxId"`
}

// OnboardingOrganizationRequest for updating organization during onboarding
type OnboardingOrganizationRequest struct {
	Name         string `json:"name" binding:"required"`
	Type         string `json:"type" binding:"required"`
	Size         string `json:"size" binding:"required"`
	Industry     string `json:"industry" binding:"required"`
	Website      string `json:"website"`
	Logo         string `json:"logo"`
	Address      struct {
		Street     string `json:"street"`
		City       string `json:"city" binding:"required"`
		State      string `json:"state"`
		Country    string `json:"country" binding:"required"`
		PostalCode string `json:"postalCode"`
	} `json:"address"`
	PrimaryContact struct {
		Name  string `json:"name"`
		Email string `json:"email"`
		Phone string `json:"phone"`
	} `json:"primaryContact"`
	BusinessRegistration string `json:"businessRegistration"`
	TaxID               string `json:"taxId"`
}

// OnboardingIntegrationsRequest for saving integration settings
type OnboardingIntegrationsRequest struct {
	Integrations OrgIntegrations `json:"integrations"`
}

// OnboardingDataResponse combined response for all onboarding data
type OnboardingDataResponse struct {
	User         OnboardingUserData         `json:"user"`
	Organization OnboardingOrganizationData `json:"organization"`
	Integrations OrgIntegrations            `json:"integrations"`
}

type OnboardingUserData struct {
	ID          string          `json:"id"`
	Email       string          `json:"email"`
	FullName    string          `json:"fullName"`
	PhoneNumber string          `json:"phoneNumber"`
	Position    string          `json:"position"`
	Department  string          `json:"department"`
	IsOnboarded bool            `json:"isOnboarded"`
	Preferences UserPreferences `json:"preferences"`
}

type OnboardingOrganizationData struct {
	ID                   string `json:"id"`
	Name                 string `json:"name"`
	Type                 string `json:"type"`
	Size                 string `json:"size"`
	Industry             string `json:"industry"`
	Website              string `json:"website"`
	Logo                 string `json:"logo"`
	Address              string `json:"address"`
	City                 string `json:"city"`
	State                string `json:"state"`
	Country              string `json:"country"`
	PostalCode           string `json:"postalCode"`
	PrimaryContactName   string `json:"primaryContactName"`
	PrimaryContactEmail  string `json:"primaryContactEmail"`
	PrimaryContactPhone  string `json:"primaryContactPhone"`
	BusinessRegistration string `json:"businessRegistration"`
	TaxID                string `json:"taxId"`
}