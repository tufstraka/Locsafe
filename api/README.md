# Locsafe Backend API

## 🚀 Features

- **RESTful API**: Clean, well-structured REST endpoints
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **PostgreSQL Database**: Robust relational database with GORM ORM
- **Blockchain Integration**: Support for recording supply chain events on blockchain
- **Digital Product Passports**: Complete product lifecycle tracking
- **Real-time Tracking**: IoT device integration for real-time shipment tracking
- **Geofencing**: Location-based alerts and monitoring
- **Analytics Dashboard**: Comprehensive metrics and insights
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **Professional Architecture**: Clean code architecture with separation of concerns

## 📋 Prerequisites

- Go 1.21 or higher
- PostgreSQL 15 or higher
- Redis (for caching and rate limiting)
- Docker & Docker Compose (optional)

## 🛠️ Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
cd api
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Start the services:
```bash
docker-compose up -d
```

The API will be available at `http://localhost:8080`

### Manual Installation

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE locsafe;
```

2. Install dependencies:
```bash
go mod download
```

3. Copy and configure the environment file:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run migrations (automatic on startup)

5. Start the server:
```bash
go run main.go
```

## 📁 Project Structure

```
api/
├── config/           # Configuration files
├── handlers/         # HTTP request handlers
├── middleware/       # HTTP middleware
├── models/          # Database models
├── routes/          # Route definitions
├── utils/           # Utility functions
├── main.go          # Application entry point
├── docker-compose.yml
├── Dockerfile
└── .env.example
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user info

### Shipments
- `GET /api/v1/shipments` - List all shipments
- `POST /api/v1/shipments` - Create new shipment
- `GET /api/v1/shipments/:id` - Get shipment details
- `PUT /api/v1/shipments/:id` - Update shipment
- `DELETE /api/v1/shipments/:id` - Delete shipment
- `GET /api/v1/shipments/:id/track` - Track shipment
- `POST /api/v1/shipments/:id/events` - Add shipment event

### Assets
- `GET /api/v1/assets` - List all assets
- `POST /api/v1/assets` - Create new asset
- `GET /api/v1/assets/:id` - Get asset details
- `PUT /api/v1/assets/:id` - Update asset
- `DELETE /api/v1/assets/:id` - Delete asset
- `PUT /api/v1/assets/:id/location` - Update asset location

### Digital Passports
- `GET /api/v1/passports` - List all digital passports
- `POST /api/v1/passports` - Create new passport
- `GET /api/v1/passports/:id` - Get passport details
- `GET /api/v1/passports/:id/verify` - Verify passport authenticity

### Alerts
- `GET /api/v1/alerts` - List all alerts
- `POST /api/v1/alerts` - Create new alert
- `PUT /api/v1/alerts/:id/acknowledge` - Acknowledge alert
- `PUT /api/v1/alerts/:id/resolve` - Resolve alert

### Dashboard
- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/recent-activity` - Get recent activity
- `GET /api/v1/dashboard/shipment-analytics` - Get shipment analytics

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Schema

### Core Tables
- **users** - User accounts and authentication
- **organizations** - Company/organization data
- **shipments** - Shipment tracking information
- **assets** - Trackable assets (vehicles, containers, etc.)
- **events** - Tracking events and updates
- **alerts** - System alerts and notifications
- **digital_passports** - Digital Product Passport records
- **geofence_zones** - Geographical boundaries
- **blockchain_transactions** - Blockchain transaction records

## 🔧 Development

### Run migrations:
```bash
go run main.go migrate
```

### Run tests:
```bash
go test ./...
```

### Format code:
```bash
go fmt ./...
```

### Lint code:
```bash
golangci-lint run
```

## 🚀 Deployment

### Using Docker

1. Build the image:
```bash
docker build -t locsafe-api .
```

2. Run the container:
```bash
docker run -p 8080:8080 --env-file .env locsafe-api
```

### Using Docker Compose (Production)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Environment Variables

Key environment variables (see `.env.example` for full list):

- `APP_ENV` - Application environment (development/production)
- `PORT` - Server port (default: 8080)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
- `JWT_SECRET` - Secret key for JWT tokens
- `REDIS_HOST` - Redis host for caching
- `REDIS_PORT` - Redis port

## 🧪 Testing

### Run unit tests:
```bash
go test ./... -v
```

### Run integration tests:
```bash
go test ./... -tags=integration
```

### Test coverage:
```bash
go test ./... -cover
```

## 📚 API Documentation

API documentation is available at:
- Swagger UI: `http://localhost:8080/swagger/index.html`
- ReDoc: `http://localhost:8080/redoc`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🛟 Support

For support, email support@locsafe.org or open an issue in the repository.

## 🏗️ Built With

- [Go](https://golang.org/) - Programming language
- [Gin](https://gin-gonic.com/) - Web framework
- [GORM](https://gorm.io/) - ORM library
- [PostgreSQL](https://www.postgresql.org/) - Database
- [JWT](https://jwt.io/) - Authentication
- [Redis](https://redis.io/) - Caching and rate limiting
- [Docker](https://www.docker.com/) - Containerization
