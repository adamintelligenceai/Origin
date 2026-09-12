import { describe, expect, it } from "vitest";
import { ChiefRuntime } from "@project-chief/runtime";

describe("desktop approval runtime", () => {
  it("binds approval to the current proposed action", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    const followUp = boot.workItems.find((item) => item.title.includes("Follow up"));
    if (!followUp) {
      throw new Error("missing follow-up");
    }
    runtime.editAction(followUp.id, "A different draft");
    const edited = runtime.snapshot().plans.find((plan) => plan.workItemId === followUp.id);
    const original = boot.plans.find((plan) => plan.workItemId === followUp.id);
    expect(JSON.stringify(edited?.payload)).not.toEqual(JSON.stringify(original?.payload));
  });

  it("verifies a low-risk preparation without treating it as sent", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    const followUp = boot.workItems.find((item) => item.title.includes("Follow up"));
    if (!followUp) {
      throw new Error("missing follow-up");
    }
    const next = await runtime.approve(followUp.id);
    expect(next.workItems.find((item) => item.id === followUp.id)?.status).toBe("verified");
    expect(next.receipts[0]?.privacy.externalModelUsed).toBe(false);
  });

  it("requires A3 for a calendar mutation", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    const conflict = boot.workItems.find((item) => item.kind === "calendar_conflict");
    if (!conflict) {
      throw new Error("missing conflict");
    }
    const next = await runtime.approve(conflict.id);
    expect(next.workItems.find((item) => item.id === conflict.id)?.status).toBe("verified");
    expect(next.plans.find((plan) => plan.workItemId === conflict.id)?.requiredAutonomy).toBe(3);
  });
});
