import { actionPlanSchema, type ActionPlan } from "@project-chief/types";
import { containsProhibitedIntent, defaultRequiredAutonomy, isMutatingAction } from "./policy.js";

export type ActionPlanValidation = { ok: true; plan: ActionPlan } | { ok: false; reason: string };

export function validateActionPlan(input: unknown): ActionPlanValidation {
  const parsed = actionPlanSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, reason: "Unknown or invalid action plan" };
  }

  const plan = parsed.data;

  if (containsProhibitedIntent(plan.intent) || plan.consequence === "prohibited") {
    return { ok: false, reason: "Prohibited action class" };
  }

  if (isMutatingAction(plan.actionType) && plan.requiredAutonomy < 3) {
    return { ok: false, reason: "Mutations default to A3 and cannot be lowered by the model" };
  }

  if (plan.requiredAutonomy < defaultRequiredAutonomy(plan.actionType)) {
    return { ok: false, reason: "Required autonomy is below policy floor" };
  }

  return { ok: true, plan };
}
