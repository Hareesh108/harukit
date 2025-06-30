# Harukit Documentation

This directory contains the documentation website for Harukit CLI, built with Nextra.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## Project Structure

```
docs/
├── pages/              # Documentation pages (MDX)
│   ├── index.mdx      # Landing page
│   ├── installation.mdx
│   ├── components.mdx
│   ├── cli-commands.mdx
│   ├── configuration.mdx
│   ├── examples.mdx
│   ├── troubleshooting.mdx
│   └── _meta.json     # Navigation structure
├── theme.config.jsx   # Nextra theme configuration
├── next.config.js     # Next.js configuration
└── package.json       # Dependencies
```

## Technology Stack

- **Next.js** - React framework
- **Nextra** - Documentation framework
- **MDX** - Markdown with JSX support
- **TypeScript** - Type safety

## Customization

### Theme Configuration

Edit `theme.config.jsx` to customize the appearance and branding.

### Navigation

Update `pages/_meta.json` to modify the navigation structure.

### Styling

The documentation uses the default Nextra theme with custom branding. You can customize colors and styling in the theme configuration.

## Deployment

The documentation can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## Contributing

1. Edit the MDX files in the `pages/` directory
2. Test locally with `npm run dev`
3. Build and test with `npm run build`
4. Submit a pull request

## License

MIT
