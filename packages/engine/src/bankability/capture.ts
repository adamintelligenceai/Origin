/** Default capture factors (BLUEPRINT §21) — editable via assumptions. */
export const DEFAULT_CAPTURE_BASE: Record<string, number> = {
  B1: 0.8,
  P1: 0.75,
  S1: 0.5,
  P2: 0.6,
  P3: 0.45,
  P4: 0.4,
  P5: 0.35,
  S2: 0.3,
  S3: 0.3,
  P6: 0.25,
};

export const EVIDENCE_WEIGHT: Record<'A' | 'B' | 'C', number> = {
  A: 1,
  B: 0.85,
  C: 0.6,
};

export function bankableScenario(input: {
  allocatedValue: number;
  checkId: string;
  evidenceGrade: 'A' | 'B' | 'C';
  scenario: 'LOW' | 'BASE' | 'HIGH';
  riskModifier?: number;
  captureOverrides?: Record<string, number>;
}): number {
  const base = (input.captureOverrides ?? DEFAULT_CAPTURE_BASE)[input.checkId] ?? 0.3;
  const factor =
    input.scenario === 'LOW' ? base * 0.7 : input.scenario === 'HIGH' ? Math.min(1, base * 1.3) : base;
  return (
    input.allocatedValue *
    factor *
    EVIDENCE_WEIGHT[input.evidenceGrade] *
    (input.riskModifier ?? 1)
  );
}
