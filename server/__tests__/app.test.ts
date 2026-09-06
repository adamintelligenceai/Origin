import { describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../app.js";
import { loadConfig } from "../config.js";

const demoConfig = loadConfig({ ETORO_DEMO_MODE: "true", ORIGIN_PORT: "8787" });

describe("Origin API", () => {
  it("GET /api/health reports demo mode", async () => {
    const app = createApp(demoConfig);
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: "ok", mode: "demo" });
  });

  it("GET /api/portfolio returns a demo snapshot with positions", async () => {
    const app = createApp(demoConfig);
    const res = await request(app).get("/api/portfolio");
    expect(res.status).toBe(200);
    expect(res.body.mode).toBe("demo");
    expect(res.body.snapshot.positions.length).toBeGreaterThan(0);
    expect(res.body.snapshot.equity).toBeGreaterThan(0);
    // Sanity: equity = cash + invested + pnl
    const { availableCash, totalInvested, profitLoss, equity } =
      res.body.snapshot;
    expect(Math.round((availableCash + totalInvested + profitLoss) * 100)).toBe(
      Math.round(equity * 100),
    );
  });
});
