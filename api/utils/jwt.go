package utils

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var jwtSecret []byte

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "your-secret-key-change-in-production"
	}
	jwtSecret = []byte(secret)
}

// GenerateToken generates a JWT token for a user
func GenerateToken(userID uuid.UUID, email, role string, organizationID *uuid.UUID) (string, string, error) {
	// Access token - expires in 24 hours
	accessClaims := jwt.MapClaims{
		"user_id": userID.String(),
		"email":   email,
		"role":    role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
		"iat":     time.Now().Unix(),
	}

	if organizationID != nil {
		accessClaims["organization_id"] = organizationID.String()
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessTokenString, err := accessToken.SignedString(jwtSecret)
	if err != nil {
		return "", "", err
	}

	// Refresh token - expires in 30 days
	refreshClaims := jwt.MapClaims{
		"user_id": userID.String(),
		"type":    "refresh",
		"exp":     time.Now().Add(time.Hour * 24 * 30).Unix(),
		"iat":     time.Now().Unix(),
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshTokenString, err := refreshToken.SignedString(jwtSecret)
	if err != nil {
		return "", "", err
	}

	return accessTokenString, refreshTokenString, nil
}

// ValidateToken validates a JWT token
func ValidateToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	// Check if token is valid
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	// Check expiration
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if exp, ok := claims["exp"].(float64); ok {
			if time.Now().Unix() > int64(exp) {
				return nil, fmt.Errorf("token has expired")
			}
		}
	}

	return token, nil
}

// RefreshToken generates a new access token from a refresh token
func RefreshToken(refreshTokenString string) (string, error) {
	token, err := ValidateToken(refreshTokenString)
	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("invalid token claims")
	}

	// Check if it's a refresh token
	if tokenType, ok := claims["type"].(string); !ok || tokenType != "refresh" {
		return "", fmt.Errorf("token is not a refresh token")
	}

	// Generate new access token
	userID, err := uuid.Parse(claims["user_id"].(string))
	if err != nil {
		return "", err
	}

	// You would typically fetch the user from database here to get latest role/org
	// For now, we'll just create a new token with the user ID
	accessClaims := jwt.MapClaims{
		"user_id": userID.String(),
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
		"iat":     time.Now().Unix(),
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	return accessToken.SignedString(jwtSecret)
}