package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type DigitalPassport struct {
	ID                 uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	PassportNumber     string         `gorm:"uniqueIndex;not null" json:"passportNumber"`
	QRCode             string         `gorm:"uniqueIndex;not null" json:"qrCode"`
	Status             string         `json:"status"`
	OrganizationID     uuid.UUID      `gorm:"type:uuid;not null" json:"organizationId"`
	Organization       Organization   `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`

	ProductName        string         `gorm:"not null" json:"productName"`
	ProductCategory    string         `json:"productCategory"`
	ProductSKU         string         `json:"productSku"`
	BatchNumber        string         `json:"batchNumber"`
	SerialNumber       string         `gorm:"uniqueIndex" json:"serialNumber"`

	ManufacturerName   string         `json:"manufacturerName"`
	ManufacturerID     string         `json:"manufacturerId"`
	ManufactureDate    time.Time      `json:"manufactureDate"`
	ManufactureLocation Location      `gorm:"embedded;embeddedPrefix:manufacture_" json:"manufactureLocation"`
	ExpiryDate         *time.Time     `json:"expiryDate,omitempty"`

	Certifications     pq.StringArray `gorm:"type:text[]" json:"certifications"`
	ComplianceStandards pq.StringArray `gorm:"type:text[]" json:"complianceStandards"`
	QualityGrade       string         `json:"qualityGrade"`
	SafetyRating       string         `json:"safetyRating"`

	CarbonFootprint    float64        `json:"carbonFootprint"`
	RecyclableContent  float64        `json:"recyclableContent"`
	SustainabilityScore string        `json:"sustainabilityScore"`
	EnergyRating       string         `json:"energyRating"`

	OriginCountry      string         `json:"originCountry"`
	ImportDate         *time.Time     `json:"importDate,omitempty"`
	CustomsClearance   bool           `json:"customsClearance"`
	SupplyChainStages  pq.StringArray `gorm:"type:text[]" json:"supplyChainStages"`

	Materials          pq.StringArray `gorm:"type:text[]" json:"materials"`
	Components         JSONB          `gorm:"type:jsonb" json:"components,omitempty"`
	Allergens          pq.StringArray `gorm:"type:text[]" json:"allergens"`

	AuthenticationMethod string       `json:"authenticationMethod"`
	BlockchainHash     string         `json:"blockchainHash"`
	SmartContractAddr  string         `json:"smartContractAddr"`
	LastVerified       *time.Time     `json:"lastVerified"`
	VerificationCount  int            `json:"verificationCount"`

	ShipmentID         *uuid.UUID     `gorm:"type:uuid" json:"shipmentId,omitempty"`
	Shipment           *Shipment      `gorm:"foreignKey:ShipmentID" json:"shipment,omitempty"`
	AssetID            *uuid.UUID     `gorm:"type:uuid" json:"assetId,omitempty"`
	Asset              *Asset         `gorm:"foreignKey:AssetID" json:"asset,omitempty"`

	Documents          pq.StringArray `gorm:"type:text[]" json:"documents"`
	Images             pq.StringArray `gorm:"type:text[]" json:"images"`
	TestReports        pq.StringArray `gorm:"type:text[]" json:"testReports"`

	CurrentStage       string         `json:"currentStage"`
	LifecycleEvents    JSONB          `gorm:"type:jsonb" json:"lifecycleEvents,omitempty"`
	RecyclingInstructions string      `json:"recyclingInstructions"`
	DisposalMethod     string         `json:"disposalMethod"`

	Tags               pq.StringArray `gorm:"type:text[]" json:"tags"`
	CustomFields       JSONB          `gorm:"type:jsonb" json:"customFields,omitempty"`
	CreatedAt          time.Time      `json:"createdAt"`
	UpdatedAt          time.Time      `json:"updatedAt"`
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"-"`
}

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

func generatePassportNumber() string {
	timestamp := time.Now().Unix()
	random := uuid.New().String()[:8]
	return "DPP-" + fmt.Sprint(timestamp) + "-" + random
}

func generateQRCodeData(passportNumber string) string {
	return "https://locsafe.org/verify/" + passportNumber
}

type GeofenceZone struct {
	ID             uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Name           string         `gorm:"not null" json:"name"`
	Type           string         `json:"type"`
	Status         string         `json:"status"`
	OrganizationID uuid.UUID      `gorm:"type:uuid;not null" json:"organizationId"`
	Organization   Organization   `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`

	CenterLat      float64        `json:"centerLat"`
	CenterLng      float64        `json:"centerLng"`
	Radius         float64        `json:"radius"`
	Vertices       JSONB          `gorm:"type:jsonb" json:"vertices,omitempty"`

	AlertOnEntry   bool           `json:"alertOnEntry"`
	AlertOnExit    bool           `json:"alertOnExit"`
	AlertOnDwell   bool           `json:"alertOnDwell"`
	DwellTime      int            `json:"dwellTime"`

	AllowedAssets  pq.StringArray `gorm:"type:text[]" json:"allowedAssets"`
	RestrictedHours JSONB         `gorm:"type:jsonb" json:"restrictedHours,omitempty"`

	ActiveShipments int           `json:"activeShipments"`
	LastTriggered   *time.Time    `json:"lastTriggered"`
	TriggerCount    int           `json:"triggerCount"`

	Description    string         `json:"description"`
	Tags           pq.StringArray `gorm:"type:text[]" json:"tags"`
	CustomFields   JSONB          `gorm:"type:jsonb" json:"customFields,omitempty"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (g *GeofenceZone) BeforeCreate(tx *gorm.DB) error {
	if g.ID == uuid.Nil {
		g.ID = uuid.New()
	}
	return nil
}

type BlockchainTransaction struct {
	ID             uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	TxHash         string         `gorm:"uniqueIndex;not null" json:"txHash"`
	BlockNumber    uint64         `json:"blockNumber"`
	BlockHash      string         `json:"blockHash"`
	Status         string         `json:"status"`
	Type           string         `json:"type"`

	Network        string         `json:"network"`
	ChainID        int            `json:"chainId"`
	ContractAddr   string         `json:"contractAddress"`

	FromAddress    string         `json:"fromAddress"`
	ToAddress      string         `json:"toAddress"`
	Value          string         `json:"value"`
	GasUsed        uint64         `json:"gasUsed"`
	GasPrice       string         `json:"gasPrice"`
	TransactionFee string         `json:"transactionFee"`

	ShipmentID     *uuid.UUID     `gorm:"type:uuid" json:"shipmentId,omitempty"`
	Shipment       *Shipment      `gorm:"foreignKey:ShipmentID" json:"shipment,omitempty"`
	PassportID     *uuid.UUID     `gorm:"type:uuid" json:"passportId,omitempty"`
	Passport       *DigitalPassport `gorm:"foreignKey:PassportID" json:"passport,omitempty"`
	EventID        *uuid.UUID     `gorm:"type:uuid" json:"eventId,omitempty"`
	Event          *Event         `gorm:"foreignKey:EventID" json:"event,omitempty"`

	InputData      JSONB          `gorm:"type:jsonb" json:"inputData,omitempty"`
	DecodedData    JSONB          `gorm:"type:jsonb" json:"decodedData,omitempty"`
	Confirmations  int            `json:"confirmations"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (bt *BlockchainTransaction) BeforeCreate(tx *gorm.DB) error {
	if bt.ID == uuid.Nil {
		bt.ID = uuid.New()
	}
	return nil
}

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