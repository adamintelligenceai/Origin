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

export type DecisionFilter = "now" | "today" | "week" | "low" | "consequential";

export interface SyntheticDecision {
  id: string;
  title: string;
  detail: string;
  action: string;
  actionType: "email.draft" | "email.send" | "calendar.update";
  consequence: "low" | "medium" | "high";
  privacy: "On device" | "External AI";
  evidence: string[];
  filter: DecisionFilter[];
  state: DecisionState;
  atRisk: boolean;
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

export interface SyntheticRoutine {
  id: string;
  title: string;
  trigger: string;
  writtenBy: "You";
  status: "active" | "paused";
}

export interface SyntheticMeeting {
  id: string;
  title: string;
  when: string;
  conflict?: string;
}

export const initialDecisions: SyntheticDecision[] = [
  {
    id: "d1",
    title: "Follow up on the requested proposal",
    detail: "You were told it would arrive Friday. Nothing matching it has arrived.",
    action: "Prepare a follow-up draft to Jordan",
    actionType: "email.draft",
    consequence: "low",
    privacy: "On device",
    evidence: ["Gmail · Thu 16:12", "Thread with Jordan"],
    filter: ["now", "today", "low"],
    state: "ready",
    atRisk: false
  },
  {
    id: "d2",
    title: "Resolve tomorrow's calendar conflict",
    detail: "Two commitments overlap by 30 minutes. The later meeting has more flexibility.",
    action: "Shorten the 09:30 hold by 30 minutes",
    actionType: "calendar.update",
    consequence: "medium",
    privacy: "On device",
    evidence: ["Calendar · 09:00", "Calendar · 09:30"],
    filter: ["today", "consequential"],
    state: "ready",
    atRisk: true
  },
  {
    id: "d3",
    title: "Reply is ready",
    detail: "A response has been prepared from the latest thread. Sending requires your approval.",
    action: "Send the prepared reply",
    actionType: "email.send",
    consequence: "high",
    privacy: "External AI",
    evidence: ["Gmail · this morning"],
    filter: ["now", "today", "consequential"],
    state: "ready",
    atRisk: false
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

export const routines: SyntheticRoutine[] = [
  {
    id: "rt1",
    title: "Sunday board-pack reminder",
    trigger: "Sundays at 16:00",
    writtenBy: "You",
    status: "active"
  }
];

export const meetings: SyntheticMeeting[] = [
  { id: "m1", title: "Board prep with Amina", when: "Tomorrow 09:00" },
  {
    id: "m2",
    title: "Hold: proposal review",
    when: "Tomorrow 09:30",
    conflict: "Overlaps the board prep by 30 minutes"
  }
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
