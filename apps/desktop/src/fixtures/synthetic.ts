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
