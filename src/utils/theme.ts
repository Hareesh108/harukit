import { colors } from '../styles/tokens';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
  borderRadius?: 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  fontFamily?: 'sans' | 'mono';
}

export class ThemeManager {
  private static instance: ThemeManager;
  private config: ThemeConfig;
  private listeners: Set<(config: ThemeConfig) => void> = new Set();

  private constructor() {
    this.config = {
      mode: 'system',
      primaryColor: '500' as const,
      borderRadius: 'md',
      fontFamily: 'sans',
    };
    this.initialize();
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private initialize() {
    // Check for saved theme preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harukit-theme');
      if (saved) {
        try {
          this.config = { ...this.config, ...JSON.parse(saved) };
        } catch (e) {
          console.warn('Failed to parse saved theme config');
        }
      }
      this.applyTheme();
    }
  }

  getConfig(): ThemeConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<ThemeConfig>) {
    this.config = { ...this.config, ...updates };
    this.applyTheme();
    this.notifyListeners();
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('harukit-theme', JSON.stringify(this.config));
    }
  }

  private applyTheme() {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const { primaryColor, borderRadius, fontFamily } = this.config;

    // Apply primary color
    if (primaryColor) {
      const color = colors.primary[primaryColor];
      root.style.setProperty('--harukit-primary', color);
    }

    // Apply border radius
    if (borderRadius) {
      const radiusMap = {
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      };
      root.style.setProperty('--harukit-radius', radiusMap[borderRadius]);
    }

    // Apply font family
    if (fontFamily) {
      const fontMap = {
        sans: 'Inter, system-ui, sans-serif',
        mono: 'JetBrains Mono, monospace',
      };
      root.style.setProperty('--harukit-font-family', fontMap[fontFamily]);
    }

    // Apply color scheme
    this.applyColorScheme();
  }

  private applyColorScheme() {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const { mode } = this.config;

    let colorScheme: 'light' | 'dark';

    if (mode === 'system') {
      colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      colorScheme = mode;
    }

    root.setAttribute('data-theme', colorScheme);
    root.style.colorScheme = colorScheme;
  }

  subscribe(listener: (config: ThemeConfig) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.config));
  }

  // Listen for system theme changes
  setupSystemListener() {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.config.mode === 'system') {
        this.applyColorScheme();
        this.notifyListeners();
      }
    });
  }
}

// Export a singleton instance
export const themeManager = ThemeManager.getInstance();

// Helper function to get CSS custom properties
export function getCSSVariable(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Helper function to set CSS custom properties
export function setCSSVariable(name: string, value: string) {
  if (typeof window === 'undefined') return;
  document.documentElement.style.setProperty(name, value);
} 