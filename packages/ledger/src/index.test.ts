import { expect, test } from "vitest";
import type { ActionReceipt } from "@project-chief/types";
import { assertVerified } from "./index";

function receipt(outcome: ActionReceipt["outcome"]): ActionReceipt {
  return {
    id: "receipt-1",
    actionPlanId: "plan-1",
    startedAt: "2026-09-12T00:00:00.000Z",
    connector: "fixture",
    outcome,
    verification: {},
    inputHash: "in",
    privacy: {
      externalModelUsed: false,
      purpose: "none",
      categoriesSent: [],
    },
  };
}

test("unverified receipts cannot be treated as complete", () => {
  expect(() => {
    assertVerified(receipt("partial"));
  }).toThrow(/not verified/);
});

test("verified receipts pass", () => {
  expect(() => {
    assertVerified(receipt("verified"));
  }).not.toThrow();
});
