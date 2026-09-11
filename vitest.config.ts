import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: [
      'packages/**/src/**/*.test.ts',
      'packages/**/src/**/*.test.tsx',
      'apps/web/**/*.test.ts',
      'apps/web/**/*.test.tsx',
      'tests/**/*.test.ts',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', 'tests/e2e/**'],
    testTimeout: 60_000,
  },
  resolve: {
    alias: {
      '@marginshield/engine': path.resolve(__dirname, 'packages/engine/src/index.ts'),
      '@marginshield/synthetic': path.resolve(__dirname, 'packages/synthetic/src/index.ts'),
      '@marginshield/schemas': path.resolve(__dirname, 'packages/schemas/src/index.ts'),
      '@marginshield/ui': path.resolve(__dirname, 'packages/ui/src/index.ts'),
      '@marginshield/reports': path.resolve(__dirname, 'packages/reports/src/index.ts'),
      '@marginshield/api-client': path.resolve(__dirname, 'packages/api-client/src/index.ts'),
    },
  },
});
