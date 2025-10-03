package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// DigitalPassport represents a Digital Product Passport (DPP)
type DigitalPassport struct {
	ID                 uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	PassportNumber     string         `gorm:"uniqueIndex;not null" json:"passportNumber"`
	QRCode             string         `gorm:"uniqueIndex;not null" json:"qrCode"`
	Status             string         `json:"status"` // active, suspended, revoked, expired
	OrganizationID     uuid.UUID      `gorm:"type:uuid;not null" json:"organizationId"`
	Organization       Organization   `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`
	
	// Product Information
	ProductName        string         `gorm:"not null" json:"productName"`
	ProductCategory    string         `json:"productCategory"`
	ProductSKU         string         `json:"productSku"`
	BatchNumber        string         `json:"batchNumber"`
	SerialNumber       string         `gorm:"uniqueIndex" json:"serialNumber"`
	
	// Manufacturing Details
	ManufacturerName   string         `json:"manufacturerName"`
	ManufacturerID     string         `json:"manufacturerId"`
	ManufactureDate    time.Time      `json:"manufactureDate"`
	ManufactureLocation Location      `gorm:"embedded;embeddedPrefix:manufacture_" json:"manufactureLocation"`
	ExpiryDate         *time.Time     `json:"expiryDate,omitempty"`
	
	// Compliance & Certifications
	Certifications     pq.StringArray `gorm:"type:text[]" json:"certifications"`
	ComplianceStandards pq.StringArray `gorm:"type:text[]" json:"complianceStandards"`
	QualityGrade       string         `json:"qualityGrade"`
	SafetyRating       string         `json:"safetyRating"`
	
	// Sustainability Information
	CarbonFootprint    float64        `json:"carbonFootprint"`
	RecyclableContent  float64        `json:"recyclableContent"` // percentage
	SustainabilityScore string        `json:"sustainabilityScore"`
	EnergyRating       string         `json:"energyRating"`
	
	// Supply Chain Journey
	OriginCountry      string         `json:"originCountry"`
	ImportDate         *time.Time     `json:"importDate,omitempty"`
	CustomsClearance   bool           `json:"customsClearance"`
	SupplyChainStages  pq.StringArray `gorm:"type:text[]" json:"supplyChainStages"`
	
	// Materials & Components
	Materials          pq.StringArray `gorm:"type:text[]" json:"materials"`
	Components         JSONB          `gorm:"type:jsonb" json:"components,omitempty"`
	Allergens          pq.StringArray `gorm:"type:text[]" json:"allergens"`
	
	// Verification & Authentication
	AuthenticationMethod string       `json:"authenticationMethod"` // blockchain, nfc, rfid, qr
	BlockchainHash     string         `json:"blockchainHash"`
	SmartContractAddr  string         `json:"smartContractAddr"`
	LastVerified       *time.Time     `json:"lastVerified"`
	VerificationCount  int            `json:"verificationCount"`
	
	// Related Entities
	ShipmentID         *uuid.UUID     `gorm:"type:uuid" json:"shipmentId,omitempty"`
	Shipment           *Shipment      `gorm:"foreignKey:ShipmentID" json:"shipment,omitempty"`
	AssetID            *uuid.UUID     `gorm:"type:uuid" json:"assetId,omitempty"`
	Asset              *Asset         `gorm:"foreignKey:AssetID" json:"asset,omitempty"`
	
	// Documents & Media
	Documents          pq.StringArray `gorm:"type:text[]" json:"documents"`
	Images             pq.StringArray `gorm:"type:text[]" json:"images"`
	TestReports        pq.StringArray `gorm:"type:text[]" json:"testReports"`
	
	// Lifecycle Tracking
	CurrentStage       string         `json:"currentStage"` // production, transit, retail, use, recycling
	LifecycleEvents    JSONB          `gorm:"type:jsonb" json:"lifecycleEvents,omitempty"`
	RecyclingInstructions string      `json:"recyclingInstructions"`
	DisposalMethod     string         `json:"disposalMethod"`
	
	// Metadata
	Tags               pq.StringArray `gorm:"type:text[]" json:"tags"`
	CustomFields       JSONB          `gorm:"type:jsonb" json:"customFields,omitempty"`
	CreatedAt          time.Time      `json:"createdAt"`
	UpdatedAt          time.Time      `json:"updatedAt"`
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate hook to set UUID and generate codes
func (dp *DigitalPassport) BeforeCreate(tx *gorm.DB) error {
	if dp.ID == uuid.Nil {
		dp.ID = uuid.New()
	}
	if dp.PassportNumber == "" {
		dp.PassportNumber = generatePassportNumber()
	}
	if dp.QRCode == "" {
		dp.QRCode = generateQRCodeData(dp.PassportNumber)
	}
	return nil
}

// generatePassportNumber generates a unique passport number
func generatePassportNumber() string {
	timestamp := time.Now().Unix()
	random := uuid.New().String()[:8]
	return "DPP-" + string(timestamp) + "-" + random
}

// generateQRCodeData generates QR code data for the passport
func generateQRCodeData(passportNumber string) string {
	// In production, this would generate actual QR code image
	return "https://locsafe.io/verify/" + passportNumber
}

// GeofenceZone represents a geographical boundary for monitoring
type GeofenceZone struct {
	ID             uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Name           string         `gorm:"not null" json:"name"`
	Type           string         `json:"type"` // circle, polygon, corridor
	Status         string         `json:"status"` // active, inactive
	OrganizationID uuid.UUID      `gorm:"type:uuid;not null" json:"organizationId"`
	Organization   Organization   `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`
	
	// Geofence Definition
	CenterLat      float64        `json:"centerLat"`
	CenterLng      float64        `json:"centerLng"`
	Radius         float64        `json:"radius"` // in meters for circle type
	Vertices       JSONB          `gorm:"type:jsonb" json:"vertices,omitempty"` // for polygon type
	
	// Rules & Actions
	AlertOnEntry   bool           `json:"alertOnEntry"`
	AlertOnExit    bool           `json:"alertOnExit"`
	AlertOnDwell   bool           `json:"alertOnDwell"`
	DwellTime      int            `json:"dwellTime"` // in minutes
	
	// Restrictions
	AllowedAssets  pq.StringArray `gorm:"type:text[]" json:"allowedAssets"`
	RestrictedHours JSONB         `gorm:"type:jsonb" json:"restrictedHours,omitempty"`
	
	// Monitoring
	ActiveShipments int           `json:"activeShipments"`
	LastTriggered   *time.Time    `json:"lastTriggered"`
	TriggerCount    int           `json:"triggerCount"`
	
	// Metadata
	Description    string         `json:"description"`
	Tags           pq.StringArray `gorm:"type:text[]" json:"tags"`
	CustomFields   JSONB          `gorm:"type:jsonb" json:"customFields,omitempty"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate hook to set UUID
func (g *GeofenceZone) BeforeCreate(tx *gorm.DB) error {
	if g.ID == uuid.Nil {
		g.ID = uuid.New()
	}
	return nil
}

// BlockchainTransaction represents a blockchain transaction record
type BlockchainTransaction struct {
	ID             uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	TxHash         string         `gorm:"uniqueIndex;not null" json:"txHash"`
	BlockNumber    uint64         `json:"blockNumber"`
	BlockHash      string         `json:"blockHash"`
	Status         string         `json:"status"` // pending, confirmed, failed
	Type           string         `json:"type"` // shipment_created, status_updated, ownership_transfer, verification
	
	// Network Information
	Network        string         `json:"network"` // ethereum, polygon, binance
	ChainID        int            `json:"chainId"`
	ContractAddr   string         `json:"contractAddress"`
	
	// Transaction Details
	FromAddress    string         `json:"fromAddress"`
	ToAddress      string         `json:"toAddress"`
	Value          string         `json:"value"`
	GasUsed        uint64         `json:"gasUsed"`
	GasPrice       string         `json:"gasPrice"`
	TransactionFee string         `json:"transactionFee"`
	
	// Related Entities
	ShipmentID     *uuid.UUID     `gorm:"type:uuid" json:"shipmentId,omitempty"`
	Shipment       *Shipment      `gorm:"foreignKey:ShipmentID" json:"shipment,omitempty"`
	PassportID     *uuid.UUID     `gorm:"type:uuid" json:"passportId,omitempty"`
	Passport       *DigitalPassport `gorm:"foreignKey:PassportID" json:"passport,omitempty"`
	EventID        *uuid.UUID     `gorm:"type:uuid" json:"eventId,omitempty"`
	Event          *Event         `gorm:"foreignKey:EventID" json:"event,omitempty"`
	
	// Metadata
	InputData      JSONB          `gorm:"type:jsonb" json:"inputData,omitempty"`
	DecodedData    JSONB          `gorm:"type:jsonb" json:"decodedData,omitempty"`
	Confirmations  int            `json:"confirmations"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate hook to set UUID
func (bt *BlockchainTransaction) BeforeCreate(tx *gorm.DB) error {
	if bt.ID == uuid.Nil {
		bt.ID = uuid.New()
	}
	return nil
}

// CreateDigitalPassportRequest represents DPP creation request
type CreateDigitalPassportRequest struct {
	ProductName         string   `json:"productName" binding:"required"`
	ProductCategory     string   `json:"productCategory"`
	ProductSKU          string   `json:"productSku"`
	BatchNumber         string   `json:"batchNumber"`
	SerialNumber        string   `json:"serialNumber" binding:"required"`
	ManufacturerName    string   `json:"manufacturerName" binding:"required"`
	ManufacturerID      string   `json:"manufacturerId"`
	ManufactureDate     string   `json:"manufactureDate" binding:"required"`
	ManufactureLocation Location `json:"manufactureLocation"`
	ExpiryDate          string   `json:"expiryDate"`
	Certifications      []string `json:"certifications"`
	ComplianceStandards []string `json:"complianceStandards"`
	Materials           []string `json:"materials"`
	CarbonFootprint     float64  `json:"carbonFootprint"`
	RecyclableContent   float64  `json:"recyclableContent"`
}

// CreateGeofenceRequest represents geofence creation request
type CreateGeofenceRequest struct {
	Name            string   `json:"name" binding:"required"`
	Type            string   `json:"type" binding:"required"`
	CenterLat       float64  `json:"centerLat" binding:"required"`
	CenterLng       float64  `json:"centerLng" binding:"required"`
	Radius          float64  `json:"radius"`
	Vertices        JSONB    `json:"vertices"`
	AlertOnEntry    bool     `json:"alertOnEntry"`
	AlertOnExit     bool     `json:"alertOnExit"`
	AlertOnDwell    bool     `json:"alertOnDwell"`
	DwellTime       int      `json:"dwellTime"`
	AllowedAssets   []string `json:"allowedAssets"`
	RestrictedHours JSONB    `json:"restrictedHours"`
	Description     string   `json:"description"`
}