import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { ConfigManager } from '../config/manager'

export async function add(components: string[], options: any) {
  const spinner = ora('Adding components...').start()

  try {
    // Load configuration
    const configManager = new ConfigManager(process.cwd())
    const config = await configManager.load()

    if (!config) {
      spinner.fail('No Harukit configuration found. Run "npx harukit@latest init" first.')
      process.exit(1)
    }

    // Get components to add
    let componentsToAdd = components

    if (componentsToAdd.length === 0) {
      spinner.fail('Please specify components to add. Example: npx harukit@latest add button card')
      process.exit(1)
    }

    // Available components
    const availableComponents = [
      'accordion',
      'button',
      'card',
      'input',
      'label',
      'tooltip',
    ]

    // Validate components
    const invalidComponents = componentsToAdd.filter(
      (c) => !availableComponents.includes(c)
    )

    if (invalidComponents.length > 0) {
      spinner.fail(`Invalid components: ${invalidComponents.join(', ')}`)
      console.log(chalk.blue('\nAvailable components:'))
      availableComponents.forEach((c) => console.log(chalk.green(`  • ${c}`)))
      process.exit(1)
    }

    // Get project structure
    const hasSrcDir = await fs.pathExists(path.join(process.cwd(), 'src'))
    const componentsDir = path.join(process.cwd(), hasSrcDir ? 'src' : '', 'components')
    const libDir = path.join(process.cwd(), hasSrcDir ? 'src' : '', 'lib')

    // Ensure directories exist
    await fs.ensureDir(componentsDir)
    await fs.ensureDir(libDir)

    // Copy components
    for (const component of componentsToAdd) {
      const templatePath = path.join(__dirname, '../../templates/components', `${component}.tsx`)
      const destPath = path.join(componentsDir, `${component}.tsx`)

      if (await fs.pathExists(destPath) && !options.overwrite) {
        console.log(chalk.yellow(`⚠️  ${component}.tsx already exists. Use --overwrite to replace.`))
        continue
      }

      await fs.copy(templatePath, destPath)
      console.log(chalk.green(`✅ Added ${component}.tsx`))
    }

    // Ensure utils file exists
    const utilsTemplate = path.join(__dirname, '../../templates/lib/utils.ts')
    const utilsDest = path.join(libDir, 'utils.ts')

    if (!(await fs.pathExists(utilsDest))) {
      await fs.copy(utilsTemplate, utilsDest)
      console.log(chalk.green('✅ Added utils.ts'))
    }

    spinner.succeed('Components added successfully!')

    console.log(chalk.blue('\nNext steps:'))
    console.log(chalk.green('1. Import and use your components'))
    console.log(chalk.green('2. Add more components with: npx harukit@latest add <component>'))
    console.log(chalk.green('3. Check the documentation for usage examples'))

  } catch (error) {
    spinner.fail('Failed to add components')
    console.error(error)
    process.exit(1)
  }
} 