package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Shipment struct {
	ID                 uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	TrackingNumber     string         `gorm:"uniqueIndex;not null" json:"trackingNumber"`
	Status             string         `json:"status"` // pending, in_transit, delivered, cancelled, delayed
	Priority           string         `json:"priority"` // low, medium, high, urgent
	OrganizationID     uuid.UUID      `gorm:"type:uuid;not null" json:"organizationId"`
	Organization       Organization   `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`
	
	Origin             Location       `gorm:"embedded;embeddedPrefix:origin_" json:"origin"`
	Destination        Location       `gorm:"embedded;embeddedPrefix:dest_" json:"destination"`
	CurrentLocation    *Location      `gorm:"embedded;embeddedPrefix:current_" json:"currentLocation,omitempty"`
	EstimatedDelivery  *time.Time     `json:"estimatedDelivery"`
	ActualDelivery     *time.Time     `json:"actualDelivery"`
	
	Description        string         `json:"description"`
	Weight             float64        `json:"weight"`
	WeightUnit         string         `json:"weightUnit" gorm:"default:'kg'"`
	Dimensions         Dimensions     `gorm:"embedded" json:"dimensions"`
	Value              float64        `json:"value"`
	Currency           string         `json:"currency" gorm:"default:'USD'"`
	Quantity           int            `json:"quantity"`
	PackageType        string         `json:"packageType"` // box, pallet, container, envelope
	
	SenderName         string         `json:"senderName"`
	SenderEmail        string         `json:"senderEmail"`
	SenderPhone        string         `json:"senderPhone"`
	ReceiverName       string         `json:"receiverName"`
	ReceiverEmail      string         `json:"receiverEmail"`
	ReceiverPhone      string         `json:"receiverPhone"`
	DriverID           *uuid.UUID     `gorm:"type:uuid" json:"driverId,omitempty"`
	Driver             *User          `gorm:"foreignKey:DriverID" json:"driver,omitempty"`
	
	Temperature        *float64       `json:"temperature,omitempty"`
	TemperatureUnit    string         `json:"temperatureUnit" gorm:"default:'C'"`
	Humidity           *float64       `json:"humidity,omitempty"`
	RequiresRefrigeration bool        `json:"requiresRefrigeration"`
	FragileGoods       bool           `json:"fragileGoods"`
	HazardousMaterial  bool           `json:"hazardousMaterial"`
	
	BlockchainTxHash   string         `json:"blockchainTxHash,omitempty"`
	SmartContractAddr  string         `json:"smartContractAddr,omitempty"`
	DigitalPassportID  *uuid.UUID     `gorm:"type:uuid" json:"digitalPassportId,omitempty"`
	
	Documents          pq.StringArray `gorm:"type:text[]" json:"documents"`
	Images             pq.StringArray `gorm:"type:text[]" json:"images"`
	Signature          string         `json:"signature,omitempty"`
	ProofOfDelivery    string         `json:"proofOfDelivery,omitempty"`
	
	Tags               pq.StringArray `gorm:"type:text[]" json:"tags"`
	Notes              string         `json:"notes"`
	CustomFields       JSONB          `gorm:"type:jsonb" json:"customFields,omitempty"`
	Events             []Event        `gorm:"foreignKey:ShipmentID" json:"events,omitempty"`
	Alerts             []Alert        `gorm:"foreignKey:ShipmentID" json:"alerts,omitempty"`
	
	CreatedAt          time.Time      `json:"createdAt"`
	UpdatedAt          time.Time      `json:"updatedAt"`
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"-"`
}

type Location struct {
	Address     string  `json:"address"`
	City        string  `json:"city"`
	State       string  `json:"state"`
	Country     string  `json:"country"`
	PostalCode  string  `json:"postalCode"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
}

type Dimensions struct {
	Length float64 `json:"length"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
	Unit   string  `json:"unit" gorm:"default:'cm'"`
}

// JSONB type for PostgreSQL JSONB columns
type JSONB map[string]interface{}

// Value implements driver.Valuer interface
func (j JSONB) Value() (driver.Value, error) {
	if j == nil {
		return nil, nil
	}
	return json.Marshal(j)
}

// Scan implements sql.Scanner interface
func (j *JSONB) Scan(value interface{}) error {
	if value == nil {
		*j = make(JSONB)
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return nil
	}
	return json.Unmarshal(bytes, j)
}

// BeforeCreate hook to set UUID and tracking number
func (s *Shipment) BeforeCreate(tx *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	if s.TrackingNumber == "" {
		s.TrackingNumber = generateTrackingNumber()
	}
	return nil
}

// generateTrackingNumber generates a unique tracking number
func generateTrackingNumber() string {
	timestamp := time.Now().Unix()
	random := uuid.New().String()[:8]
	return "LCS" + fmt.Sprint(timestamp) + random
}

type CreateShipmentRequest struct {
	Description       string    `json:"description" binding:"required"`
	Priority          string    `json:"priority"`
	Origin            Location  `json:"origin" binding:"required"`
	Destination       Location  `json:"destination" binding:"required"`
	EstimatedDelivery string    `json:"estimatedDelivery"`
	Weight            float64   `json:"weight"`
	WeightUnit        string    `json:"weightUnit"`
	Dimensions        Dimensions `json:"dimensions"`
	Value             float64   `json:"value"`
	Currency          string    `json:"currency"`
	Quantity          int       `json:"quantity"`
	PackageType       string    `json:"packageType"`
	SenderName        string    `json:"senderName" binding:"required"`
	SenderEmail       string    `json:"senderEmail" binding:"required,email"`
	SenderPhone       string    `json:"senderPhone"`
	ReceiverName      string    `json:"receiverName" binding:"required"`
	ReceiverEmail     string    `json:"receiverEmail" binding:"required,email"`
	ReceiverPhone     string    `json:"receiverPhone"`
	RequiresRefrigeration bool  `json:"requiresRefrigeration"`
	FragileGoods      bool      `json:"fragileGoods"`
	HazardousMaterial bool      `json:"hazardousMaterial"`
	Tags              []string  `json:"tags"`
	Notes             string    `json:"notes"`
}

type UpdateShipmentRequest struct {
	Status            string    `json:"status"`
	CurrentLocation   *Location `json:"currentLocation"`
	EstimatedDelivery string    `json:"estimatedDelivery"`
	ActualDelivery    string    `json:"actualDelivery"`
	Temperature       *float64  `json:"temperature"`
	Humidity          *float64  `json:"humidity"`
	DriverID          string    `json:"driverId"`
	Notes             string    `json:"notes"`
}