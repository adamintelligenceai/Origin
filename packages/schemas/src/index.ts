import { z } from 'zod';

export const ValueClassSchema = z.enum([
  'DETECTED_LEAKAGE',
  'POLICY_LEAKAGE',
  'MODELLED_MARGIN_OPPORTUNITY',
  'CASH_ENTITLEMENT',
  'OPPORTUNITY',
  'INSIGHT',
  'OVERLAY',
  'BILLING_RISK',
]);
export type ValueClass = z.infer<typeof ValueClassSchema>;

export const EvidenceGradeSchema = z.enum(['A', 'B', 'C']);
export type EvidenceGrade = z.infer<typeof EvidenceGradeSchema>;

export const FindingStatusSchema = z.enum([
  'DETECTED',
  'REVIEWED',
  'VERIFIED',
  'REJECTED',
  'ACTION_PLANNED',
  'IMPLEMENTED',
  'REALIZED',
  'CLOSED',
]);
export type FindingStatus = z.infer<typeof FindingStatusSchema>;

export const ENGINE_VERSION = '0.1.0' as const;
