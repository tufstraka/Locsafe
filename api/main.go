package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/tufstraka/Locsafe/api/config"
	"github.com/tufstraka/Locsafe/api/handlers"
	"github.com/tufstraka/Locsafe/api/middleware"
	"github.com/tufstraka/Locsafe/api/models"
	"github.com/tufstraka/Locsafe/api/routes"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize database
	db, err := config.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate the models
	if err := db.AutoMigrate(
		&models.User{},
		&models.Organization{},
		&models.Shipment{},
		&models.Asset{},
		&models.Event{},
		&models.Alert{},
		&models.DigitalPassport{},
		&models.GeofenceZone{},
		&models.BlockchainTransaction{},
	); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Initialize Gin router
	router := gin.New()

	// Global middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	
	// CORS configuration
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true // Allow all origins
	corsConfig.AllowCredentials = false // Must be false when allowing all origins
	corsConfig.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Accept",
		"Authorization",
		"X-Requested-With",
	}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	router.Use(cors.New(corsConfig))

	// Initialize handlers
	h := handlers.NewHandlers(db)

	// Setup routes
	routes.SetupRoutes(router, h, middleware.AuthMiddleware())

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}