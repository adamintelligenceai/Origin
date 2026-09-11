import type { CheckId, EvidenceGrade, RiskBand } from '@marginshield/schemas';

export type Scenario = 'LOW' | 'BASE' | 'HIGH';
export type CaptureFactors = Record<CheckId, { low: number; base: number; high: number }>;

export const DEFAULT_CAPTURE: CaptureFactors = {
  B1: { low: 0.56, base: 0.8, high: 1.0 },
  B2: { low: 0, base: 0, high: 0 },
  B3: { low: 0, base: 0, high: 0 },
  S1: { low: 0.35, base: 0.5, high: 0.65 },
  S2: { low: 0.21, base: 0.3, high: 0.39 },
  S3: { low: 0.21, base: 0.3, high: 0.39 },
  P1: { low: 0.525, base: 0.75, high: 0.975 },
  P2: { low: 0.42, base: 0.6, high: 0.78 },
  P3: { low: 0.25, base: 0.45, high: 0.65 },
  P4: { low: 0.28, base: 0.4, high: 0.52 },
  P5: { low: 0.245, base: 0.35, high: 0.455 },
  P6: { low: 0.175, base: 0.25, high: 0.325 },
  P7: { low: 0, base: 0, high: 0 },
};

const EVIDENCE_WEIGHT: Record<EvidenceGrade, number> = { A: 1, B: 0.85, C: 0.6 };
const RISK_MODIFIER: Record<RiskBand, number> = { LOW: 1, MEDIUM: 0.8, HIGH: 0.6 };

export function bankableScaled(
  allocated: bigint,
  checkId: CheckId,
  grade: EvidenceGrade,
  risk: RiskBand,
  scenario: Scenario,
  capture: CaptureFactors = DEFAULT_CAPTURE,
): bigint {
  const f = capture[checkId];
  const c = scenario === 'LOW' ? f.low : scenario === 'BASE' ? f.base : f.high;
  const weight = c * EVIDENCE_WEIGHT[grade] * RISK_MODIFIER[risk];
  return (allocated * BigInt(Math.round(weight * 10_000))) / 10_000n;
}

export function commercialRiskScore(input: {
  revenueConcentration: number;
  priceVsPeerMedian: number;
  monthsSinceIncrease: number;
  volumeTrajectory: number;
  purchaseBreadth: number;
  tenureYears: number;
}): { score: number; band: RiskBand } {
  const conc = Math.min(1, Math.max(0, input.revenueConcentration)) * 100;
  const pricePos = input.priceVsPeerMedian >= 1.05 ? 80 : input.priceVsPeerMedian >= 0.95 ? 50 : 20;
  const recency = input.monthsSinceIncrease <= 3 ? 90 : input.monthsSinceIncrease <= 9 ? 55 : 20;
  const volume = input.volumeTrajectory <= -0.1 ? 85 : input.volumeTrajectory <= 0 ? 50 : 20;
  const breadth = (1 - Math.min(1, Math.max(0, input.purchaseBreadth))) * 100;
  const tenure = input.tenureYears < 1 ? 80 : input.tenureYears < 3 ? 45 : 15;
  const score = Math.round(
    conc * 0.25 + pricePos * 0.25 + recency * 0.2 + volume * 0.15 + breadth * 0.1 + tenure * 0.05,
  );
  const clamped = Math.min(100, Math.max(0, score));
  const band: RiskBand = clamped <= 39 ? 'LOW' : clamped <= 69 ? 'MEDIUM' : 'HIGH';
  return { score: clamped, band };
}

export function marginIntegrityIndex(
  detectedOrVerified: bigint,
  modelled: bigint,
  t12mNetSales: bigint,
): number {
  if (t12mNetSales <= 0n) return 0;
  const weighted = detectedOrVerified + modelled / 2n;
  const exposureRate = Number(weighted) / Number(t12mNetSales);
  return Math.round(Math.min(100, Math.max(0, 100 - 1000 * exposureRate)));
}
