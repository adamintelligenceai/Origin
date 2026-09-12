import { expect, test } from "vitest";
import type { ActionPlan, Approval, PermissionPolicy, SourceRef } from "@project-chief/types";
import { canModelGrantAutonomy, decidePermission } from "./index";

const source: SourceRef = {
  sourceId: "src-1",
  provider: "manual",
  providerId: "fixture",
  contentHash: "hash-1",
};

function makePlan(overrides: Partial<ActionPlan> = {}): ActionPlan {
  return {
    id: "plan-1",
    workItemId: "work-1",
    intent: "fixture",
    actionType: "email.send",
    payload: {},
    evidenceRefs: [source],
    consequence: "medium",
    reversible: true,
    requiredAutonomy: 3,
    expectedPostcondition: {},
    ...overrides,
  };
}

test("a model cannot grant autonomy", () => {
  expect(canModelGrantAutonomy(0)).toBe(false);
  expect(canModelGrantAutonomy(4)).toBe(false);
});

test("prohibited consequences are rejected", () => {
  const decision = decidePermission(
    makePlan({ consequence: "prohibited" }),
    undefined,
    undefined,
    "hash",
  );
  expect(decision.allowed).toBe(false);
  expect(decision.reason).toBe("Prohibited consequence");
});

test("mutating actions require an approval bound to the current hash", () => {
  const plan = makePlan();
  const missing = decidePermission(plan, undefined, undefined, "bound-hash");
  expect(missing.allowed).toBe(false);

  const mismatched: Approval = {
    actionPlanId: plan.id,
    actionHash: "other-hash",
    approvedAt: "2026-09-12T00:00:00.000Z",
    deviceId: "device-1",
  };
  const replay = decidePermission(plan, undefined, mismatched, "bound-hash");
  expect(replay.allowed).toBe(false);
  expect(replay.reason).toBe("Approval is not bound to current action");
});

test("matching approval hash allows a mutating action", () => {
  const plan = makePlan();
  const approval: Approval = {
    actionPlanId: plan.id,
    actionHash: "bound-hash",
    approvedAt: "2026-09-12T00:00:00.000Z",
    deviceId: "device-1",
  };
  const decision = decidePermission(plan, undefined, approval, "bound-hash");
  expect(decision.allowed).toBe(true);
});

test("policy autonomy ceiling is enforced", () => {
  const plan = makePlan({ requiredAutonomy: 4 });
  const policy: PermissionPolicy = {
    id: "policy-1",
    actionType: "email.send",
    maxAutonomy: 3,
    constraints: {},
    createdByUser: true,
    enabled: true,
  };
  const decision = decidePermission(plan, policy, undefined, "bound-hash");
  expect(decision.allowed).toBe(false);
  expect(decision.reason).toBe("Policy autonomy ceiling exceeded");
});
