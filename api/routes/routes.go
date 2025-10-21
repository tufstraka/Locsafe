package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/tufstraka/Locsafe/api/handlers"
	"github.com/tufstraka/Locsafe/api/middleware"
)

// SetupRoutes configures all API routes
func SetupRoutes(router *gin.Engine, h *handlers.Handlers, authMiddleware gin.HandlerFunc) {
	// API v1 routes
	v1 := router.Group("/api/v1")
	
	// Public routes
	public := v1.Group("")
	{
		// Health check
		public.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status": "healthy",
				"message": "Locsafe API is running",
			})
		})

		// Authentication
		public.POST("/auth/register", h.AuthHandler.Register)
		public.POST("/auth/login", h.AuthHandler.Login)
		public.POST("/auth/refresh", h.AuthHandler.RefreshToken)
		public.POST("/auth/forgot-password", h.AuthHandler.ForgotPassword)
		public.POST("/auth/reset-password", h.AuthHandler.ResetPassword)
		public.GET("/auth/verify-email/:token", h.AuthHandler.VerifyEmail)
	}

	// Protected routes
	protected := v1.Group("")
	protected.Use(authMiddleware)
	{
		// Auth
		protected.POST("/auth/logout", h.AuthHandler.Logout)
		protected.GET("/auth/me", h.AuthHandler.Me)

		// Onboarding
		protected.GET("/onboarding/data", h.OnboardingHandler.GetOnboardingData)
		protected.PUT("/onboarding/profile", h.OnboardingHandler.UpdateProfile)
		protected.PUT("/onboarding/organization", h.OnboardingHandler.UpdateOrganization)
		protected.PUT("/onboarding/integrations", h.OnboardingHandler.UpdateIntegrations)
		protected.PUT("/onboarding/preferences", h.OnboardingHandler.UpdatePreferences)
		protected.POST("/onboarding/complete", h.OnboardingHandler.CompleteOnboarding)

		// Users
		protected.GET("/users", h.UserHandler.List)
		protected.GET("/users/:id", h.UserHandler.Get)
		protected.PUT("/users/:id", h.UserHandler.Update)
		protected.DELETE("/users/:id", h.UserHandler.Delete)
		protected.POST("/users/:id/change-password", h.UserHandler.ChangePassword)
		protected.PUT("/users/:id/preferences", h.UserHandler.UpdatePreferences)

		// Shipments
		protected.GET("/shipments", h.ShipmentHandler.List)
		protected.POST("/shipments", h.ShipmentHandler.Create)
		protected.GET("/shipments/:id", h.ShipmentHandler.Get)
		protected.PUT("/shipments/:id", h.ShipmentHandler.Update)
		protected.DELETE("/shipments/:id", h.ShipmentHandler.Delete)
		protected.GET("/shipments/:id/events", h.ShipmentHandler.GetEvents)
		protected.POST("/shipments/:id/events", h.ShipmentHandler.AddEvent)
		protected.GET("/shipments/:id/track", h.ShipmentHandler.Track)
		protected.PUT("/shipments/:id/status", h.ShipmentHandler.UpdateStatus)
		protected.POST("/shipments/:id/blockchain", h.ShipmentHandler.RecordOnBlockchain)

		// Assets
		protected.GET("/assets", h.AssetHandler.List)
		protected.POST("/assets", h.AssetHandler.Create)
		protected.GET("/assets/:id", h.AssetHandler.Get)
		protected.PUT("/assets/:id", h.AssetHandler.Update)
		protected.DELETE("/assets/:id", h.AssetHandler.Delete)
		protected.PUT("/assets/:id/assign", h.AssetHandler.Assign)
		protected.PUT("/assets/:id/location", h.AssetHandler.UpdateLocation)
		protected.POST("/assets/:id/maintenance", h.AssetHandler.LogMaintenance)

		// Events
		protected.GET("/events", h.EventHandler.List)
		protected.POST("/events", h.EventHandler.Create)
		protected.GET("/events/:id", h.EventHandler.Get)
		protected.POST("/events/batch", h.EventHandler.CreateBatch)

		// Alerts
		protected.GET("/alerts", h.AlertHandler.List)
		protected.POST("/alerts", h.AlertHandler.Create)
		protected.GET("/alerts/:id", h.AlertHandler.Get)
		protected.PUT("/alerts/:id/acknowledge", h.AlertHandler.Acknowledge)
		protected.PUT("/alerts/:id/resolve", h.AlertHandler.Resolve)

		// Digital Passports
		protected.GET("/passports", h.PassportHandler.List)
		protected.POST("/passports", h.PassportHandler.Create)
		protected.GET("/passports/:id", h.PassportHandler.Get)
		protected.PUT("/passports/:id", h.PassportHandler.Update)
		protected.DELETE("/passports/:id", h.PassportHandler.Delete)
		protected.GET("/passports/:id/verify", h.PassportHandler.Verify)
		protected.POST("/passports/:id/lifecycle-event", h.PassportHandler.AddLifecycleEvent)

		// Geofences
		protected.GET("/geofences", h.GeofenceHandler.List)
		protected.POST("/geofences", h.GeofenceHandler.Create)
		protected.GET("/geofences/:id", h.GeofenceHandler.Get)
		protected.PUT("/geofences/:id", h.GeofenceHandler.Update)
		protected.DELETE("/geofences/:id", h.GeofenceHandler.Delete)
		protected.POST("/geofences/:id/check", h.GeofenceHandler.CheckLocation)

		// Dashboard & Analytics
		protected.GET("/dashboard/stats", h.DashboardHandler.GetStats)
		protected.GET("/dashboard/recent-activity", h.DashboardHandler.GetRecentActivity)
		protected.GET("/dashboard/shipment-analytics", h.DashboardHandler.GetShipmentAnalytics)
		protected.GET("/dashboard/alerts-summary", h.DashboardHandler.GetAlertsSummary)
		protected.GET("/dashboard/performance-metrics", h.DashboardHandler.GetPerformanceMetrics)
	}

	// Admin routes
	admin := protected.Group("")
	admin.Use(middleware.RoleMiddleware("admin"))
	{
		// Organization management
		admin.GET("/organizations", h.UserHandler.ListOrganizations)
		admin.POST("/organizations", h.UserHandler.CreateOrganization)
		admin.PUT("/organizations/:id", h.UserHandler.UpdateOrganization)
		admin.DELETE("/organizations/:id", h.UserHandler.DeleteOrganization)
		
		// User management
		admin.POST("/users", h.UserHandler.Create)
		admin.PUT("/users/:id/role", h.UserHandler.UpdateRole)
		admin.PUT("/users/:id/activate", h.UserHandler.Activate)
		admin.PUT("/users/:id/deactivate", h.UserHandler.Deactivate)
		
		// Blockchain management
		admin.GET("/blockchain/transactions", h.DashboardHandler.GetBlockchainTransactions)
		admin.POST("/blockchain/deploy-contract", h.DashboardHandler.DeploySmartContract)
		
		// System settings
		admin.GET("/settings", h.DashboardHandler.GetSystemSettings)
		admin.PUT("/settings", h.DashboardHandler.UpdateSystemSettings)
	}

	// Webhook endpoints
	webhooks := v1.Group("/webhooks")
	{
		webhooks.POST("/iot-data", h.EventHandler.HandleIoTData)
		webhooks.POST("/blockchain-event", h.EventHandler.HandleBlockchainEvent)
		webhooks.POST("/tracking-update", h.ShipmentHandler.HandleTrackingUpdate)
	}

	// Public tracking endpoint (no auth required)
	v1.GET("/track/:trackingNumber", h.ShipmentHandler.PublicTrack)
	v1.GET("/verify/:passportNumber", h.PassportHandler.PublicVerify)
}