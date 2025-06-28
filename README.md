# Harukit - Modern React UI Component Library

A modern, accessible, and customizable UI component library built with React, TypeScript, and Tailwind CSS. This monorepo contains the core library, CLI tool, documentation site, and demo applications.

## 🚀 Features

- **TypeScript First**: Built with TypeScript for better developer experience
- **Accessible**: All components follow WCAG guidelines
- **Customizable**: Easy to customize with CSS custom properties and Tailwind CSS
- **Modern**: Built with the latest React patterns and best practices
- **CLI Tool**: Powerful CLI for component management
- **Documentation**: Comprehensive documentation with examples
- **Monorepo**: Organized structure for scalable development

## 📦 Packages

This monorepo contains the following packages:

- **`@harukit/ui`** - Core UI component library
- **`@harukit/cli`** - CLI tool for component management
- **`@harukit/registry`** - Component registry and metadata
- **`@harukit/www`** - Documentation site
- **`@harukit/demo`** - Demo application
- **`@harukit/eslint-config`** - Shared ESLint configuration
- **`@harukit/prettier-config`** - Shared Prettier configuration

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/harukit.git
   cd harukit
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Build all packages**

   ```bash
   pnpm build
   ```

### Development Commands

```bash
# Start development servers
pnpm dev

# Build all packages
pnpm build

# Type check all packages
pnpm type-check

# Lint all packages
pnpm lint

# Format code
pnpm format

# Clean build artifacts
pnpm clean

# Run tests (when implemented)
pnpm test
```

### Working with Components

```bash
# Add a new component
pnpm --filter @harukit/cli add button

# Remove a component
pnpm --filter @harukit/cli remove button

# List all components
pnpm --filter @harukit/cli list

# Update components
pnpm --filter @harukit/cli update
```

## 📚 Documentation

The documentation site is built with Next.js and Contentlayer. To run it locally:

```bash
# Start the documentation site
pnpm --filter @harukit/www dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the documentation.

## 🚀 Deployment

### Publishing to npm

1. **Create a changeset**

   ```bash
   pnpm changeset
   ```

2. **Version packages**

   ```bash
   pnpm version-packages
   ```

3. **Publish to npm**

   ```bash
   pnpm release
   ```

### Deploying Documentation

The documentation site is automatically deployed to Vercel on every push to the main branch.

To deploy manually:

```bash
# Build the documentation site
pnpm build:docs

# Deploy to Vercel
pnpm deploy:docs
```

## 🏗️ Project Structure

```
harukit/
├── apps/
│   ├── www/                 # Documentation site
│   └── demo/                # Demo application
├── packages/
│   ├── ui/                  # Core UI library
│   ├── cli/                 # CLI tool
│   ├── registry/            # Component registry
│   └── config/              # Shared configurations
│       ├── eslint/          # ESLint configuration
│       └── prettier/        # Prettier configuration
├── .github/
│   └── workflows/           # CI/CD workflows
├── .changeset/              # Changesets configuration
├── turbo.json               # Turbo configuration
├── pnpm-workspace.yaml      # pnpm workspace configuration
└── package.json             # Root package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for all new components
- Ensure components are accessible
- Add tests for new functionality
- Update documentation for new features
- Use conventional commits for commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for inspiration
- [Vercel](https://vercel.com/) for hosting and deployment

## 📞 Support

- 📧 Email: <support@harukit.dev>
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/harukit/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/harukit/discussions)
- 📖 Documentation: [https://harukit.dev](https://harukit.dev)

---

Made with ❤️ by the Harukit Team

```
