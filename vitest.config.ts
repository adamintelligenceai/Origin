import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    include: ["packages/**/*.test.ts", "apps/web/**/*.test.ts", "tests/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
    environment: "node",
    reporters: ["default"],
  },
  resolve: {
    alias: {
      "@marginshield/schemas": path.join(root, "packages/schemas/src/index.ts"),
      "@marginshield/engine": path.join(root, "packages/engine/src/index.ts"),
      "@marginshield/ui": path.join(root, "packages/ui/src/index.ts"),
      "@marginshield/reports": path.join(root, "packages/reports/src/index.ts"),
      "@marginshield/synthetic": path.join(root, "packages/synthetic/src/index.ts"),
      "@marginshield/api-client": path.join(root, "packages/api-client/src/index.ts"),
    },
  },
});
