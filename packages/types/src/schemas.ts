import { z } from "zod";

export const autonomyLevelSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4)
]);

export const consequenceSchema = z.enum(["low", "medium", "high", "prohibited"]);

export const actionTypeSchema = z.enum([
  "email.draft",
  "email.send",
  "calendar.create",
  "calendar.update",
  "calendar.delete"
]);

export const providerSchema = z.enum([
  "gmail",
  "google_calendar",
  "drive",
  "manual",
  "phone",
  "sms",
  "linkedin",
  "instagram",
  "facebook",
  "x"
]);

export const sourceRefSchema = z.object({
  sourceId: z.string().min(1),
  provider: providerSchema,
  providerId: z.string().min(1),
  contentHash: z.string().min(1)
});

export const personSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  aliases: z.array(z.string()),
  relationship: z.string().min(1).optional(),
  confidence: z.number().min(0).max(1),
  provenance: z.array(sourceRefSchema)
});

export const commitmentSchema = z.object({
  id: z.string().min(1),
  direction: z.enum(["user_owes", "other_owes"]),
  statement: z.string().min(1),
  counterpartyId: z.string().min(1).optional(),
  dueAt: z.string().datetime({ offset: true }).optional(),
  status: z.enum(["open", "done", "cancelled", "uncertain"]),
  confidence: z.number().min(0).max(1),
  sourceRefs: z.array(sourceRefSchema)
});

export const workItemSchema = z.object({
  id: z.string().min(1),
  kind: z.enum([
    "commitment",
    "follow_up",
    "meeting_prep",
    "calendar_conflict",
    "reply",
    "routine",
    "missed_call"
  ]),
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
  urgency: z.number().min(0).max(1),
  importance: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  status: z.enum([
    "detected",
    "prepared",
    "needs_approval",
    "running",
    "verified",
    "dismissed",
    "failed"
  ]),
  sourceRefs: z.array(sourceRefSchema)
});

export const actionPlanSchema = z.object({
  id: z.string().min(1),
  workItemId: z.string().min(1),
  intent: z.string().min(1),
  actionType: actionTypeSchema,
  payload: z.unknown(),
  evidenceRefs: z.array(sourceRefSchema),
  consequence: consequenceSchema,
  reversible: z.boolean(),
  requiredAutonomy: autonomyLevelSchema,
  expectedPostcondition: z.unknown()
});

export const permissionPolicySchema = z.object({
  id: z.string().min(1),
  actionType: actionTypeSchema,
  maxAutonomy: autonomyLevelSchema,
  constraints: z.record(z.string(), z.unknown()),
  createdByUser: z.boolean(),
  enabled: z.boolean()
});

export const approvalSchema = z.object({
  actionPlanId: z.string().min(1),
  actionHash: z.string().min(1),
  approvedAt: z.string().min(1),
  deviceId: z.string().min(1),
  policyId: z.string().min(1).optional()
});

export const privacyReceiptSchema = z.object({
  externalModelUsed: z.boolean(),
  provider: z.string().min(1).optional(),
  purpose: z.string().min(1),
  categoriesSent: z.array(z.string())
});

export const actionReceiptSchema = z.object({
  id: z.string().min(1),
  actionPlanId: z.string().min(1),
  startedAt: z.string().min(1),
  completedAt: z.string().min(1).optional(),
  connector: z.string().min(1),
  outcome: z.enum(["verified", "failed", "partial", "reversed"]),
  verification: z.record(z.string(), z.unknown()),
  inputHash: z.string().min(1),
  outputHash: z.string().min(1).optional(),
  privacy: privacyReceiptSchema
});

export const cloudTelemetryEventSchema = z.enum([
  "app_open",
  "briefing_viewed",
  "decision_approved",
  "decision_dismissed",
  "action_verified",
  "action_failed"
]);

export const cloudAccountSchema = z
  .object({
    accountId: z.string().min(1),
    createdAt: z.string().min(1),
    plan: z.string().min(1),
    stripeCustomerId: z.string().min(1).optional()
  })
  .strict();

export const cloudDeviceSchema = z
  .object({
    deviceId: z.string().min(1),
    accountId: z.string().min(1),
    publicKey: z.string().min(1),
    platform: z.string().min(1),
    appVersion: z.string().min(1),
    pushRoutingId: z.string().min(1).optional(),
    lastSeenAt: z.string().min(1).optional()
  })
  .strict();

export const cloudTelemetrySchema = z
  .object({
    event: cloudTelemetryEventSchema,
    deviceIdHash: z.string().min(1),
    numeric: z.record(z.string(), z.number()),
    flags: z.record(z.string(), z.boolean())
  })
  .strict();

export type AutonomyLevel = z.infer<typeof autonomyLevelSchema>;
export type Consequence = z.infer<typeof consequenceSchema>;
export type ActionType = z.infer<typeof actionTypeSchema>;
export type SourceRef = z.infer<typeof sourceRefSchema>;
export type Person = z.infer<typeof personSchema>;
export type Commitment = z.infer<typeof commitmentSchema>;
export type WorkItem = z.infer<typeof workItemSchema>;
export type ActionPlan = z.infer<typeof actionPlanSchema>;
export type PermissionPolicy = z.infer<typeof permissionPolicySchema>;
export type Approval = z.infer<typeof approvalSchema>;
export type PrivacyReceipt = z.infer<typeof privacyReceiptSchema>;
export type ActionReceipt = z.infer<typeof actionReceiptSchema>;
export type CloudAccount = z.infer<typeof cloudAccountSchema>;
export type CloudDevice = z.infer<typeof cloudDeviceSchema>;
export type CloudTelemetry = z.infer<typeof cloudTelemetrySchema>;
