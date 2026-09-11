import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/privacy/**/*.test.ts'],
    environment: 'node',
  },
});
