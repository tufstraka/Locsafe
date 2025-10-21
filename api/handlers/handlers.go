package handlers

import (
	"gorm.io/gorm"
)

// Handlers holds all handler dependencies
type Handlers struct {
	DB               *gorm.DB
	AuthHandler      *AuthHandler
	UserHandler      *UserHandler
	ShipmentHandler  *ShipmentHandler
	AssetHandler     *AssetHandler
	EventHandler     *EventHandler
	AlertHandler     *AlertHandler
	PassportHandler  *PassportHandler
	GeofenceHandler  *GeofenceHandler
	DashboardHandler *DashboardHandler
	OnboardingHandler *OnboardingHandler
}

// NewHandlers creates a new handlers instance
func NewHandlers(db *gorm.DB) *Handlers {
	return &Handlers{
		DB:               db,
		AuthHandler:      NewAuthHandler(db),
		UserHandler:      NewUserHandler(db),
		ShipmentHandler:  NewShipmentHandler(db),
		AssetHandler:     NewAssetHandler(db),
		EventHandler:     NewEventHandler(db),
		AlertHandler:     NewAlertHandler(db),
		PassportHandler:  NewPassportHandler(db),
		GeofenceHandler:  NewGeofenceHandler(db),
		DashboardHandler: NewDashboardHandler(db),
		OnboardingHandler: NewOnboardingHandler(db),
	}
}