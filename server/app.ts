import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import cors from "cors";
import express, { type Express, type Request, type Response } from "express";

import { loadConfig, type OriginConfig } from "./config.js";
import { EtoroApiError } from "./etoro/client.js";
import { getPortfolio } from "./etoro/service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");

export function createApp(config: OriginConfig = loadConfig()): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      mode: config.demoMode ? "demo" : "live",
      environment: config.etoroEnv,
    });
  });

  app.get("/api/portfolio", async (_req: Request, res: Response) => {
    try {
      const result = await getPortfolio(config);
      res.json(result);
    } catch (error) {
      if (error instanceof EtoroApiError) {
        res
          .status(502)
          .json({ error: "etoro_upstream_error", detail: error.message });
        return;
      }
      res.status(500).json({ error: "internal_error" });
    }
  });

  // In production the built frontend is served from ./dist. In development the
  // Vite dev server owns the frontend and proxies /api to this server.
  if (config.demoMode || process.env.NODE_ENV === "production") {
    if (existsSync(DIST_DIR)) {
      app.use(express.static(DIST_DIR));
      app.get("*", (req: Request, res: Response, next) => {
        if (req.path.startsWith("/api/")) {
          next();
          return;
        }
        res.sendFile(path.join(DIST_DIR, "index.html"));
      });
    }
  }

  return app;
}
