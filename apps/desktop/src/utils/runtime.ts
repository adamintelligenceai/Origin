import { hashActionPlan, issueApproval, PermissionEngine } from "@project-chief/permissions";
import type { ActionPlan } from "@project-chief/types";
import type { DecisionState, SyntheticDecision, SyntheticReceipt } from "../fixtures/synthetic.js";

const engine = new PermissionEngine();

export function planForDecision(decision: SyntheticDecision): ActionPlan {
  const mutating = decision.actionType !== "email.draft";
  return {
    id: `plan-${decision.id}`,
    workItemId: decision.id,
    intent: decision.title,
    actionType: decision.actionType,
    payload: { decisionId: decision.id, action: decision.action },
    evidenceRefs: [],
    consequence: decision.consequence,
    reversible: true,
    requiredAutonomy: mutating ? 3 : 2,
    expectedPostcondition: { done: true }
  };
}

export async function approveDecision(
  decision: SyntheticDecision,
  delay = 720
): Promise<{ state: DecisionState; receipt: SyntheticReceipt }> {
  const plan = planForDecision(decision);
  const hash = await hashActionPlan(plan);
  const mutating = plan.actionType !== "email.draft";
  const approval = mutating
    ? issueApproval(plan, hash, "desktop-node", new Date().toISOString())
    : undefined;
  const decisionResult = engine.authorize(plan, undefined, approval, hash);
  if (!decisionResult.allowed) {
    return {
      state: "attention",
      receipt: receiptFor(decision, "Needs attention", decisionResult.reason)
    };
  }
  if (approval) {
    engine.consume(approval);
  }

  await wait(delay);
  return {
    state: "verified",
    receipt: receiptFor(decision, "Verified", "External state matched the expected postcondition.")
  };
}

export function receiptFor(
  decision: SyntheticDecision,
  title: string,
  result: string
): SyntheticReceipt {
  return {
    id: `r-${decision.id}-${Date.now()}`,
    title: `${title}: ${decision.title}`,
    why: decision.detail,
    evidence: decision.evidence.join(" · "),
    permission: decision.actionType === "email.draft" ? "A2 · preparation" : "A3 · you approved",
    result,
    provider: decision.privacy,
    reversible: true,
    at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
