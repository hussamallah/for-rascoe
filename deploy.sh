#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Build the project
echo "🏗️ Building the project..."
npm run build

# Verify the build output
if [ -d "out" ]; then
    echo "✅ Build successful! Static files generated in 'out' directory"
    echo "📁 Contents of out directory:"
    ls -la out/
else
    echo "❌ Build failed! 'out' directory not found"
    exit 1
fi

echo "🎉 Deployment script completed successfully!" 