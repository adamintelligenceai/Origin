import type { ActionPlan, WorkItem } from "@project-chief/types";

export function proposeActionPlan(item: WorkItem): ActionPlan {
  const actionType =
    item.kind === "calendar_conflict"
      ? "calendar.update"
      : item.kind === "reply"
        ? "email.send"
        : "email.draft";
  return {
    id: `plan-${item.id}`,
    workItemId: item.id,
    intent: item.title,
    actionType,
    payload: { synthetic: true },
    evidenceRefs: item.sourceRefs,
    consequence: actionType === "calendar.update" ? "medium" : "low",
    reversible: true,
    requiredAutonomy: actionType === "calendar.update" ? 3 : 2,
    expectedPostcondition: { prepared: true }
  };
}
