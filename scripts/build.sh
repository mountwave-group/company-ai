#!/usr/bin/env bash
# Build and test script for CI/CD pipelines

set -euo pipefail

echo "🔨 Building Company AI..."
npm install
npm run type-check
npm run build

echo "🧪 Running Tests..."
npm test -- --coverage

echo "🔍 Linting..."
npm run lint

echo "✅ All checks passed!"
