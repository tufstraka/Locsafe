package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/tufstraka/Locsafe/api/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Authorization header required",
			})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid authorization header format",
			})
			c.Abort()
			return
		}

		token, err := utils.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid or expired token",
			})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			userID, err := uuid.Parse(claims["user_id"].(string))
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Invalid user ID in token",
				})
				c.Abort()
				return
			}

			c.Set("userID", userID)
			c.Set("userEmail", claims["email"].(string))
			c.Set("userRole", claims["role"].(string))

			if orgID, ok := claims["organization_id"].(string); ok {
				orgUUID, _ := uuid.Parse(orgID)
				c.Set("organizationID", orgUUID)
			}

			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token claims",
			})
			c.Abort()
			return
		}
	}
}

func RoleMiddleware(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userRole, exists := c.Get("userRole")
		if !exists {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "No role found",
			})
			c.Abort()
			return
		}

		userRoleStr := userRole.(string)
		for _, role := range roles {
			if userRoleStr == role {
				c.Next()
				return
			}
		}

		c.JSON(http.StatusForbidden, gin.H{
			"error": "Insufficient permissions",
		})
		c.Abort()
	}
}

func OrganizationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		_, exists := c.Get("organizationID")
		if !exists {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "User must belong to an organization",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}

func RateLimitMiddleware(requestsPerMinute int) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
	}
}
