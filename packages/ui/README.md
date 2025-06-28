# Harukit

A modern, accessible, and customizable UI component library built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design** - Clean, accessible components with a modern aesthetic
- 🎯 **TypeScript** - Built with TypeScript for better developer experience
- ♿ **Accessible** - All components follow WCAG guidelines
- 🎨 **Customizable** - Easy to customize with CSS custom properties
- 📦 **Tree-shakeable** - Only import what you need
- 🚀 **Fast** - Optimized for performance
- 🎭 **Themable** - Dark mode support out of the box

## Installation

```bash
npm install harukit
# or
yarn add harukit
# or
pnpm add harukit
```

## Quick Start

### 1. Install Dependencies

```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
```

### 2. Configure Tailwind CSS

Add the following to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/harukit/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 3. Add CSS Variables

Add the following CSS variables to your global CSS file:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 4. Import and Use Components

```tsx
import { Button, Card, Input, Tooltip } from "harukit";

export default function App() {
  return (
    <div className="p-8">
      <Button>Click me</Button>
      <Input placeholder="Enter text..." />
      <Card>
        <div className="p-6">
          <h3>Card Title</h3>
          <p>Card content goes here.</p>
        </div>
      </Card>
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  );
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from "harukit";

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// With icons
<Button>
  <Icon className="mr-2 h-4 w-4" />
  Button with icon
</Button>
```

### Input

A flexible input component with various sizes and states.

```tsx
import { Input } from "harukit";

// Basic usage
<Input placeholder="Enter your email" />

// Sizes
<Input inputSize="sm" placeholder="Small input" />
<Input inputSize="default" placeholder="Default input" />
<Input inputSize="lg" placeholder="Large input" />

// With label
<div className="space-y-2">
  <label htmlFor="email">Email</label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

### Card

A container component for displaying content in a structured layout.

```tsx
import { Card } from "harukit";

// Basic usage
<Card>
  <div className="p-6">
    <h3 className="text-lg font-semibold">Card Title</h3>
    <p className="text-muted-foreground">Card content goes here.</p>
  </div>
</Card>

// Variants
<Card variant="default">Default card</Card>
<Card variant="outlined">Outlined card</Card>
<Card variant="elevated">Elevated card</Card>
```

### Tooltip

A tooltip component that displays additional information on hover.

```tsx
import { Tooltip } from "harukit";

// Basic usage
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Variants
<Tooltip content="Default tooltip">
  <Button>Default</Button>
</Tooltip>

<Tooltip content="Colored tooltip" variant="colored">
  <Button>Colored</Button>
</Tooltip>
```

## Theming

Harukit uses CSS custom properties for theming. You can customize the appearance by modifying the CSS variables in your global CSS file.

### Custom Colors

```css
:root {
  --primary: 220 14% 96%;
  --primary-foreground: 220.9 39.3% 11%;
  --secondary: 220 14% 96%;
  --secondary-foreground: 220.9 39.3% 11%;
  /* ... other colors */
}
```

### Dark Mode

Harukit supports dark mode out of the box. The CSS variables automatically switch when the `.dark` class is applied to the `html` element.

## Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://harukit.dev)
- 💬 [Discussions](https://github.com/your-username/harukit/discussions)
- 🐛 [Issues](https://github.com/your-username/harukit/issues)
- ⭐ [Star us on GitHub](https://github.com/your-username/harukit)

---

Built with ❤️ by the Harukit team
