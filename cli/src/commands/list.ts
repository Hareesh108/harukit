import chalk from 'chalk';
import { ConfigManager } from '../config/manager';
import { RegistryClient } from '../registry/client';

interface ListOptions {
  installed?: boolean;
}

export async function list(options: ListOptions = {}): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.blue('📋 Listing components...\n'));

  try {
    const configManager = new ConfigManager(cwd);
    const config = await configManager.load();

    if (options.installed) {
      await listInstalledComponents(config);
    } else {
      await listAvailableComponents(config);
    }

  } catch (error) {
    console.error(chalk.red('❌ Failed to list components:'), error);
    process.exit(1);
  }
}

async function listInstalledComponents(config: any): Promise<void> {
  console.log(chalk.green('📦 Installed Components:'));
  console.log(chalk.gray('─'.repeat(50)));

  if (config.components.length === 0) {
    console.log(chalk.yellow('No components installed yet.'));
    console.log(chalk.gray('Run "harukit add <component>" to install components.'));
    return;
  }

  for (const component of config.components) {
    console.log(`  • ${chalk.cyan(component)}`);
  }

  console.log(chalk.gray(`\nTotal: ${config.components.length} components`));
}

async function listAvailableComponents(config: any): Promise<void> {
  console.log(chalk.green('📦 Available Components:'));
  console.log(chalk.gray('─'.repeat(50)));

  try {
    const registryClient = new RegistryClient({
      url: config.registry.url,
      cache: config.registry.cache,
      ttl: config.registry.ttl,
      timeout: 30000,
    });
    await registryClient.init();

    const response = await registryClient.getComponents();
    
    for (const component of response.components) {
      const status = config.components.includes(component.name) 
        ? chalk.green('✓') 
        : chalk.gray('○');
      
      console.log(`  ${status} ${chalk.cyan(component.name)} - ${component.description}`);
      console.log(`    ${chalk.gray(`Version: ${component.version} | Category: ${component.category}`)}`);
      
      if (component.tags.length > 0) {
        console.log(`    ${chalk.gray(`Tags: ${component.tags.join(', ')}`)}`);
      }
      
      console.log('');
    }

    console.log(chalk.gray(`Total: ${response.total} components available`));
    console.log(chalk.blue('\nRun "harukit add <component>" to install a component'));

  } catch (error) {
    console.error(chalk.red('Failed to fetch components from registry:'), error);
    console.log(chalk.yellow('Showing installed components only...'));
    await listInstalledComponents(config);
  }
} 