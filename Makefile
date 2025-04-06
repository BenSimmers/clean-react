
help:
	@echo "Makefile for managing the project"
	@echo ""
	@echo "make <target>"
	@echo ""
	@echo "Usage:"
	@echo "  make install   - Install dependencies"
	@echo "  make dev       - Start the development server"
	@echo "  make build     - Build the project"
	@echo "  make lint      - Lint the codebase"
	@echo "  make preview   - Preview the production build"
	@echo "  make clean     - Clean the build artifacts"
	@echo "  make check     - Run all checks (lint + build)"
	@echo "  make default   - Start the development server (default target)"

# Ensure dependencies are installed
install:
	npm install

# Start the development server
dev: install
	npm run dev

# Build the project
build: install
	npm run build

# Lint the codebase
lint: install
	npm run lint

# Preview the production build
preview: build
	npm run preview

# Clean the build artifacts
clean:
	rm -rf dist

# Run all checks (lint + build)
check: lint build

# Run prettier --write
prettier:
	npx prettier --write .

# Default target
default: dev