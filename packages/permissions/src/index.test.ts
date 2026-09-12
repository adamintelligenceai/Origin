import { describe, expect, it } from "vitest";
import { canModelGrantAutonomy, decidePermission } from "./index.js";
import type { ActionPlan, Approval, PermissionPolicy } from "@project-chief/types";

const basePlan: ActionPlan = {
  id: "plan-1",
  workItemId: "work-1",
  intent: "Send follow-up email",
  actionType: "email.send",
  payload: { to: "example@example.com" },
  evidenceRefs: [],
  consequence: "medium",
  reversible: true,
  requiredAutonomy: 3,
  expectedPostcondition: { sent: true }
};

const policy: PermissionPolicy = {
  id: "policy-1",
  actionType: "email.send",
  maxAutonomy: 3,
  constraints: {},
  createdByUser: true,
  enabled: true
};

const approval: Approval = {
  actionPlanId: "plan-1",
  actionHash: "hash-abc",
  approvedAt: "2026-09-12T00:00:00.000Z",
  deviceId: "device-1"
};

describe("decidePermission", () => {
  it("rejects prohibited consequence", () => {
    const result = decidePermission(
      { ...basePlan, consequence: "prohibited" },
      policy,
      approval,
      "hash-abc"
    );
    expect(result.allowed).toBe(false);
  });

  it("allows non-mutating preparation without approval", () => {
    const result = decidePermission(
      {
        ...basePlan,
        actionType: "email.draft",
        requiredAutonomy: 2
      },
      undefined,
      undefined,
      "hash-abc"
    );
    expect(result).toEqual({
      allowed: true,
      reason: "Non-mutating preparation",
      approvalRequired: false
    });
  });

  it("requires approval for mutations", () => {
    const result = decidePermission(basePlan, policy, undefined, "hash-abc");
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("Missing approval");
  });

  it("rejects mismatched approval hash", () => {
    const result = decidePermission(basePlan, policy, approval, "hash-different");
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("Approval is not bound to current action");
  });

  it("allows approved mutation when hash matches", () => {
    const result = decidePermission(basePlan, policy, approval, "hash-abc");
    expect(result.allowed).toBe(true);
  });
});

describe("canModelGrantAutonomy", () => {
  it("always returns false", () => {
    expect(canModelGrantAutonomy(3)).toBe(false);
  });
});
