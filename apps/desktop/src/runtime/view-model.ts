import type { ChiefSnapshot } from "@project-chief/runtime";
import type { ActionPlan, ActionReceipt, WorkItem } from "@project-chief/types";
import type {
  DecisionState,
  SyntheticCommitment,
  SyntheticDecision,
  SyntheticMeeting,
  SyntheticPerson,
  SyntheticReceipt
} from "../fixtures/synthetic.js";

export function emptySnapshot(): ChiefSnapshot {
  return {
    workItems: [],
    commitments: [],
    plans: [],
    receipts: [],
    people: [],
    meetings: [],
    briefing: "",
    connections: { calendar: "connected", gmail: "connected" },
    wiped: false
  };
}

export function decisionsFromSnapshot(snapshot: ChiefSnapshot): SyntheticDecision[] {
  return snapshot.workItems.map((item) => {
    const plan = snapshot.plans.find((entry) => entry.workItemId === item.id);
    return toDecision(item, plan);
  });
}

export function commitmentsFromSnapshot(snapshot: ChiefSnapshot): SyntheticCommitment[] {
  return snapshot.commitments.map((item) => ({
    id: item.id,
    direction: item.direction,
    statement: item.statement,
    person: item.counterpartyId ?? "Unknown",
    source: item.sourceRefs[0]?.provider === "google_calendar" ? "Calendar" : "Gmail",
    due: item.dueAt ?? "Open",
    status: item.status === "uncertain" ? "uncertain" : "open"
  }));
}

export function peopleFromSnapshot(snapshot: ChiefSnapshot): SyntheticPerson[] {
  return snapshot.people.map((person) => ({
    id: person.id,
    name: person.displayName,
    relationship: person.relationship ?? "Person",
    openItems: snapshot.commitments.filter((item) => item.statement.includes(person.displayName))
      .length
  }));
}

export function meetingsFromSnapshot(snapshot: ChiefSnapshot): SyntheticMeeting[] {
  return snapshot.meetings.map((meeting) => ({
    id: meeting.id,
    title: meeting.title,
    when: meeting.when,
    ...(meeting.conflict ? { conflict: meeting.conflict } : {})
  }));
}

export function applySnapshot(
  snapshot: ChiefSnapshot,
  setDecisions: (items: SyntheticDecision[]) => void,
  setReceipts: (items: SyntheticReceipt[]) => void,
  setCommitments: (items: SyntheticCommitment[]) => void,
  setPeople: (items: SyntheticPerson[]) => void,
  setMeetings: (items: SyntheticMeeting[]) => void
): void {
  setDecisions(decisionsFromSnapshot(snapshot));
  setReceipts(receiptsFromSnapshot(snapshot));
  setCommitments(commitmentsFromSnapshot(snapshot));
  setPeople(peopleFromSnapshot(snapshot));
  setMeetings(meetingsFromSnapshot(snapshot));
}

export function receiptsFromSnapshot(snapshot: ChiefSnapshot): SyntheticReceipt[] {
  return snapshot.receipts.map((receipt) => toReceipt(receipt, snapshot));
}

function toDecision(item: WorkItem, plan: ActionPlan | undefined): SyntheticDecision {
  const action =
    plan &&
    typeof plan.payload === "object" &&
    plan.payload !== null &&
    "action" in plan.payload &&
    typeof plan.payload.action === "string"
      ? plan.payload.action
      : item.title;
  return {
    id: item.id,
    title: item.title,
    detail: item.title,
    action,
    actionType:
      plan?.actionType === "email.send"
        ? "email.send"
        : plan?.actionType === "calendar.update"
          ? "calendar.update"
          : "email.draft",
    consequence:
      plan?.consequence === "high" ? "high" : plan?.consequence === "low" ? "low" : "medium",
    privacy: "On device",
    evidence: item.sourceRefs.map((ref) => `${ref.provider} · ${ref.providerId}`),
    filter: filtersFor(item),
    state: stateFrom(item.status),
    atRisk: item.kind === "calendar_conflict"
  };
}

function toReceipt(receipt: ActionReceipt, snapshot: ChiefSnapshot): SyntheticReceipt {
  const plan = snapshot.plans.find((item) => item.id === receipt.actionPlanId);
  const title = plan?.intent ?? receipt.actionPlanId;
  return {
    id: receipt.id,
    title: `${labelOutcome(receipt.outcome)}: ${title}`,
    why: plan?.intent ?? title,
    evidence: plan?.evidenceRefs.map((ref) => ref.providerId).join(" · ") ?? receipt.inputHash,
    permission: plan?.actionType === "email.draft" ? "A2 · preparation" : "A3 · you approved",
    result:
      receipt.outcome === "verified"
        ? "External state matched the expected postcondition."
        : receiptDetail(receipt),
    provider: "On device",
    reversible: true,
    at: new Date(receipt.completedAt ?? receipt.startedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  };
}

function stateFrom(status: WorkItem["status"]): DecisionState {
  switch (status) {
    case "running":
      return "executing";
    case "verified":
      return "verified";
    case "failed":
      return "attention";
    case "dismissed":
      return "dismissed";
    case "detected":
    case "prepared":
    case "needs_approval":
      return "ready";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function filtersFor(item: WorkItem): SyntheticDecision["filter"] {
  const filters: SyntheticDecision["filter"] = ["today"];
  if (item.kind === "follow_up" || item.kind === "reply") filters.push("now");
  if (item.kind === "calendar_conflict" || item.kind === "reply") filters.push("consequential");
  if (item.kind === "commitment" || item.kind === "follow_up") filters.push("low");
  return filters;
}

function receiptDetail(receipt: ActionReceipt): string {
  const detail = receipt.verification.detail;
  return typeof detail === "string" ? detail : receipt.outcome;
}

function labelOutcome(outcome: ActionReceipt["outcome"]): string {
  switch (outcome) {
    case "verified":
      return "Verified";
    case "partial":
      return "Needs attention";
    case "failed":
      return "Needs attention";
    case "reversed":
      return "Reversed";
    default: {
      const exhaustive: never = outcome;
      return exhaustive;
    }
  }
}
