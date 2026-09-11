import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@marginshield/synthetic': path.resolve(__dirname, 'packages/synthetic/src/index.ts'),
    },
  },
  test: {
    include: ['tests/golden/**/*.test.ts'],
    environment: 'node',
  },
});
