import type { ActionPlan } from "@project-chief/types";

/** Deterministic hash for binding approvals to the current action payload. */
export function computeActionHash(plan: ActionPlan): string {
  const canonical = JSON.stringify({
    id: plan.id,
    actionType: plan.actionType,
    intent: plan.intent,
    payload: plan.payload,
    consequence: plan.consequence
  });

  let hash = 0;
  for (let i = 0; i < canonical.length; i++) {
    hash = (hash << 5) - hash + canonical.charCodeAt(i);
    hash |= 0;
  }
  return `hash-${Math.abs(hash).toString(16)}`;
}
