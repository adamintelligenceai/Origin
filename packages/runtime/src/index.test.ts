import { describe, expect, it } from "vitest";
import { canModelGrantAutonomy } from "@project-chief/permissions";
import { ChiefRuntime } from "./chief-runtime.js";

describe("ChiefRuntime", () => {
  it("runs observe → plan → approve → mock verify → receipt", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(boot.workItems.length).toBeGreaterThan(0);
    expect(boot.plans.every((plan) => plan.requiredAutonomy >= 2)).toBe(true);
    const followUp = boot.workItems.find((item) => item.title.includes("Follow up"));
    if (!followUp) {
      throw new Error("expected follow-up work item");
    }
    const next = await runtime.approve(followUp.id);
    expect(next.workItems.find((item) => item.id === followUp.id)?.status).toBe("verified");
    expect(next.receipts[0]?.outcome).toBe("verified");
    expect(canModelGrantAutonomy(4)).toBe(false);
  });

  it("does not let injection email grant a send", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(
      boot.plans.some(
        (plan) => plan.intent.toLowerCase().includes("password") && plan.actionType === "email.send"
      )
    ).toBe(false);
  });

  it("wipes the encrypted store and connector tokens", async () => {
    const runtime = new ChiefRuntime();
    await runtime.boot();
    const wiped = await runtime.wipe();
    expect(wiped.wiped).toBe(true);
    expect(wiped.workItems).toEqual([]);
    expect(wiped.connections.gmail).toBe("revoked");
  });
});
