import { describe, expect, it } from "vitest";
import type { WorkLoop } from "./index";

describe("core contracts", () => {
  it("exposes a typed work loop shape", () => {
    const loop: WorkLoop = {
      detectors: [],
      planner: { plan: async () => [] },
      executor: { execute: async () => ({}) },
      verifier: {
        verify: async () => ({
          id: "r1",
          actionPlanId: "p1",
          startedAt: "2026-09-12T00:00:00.000Z",
          connector: "test",
          outcome: "verified",
          verification: {},
          inputHash: "x",
          privacy: {
            externalModelUsed: false,
            purpose: "test",
            categoriesSent: []
          }
        })
      }
    };
    expect(loop.detectors).toEqual([]);
  });
});
