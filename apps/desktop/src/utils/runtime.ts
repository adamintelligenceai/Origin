import { hashActionPlan, issueApproval, PermissionEngine } from "@project-chief/permissions";
import type { ActionPlan } from "@project-chief/types";
import type { DecisionState, SyntheticDecision, SyntheticReceipt } from "../fixtures/synthetic.js";

const engine = new PermissionEngine();

export async function approveDecision(
  decision: SyntheticDecision,
  delay = 720
): Promise<{ state: DecisionState; receipt: SyntheticReceipt }> {
  const plan: ActionPlan = {
    id: `plan-${decision.id}`,
    workItemId: decision.id,
    intent: decision.title,
    actionType: decision.consequence === "low" ? "email.draft" : "email.send",
    payload: { decisionId: decision.id },
    evidenceRefs: [],
    consequence: decision.consequence === "high" ? "high" : "medium",
    reversible: true,
    requiredAutonomy: decision.consequence === "low" ? 2 : 3,
    expectedPostcondition: { done: true }
  };

  if (plan.actionType === "email.send") {
    const hash = await hashActionPlan(plan);
    const approval = issueApproval(plan, hash, "desktop-node", new Date().toISOString());
    const decisionResult = engine.authorize(plan, undefined, approval, hash);
    if (!decisionResult.allowed) {
      return {
        state: "attention",
        receipt: receiptFor(decision, "Needs attention", decisionResult.reason)
      };
    }
    engine.consume(approval);
  }

  await wait(delay);
  return {
    state: "verified",
    receipt: receiptFor(decision, "Verified", "External state matched the expected postcondition.")
  };
}

function receiptFor(decision: SyntheticDecision, title: string, result: string): SyntheticReceipt {
  return {
    id: `r-${decision.id}-${Date.now()}`,
    title: `${title}: ${decision.title}`,
    why: decision.detail,
    evidence: decision.evidence.join(" · "),
    permission: decision.consequence === "low" ? "A2 · preparation" : "A3 · you approved",
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
