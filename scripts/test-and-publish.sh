#!/bin/bash

echo "🚀 Harukit Test and Publish Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Test 1: Build all packages
echo "📦 Building all packages..."
pnpm build
if [ $? -eq 0 ]; then
    print_status "All packages built successfully"
else
    print_error "Package build failed"
    exit 1
fi

# Test 2: Check if harukit package exists and has content
echo "🔍 Checking harukit package..."
if [ -f "packages/ui/dist/index.js" ]; then
    print_status "harukit package built successfully"
else
    print_error "harukit package not found"
    exit 1
fi

# Test 3: Check if CLI works
echo "🔧 Testing CLI tool..."
cd packages/cli
node dist/index.js list > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status "CLI tool is working"
else
    print_error "CLI tool failed"
    exit 1
fi
cd ../..

# Test 4: Check if registry has components
echo "📋 Testing component registry..."
cd packages/registry
node -e "const { getAllComponents } = require('./dist/index.js'); console.log('Found', getAllComponents().length, 'components');" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status "Component registry is working"
else
    print_error "Component registry failed"
    exit 1
fi
cd ../..

# Test 5: Check workspace dependencies
echo "🔗 Testing workspace dependencies..."
pnpm list --depth=0 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status "Workspace dependencies are correct"
else
    print_error "Workspace dependencies failed"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Ready to publish."
echo ""

# Ask user if they want to publish
read -p "Do you want to publish the harukit package to npm? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Publishing to npm..."
    
    # Check if user is logged in to npm
    if npm whoami > /dev/null 2>&1; then
        print_status "Logged in to npm"
    else
        print_warning "Not logged in to npm. Please run 'npm login' first."
        exit 1
    fi
    
    # Create a changeset for versioning
    echo "📝 Creating changeset..."
    pnpm changeset add --empty
    
    # Version packages
    echo "🔢 Versioning packages..."
    pnpm version-packages
    
    # Build again to ensure everything is up to date
    echo "🔨 Building final version..."
    pnpm build
    
    # Publish the harukit package
    echo "📤 Publishing harukit package..."
    cd packages/ui
    if npm publish --access public; then
        print_status "Successfully published harukit to npm!"
        echo ""
        echo "🌐 Your package is now available at:"
        echo "   https://www.npmjs.com/package/harukit"
        echo ""
        echo "📦 Install it with:"
        echo "   npm install harukit"
        echo ""
    else
        print_error "Failed to publish package"
        exit 1
    fi
    cd ../..
else
    print_warning "Publishing skipped. You can publish later with:"
    echo "   cd packages/ui && npm publish --access public"
fi

echo ""
echo "🎯 Summary:"
echo "   ✅ All packages built successfully"
echo "   ✅ CLI tool is working"
echo "   ✅ Component registry is working"
echo "   ✅ Workspace dependencies are correct"
echo ""
echo "📚 Next steps:"
echo "   1. Start development: pnpm dev"
echo "   2. View documentation: cd apps/www && pnpm dev"
echo "   3. Test CLI: cd packages/cli && node dist/index.js --help"
echo "   4. Add components: cd packages/cli && node dist/index.js add button" 