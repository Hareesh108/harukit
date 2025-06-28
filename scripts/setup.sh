#!/bin/bash

# Harukit Monorepo Setup Script
echo "🚀 Setting up Harukit Monorepo..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "npm install -g pnpm"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ pnpm version: $(pnpm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build all packages
echo "🔨 Building all packages..."
pnpm build

# Create initial changeset
echo "📝 Creating initial changeset..."
pnpm changeset init

echo "✅ Setup complete!"
echo ""
echo "🎉 Next steps:"
echo "1. Start development: pnpm dev"
echo "2. View documentation: pnpm --filter @harukit/www dev"
echo "3. Run CLI tool: pnpm --filter @harukit/cli --help"
echo ""
echo "📚 For more information, see README.md" 