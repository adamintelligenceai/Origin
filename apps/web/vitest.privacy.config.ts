import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: '../..',
  test: {
    include: ['tests/privacy/**/*.test.ts'],
  },
});
