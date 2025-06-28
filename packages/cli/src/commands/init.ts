import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { z } from 'zod';
import chalk from 'chalk';
import ora from 'ora';
import { ProjectDetector } from '../utils/project-detector';
import { ConfigManager } from '../config/manager';

const initSchema = z.object({
  yes: z.boolean().optional(),
  typescript: z.boolean().optional(),
  tailwind: z.boolean().optional(),
  eslint: z.boolean().optional(),
  srcDir: z.boolean().optional(),
  importAlias: z.string().optional(),
});

export async function init(options: any) {
  const spinner = ora('Initializing Harukit...').start();

  try {
    // Detect project type
    const detector = new ProjectDetector(process.cwd());
    const projectInfo = await detector.detect();
    
    if (!projectInfo.isValid) {
      spinner.fail('Could not detect project type. Please run this command in a supported project.');
      process.exit(1);
    }

    // Parse options
    const opts = initSchema.parse(options);

    // Get user preferences
    let preferences = {
      typescript: true,
      tailwind: true,
      eslint: true,
      srcDir: false,
      importAlias: '@/components',
    };

    if (!opts.yes) {
      const answers = await prompts([
        {
          type: 'confirm',
          name: 'typescript',
          message: 'Would you like to use TypeScript?',
          initial: true,
        },
        {
          type: 'confirm',
          name: 'tailwind',
          message: 'Would you like to use Tailwind CSS?',
          initial: true,
        },
        {
          type: 'confirm',
          name: 'eslint',
          message: 'Would you like to use ESLint?',
          initial: true,
        },
        {
          type: 'confirm',
          name: 'srcDir',
          message: 'Would you like to use a src directory?',
          initial: false,
        },
        {
          type: 'text',
          name: 'importAlias',
          message: 'What import alias would you like to use?',
          initial: '@/components',
        },
      ]);

      preferences = { ...preferences, ...answers };
    } else {
      preferences = { ...preferences, ...opts };
    }

    // Create configuration
    const config = {
      $schema: 'https://harukit.com/schema.json',
      style: 'default',
      rsc: projectInfo.hasNextJs,
      tsx: preferences.typescript,
      tailwind: {
        config: 'tailwind.config.js',
        css: preferences.srcDir ? 'src/app/globals.css' : 'app/globals.css',
        baseColor: 'slate',
        cssVariables: true,
        prefix: '',
      },
      aliases: {
        components: preferences.importAlias,
        utils: '@/lib/utils',
      },
    };

    // Write configuration file
    const configPath = path.join(process.cwd(), 'harukit.json');
    await fs.writeJson(configPath, config, { spaces: 2 });

    // Create directories
    const componentsDir = path.join(process.cwd(), preferences.srcDir ? 'src' : '', 'components');
    const libDir = path.join(process.cwd(), preferences.srcDir ? 'src' : '', 'lib');
    
    await fs.ensureDir(componentsDir);
    await fs.ensureDir(libDir);

    // Copy utils file
    const utilsTemplate = path.join(__dirname, '../../templates/lib/utils.ts');
    const utilsDest = path.join(libDir, 'utils.ts');
    await fs.copy(utilsTemplate, utilsDest);

    // Copy global CSS if Tailwind is enabled
    if (preferences.tailwind) {
      const cssTemplate = path.join(__dirname, '../../templates/globals.css');
      const cssDest = path.join(process.cwd(), preferences.srcDir ? 'src' : '', 'app/globals.css');
      await fs.ensureDir(path.dirname(cssDest));
      await fs.copy(cssTemplate, cssDest);
    }

    // Install dependencies
    spinner.text = 'Installing dependencies...';
    
    const dependencies = [
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      '@radix-ui/react-slot',
      '@radix-ui/react-accordion',
      '@radix-ui/react-label',
      '@radix-ui/react-tooltip',
      'lucide-react',
    ];

    if (preferences.typescript) {
      dependencies.push('@types/node');
    }

    const installCommand = projectInfo.packageManager === 'npm' 
      ? `npm install ${dependencies.join(' ')}`
      : projectInfo.packageManager === 'yarn'
      ? `yarn add ${dependencies.join(' ')}`
      : `pnpm add ${dependencies.join(' ')}`

    // Note: We'll let the user run this manually for now
    console.log(chalk.blue('\nPlease run the following command to install dependencies:'));
    console.log(chalk.green(installCommand));

    spinner.succeed('Harukit initialized successfully!');
    
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.green('1. Install dependencies (see command above)'));
    console.log(chalk.green('2. Add components with: npx harukit@latest add <component>'));
    console.log(chalk.green('3. Start building your UI!'));

  } catch (error) {
    spinner.fail('Failed to initialize Harukit');
    console.error(error);
    process.exit(1);
  }
} 