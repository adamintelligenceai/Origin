import type { ActionPlan, Approval, AutonomyLevel, PermissionPolicy } from "@project-chief/types";
import { approvalTokenId, hashActionPlanSync } from "./hash.js";
import { isKnownActionType, isMutatingAction } from "./policy.js";
import { validateActionPlan } from "./validate.js";

export type PermissionDecision =
  | { allowed: true; reason: string; approvalRequired: boolean }
  | { allowed: false; reason: string; approvalRequired: boolean };

export class PermissionEngine {
  private readonly consumedTokens = new Set<string>();

  authorize(
    plan: ActionPlan,
    policy: PermissionPolicy | undefined,
    approval: Approval | undefined,
    currentActionHash: string
  ): PermissionDecision {
    if (!isKnownActionType(plan.actionType)) {
      return {
        allowed: false,
        reason: "Unknown action class fails closed",
        approvalRequired: true
      };
    }

    const validated = validateActionPlan(plan);
    if (!validated.ok) {
      return { allowed: false, reason: validated.reason, approvalRequired: true };
    }

    if (isMutatingAction(plan.actionType) && !approval) {
      return { allowed: false, reason: "Mutations require A3 approval", approvalRequired: true };
    }

    if (!isMutatingAction(plan.actionType) && plan.requiredAutonomy <= 2) {
      return { allowed: true, reason: "Non-mutating preparation", approvalRequired: false };
    }

    if (policy && (!policy.enabled || policy.actionType !== plan.actionType)) {
      return {
        allowed: false,
        reason: "Policy does not cover this action",
        approvalRequired: true
      };
    }

    if (policy && plan.requiredAutonomy > policy.maxAutonomy) {
      return { allowed: false, reason: "Policy autonomy ceiling exceeded", approvalRequired: true };
    }

    if (!approval) {
      return { allowed: false, reason: "Missing approval", approvalRequired: true };
    }

    if (
      approval.actionPlanId !== plan.id ||
      approval.actionHash !== currentActionHash ||
      hashActionPlanSync(plan) !== currentActionHash
    ) {
      return {
        allowed: false,
        reason: "Approval is not bound to current action",
        approvalRequired: true
      };
    }

    const token = approvalTokenId(approval.actionPlanId, approval.actionHash);
    if (this.consumedTokens.has(token)) {
      return { allowed: false, reason: "Approval token already consumed", approvalRequired: true };
    }

    return { allowed: true, reason: "Approved action hash matches", approvalRequired: true };
  }

  consume(approval: Approval): void {
    this.consumedTokens.add(approvalTokenId(approval.actionPlanId, approval.actionHash));
  }
}

export function decidePermission(
  plan: ActionPlan,
  policy: PermissionPolicy | undefined,
  approval: Approval | undefined,
  currentActionHash: string
): PermissionDecision {
  return new PermissionEngine().authorize(plan, policy, approval, currentActionHash);
}

export function canModelGrantAutonomy(_: AutonomyLevel): false {
  return false;
}

export function issueApproval(
  plan: ActionPlan,
  actionHash: string,
  deviceId: string,
  approvedAt: string
): Approval {
  return {
    actionPlanId: plan.id,
    actionHash,
    approvedAt,
    deviceId
  };
}
