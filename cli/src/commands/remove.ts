import chalk from 'chalk';
import prompts from 'prompts';
import { ConfigManager } from '../config/manager';
import { ComponentInstaller } from '../utils/component-installer';
import { PackageManager } from '../utils/package-manager';

export async function remove(components: string[]): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.blue('🗑️  Removing components...\n'));

  try {
    const configManager = new ConfigManager(cwd);
    const config = await configManager.load();
    const installer = new ComponentInstaller(cwd, configManager);
    const packageManager = new PackageManager(cwd);

    // If no components specified, show interactive selection
    if (components.length === 0) {
      if (config.components.length === 0) {
        console.log(chalk.yellow('No components installed to remove.'));
        return;
      }

      const response = await prompts({
        type: 'autocompleteMultiselect',
        name: 'selectedComponents',
        message: 'Select components to remove:',
        choices: config.components.map(comp => ({
          title: comp,
          value: comp,
        })),
        hint: 'Space to select, Enter to confirm',
      });

      if (!response.selectedComponents || response.selectedComponents.length === 0) {
        console.log(chalk.yellow('No components selected for removal'));
        return;
      }

      components = response.selectedComponents;
    }

    // Confirm removal
    const response = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to remove ${components.length} component(s)?`,
      initial: false,
    });

    if (!response.confirm) {
      console.log(chalk.yellow('Removal cancelled'));
      return;
    }

    // Process each component
    for (const componentName of components) {
      console.log(chalk.blue(`\n🗑️  Removing ${componentName}...`));

      try {
        // Remove component files
        await installer.removeComponent(componentName);

        // Remove from config
        await configManager.removeComponent(componentName);

        console.log(chalk.green(`✅ ${componentName} removed successfully!`));

      } catch (error) {
        console.error(chalk.red(`❌ Failed to remove ${componentName}:`), error);
      }
    }

    console.log(chalk.green('\n🎉 Components removed successfully!'));

  } catch (error) {
    console.error(chalk.red('❌ Failed to remove components:'), error);
    process.exit(1);
  }
} 