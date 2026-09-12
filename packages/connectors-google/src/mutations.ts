import { hashActionPlan, issueApproval, type PermissionEngine } from "@project-chief/permissions";
import type { ActionPlan, ActionReceipt } from "@project-chief/types";
import { classifyVerification } from "@project-chief/ledger";

export interface MutationResult {
  receipt: ActionReceipt;
}

export async function executeApprovedMutation(
  engine: PermissionEngine,
  plan: ActionPlan,
  deviceId: string,
  mutate: () => Promise<{ id: string }>,
  verify: () => Promise<{ found: boolean; matches: boolean }>
): Promise<MutationResult> {
  const hash = await hashActionPlan(plan);
  const approval = issueApproval(plan, hash, deviceId, new Date().toISOString());
  const decision = engine.authorize(plan, undefined, approval, hash);
  if (!decision.allowed) {
    throw new Error(decision.reason);
  }
  engine.consume(approval);
  const startedAt = new Date().toISOString();
  let outcome: ActionReceipt["outcome"];
  let outputHash: string | undefined;
  try {
    const executed = await mutate();
    const verified = await verify();
    outcome = classifyVerification(verified.found, verified.matches);
    outputHash = executed.id;
  } catch {
    outcome = "failed";
  }
  return {
    receipt: {
      id: `receipt-${plan.id}`,
      actionPlanId: plan.id,
      startedAt,
      completedAt: new Date().toISOString(),
      connector: plan.actionType.split(".")[0] ?? "unknown",
      outcome,
      verification: { outcome },
      inputHash: hash,
      ...(outputHash ? { outputHash } : {}),
      privacy: {
        externalModelUsed: false,
        purpose: plan.intent,
        categoriesSent: []
      }
    }
  };
}
