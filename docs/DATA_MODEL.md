# Canonical Data Model

All records below are **local** unless explicitly marked `CLOUD_ALLOWED`.

## Type principles
- immutable IDs (UUIDv7/ULID);
- provider IDs never serve as primary key;
- timestamps UTC + render in user timezone;
- structured provenance for inferred facts;
- hashes are integrity references, not substitutes for encryption.

## Core records

```ts
type SourceRef = {
  sourceId: string;
  provider: "gmail" | "google_calendar" | "drive" | "manual";
  providerId: string;
  contentHash: string;
};

type Person = {
  id: string;
  displayName: string;
  aliases: string[];
  relationship?: string;
  confidence: number;
  provenance: SourceRef[];
};

type Commitment = {
  id: string;
  direction: "user_owes" | "other_owes";
  statement: string;
  counterpartyId?: string;
  dueAt?: string;
  status: "open" | "done" | "cancelled" | "uncertain";
  confidence: number;
  sourceRefs: SourceRef[];
};

type WorkItem = {
  id: string;
  kind:
    | "commitment"
    | "follow_up"
    | "meeting_prep"
    | "calendar_conflict"
    | "reply"
    | "routine";
  title: string;
  urgency: number;
  importance: number;
  confidence: number;
  status: "detected" | "prepared" | "needs_approval" | "running" | "verified" | "dismissed" | "failed";
  sourceRefs: SourceRef[];
};

type ActionPlan = {
  id: string;
  workItemId: string;
  intent: string;
  actionType:
    | "email.draft"
    | "email.send"
    | "calendar.create"
    | "calendar.update"
    | "calendar.delete";
  payload: unknown;
  evidenceRefs: SourceRef[];
  consequence: "low" | "medium" | "high" | "prohibited";
  reversible: boolean;
  requiredAutonomy: 0 | 1 | 2 | 3 | 4;
  expectedPostcondition: unknown;
};

type PermissionPolicy = {
  id: string;
  actionType: ActionPlan["actionType"];
  maxAutonomy: 0 | 1 | 2 | 3 | 4;
  constraints: Record<string, unknown>;
  createdByUser: boolean;
  enabled: boolean;
};

type ActionReceipt = {
  id: string;
  actionPlanId: string;
  startedAt: string;
  completedAt?: string;
  connector: string;
  outcome: "verified" | "failed" | "partial" | "reversed";
  verification: Record<string, unknown>;
  inputHash: string;
  outputHash?: string;
  privacy: {
    externalModelUsed: boolean;
    provider?: string;
    categoriesSent: string[];
  };
};
```

## CLOUD_ALLOWED

```ts
type CloudAccount = {
  accountId: string;
  createdAt: string;
  plan: string;
  stripeCustomerId?: string;
};

type CloudDevice = {
  deviceId: string;
  accountId: string;
  publicKey: string;
  platform: string;
  appVersion: string;
  pushRoutingId?: string;
  lastSeenAt?: string;
};

type CloudTelemetry = {
  event:
    | "app_open"
    | "briefing_viewed"
    | "decision_approved"
    | "decision_dismissed"
    | "action_verified"
    | "action_failed";
  deviceIdHash: string;
  numeric: Record<string, number>;
  flags: Record<string, boolean>;
};
```

Cloud telemetry must reject arbitrary strings except fixed enums/version identifiers.
