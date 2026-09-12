import type { ActionPlan, Approval, AutonomyLevel, PermissionPolicy } from "@project-chief/types";

export type PermissionDecision =
  | { allowed: true; reason: string; approvalRequired: boolean }
  | { allowed: false; reason: string; approvalRequired: boolean };

const HARD_APPROVAL: ReadonlySet<ActionPlan["actionType"]> = new Set([
  "email.send",
  "calendar.create",
  "calendar.update",
  "calendar.delete"
]);

export function decidePermission(
  plan: ActionPlan,
  policy: PermissionPolicy | undefined,
  approval: Approval | undefined,
  currentActionHash: string
): PermissionDecision {
  if (plan.consequence === "prohibited") {
    return { allowed: false, reason: "Prohibited consequence", approvalRequired: true };
  }

  if (plan.requiredAutonomy > 4 || plan.requiredAutonomy < 0) {
    return { allowed: false, reason: "Invalid autonomy level", approvalRequired: true };
  }

  const mutationRequiresApproval = HARD_APPROVAL.has(plan.actionType);

  if (!mutationRequiresApproval && plan.requiredAutonomy <= 2) {
    return { allowed: true, reason: "Non-mutating preparation", approvalRequired: false };
  }

  if (!policy || !policy.enabled || policy.actionType !== plan.actionType) {
    if (!approval) {
      return { allowed: false, reason: "Explicit approval required", approvalRequired: true };
    }
  }

  if (policy && plan.requiredAutonomy > policy.maxAutonomy) {
    return { allowed: false, reason: "Policy autonomy ceiling exceeded", approvalRequired: true };
  }

  if (!approval) {
    return { allowed: false, reason: "Missing approval", approvalRequired: true };
  }

  if (approval.actionPlanId !== plan.id || approval.actionHash !== currentActionHash) {
    return {
      allowed: false,
      reason: "Approval is not bound to current action",
      approvalRequired: true
    };
  }

  return { allowed: true, reason: "Approved action hash matches", approvalRequired: true };
}

export function canModelGrantAutonomy(_: AutonomyLevel): false {
  return false;
}
