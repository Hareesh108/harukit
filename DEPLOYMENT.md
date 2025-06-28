# Deployment Guide

This guide covers how to deploy Harukit packages to npm and the documentation site to Vercel.

## 📦 Publishing to npm

### Prerequisites

1. **npm Account**: Create an account on [npmjs.com](https://www.npmjs.com/)
2. **Authentication**: Login to npm in your terminal:

   ```bash
   npm login
   ```

3. **Repository Setup**: Ensure your repository is properly configured with the correct package names

### Publishing Process

1. **Create a Changeset**

   ```bash
   pnpm changeset
   ```

   This will prompt you to:
   - Select which packages have changed
   - Choose the type of change (patch, minor, major)
   - Write a description of the changes

2. **Version Packages**

   ```bash
   pnpm version-packages
   ```

   This will:
   - Update package versions based on changesets
   - Update changelogs
   - Commit the changes

3. **Publish to npm**

   ```bash
   pnpm release
   ```

   This will:
   - Build all packages
   - Publish to npm
   - Create a GitHub release

### Package Configuration

Ensure each package has the correct configuration in `package.json`:

```json
{
  "name": "@harukit/ui",
  "version": "0.0.2",
  "publishConfig": {
    "access": "public"
  },
  "files": [
    "dist",
    "styles"
  ]
}
```

### Publishing Individual Packages

To publish a specific package:

```bash
# Build the package
pnpm --filter @harukit/ui build

# Publish to npm
pnpm --filter @harukit/ui publish
```

## 🌐 Deploying Documentation to Vercel

### Prerequisites

1. **Vercel Account**: Create an account on [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install the Vercel CLI:

   ```bash
   npm i -g vercel
   ```

3. **Repository Connection**: Connect your GitHub repository to Vercel

### Automatic Deployment

The documentation site is automatically deployed on every push to the main branch via GitHub Actions.

### Manual Deployment

1. **Build the Documentation Site**

   ```bash
   pnpm build:docs
   ```

2. **Deploy to Vercel**

   ```bash
   pnpm deploy:docs
   ```

### Vercel Configuration

The documentation site uses the following Vercel configuration (`apps/www/vercel.json`):

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev"
}
```

### Environment Variables

Set up the following environment variables in Vercel:

- `NEXT_PUBLIC_SITE_URL`: Your site URL (e.g., `https://harukit.dev`)
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)
- `NEXT_PUBLIC_TWITTER_HANDLE`: Your Twitter handle (optional)

## 🔧 CI/CD Setup

### GitHub Actions

The repository includes GitHub Actions workflows for automated CI/CD:

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Runs on push to main and pull requests
   - Tests on Node.js 18 and 20
   - Type checks, lints, and builds all packages
   - Automatically deploys documentation to Vercel

### Required Secrets

Set up the following secrets in your GitHub repository:

- `NPM_TOKEN`: Your npm authentication token
- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

### Setting up Secrets

1. **NPM Token**:
   - Go to npmjs.com → Account → Access Tokens
   - Create a new token with "Automation" type
   - Add to GitHub repository secrets

2. **Vercel Tokens**:
   - Run `vercel login` in your terminal
   - Run `vercel link` in the `apps/www` directory
   - The tokens will be automatically configured

## 📊 Monitoring and Analytics

### Vercel Analytics

Enable Vercel Analytics for the documentation site:

1. Go to your Vercel dashboard
2. Select the documentation project
3. Go to Analytics tab
4. Enable Web Analytics

### Google Analytics

To add Google Analytics:

1. Create a Google Analytics property
2. Add the tracking ID to environment variables
3. Update the documentation site to include the tracking code

## 🔄 Rollback Strategy

### npm Packages

To rollback a published package:

1. **Unpublish the version** (within 72 hours):

   ```bash
   npm unpublish @harukit/ui@0.0.2
   ```

2. **Publish a new version**:

   ```bash
   pnpm changeset
   pnpm version-packages
   pnpm release
   ```

### Documentation Site

To rollback the documentation site:

1. Go to your Vercel dashboard
2. Select the documentation project
3. Go to Deployments tab
4. Find the previous deployment
5. Click "Promote to Production"

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are installed
   - Verify TypeScript configuration

2. **Publishing Failures**:
   - Check npm authentication
   - Verify package names are unique
   - Ensure package.json is properly configured

3. **Deployment Failures**:
   - Check Vercel configuration
   - Verify environment variables
   - Check build logs in Vercel dashboard

### Getting Help

- Check the [GitHub Issues](https://github.com/your-username/harukit/issues)
- Review [Vercel Documentation](https://vercel.com/docs)
- Check [npm Documentation](https://docs.npmjs.com/)

## 📈 Performance Optimization

### Bundle Size

Monitor bundle sizes:

```bash
# Analyze bundle size
pnpm --filter @harukit/ui build
npx bundle-analyzer dist/stats.json
```

### Documentation Site

Optimize the documentation site:

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Implement dynamic imports
3. **Caching**: Configure proper cache headers
4. **CDN**: Use Vercel's global CDN

## 🔐 Security

### npm Security

1. **Audit Dependencies**:

   ```bash
   pnpm audit
   ```

2. **Update Dependencies**:

   ```bash
   pnpm update
   ```

### Vercel Security

1. **Environment Variables**: Never commit sensitive data
2. **Headers**: Configure security headers in `vercel.json`
3. **HTTPS**: Vercel automatically provides HTTPS

---

For more information, see the [main README](./README.md) or contact the development team.
