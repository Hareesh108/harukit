import { Component, Registry } from "./types";
import { getAllComponents } from "@harukit/registry";

export class RegistryClient {
  private cache: Map<string, Component> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes
  private lastCacheUpdate: number = 0;

  constructor() {
    this.updateCache();
  }

  private updateCache(): void {
    const now = Date.now();
    if (now - this.lastCacheUpdate > this.cacheExpiry) {
      const components = getAllComponents();
      this.cache.clear();
      components.forEach((component) => {
        this.cache.set(component.name, component);
      });
      this.lastCacheUpdate = now;
    }
  }

  async getComponent(name: string): Promise<Component | null> {
    this.updateCache();
    return this.cache.get(name) || null;
  }

  async getAllComponents(): Promise<Component[]> {
    this.updateCache();
    return Array.from(this.cache.values());
  }

  async searchComponents(query: string): Promise<Component[]> {
    this.updateCache();
    const components = Array.from(this.cache.values());
    const searchTerm = query.toLowerCase();
    
    return components.filter((component) => {
      return (
        component.name.toLowerCase().includes(searchTerm) ||
        component.description.toLowerCase().includes(searchTerm) ||
        component.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        component.category.toLowerCase().includes(searchTerm)
      );
    });
  }

  async getComponentsByCategory(category: string): Promise<Component[]> {
    this.updateCache();
    const components = Array.from(this.cache.values());
    return components.filter((component) => component.category === category);
  }

  async getCategories(): Promise<string[]> {
    this.updateCache();
    const components = Array.from(this.cache.values());
    const categories = new Set(components.map((component) => component.category));
    return Array.from(categories).sort();
  }

  async getRegistry(page: number = 1, limit: number = 20): Promise<Registry> {
    this.updateCache();
    const components = Array.from(this.cache.values());
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedComponents = components.slice(start, end);

    return {
      components: paginatedComponents,
      total: components.length,
      page,
      limit,
    };
  }
} 