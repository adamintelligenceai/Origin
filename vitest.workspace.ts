import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/*/vitest.config.ts",
  "apps/desktop/vitest.config.ts",
  "apps/web/vitest.config.ts",
  "apps/mobile/vitest.config.ts"
]);
