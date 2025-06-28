import { spawn } from 'child_process';
import { ProjectDetector } from './project-detector';

export class PackageManager {
  private root: string;
  private manager: string;

  constructor(root: string) {
    this.root = root;
    this.manager = 'npm'; // Default, will be updated in init
  }

  async init(): Promise<void> {
    const detector = new ProjectDetector(this.root);
    const projectInfo = await detector.detect();
    if (await this.hasBun()) {
      this.manager = 'bun';
    } else {
      this.manager = projectInfo.packageManager;
    }
  }

  async hasBun(): Promise<boolean> {
    try {
      const bunLock = require('fs').existsSync(require('path').join(this.root, 'bun.lockb'));
      const bunBinary = require('child_process').spawnSync('bun', ['--version'], { stdio: 'ignore' }).status === 0;
      return bunLock || bunBinary;
    } catch {
      return false;
    }
  }

  async install(packages: string[], isDev = false): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const args = this.getInstallArgs(packages, isDev);
      
      console.log(`Installing with ${this.manager}: ${packages.join(' ')}`);
      
      const child = spawn(this.manager, args, {
        cwd: this.root,
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`${this.manager} install failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to run ${this.manager}: ${error.message}`));
      });
    });
  }

  async add(packageName: string, isDev = false): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const args = this.getAddArgs(packageName, isDev);
      
      console.log(`Adding ${packageName} with ${this.manager}...`);
      
      const child = spawn(this.manager, args, {
        cwd: this.root,
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`${this.manager} add failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to run ${this.manager}: ${error.message}`));
      });
    });
  }

  async remove(packageName: string): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const args = this.getRemoveArgs(packageName);
      
      console.log(`Removing ${packageName} with ${this.manager}...`);
      
      const child = spawn(this.manager, args, {
        cwd: this.root,
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`${this.manager} remove failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to run ${this.manager}: ${error.message}`));
      });
    });
  }

  private getInstallArgs(packages: string[], isDev: boolean): string[] {
    switch (this.manager) {
      case 'npm':
        return ['install', ...packages, ...(isDev ? ['--save-dev'] : [])];
      case 'yarn':
        return ['add', ...packages, ...(isDev ? ['--dev'] : [])];
      case 'pnpm':
        return ['add', ...packages, ...(isDev ? ['--save-dev'] : [])];
      case 'bun':
        return ['add', ...packages, ...(isDev ? ['--dev'] : [])];
      default:
        return ['install', ...packages, ...(isDev ? ['--save-dev'] : [])];
    }
  }

  private getAddArgs(packageName: string, isDev: boolean): string[] {
    switch (this.manager) {
      case 'npm':
        return ['install', packageName, ...(isDev ? ['--save-dev'] : [])];
      case 'yarn':
        return ['add', packageName, ...(isDev ? ['--dev'] : [])];
      case 'pnpm':
        return ['add', packageName, ...(isDev ? ['--save-dev'] : [])];
      case 'bun':
        return ['add', packageName, ...(isDev ? ['--dev'] : [])];
      default:
        return ['install', packageName, ...(isDev ? ['--save-dev'] : [])];
    }
  }

  private getRemoveArgs(packageName: string): string[] {
    switch (this.manager) {
      case 'npm':
        return ['uninstall', packageName];
      case 'yarn':
        return ['remove', packageName];
      case 'pnpm':
        return ['remove', packageName];
      case 'bun':
        return ['remove', packageName];
      default:
        return ['uninstall', packageName];
    }
  }
} 