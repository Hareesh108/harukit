# Harukit Usage Guide

Harukit is a modern UI component library that works like shadcn/ui - you initialize it in your project and add components as needed.

## Quick Start

### 1. Initialize Harukit in your project

```bash
npx harukit@latest init
```

This will:

- Create a `harukit.json` configuration file
- Set up the necessary directories (`components/`, `lib/`)
- Create the `utils.ts` file with the `cn` function
- Add global CSS with Tailwind variables
- Show you the dependencies to install

### 2. Install dependencies

Run the command shown after initialization:

```bash
npm install clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-accordion @radix-ui/react-label @radix-ui/react-tooltip lucide-react
```

### 3. Add components

```bash
# Add a single component
npx harukit@latest add button

# Add multiple components
npx harukit@latest add button card input

# Add all available components
npx harukit@latest add accordion button card input label tooltip
```

## Available Components

- **accordion** - Collapsible content sections
- **button** - Versatile button with multiple variants
- **card** - Container for content with header, content, and footer
- **input** - Form input field
- **label** - Form label with accessibility features
- **tooltip** - Hover tooltips

## Project Structure

After initialization, your project will have this structure:

```
your-project/
├── harukit.json          # Configuration file
├── components/           # Your UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── lib/
│   └── utils.ts         # Utility functions
└── app/
    └── globals.css      # Global styles with CSS variables
```

## Configuration

The `harukit.json` file contains your project configuration:

```json
{
  "$schema": "https://harukit.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Using Components

### Button Component

```tsx
import { Button } from "@/components/button"

export default function MyPage() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button size="sm">Small</Button>
    </div>
  )
}
```

### Card Component

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"

export default function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  )
}
```

### Accordion Component

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion"

export default function MyAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

### Input Component

```tsx
import { Input } from "@/components/input"
import { Label } from "@/components/label"

export default function MyForm() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### Tooltip Component

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip"

export default function MyTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>
          <p>Tooltip content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

## CLI Commands

### `npx harukit@latest init`

Initialize Harukit in your project.

**Options:**

- `-y, --yes` - Skip prompts and use defaults
- `--typescript` - Use TypeScript
- `--tailwind` - Use Tailwind CSS
- `--eslint` - Use ESLint
- `--src-dir` - Use src directory
- `--import-alias <alias>` - Import alias for components

### `npx harukit@latest add <components...>`

Add components to your project.

**Options:**

- `-y, --yes` - Skip prompts and use defaults
- `--overwrite` - Overwrite existing components

**Examples:**

```bash
npx harukit@latest add button
npx harukit@latest add button card input
npx harukit@latest add --overwrite button
```

### `npx harukit@latest list`

List all available components.

### `npx harukit@latest remove <components...>`

Remove components from your project.

### `npx harukit@latest update`

Update Harukit to the latest version.

### `npx harukit@latest info`

Show information about your Harukit installation.

## Tailwind Configuration

Make sure your `tailwind.config.js` includes the necessary paths:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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

## TypeScript Support

All components are fully typed with TypeScript. Make sure your `tsconfig.json` includes the proper path mappings:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Next.js App Router

For Next.js App Router, make sure to import the global CSS in your `app/layout.tsx`:

```tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Customization

You can customize components by editing the files in your `components/` directory. The components are built on top of Radix UI primitives and styled with Tailwind CSS.

## Migration from shadcn/ui

If you're migrating from shadcn/ui, the process is straightforward:

1. Initialize Harukit: `npx harukit@latest init`
2. Add the same components: `npx harukit@latest add button card input`
3. Update your imports from `@/components/ui/button` to `@/components/button`

The component APIs are compatible, so your existing code should work with minimal changes.

## Support

- **Documentation**: [https://harukit.com](https://harukit.com)
- **GitHub**: [https://github.com/your-username/harukit](https://github.com/your-username/harukit)
- **Issues**: [https://github.com/your-username/harukit/issues](https://github.com/your-username/harukit/issues)
