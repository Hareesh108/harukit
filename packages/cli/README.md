# Harukit CLI

A powerful CLI tool for managing Harukit UI components in your projects. Similar to shadcn/ui but with enhanced features and better customization.

## Features

- 🚀 **Easy Initialization** - Set up Harukit in any React project
- 📦 **Component Management** - Add, remove, and update components
- 🎨 **Theme System** - Built-in theming with CSS custom properties
- 🔧 **Project Detection** - Auto-detects React, Next.js, TypeScript, and Tailwind
- 📋 **Interactive Prompts** - User-friendly command-line interface
- 🔄 **Registry System** - Fetch components from remote registry
- 💾 **Caching** - Smart caching for better performance
- 🎯 **TypeScript Support** - Full TypeScript support with type safety

## Installation

```bash
npm install -g @harukit/cli
```

Or using yarn:

```bash
yarn global add @harukit/cli
```

Or using pnpm:

```bash
pnpm add -g @harukit/cli
```

## Quick Start

### 1. Initialize Harukit in your project

```bash
harukit init
```

This will:

- Detect your project type (React, Next.js, etc.)
- Set up Tailwind CSS configuration
- Create utility functions
- Generate a `harukit.json` configuration file

### 2. Add components

```bash
# Add a single component
harukit add button

# Add multiple components
harukit add button card input

# Interactive selection
harukit add
```

### 3. List available components

```bash
# List all available components
harukit list

# List only installed components
harukit list --installed
```

## Commands

### `harukit init`

Initialize Harukit in your project.

```bash
harukit init [options]
```

**Options:**

- `-y, --yes` - Skip confirmation prompts
- `--typescript` - Use TypeScript
- `--tailwind` - Configure Tailwind CSS

### `harukit add`

Add components to your project.

```bash
harukit add [components...] [options]
```

**Options:**

- `-o, --overwrite` - Overwrite existing files
- `--path <path>` - Custom path for components

**Examples:**

```bash
harukit add button
harukit add button card input --overwrite
harukit add --path src/ui
```

### `harukit remove`

Remove components from your project.

```bash
harukit remove [components...]
```

**Examples:**

```bash
harukit remove button
harukit remove button card
```

### `harukit list`

List available or installed components.

```bash
harukit list [options]
```

**Options:**

- `--installed` - Show only installed components

### `harukit update`

Update components to their latest versions.

```bash
harukit update [components...]
```

**Examples:**

```bash
harukit update button
harukit update  # Update all installed components
```

### `harukit info`

Show information about components or project.

```bash
harukit info [component]
```

**Examples:**

```bash
harukit info          # Show project information
harukit info button   # Show button component information
```

## Configuration

The CLI creates a `harukit.json` file in your project root:

```json
{
  "style": "default",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registry": {
    "url": "https://registry.harukit.dev",
    "cache": true,
    "ttl": 3600
  },
  "components": ["button", "card"],
  "dependencies": ["clsx", "tailwind-merge"],
  "devDependencies": ["tailwindcss", "autoprefixer"]
}
```

## Project Structure

After initialization, your project will have:

```
your-project/
├── src/
│   ├── components/     # Your components
│   ├── lib/
│   │   └── utils.ts    # Utility functions
│   └── index.css       # Tailwind CSS
├── tailwind.config.js  # Tailwind configuration
├── harukit.json        # Harukit configuration
└── package.json
```

## Registry

The CLI fetches components from a remote registry. You can configure the registry URL in your `harukit.json`:

```json
{
  "registry": {
    "url": "https://your-registry.com",
    "cache": true,
    "ttl": 3600
  }
}
```

## Caching

The CLI caches registry responses for better performance. Cache is stored in `.harukit/cache/` and automatically expires based on the TTL setting.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
