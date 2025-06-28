# Quick Start Guide

Get up and running with Harukit in minutes!

## 🚀 Quick Setup

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/your-username/harukit.git
cd harukit

# Run the setup script
./scripts/setup.sh
```

### 2. Start Development

```bash
# Start all development servers
pnpm dev

# Or start individual services
pnpm --filter @harukit/www dev    # Documentation site
pnpm --filter @harukit/demo dev   # Demo app
pnpm --filter @harukit/ui dev     # UI library (watch mode)
```

### 3. View Your Work

- **Documentation**: <http://localhost:3000>
- **Demo App**: <http://localhost:3001>
- **CLI Tool**: `pnpm --filter @harukit/cli --help`

## 📦 Using Harukit in Your Project

### Installation

```bash
npm install harukit
```

### Basic Usage

```tsx
import { Button, Card, Input } from 'harukit';

function App() {
  return (
    <div className="p-4">
      <Card>
        <Card.Header>
          <Card.Title>Welcome to Harukit</Card.Title>
        </Card.Header>
        <Card.Content>
          <Input 
            label="Email" 
            placeholder="Enter your email"
          />
        </Card.Content>
        <Card.Footer>
          <Button>Submit</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
```

### Tailwind CSS Setup

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/harukit/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more colors
      }
    }
  }
}
```

## 🛠️ Development Workflow

### Adding a New Component

1. **Create the component** in `packages/ui/src/components/`
2. **Add to registry** in `packages/registry/src/components.ts`
3. **Export from UI package** in `packages/ui/src/index.ts`
4. **Add documentation** in `apps/www/docs/components/`
5. **Test in demo app** in `apps/demo/`

### Example Component Structure

```
packages/ui/src/components/
├── button/
│   ├── button.tsx
│   ├── button.test.tsx
│   └── index.ts
└── card/
    ├── card.tsx
    ├── card.test.tsx
    └── index.ts
```

### Testing Your Changes

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Test (when implemented)
pnpm test
```

## 📚 Documentation Development

### Adding Documentation

1. **Create MDX file** in `apps/www/docs/`
2. **Add frontmatter**:

   ```mdx
   ---
   title: "Button Component"
   description: "A versatile button component with multiple variants"
   ---
   ```

3. **Add to navigation** in `apps/www/components/navigation.tsx`

### Running Documentation Locally

```bash
cd apps/www
pnpm dev
```

Visit <http://localhost:3000> to see your changes.

## 🚀 Deployment

### Publishing to npm

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm version-packages

# Publish
pnpm release
```

### Deploying Documentation

```bash
# Build docs
pnpm build:docs

# Deploy to Vercel
pnpm deploy:docs
```

## 🔧 CLI Tool Usage

### Initialize in a Project

```bash
# Install CLI globally
npm install -g @harukit/cli

# Initialize in your project
harukit init
```

### Add Components

```bash
# Add specific components
harukit add button card input

# Add all components
harukit add --all
```

### Manage Components

```bash
# List available components
harukit list

# Remove components
harukit remove button

# Update components
harukit update
```

## 🎨 Theming

### Custom Theme

```tsx
import { themeManager } from 'harukit';

// Update theme
themeManager.updateConfig({
  mode: 'dark',
  primaryColor: '600',
  borderRadius: 'lg',
  fontFamily: 'mono'
});
```

### CSS Custom Properties

```css
:root {
  --harukit-primary: #3b82f6;
  --harukit-background: #ffffff;
  --harukit-foreground: #171717;
  --harukit-radius: 0.375rem;
}

[data-theme="dark"] {
  --harukit-background: #0a0a0a;
  --harukit-foreground: #fafafa;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:

   ```bash
   # Clean and rebuild
   pnpm clean
   pnpm install
   pnpm build
   ```

2. **TypeScript Errors**:

   ```bash
   # Check types
   pnpm type-check
   ```

3. **Dependency Issues**:

   ```bash
   # Reinstall dependencies
   rm -rf node_modules
   pnpm install
   ```

### Getting Help

- 📖 [Full Documentation](./README.md)
- 🐛 [GitHub Issues](https://github.com/your-username/harukit/issues)
- 💬 [GitHub Discussions](https://github.com/your-username/harukit/discussions)

## 🎯 Next Steps

1. **Explore Components**: Check out the [component library](./packages/ui/src/components/)
2. **Read Documentation**: Visit the [documentation site](./apps/www/)
3. **Try the Demo**: Run the [demo app](./apps/demo/)
4. **Contribute**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

Happy coding! 🚀
