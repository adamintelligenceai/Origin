import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@marginshield/schemas': path.resolve(__dirname, 'packages/schemas/src/index.ts'),
      '@marginshield/engine': path.resolve(__dirname, 'packages/engine/src/index.ts'),
      '@marginshield/synthetic': path.resolve(__dirname, 'packages/synthetic/src/index.ts'),
      '@marginshield/ui': path.resolve(__dirname, 'packages/ui/src/index.ts'),
      '@marginshield/reports': path.resolve(__dirname, 'packages/reports/src/index.ts'),
      '@marginshield/api-client': path.resolve(__dirname, 'packages/api-client/src/index.ts'),
    },
  },
  test: {
    include: ['packages/**/src/**/*.test.ts'],
    exclude: ['**/node_modules/**'],
    environment: 'node',
  },
});
