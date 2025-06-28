#!/bin/bash

echo "🧪 Testing Harukit Monorepo Setup..."

# Test 1: Check if all packages can be built
echo "📦 Testing package builds..."
pnpm build
if [ $? -eq 0 ]; then
    echo "✅ All packages built successfully"
else
    echo "❌ Package build failed"
    exit 1
fi

# Test 2: Check if CLI tool works
echo "🔧 Testing CLI tool..."
cd packages/cli
node dist/index.js --help > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ CLI tool is working"
else
    echo "❌ CLI tool failed"
    exit 1
fi
cd ../..

# Test 3: Check if documentation site can start
echo "📚 Testing documentation site..."
cd apps/www
if timeout 10s pnpm dev > /dev/null 2>&1; then
    echo "✅ Documentation site can start"
else
    echo "❌ Documentation site failed to start"
    exit 1
fi
cd ../..

# Test 4: Check if registry has components
echo "📋 Testing component registry..."
cd packages/registry
node -e "const { getAllComponents } = require('./dist/index.js'); console.log('Components:', getAllComponents().length);" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Component registry is working"
else
    echo "❌ Component registry failed"
    exit 1
fi
cd ../..

# Test 5: Check workspace dependencies
echo "🔗 Testing workspace dependencies..."
pnpm list --depth=0 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Workspace dependencies are correct"
else
    echo "❌ Workspace dependencies failed"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Harukit monorepo is ready to use."
echo ""
echo "Next steps:"
echo "1. Start development: pnpm dev"
echo "2. View documentation: cd apps/www && pnpm dev"
echo "3. Test CLI: cd packages/cli && node dist/index.js --help"
echo "4. Add components: cd packages/cli && node dist/index.js add button" 