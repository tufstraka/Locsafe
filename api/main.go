package main

import (
	"log"
	"os"
	"strings"

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
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	if os.Getenv("APP_ENV") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	db, err := config.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

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

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	corsConfig := cors.DefaultConfig()
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins != "" {
		corsConfig.AllowOrigins = strings.Split(allowedOrigins, ",")
		corsConfig.AllowCredentials = true
	} else {
		corsConfig.AllowAllOrigins = true
		corsConfig.AllowCredentials = false
	}
	corsConfig.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Accept",
		"Authorization",
		"X-Requested-With",
	}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	router.Use(cors.New(corsConfig))

	h := handlers.NewHandlers(db)
	routes.SetupRoutes(router, h, middleware.AuthMiddleware())

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}