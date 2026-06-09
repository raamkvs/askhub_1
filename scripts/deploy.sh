#!/bin/bash

# AskHub Production Deployment Script
# Run this script to deploy to production

echo "🚀 Starting AskHub Production Deployment..."

# Check if we're on the main branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Error: You must be on the main branch to deploy to production"
    echo "Current branch: $BRANCH"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: You have uncommitted changes. Please commit or stash them first."
    git status --short
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🧪 Running linting..."
npm run lint

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🎉 AskHub is now live in production!"
    echo ""
    echo "Next steps:"
    echo "1. Test the production deployment"
    echo "2. Verify form submissions are working"
    echo "3. Check analytics are tracking"
    echo "4. Monitor for any errors"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
