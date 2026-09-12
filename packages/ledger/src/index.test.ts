import { describe, expect, it } from "vitest";
import type { ActionReceipt } from "@project-chief/types";
import { assertVerified } from "./index";

describe("assertVerified", () => {
  it("throws when outcome is not verified", () => {
    const receipt: ActionReceipt = {
      id: "r1",
      actionPlanId: "p1",
      startedAt: "2026-09-12T00:00:00.000Z",
      connector: "test",
      outcome: "failed",
      verification: {},
      inputHash: "x",
      privacy: {
        externalModelUsed: false,
        purpose: "test",
        categoriesSent: []
      }
    };
    expect(() => assertVerified(receipt)).toThrow(/not verified/);
  });
});
