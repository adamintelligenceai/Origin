export type AutonomyLevel = 0 | 1 | 2 | 3 | 4;

export type Consequence = "low" | "medium" | "high" | "prohibited";

export type ActionType =
  "email.draft" | "email.send" | "calendar.create" | "calendar.update" | "calendar.delete";

export interface SourceRef {
  sourceId: string;
  provider: "gmail" | "google_calendar" | "drive" | "manual";
  providerId: string;
  contentHash: string;
}

export interface Commitment {
  id: string;
  direction: "user_owes" | "other_owes";
  statement: string;
  counterpartyId?: string;
  dueAt?: string;
  status: "open" | "done" | "cancelled" | "uncertain";
  confidence: number;
  sourceRefs: SourceRef[];
}

export interface WorkItem {
  id: string;
  kind: "commitment" | "follow_up" | "meeting_prep" | "calendar_conflict" | "reply" | "routine";
  title: string;
  urgency: number;
  importance: number;
  confidence: number;
  status:
    "detected" | "prepared" | "needs_approval" | "running" | "verified" | "dismissed" | "failed";
  sourceRefs: SourceRef[];
}

export interface ActionPlan<TPayload = unknown, TExpected = unknown> {
  id: string;
  workItemId: string;
  intent: string;
  actionType: ActionType;
  payload: TPayload;
  evidenceRefs: SourceRef[];
  consequence: Consequence;
  reversible: boolean;
  requiredAutonomy: AutonomyLevel;
  expectedPostcondition: TExpected;
}

export interface PermissionPolicy {
  id: string;
  actionType: ActionType;
  maxAutonomy: AutonomyLevel;
  constraints: Record<string, unknown>;
  createdByUser: boolean;
  enabled: boolean;
}

export interface Approval {
  actionPlanId: string;
  actionHash: string;
  approvedAt: string;
  deviceId: string;
  policyId?: string;
}

export interface PrivacyReceipt {
  externalModelUsed: boolean;
  provider?: string;
  purpose: string;
  categoriesSent: string[];
}

export interface ActionReceipt {
  id: string;
  actionPlanId: string;
  startedAt: string;
  completedAt?: string;
  connector: string;
  outcome: "verified" | "failed" | "partial" | "reversed";
  verification: Record<string, unknown>;
  inputHash: string;
  outputHash?: string;
  privacy: PrivacyReceipt;
}
