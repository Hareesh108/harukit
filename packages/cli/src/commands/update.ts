import chalk from 'chalk';
import { ConfigManager } from '../config/manager';
import { RegistryClient } from '../registry/client';
import { ComponentInstaller } from '../utils/component-installer';

export async function update(components: string[]): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.blue('🔄 Updating components...\n'));

  try {
    const configManager = new ConfigManager(cwd);
    const config = await configManager.load();
    const installer = new ComponentInstaller(cwd, configManager);

    // If no components specified, update all installed components
    if (components.length === 0) {
      if (config.components.length === 0) {
        console.log(chalk.yellow('No components installed to update.'));
        return;
      }
      components = config.components;
    }

    // Initialize registry client
    const registryClient = new RegistryClient({
      url: config.registry.url,
      cache: config.registry.cache,
      ttl: config.registry.ttl,
      timeout: 30000,
    });
    await registryClient.init();

    // Process each component
    for (const componentName of components) {
      console.log(chalk.blue(`\n🔄 Updating ${componentName}...`));

      try {
        // Fetch latest version from registry
        const component = await registryClient.getComponent(componentName);
        
        // Update component files
        await installer.updateComponent(component);

        console.log(chalk.green(`✅ ${componentName} updated to version ${component.version}!`));

      } catch (error) {
        console.error(chalk.red(`❌ Failed to update ${componentName}:`), error);
      }
    }

    console.log(chalk.green('\n🎉 Components updated successfully!'));

  } catch (error) {
    console.error(chalk.red('❌ Failed to update components:'), error);
    process.exit(1);
  }
} 