import chalk from 'chalk';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { ConfigManager } from '../config/manager';
import { RegistryClient } from '../registry/client';
import { PackageManager } from '../utils/package-manager';
import { ComponentInstaller } from '../utils/component-installer';

interface AddOptions {
  overwrite?: boolean;
  path?: string;
}

export async function add(components: string[], options: AddOptions = {}): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.blue('📦 Adding components...\n'));

  try {
    // Load configuration
    const configManager = new ConfigManager(cwd);
    const config = await configManager.load();

    // Initialize registry client
    const registryClient = new RegistryClient({
      url: config.registry.url,
      cache: config.registry.cache,
      ttl: config.registry.ttl,
      timeout: 30000,
    });
    await registryClient.init();

    // If no components specified, show interactive selection
    if (components.length === 0) {
      const availableComponents = await registryClient.getComponents();
      
      const response = await prompts({
        type: 'autocompleteMultiselect',
        name: 'selectedComponents',
        message: 'Select components to add:',
        choices: availableComponents.components.map(comp => ({
          title: `${comp.name} - ${comp.description}`,
          value: comp.name,
        })),
        hint: 'Space to select, Enter to confirm',
      });

      if (!response.selectedComponents || response.selectedComponents.length === 0) {
        console.log(chalk.yellow('No components selected'));
        return;
      }

      components = response.selectedComponents;
    }

    // Initialize component installer
    const installer = new ComponentInstaller(cwd, configManager);
    const packageManager = new PackageManager(cwd);

    // Process each component
    for (const componentName of components) {
      console.log(chalk.blue(`\n📦 Adding ${componentName}...`));

      try {
        // Fetch component from registry
        const component = await registryClient.getComponent(componentName);
        
        // Check if component already exists
        const componentPath = path.resolve(cwd, config.aliases.components.replace('@', 'src'), `${componentName}.tsx`);
        if (await fs.pathExists(componentPath) && !options.overwrite) {
          const response = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `Component ${componentName} already exists. Overwrite?`,
            initial: false,
          });

          if (!response.overwrite) {
            console.log(chalk.yellow(`Skipping ${componentName}`));
            continue;
          }
        }

        // Install dependencies
        if (component.dependencies.length > 0) {
          console.log(chalk.blue(`Installing dependencies for ${componentName}...`));
          await packageManager.install(component.dependencies, false);
        }

        if (component.devDependencies.length > 0) {
          console.log(chalk.blue(`Installing dev dependencies for ${componentName}...`));
          await packageManager.install(component.devDependencies, true);
        }

        // Install component files
        await installer.installComponent(component, options.path);

        // Update config
        await configManager.addComponent(componentName);

        console.log(chalk.green(`✅ ${componentName} added successfully!`));

      } catch (error) {
        console.error(chalk.red(`❌ Failed to add ${componentName}:`), error);
        
        const response = await prompts({
          type: 'confirm',
          name: 'continue',
          message: 'Continue with remaining components?',
          initial: true,
        });

        if (!response.continue) {
          break;
        }
      }
    }

    console.log(chalk.green('\n🎉 Components added successfully!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.gray('  • Import and use your components'));
    console.log(chalk.gray('  • Run "harukit list" to see installed components'));

  } catch (error) {
    console.error(chalk.red('❌ Failed to add components:'), error);
    process.exit(1);
  }
} 