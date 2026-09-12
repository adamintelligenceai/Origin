import { describe, expect, it } from "vitest";
import type { ActionPlan, PermissionPolicy } from "@project-chief/types";
import { canModelGrantAutonomy, decidePermission } from "./index";

const plan: ActionPlan = {
  id: "plan-1",
  workItemId: "work-1",
  intent: "Send a follow-up",
  actionType: "email.send",
  payload: { to: "a@example.com" },
  evidenceRefs: [],
  consequence: "medium",
  reversible: false,
  requiredAutonomy: 3,
  expectedPostcondition: { sent: true }
};

describe("decidePermission", () => {
  it("denies prohibited consequences", () => {
    const decision = decidePermission(
      { ...plan, consequence: "prohibited" },
      undefined,
      undefined,
      "hash"
    );
    expect(decision.allowed).toBe(false);
  });

  it("requires approval for mutating actions", () => {
    const decision = decidePermission(plan, undefined, undefined, "hash");
    expect(decision.allowed).toBe(false);
    expect(decision.approvalRequired).toBe(true);
  });

  it("allows when approval hash matches", () => {
    const policy: PermissionPolicy = {
      id: "pol-1",
      actionType: "email.send",
      maxAutonomy: 4,
      constraints: {},
      createdByUser: true,
      enabled: true
    };
    const decision = decidePermission(
      plan,
      policy,
      {
        actionPlanId: "plan-1",
        actionHash: "abc",
        approvedAt: "2026-09-12T00:00:00.000Z",
        deviceId: "device-1"
      },
      "abc"
    );
    expect(decision.allowed).toBe(true);
  });

  it("never lets the model grant autonomy", () => {
    expect(canModelGrantAutonomy(4)).toBe(false);
  });
});
