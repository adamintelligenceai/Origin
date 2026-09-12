import { describe, expect, it } from "vitest";
import type { ActionReceipt } from "@project-chief/types";
import { MemoryLedger, assertVerified, classifyVerification } from "./index.js";

function receipt(outcome: ActionReceipt["outcome"]): ActionReceipt {
  return {
    id: `r-${outcome}`,
    actionPlanId: "plan-1",
    startedAt: "2026-09-12T00:00:00.000Z",
    completedAt: "2026-09-12T00:00:01.000Z",
    connector: "calendar",
    outcome,
    verification: { outcome },
    inputHash: "hash",
    privacy: { externalModelUsed: false, purpose: "test", categoriesSent: [] }
  };
}

describe("ledger", () => {
  it("classifies missing provider state as failed, not verified", () => {
    expect(classifyVerification(false, false)).toBe("failed");
    expect(classifyVerification(true, false)).toBe("partial");
    expect(classifyVerification(true, true)).toBe("verified");
  });

  it("refuses to treat a partial outcome as verified", () => {
    expect(() => {
      assertVerified(receipt("partial"));
    }).toThrow("Action is not verified");
    expect(() => {
      assertVerified(receipt("verified"));
    }).not.toThrow();
  });

  it("appends receipts newest first", async () => {
    const ledger = new MemoryLedger();
    await ledger.append(receipt("failed"));
    await ledger.append(receipt("verified"));
    const listed = await ledger.list(1);
    expect(listed[0]?.outcome).toBe("verified");
  });
});
