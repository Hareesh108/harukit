# Harukit

A modern, accessible, and customizable UI component library built with React, TypeScript, and Tailwind CSS. Designed to be a better alternative to shadcn/ui with enhanced features and flexibility.

## ✨ Features

- 🎨 **Advanced Theming System** - Dynamic theme switching with CSS custom properties
- 🧩 **Comprehensive Components** - 20+ production-ready components
- 🎯 **TypeScript First** - Full type safety with excellent DX
- 🎨 **Multiple Variants** - Rich component variants and customization options
- 🌙 **Dark Mode Support** - Built-in dark mode with system preference detection
- 📱 **Responsive Design** - Mobile-first responsive components
- ♿ **Accessible** - WCAG compliant with ARIA support
- 🚀 **Tree Shakeable** - Optimized bundle sizes
- 🔧 **Customizable** - Easy to customize and extend
- 📦 **NPM Package** - Install as a traditional library (unlike shadcn/ui)

## 🚀 Quick Start

### Installation

```bash
npm install harukit
```

### Basic Usage

```tsx
import { Button, Card, Input, Tooltip } from 'harukit';

function App() {
  return (
    <div className="p-4">
      <Card>
        <Card.Header>
          <Card.Title>Welcome to Harukit</Card.Title>
          <Card.Description>
            A modern UI component library
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Input 
            label="Email" 
            placeholder="Enter your email"
            leftIcon={<MailIcon />}
          />
        </Card.Content>
        <Card.Footer>
          <Tooltip content="Click to submit">
            <Button>Submit</Button>
          </Tooltip>
        </Card.Footer>
      </Card>
    </div>
  );
}
```

## 🎨 Theming

Harukit comes with a powerful theming system that's better than shadcn/ui:

```tsx
import { themeManager } from 'harukit';

// Switch themes dynamically
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

## 📦 Components

### Core Components

- **Button** - Multiple variants, sizes, loading states, icons
- **Input** - Validation states, icons, helper text
- **Card** - Flexible layout with header, content, footer
- **Label** - Accessible form labels
- **Tooltip** - Advanced positioning and animations

### Component Features

Each component includes:

- Multiple variants (default, destructive, outline, etc.)
- Different sizes (sm, md, lg, xl)
- Loading states where applicable
- Icon support
- Full TypeScript types
- Accessibility features

## 🛠️ CLI Tool

Harukit includes a powerful CLI tool for component management:

```bash
# Install CLI globally
npm install -g @harukit/cli

# Initialize in your project
harukit init

# Add components
harukit add button card input

# List available components
harukit list
```

## 🎯 Why Harukit over shadcn/ui?

| Feature | shadcn/ui | Harukit |
|---------|-----------|---------|
| Installation | Copy-paste components | Traditional NPM package |
| Theming | Limited customization | Advanced theme system |
| Bundle Size | No tree-shaking | Optimized tree-shaking |
| TypeScript | Good | Excellent with full types |
| Dark Mode | Basic | Advanced with system detection |
| CLI Tool | Basic | Comprehensive with registry |
| Customization | Manual | Built-in theme manager |
| Performance | Good | Optimized with caching |

## 🔧 Configuration

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
        border: "hsl(var(--harukit-border))",
        input: "hsl(var(--harukit-input))",
        ring: "hsl(var(--harukit-ring))",
        background: "hsl(var(--harukit-background))",
        foreground: "hsl(var(--harukit-foreground))",
        primary: {
          DEFAULT: "hsl(var(--harukit-primary))",
          foreground: "hsl(var(--harukit-primary-foreground))",
        },
        // ... more colors
      }
    }
  }
}
```

### CSS Setup

```css
/* globals.css */
@import 'harukit/styles/theme.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📚 Examples

### Button Variants

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button with Loading State

```tsx
<Button loading leftIcon={<PlusIcon />}>
  Add Item
</Button>
```

### Card with Different Variants

```tsx
<Card variant="default" padding="lg">
  <CardHeader>
    <CardTitle>Default Card</CardTitle>
  </CardHeader>
</Card>

<Card variant="elevated" hover interactive>
  <CardContent>Interactive Card</CardContent>
</Card>
```

### Input with Validation

```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  leftIcon={<MailIcon />}
  error={hasError}
  errorText="Please enter a valid email"
/>
```

### Tooltip with Custom Animation

```tsx
<Tooltip
  content="This is a tooltip"
  variant="colored"
  animation="scale"
  side="top"
>
  <Button>Hover me</Button>
</Tooltip>
```

## 🎨 Design Tokens

Harukit provides a comprehensive design system:

```tsx
import { colors, spacing, typography, shadows } from 'harukit';

// Use design tokens in your components
const styles = {
  backgroundColor: colors.primary[500],
  padding: spacing[4],
  fontSize: typography.fontSize.lg[0],
  boxShadow: shadows.md,
};
```

## 🔄 Migration from shadcn/ui

1. Install Harukit:

   ```bash
   npm install harukit
   ```

2. Replace imports:

   ```tsx
   // Before (shadcn/ui)
   import { Button } from "@/components/ui/button"
   
   // After (Harukit)
   import { Button } from "harukit"
   ```

3. Update theme configuration (optional)

## 📖 Documentation

- [Component API Reference](./docs/components.md)
- [Theming Guide](./docs/theming.md)
- [CLI Documentation](./docs/cli.md)
- [Migration Guide](./docs/migration.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for inspiration

```
