.PHONY: help run build test clean docker-up docker-down docker-build migrate dev prod

# Colors for output
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

# Default target
help: ## Show this help message
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  ${YELLOW}%-15s${GREEN}%s${RESET}\n", $$1, $$2}' $(MAKEFILE_LIST)

run: ## Run the application locally
	go run main.go

build: ## Build the application
	go build -o bin/locsafe-api main.go

test: ## Run tests
	go test -v ./...

test-coverage: ## Run tests with coverage
	go test -v -cover ./...

clean: ## Clean build artifacts
	rm -rf bin/
	go clean

deps: ## Download dependencies
	go mod download
	go mod tidy

docker-up: ## Start Docker containers
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-build: ## Build Docker image
	docker build -t locsafe-api:latest .

docker-logs: ## View Docker logs
	docker-compose logs -f

migrate: ## Run database migrations
	go run main.go migrate

seed: ## Seed database with sample data
	go run main.go seed

dev: ## Start development environment
	@echo "${GREEN}Starting development environment...${RESET}"
	docker-compose up -d postgres redis
	@sleep 3
	go run main.go

prod: docker-build ## Build and run production environment
	@echo "${GREEN}Starting production environment...${RESET}"
	docker-compose -f docker-compose.yml up -d

fmt: ## Format code
	go fmt ./...
	gofmt -s -w .

lint: ## Run linter
	golangci-lint run

vet: ## Run go vet
	go vet ./...

security: ## Run security checks
	gosec ./...

swagger: ## Generate Swagger documentation
	swag init -g main.go

db-reset: ## Reset database
	docker-compose down postgres
	docker volume rm locsafe_postgres_data
	docker-compose up -d postgres
	@sleep 5
	go run main.go migrate

install-tools: ## Install development tools
	go install github.com/swaggo/swag/cmd/swag@latest
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install github.com/securego/gosec/v2/cmd/gosec@latest

.DEFAULT_GOAL := help