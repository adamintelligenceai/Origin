import type { ActionPlan, WorkItem } from "@project-chief/types";

export function proposeActionPlan(item: WorkItem): ActionPlan {
  const actionType =
    item.kind === "calendar_conflict"
      ? "calendar.update"
      : item.kind === "reply"
        ? "email.send"
        : "email.draft";
  const consequence =
    actionType === "email.send" ? "high" : actionType === "calendar.update" ? "medium" : "low";
  return {
    id: `plan-${item.id}`,
    workItemId: item.id,
    intent: item.title,
    actionType,
    payload: { synthetic: true },
    evidenceRefs: item.sourceRefs,
    consequence,
    reversible: true,
    requiredAutonomy: actionType === "email.draft" ? 2 : 3,
    expectedPostcondition: { prepared: true }
  };
}
