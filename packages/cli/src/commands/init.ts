import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { ConfigManager } from '../config/manager';
import { ProjectDetector } from '../utils/project-detector';
import { PackageManager } from '../utils/package-manager';

interface InitOptions {
  yes?: boolean;
  typescript?: boolean;
  tailwind?: boolean;
}

export async function init(options: InitOptions = {}): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.blue('🚀 Initializing Harukit...\n'));

  try {
    // Detect project type
    const detector = new ProjectDetector(cwd);
    const projectInfo = await detector.detect();

    if (!projectInfo.isValid) {
      console.error(chalk.red('❌ Not a valid project directory'));
      process.exit(1);
    }

    console.log(chalk.green(`✅ Detected ${projectInfo.framework} project`));

    // Interactive prompts
    let config: any = {};

    if (!options.yes) {
      const response = await prompts([
        {
          type: 'select',
          name: 'style',
          message: 'Which style would you like to use?',
          choices: [
            { title: 'Default', value: 'default' },
            { title: 'New York', value: 'new-york' },
          ],
          initial: 0,
        },
        {
          type: 'confirm',
          name: 'typescript',
          message: 'Would you like to use TypeScript?',
          initial: projectInfo.hasTypeScript,
        },
        {
          type: 'confirm',
          name: 'tailwind',
          message: 'Would you like to configure Tailwind CSS?',
          initial: projectInfo.hasTailwind,
        },
        {
          type: 'text',
          name: 'componentsPath',
          message: 'Where would you like to install components?',
          initial: '@/components',
        },
        {
          type: 'text',
          name: 'utilsPath',
          message: 'Where would you like to install utilities?',
          initial: '@/lib/utils',
        },
      ]);

      config = response;
    } else {
      config = {
        style: 'default',
        typescript: options.typescript ?? projectInfo.hasTypeScript,
        tailwind: options.tailwind ?? projectInfo.hasTailwind,
        componentsPath: '@/components',
        utilsPath: '@/lib/utils',
      };
    }

    // Initialize config manager
    const configManager = new ConfigManager(cwd);
    await configManager.update({
      style: config.style,
      typescript: config.typescript,
      aliases: {
        components: config.componentsPath,
        utils: config.utilsPath,
      },
    });

    // Install dependencies
    const packageManager = new PackageManager(cwd);
    
    const dependencies = [
      'clsx',
      'tailwind-merge',
    ];

    const devDependencies = [
      'tailwindcss',
      'autoprefixer',
      'postcss',
    ];

    if (config.typescript) {
      devDependencies.push('@types/node');
    }

    console.log(chalk.blue('\n📦 Installing dependencies...'));

    for (const dep of dependencies) {
      await configManager.addDependency(dep);
    }

    for (const dep of devDependencies) {
      await configManager.addDependency(dep, true);
    }

    // Install packages
    await packageManager.install(dependencies, false);
    await packageManager.install(devDependencies, true);

    // Setup Tailwind if requested
    if (config.tailwind) {
      await setupTailwind(cwd, configManager);
    }

    // Create utils file
    await createUtilsFile(cwd, configManager);

    console.log(chalk.green('\n✅ Harukit initialized successfully!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.gray('  • Run "harukit add <component>" to add components'));
    console.log(chalk.gray('  • Run "harukit list" to see available components'));
    console.log(chalk.gray('  • Check harukit.json for configuration options'));

  } catch (error) {
    console.error(chalk.red('❌ Failed to initialize Harukit:'), error);
    process.exit(1);
  }
}

async function setupTailwind(cwd: string, configManager: ConfigManager): Promise<void> {
  console.log(chalk.blue('🎨 Setting up Tailwind CSS...'));

  const config = configManager.get();
  const tailwindConfigPath = path.join(cwd, config.tailwind.config);
  const cssPath = path.join(cwd, config.tailwind.css);

  // Create Tailwind config
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "${config.tailwind.prefix}",
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
}`;

  await fs.writeFile(tailwindConfigPath, tailwindConfig);

  // Create CSS file
  const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

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
}`;

  await fs.ensureDir(path.dirname(cssPath));
  await fs.writeFile(cssPath, cssContent);

  // Add tailwindcss-animate dependency
  await configManager.addDependency('tailwindcss-animate', true);
}

async function createUtilsFile(cwd: string, configManager: ConfigManager): Promise<void> {
  const config = configManager.get();
  const utilsPath = path.resolve(cwd, config.aliases.utils.replace('@', 'src'));
  const utilsDir = path.dirname(utilsPath);
  const utilsFile = path.join(utilsDir, 'utils.ts');

  await fs.ensureDir(utilsDir);

  const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  await fs.writeFile(utilsFile, utilsContent);
} 