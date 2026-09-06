import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_PORT = process.env.ORIGIN_PORT ?? "8787";

// The web dev server proxies API calls to the Express backend so that the
// frontend and backend can be developed together with a single `npm run dev`.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
