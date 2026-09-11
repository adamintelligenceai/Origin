import type { Finding } from '@marginshield/schemas';
import { money, moneyString, zero } from './money';
import type { MethodConfig, RiskBand } from './types';

export function bankableFor(
  allocated: ReturnType<typeof money>,
  checkId: Finding['check_id'],
  grade: Finding['evidence_grade'],
  band: RiskBand,
  config: MethodConfig,
): { low: string; base: string; high: string } {
  const cap = config.capture[checkId];
  const weight = config.evidence_weight[grade];
  const risk = config.risk_multiplier[band];
  const apply = (factor: number) => money(allocated.times(factor).times(weight).times(risk));
  if (!cap || cap.base === 0) {
    return { low: moneyString(0), base: moneyString(0), high: moneyString(0) };
  }
  return {
    low: moneyString(apply(cap.low)),
    base: moneyString(apply(cap.base)),
    high: moneyString(apply(cap.high)),
  };
}

export function calibratedFactor(observed: number[], prior: number, k: number): { factor: number; n: number } {
  const n = observed.length;
  const mean = n === 0 ? prior : observed.reduce((a, b) => a + b, 0) / n;
  return { factor: (n * mean + k * prior) / (n + k), n };
}

export function emptyBankable() {
  return { low: moneyString(zero()), base: moneyString(zero()), high: moneyString(zero()) };
}
