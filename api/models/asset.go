package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Asset struct {
	ID               uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	AssetCode        string         `gorm:"uniqueIndex;not null" json:"assetCode"`
	Name             string         `gorm:"not null" json:"name"`
	Type             string         `json:"type"`
	Category         string         `json:"category"`
	Status           string         `json:"status"`
	OrganizationID   uuid.UUID      `gorm:"type:uuid;not null" json:"organizationId"`
	Organization     Organization   `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`

	Description      string         `json:"description"`
	Manufacturer     string         `json:"manufacturer"`
	Model            string         `json:"model"`
	SerialNumber     string         `gorm:"uniqueIndex" json:"serialNumber"`
	PurchaseDate     *time.Time     `json:"purchaseDate"`
	PurchasePrice    float64        `json:"purchasePrice"`
	Currency         string         `json:"currency" gorm:"default:'USD'"`
	WarrantyExpiry   *time.Time     `json:"warrantyExpiry"`

	CurrentLocation  *Location      `gorm:"embedded;embeddedPrefix:location_" json:"currentLocation"`
	AssignedToID     *uuid.UUID     `gorm:"type:uuid" json:"assignedToId,omitempty"`
	AssignedTo       *User          `gorm:"foreignKey:AssignedToID" json:"assignedTo,omitempty"`
	ShipmentID       *uuid.UUID     `gorm:"type:uuid" json:"shipmentId,omitempty"`
	Shipment         *Shipment      `gorm:"foreignKey:ShipmentID" json:"shipment,omitempty"`

	TrackerID        string         `json:"trackerId,omitempty"`
	LastSeen         *time.Time     `json:"lastSeen"`
	BatteryLevel     *int           `json:"batteryLevel,omitempty"`
	Temperature      *float64       `json:"temperature,omitempty"`
	Humidity         *float64       `json:"humidity,omitempty"`
	Speed            *float64       `json:"speed,omitempty"`

	LastMaintenance  *time.Time     `json:"lastMaintenance"`
	NextMaintenance  *time.Time     `json:"nextMaintenance"`
	MaintenanceNotes string         `json:"maintenanceNotes"`

	Tags             pq.StringArray `gorm:"type:text[]" json:"tags"`
	Images           pq.StringArray `gorm:"type:text[]" json:"images"`
	Documents        pq.StringArray `gorm:"type:text[]" json:"documents"`
	CustomFields     JSONB          `gorm:"type:jsonb" json:"customFields,omitempty"`

	CreatedAt        time.Time      `json:"createdAt"`
	UpdatedAt        time.Time      `json:"updatedAt"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

func (a *Asset) BeforeCreate(tx *gorm.DB) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	if a.AssetCode == "" {
		a.AssetCode = generateAssetCode()
	}
	return nil
}

func generateAssetCode() string {
	timestamp := time.Now().Unix()
	random := uuid.New().String()[:6]
	return "AST-" + fmt.Sprint(timestamp) + "-" + random
}

type CreateAssetRequest struct {
	Name           string    `json:"name" binding:"required"`
	Type           string    `json:"type" binding:"required"`
	Category       string    `json:"category"`
	Description    string    `json:"description"`
	Manufacturer   string    `json:"manufacturer"`
	Model          string    `json:"model"`
	SerialNumber   string    `json:"serialNumber" binding:"required"`
	PurchaseDate   string    `json:"purchaseDate"`
	PurchasePrice  float64   `json:"purchasePrice"`
	Currency       string    `json:"currency"`
	WarrantyExpiry string    `json:"warrantyExpiry"`
	TrackerID      string    `json:"trackerId"`
	Tags           []string  `json:"tags"`
}

type UpdateAssetRequest struct {
	Name            string    `json:"name"`
	Status          string    `json:"status"`
	Description     string    `json:"description"`
	CurrentLocation *Location `json:"currentLocation"`
	AssignedToID    string    `json:"assignedToId"`
	ShipmentID      string    `json:"shipmentId"`
	TrackerID       string    `json:"trackerId"`
	Temperature     *float64  `json:"temperature"`
	Humidity        *float64  `json:"humidity"`
	BatteryLevel    *int      `json:"batteryLevel"`
	LastMaintenance string    `json:"lastMaintenance"`
	NextMaintenance string    `json:"nextMaintenance"`
	Tags            []string  `json:"tags"`
}