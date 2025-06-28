import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { ComponentMeta, RegistryResponse, RegistryConfig, CacheEntry } from './types';

export class RegistryClient {
  private config: RegistryConfig;
  private cacheDir: string;

  constructor(config: RegistryConfig) {
    this.config = config;
    this.cacheDir = path.join(process.cwd(), '.harukit', 'cache');
  }

  async init(): Promise<void> {
    await fs.ensureDir(this.cacheDir);
  }

  async getComponents(page = 1, limit = 50): Promise<RegistryResponse> {
    const cacheKey = `components_${page}_${limit}`;
    
    // Check cache first
    if (this.config.cache) {
      const cached = await this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const response = await fetch(
        `${this.config.url}/api/components?page=${page}&limit=${limit}`,
        {
          timeout: this.config.timeout,
          headers: {
            'User-Agent': 'harukit-cli/0.1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Registry request failed: ${response.statusText}`);
      }

      const data = await response.json() as RegistryResponse;

      // Cache the response
      if (this.config.cache) {
        await this.setCache(cacheKey, data);
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch components: ${error}`);
    }
  }

  async getComponent(name: string): Promise<ComponentMeta> {
    const cacheKey = `component_${name}`;
    
    // Check cache first
    if (this.config.cache) {
      const cached = await this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const response = await fetch(
        `${this.config.url}/api/components/${name}`,
        {
          timeout: this.config.timeout,
          headers: {
            'User-Agent': 'harukit-cli/0.1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Component not found: ${name}`);
      }

      const data = await response.json() as ComponentMeta;

      // Cache the response
      if (this.config.cache) {
        await this.setCache(cacheKey, data);
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch component ${name}: ${error}`);
    }
  }

  async searchComponents(query: string): Promise<ComponentMeta[]> {
    const cacheKey = `search_${query}`;
    
    // Check cache first
    if (this.config.cache) {
      const cached = await this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const response = await fetch(
        `${this.config.url}/api/search?q=${encodeURIComponent(query)}`,
        {
          timeout: this.config.timeout,
          headers: {
            'User-Agent': 'harukit-cli/0.1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Search request failed: ${response.statusText}`);
      }

      const data = await response.json() as ComponentMeta[];

      // Cache the response
      if (this.config.cache) {
        await this.setCache(cacheKey, data);
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to search components: ${error}`);
    }
  }

  private async getFromCache(key: string): Promise<any | null> {
    try {
      const cacheFile = path.join(this.cacheDir, `${key}.json`);
      
      if (!(await fs.pathExists(cacheFile))) {
        return null;
      }

      const data = await fs.readJson(cacheFile) as CacheEntry;
      const now = Date.now();

      if (now - data.timestamp > data.ttl * 1000) {
        await fs.remove(cacheFile);
        return null;
      }

      return data.data;
    } catch (error) {
      return null;
    }
  }

  private async setCache(key: string, data: any): Promise<void> {
    try {
      const cacheFile = path.join(this.cacheDir, `${key}.json`);
      const entry: CacheEntry = {
        data,
        timestamp: Date.now(),
        ttl: this.config.ttl,
      };

      await fs.writeJson(cacheFile, entry, { spaces: 2 });
    } catch (error) {
      // Silently fail cache writes
      console.warn('Failed to write cache:', error);
    }
  }

  async clearCache(): Promise<void> {
    try {
      await fs.remove(this.cacheDir);
      await fs.ensureDir(this.cacheDir);
    } catch (error) {
      throw new Error(`Failed to clear cache: ${error}`);
    }
  }
} 