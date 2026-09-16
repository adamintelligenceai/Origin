import { revokedConnections, type ChiefSnapshot } from "@project-chief/runtime";
import type { ActionPlan, ActionReceipt, SourceRef, WorkItem } from "@project-chief/types";
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
    meetingPrep: [],
    routines: [],
    briefing: "",
    timeSavedMinutes: 0,
    connections: revokedConnections(),
    wiped: false,
    oauthMode: "fixture",
    flags: {
      mutationsEnabled: true,
      billingEnabled: true,
      socialOAuthEnabled: true,
      modelRouteEnabled: true,
      killSwitch: false
    },
    onboardingComplete: true,
    online: true,
    storeCorrupt: false
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
    person: personName(snapshot, item.counterpartyId, item.statement),
    source: sourceLabel(item.sourceRefs[0]?.provider),
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
    detail: item.summary ?? item.title,
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
    atRisk: item.kind === "calendar_conflict" || item.kind === "missed_call"
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
  const filters: SyntheticDecision["filter"] = ["today", "week"];
  if (item.kind === "follow_up" || item.kind === "reply" || item.kind === "missed_call") {
    filters.push("now");
  }
  if (
    item.kind === "calendar_conflict" ||
    item.kind === "reply" ||
    item.kind === "missed_call"
  ) {
    filters.push("consequential");
  }
  if (item.kind === "commitment" || item.kind === "follow_up" || item.kind === "meeting_prep") {
    filters.push("low");
  }
  return filters;
}

function sourceLabel(provider: SourceRef["provider"] | undefined): string {
  switch (provider) {
    case "gmail":
      return "Gmail";
    case "google_calendar":
      return "Calendar";
    case "drive":
      return "Drive";
    case "manual":
      return "Manual";
    case "phone":
      return "Phone";
    case "sms":
      return "SMS";
    case "linkedin":
      return "LinkedIn";
    case "instagram":
      return "Instagram";
    case "facebook":
      return "Facebook";
    case "x":
      return "X";
    case undefined:
      return "On device";
    default: {
      const exhaustive: never = provider;
      return exhaustive;
    }
  }
}

function personName(
  snapshot: ChiefSnapshot,
  counterpartyId: string | undefined,
  statement: string
): string {
  const named = snapshot.people.find((person) => person.id === counterpartyId);
  if (named) {
    return named.displayName;
  }
  const match = snapshot.people.find(
    (person) =>
      statement.toLowerCase().includes(person.displayName.toLowerCase()) ||
      person.aliases.some((alias) => statement.toLowerCase().includes(alias.toLowerCase()))
  );
  return match?.displayName ?? "Unknown";
}

export function formatTimeSaved(minutes: number): string {
  if (minutes <= 0) {
    return "0m";
  }
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) {
    return `${remainder}m`;
  }
  return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}m`;
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
