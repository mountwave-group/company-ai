.PHONY: help install build dev test lint format type-check clean docs

help:
	@echo "Company AI - Available Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install         Install dependencies"
	@echo "  make setup          Setup development environment"
	@echo ""
	@echo "Development:"
	@echo "  make build          Build the project"
	@echo "  make dev            Start development watch mode"
	@echo "  make type-check     Run TypeScript type checking"
	@echo ""
	@echo "Testing & Quality:"
	@echo "  make test           Run tests"
	@echo "  make test-watch     Run tests in watch mode"
	@echo "  make test-cov       Run tests with coverage"
	@echo "  make lint           Run ESLint"
	@echo "  make lint-fix       Run ESLint with fixes"
	@echo "  make format         Format code with Prettier"
	@echo "  make format-check   Check code formatting"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean          Clean build artifacts"
	@echo "  make docs           Generate documentation"
	@echo "  make help           Show this help message"

install:
	npm install

setup: install
	@echo "Setting up development environment..."
	cp .env.example .env
	npm run build
	@echo "✓ Development environment ready!"

build:
	npm run build

dev:
	npm run dev

test:
	npm test

test-watch:
	npm test:watch

test-cov:
	npm test -- --coverage

lint:
	npm run lint

lint-fix:
	npm run lint:fix

format:
	npm run format

format-check:
	npm run format:check

type-check:
	npm run type-check

clean:
	rm -rf dist build coverage *.log logs
	find . -name "*.tsbuildinfo" -delete

all: lint format type-check test build
	@echo "✓ All checks passed!"

.DEFAULT_GOAL := help
