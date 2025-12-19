package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Event struct {
	ID             uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Type           string         `gorm:"not null" json:"type"`
	Description    string         `json:"description"`
	ShipmentID     uuid.UUID      `gorm:"type:uuid;not null" json:"shipmentId"`
	Shipment       Shipment       `gorm:"foreignKey:ShipmentID" json:"shipment,omitempty"`
	AssetID        *uuid.UUID     `gorm:"type:uuid" json:"assetId,omitempty"`
	Asset          *Asset         `gorm:"foreignKey:AssetID" json:"asset,omitempty"`
	UserID         *uuid.UUID     `gorm:"type:uuid" json:"userId,omitempty"`
	User           *User          `gorm:"foreignKey:UserID" json:"user,omitempty"`

	Location       *Location      `gorm:"embedded;embeddedPrefix:event_" json:"location,omitempty"`
	Temperature    *float64       `json:"temperature,omitempty"`
	Humidity       *float64       `json:"humidity,omitempty"`
	Battery        *int           `json:"battery,omitempty"`
	Speed          *float64       `json:"speed,omitempty"`
	Direction      *float64       `json:"direction,omitempty"`

	BlockchainTx   string         `json:"blockchainTx,omitempty"`
	Verified       bool           `json:"verified" gorm:"default:false"`

	Source         string         `json:"source"`
	DeviceID       string         `json:"deviceId,omitempty"`
	IPAddress      string         `json:"ipAddress,omitempty"`
	UserAgent      string         `json:"userAgent,omitempty"`
	Metadata       JSONB          `gorm:"type:jsonb" json:"metadata,omitempty"`

	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (e *Event) BeforeCreate(tx *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}

type Alert struct {
	ID             uuid.UUID      `gorm:"type:uuid;primary_key" json:"id"`
	Type           string         `gorm:"not null" json:"type"`
	Severity       string         `json:"severity"`
	Title          string         `gorm:"not null" json:"title"`
	Message        string         `json:"message"`
	Status         string         `json:"status" gorm:"default:'active'"`

	ShipmentID     *uuid.UUID     `gorm:"type:uuid" json:"shipmentId,omitempty"`
	Shipment       *Shipment      `gorm:"foreignKey:ShipmentID" json:"shipment,omitempty"`
	AssetID        *uuid.UUID     `gorm:"type:uuid" json:"assetId,omitempty"`
	Asset          *Asset         `gorm:"foreignKey:AssetID" json:"asset,omitempty"`
	UserID         *uuid.UUID     `gorm:"type:uuid" json:"userId,omitempty"`
	User           *User          `gorm:"foreignKey:UserID" json:"user,omitempty"`

	TriggerValue   string         `json:"triggerValue,omitempty"`
	ThresholdValue string         `json:"thresholdValue,omitempty"`
	Location       *Location      `gorm:"embedded;embeddedPrefix:alert_" json:"location,omitempty"`

	AcknowledgedBy *uuid.UUID     `gorm:"type:uuid" json:"acknowledgedBy,omitempty"`
	AcknowledgedAt *time.Time     `json:"acknowledgedAt,omitempty"`
	ResolvedBy     *uuid.UUID     `gorm:"type:uuid" json:"resolvedBy,omitempty"`
	ResolvedAt     *time.Time     `json:"resolvedAt,omitempty"`
	Resolution     string         `json:"resolution,omitempty"`

	NotificationSent bool         `json:"notificationSent" gorm:"default:false"`
	EmailSent      bool           `json:"emailSent" gorm:"default:false"`
	SMSSent        bool           `json:"smsSent" gorm:"default:false"`
	PushSent       bool           `json:"pushSent" gorm:"default:false"`

	Metadata       JSONB          `gorm:"type:jsonb" json:"metadata,omitempty"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (a *Alert) BeforeCreate(tx *gorm.DB) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	return nil
}

type CreateEventRequest struct {
	Type        string    `json:"type" binding:"required"`
	Description string    `json:"description"`
	ShipmentID  string    `json:"shipmentId" binding:"required"`
	AssetID     string    `json:"assetId"`
	Location    *Location `json:"location"`
	Temperature *float64  `json:"temperature"`
	Humidity    *float64  `json:"humidity"`
	Battery     *int      `json:"battery"`
	Speed       *float64  `json:"speed"`
	Source      string    `json:"source"`
	DeviceID    string    `json:"deviceId"`
	Metadata    JSONB     `json:"metadata"`
}

type CreateAlertRequest struct {
	Type           string    `json:"type" binding:"required"`
	Severity       string    `json:"severity" binding:"required"`
	Title          string    `json:"title" binding:"required"`
	Message        string    `json:"message"`
	ShipmentID     string    `json:"shipmentId"`
	AssetID        string    `json:"assetId"`
	TriggerValue   string    `json:"triggerValue"`
	ThresholdValue string    `json:"thresholdValue"`
	Location       *Location `json:"location"`
}