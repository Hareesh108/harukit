import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  banner: {
    js: '#!/usr/bin/env node',
  },
  external: [
    'commander',
    'prompts',
    'zod',
    'chalk',
    'ora',
    'fs-extra',
    'glob',
    'node-fetch',
    'semver',
    'cosmiconfig',
    'prettier',
    'typescript',
    '@harukit/registry'
  ],
}); 