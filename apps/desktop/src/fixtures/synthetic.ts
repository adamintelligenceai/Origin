export type RouteName =
  | "today"
  | "decisions"
  | "chief"
  | "commitments"
  | "activity"
  | "people"
  | "routines"
  | "connections"
  | "privacy";

export type DecisionState = "ready" | "executing" | "verified" | "attention" | "dismissed";

export interface SyntheticDecision {
  id: string;
  title: string;
  detail: string;
  action: string;
  consequence: "low" | "medium" | "high";
  privacy: "On device" | "External AI";
  evidence: string[];
  filter: ("now" | "today" | "week" | "low" | "consequential")[];
  state: DecisionState;
}

export interface SyntheticCommitment {
  id: string;
  direction: "user_owes" | "other_owes";
  statement: string;
  person: string;
  source: string;
  due: string;
  status: "open" | "uncertain";
}

export interface SyntheticReceipt {
  id: string;
  title: string;
  why: string;
  evidence: string;
  permission: string;
  result: string;
  provider: string;
  reversible: boolean;
  at: string;
}

export interface SyntheticPerson {
  id: string;
  name: string;
  relationship: string;
  openItems: number;
}

export const initialDecisions: SyntheticDecision[] = [
  {
    id: "d1",
    title: "Follow up on the requested proposal",
    detail: "You were told it would arrive Friday. Nothing matching it has arrived.",
    action: "Prepare follow-up",
    consequence: "low",
    privacy: "On device",
    evidence: ["Gmail · Thu 16:12", "Thread with Jordan"],
    filter: ["now", "today", "low"],
    state: "ready"
  },
  {
    id: "d2",
    title: "Resolve tomorrow's calendar conflict",
    detail: "Two commitments overlap by 30 minutes. The later meeting has more flexibility.",
    action: "Review options",
    consequence: "medium",
    privacy: "On device",
    evidence: ["Calendar · 09:00", "Calendar · 09:30"],
    filter: ["today", "consequential"],
    state: "ready"
  },
  {
    id: "d3",
    title: "Reply is ready",
    detail: "A response has been prepared from the latest thread. Sending requires your approval.",
    action: "Review draft",
    consequence: "high",
    privacy: "External AI",
    evidence: ["Gmail · this morning"],
    filter: ["now", "today", "consequential"],
    state: "ready"
  }
];

export const commitments: SyntheticCommitment[] = [
  {
    id: "c1",
    direction: "other_owes",
    statement: "Send the revised proposal",
    person: "Jordan Blake",
    source: "Gmail",
    due: "Yesterday",
    status: "open"
  },
  {
    id: "c2",
    direction: "user_owes",
    statement: "Share the board pack before Monday",
    person: "Amina Shah",
    source: "Calendar",
    due: "Sunday 18:00",
    status: "open"
  }
];

export const people: SyntheticPerson[] = [
  { id: "p1", name: "Jordan Blake", relationship: "Operator", openItems: 2 },
  { id: "p2", name: "Amina Shah", relationship: "Board", openItems: 1 },
  { id: "p3", name: "Chris Ortega", relationship: "Counsel", openItems: 0 }
];

export const initialReceipts: SyntheticReceipt[] = [
  {
    id: "r0",
    title: "Meeting updated",
    why: "Hold was shortened so the later conversation could start on time.",
    evidence: "Calendar event #evt-1842",
    permission: "A3 · you approved",
    result: "Calendar state confirmed at 08:42.",
    provider: "On device",
    reversible: true,
    at: "08:42"
  }
];
