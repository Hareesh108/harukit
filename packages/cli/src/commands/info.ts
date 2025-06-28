import chalk from 'chalk';
import { ConfigManager } from '../config/manager';
import { RegistryClient } from '../registry/client';

export async function info(componentName?: string): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.blue('ℹ️  Component Information\n'));

  try {
    const configManager = new ConfigManager(cwd);
    const config = await configManager.load();

    if (componentName) {
      await showComponentInfo(componentName, config);
    } else {
      await showProjectInfo(config);
    }

  } catch (error) {
    console.error(chalk.red('❌ Failed to get information:'), error);
    process.exit(1);
  }
}

async function showComponentInfo(componentName: string, config: any): Promise<void> {
  try {
    const registryClient = new RegistryClient({
      url: config.registry.url,
      cache: config.registry.cache,
      ttl: config.registry.ttl,
      timeout: 30000,
    });
    await registryClient.init();

    const component = await registryClient.getComponent(componentName);
    
    console.log(chalk.green(`📦 ${component.name}`));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(`Description: ${component.description}`);
    console.log(`Version: ${chalk.cyan(component.version)}`);
    console.log(`Category: ${component.category}`);
    console.log(`Author: ${component.author}`);
    console.log(`License: ${component.license}`);
    
    if (component.repository) {
      console.log(`Repository: ${chalk.blue(component.repository)}`);
    }
    
    if (component.documentation) {
      console.log(`Documentation: ${chalk.blue(component.documentation)}`);
    }

    console.log(`\n${chalk.yellow('Dependencies:')}`);
    if (component.dependencies.length > 0) {
      component.dependencies.forEach((dep: string) => {
        console.log(`  • ${dep}`);
      });
    } else {
      console.log('  • None');
    }

    console.log(`\n${chalk.yellow('Dev Dependencies:')}`);
    if (component.devDependencies.length > 0) {
      component.devDependencies.forEach((dep: string) => {
        console.log(`  • ${dep}`);
      });
    } else {
      console.log('  • None');
    }

    console.log(`\n${chalk.yellow('Tags:')}`);
    if (component.tags.length > 0) {
      console.log(`  ${component.tags.join(', ')}`);
    } else {
      console.log('  • None');
    }

    console.log(`\n${chalk.yellow('Files:')}`);
    component.files.forEach((file: any) => {
      console.log(`  • ${file.name} (${file.type})`);
    });

    const isInstalled = config.components.includes(componentName);
    console.log(`\n${chalk.yellow('Status:')} ${isInstalled ? chalk.green('Installed') : chalk.gray('Not installed')}`);

  } catch (error) {
    console.error(chalk.red(`Component "${componentName}" not found or failed to fetch`));
  }
}

async function showProjectInfo(config: any): Promise<void> {
  console.log(chalk.green('🏗️  Project Information'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(`Style: ${config.style}`);
  console.log(`TypeScript: ${config.typescript ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`Tailwind: ${config.tailwind.cssVariables ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`Components Path: ${config.aliases.components}`);
  console.log(`Utils Path: ${config.aliases.utils}`);
  console.log(`Registry URL: ${config.registry.url}`);

  console.log(`\n${chalk.yellow('Installed Components:')}`);
  if (config.components.length > 0) {
    config.components.forEach((component: string) => {
      console.log(`  • ${component}`);
    });
  } else {
    console.log('  • None');
  }

  console.log(`\n${chalk.yellow('Dependencies:')}`);
  if (config.dependencies.length > 0) {
    config.dependencies.forEach((dep: string) => {
      console.log(`  • ${dep}`);
    });
  } else {
    console.log('  • None');
  }

  console.log(`\n${chalk.yellow('Dev Dependencies:')}`);
  if (config.devDependencies.length > 0) {
    config.devDependencies.forEach((dep: string) => {
      console.log(`  • ${dep}`);
    });
  } else {
    console.log('  • None');
  }
} 