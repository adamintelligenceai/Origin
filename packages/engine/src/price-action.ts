import type { RiskBand } from '@marginshield/schemas';

export const DEFAULT_MAX_INCREASE: Record<RiskBand, number> = {
  LOW: 0.1,
  MEDIUM: 0.06,
  HIGH: 0.03,
};

export function restorePrice(landedCost: bigint, targetMargin: number): bigint {
  const denom = BigInt(Math.round((1 - targetMargin) * 10_000));
  if (denom <= 0n) throw new Error('Invalid target margin');
  return (landedCost * 10_000n) / denom;
}

export function guardedPrice(
  currentPrice: bigint,
  targetPrice: bigint,
  risk: RiskBand,
  maxIncrease = DEFAULT_MAX_INCREASE,
): bigint {
  if (targetPrice <= currentPrice) return currentPrice;
  const cap = (currentPrice * BigInt(Math.round((1 + maxIncrease[risk]) * 10_000))) / 10_000n;
  return targetPrice < cap ? targetPrice : cap;
}

export type PriceScenario = 'CONSERVATIVE' | 'RECOMMENDED' | 'FULL_RESTORE';

export function scenarioPrice(
  current: bigint,
  guarded: bigint,
  full: bigint,
  scenario: PriceScenario,
): { price: bigint; exceedsGuardrail: boolean } {
  switch (scenario) {
    case 'CONSERVATIVE':
      return { price: current + (guarded - current) / 2n, exceedsGuardrail: false };
    case 'RECOMMENDED':
      return { price: guarded, exceedsGuardrail: false };
    case 'FULL_RESTORE':
      return { price: full, exceedsGuardrail: full > guarded };
    default: {
      const _x: never = scenario;
      return _x;
    }
  }
}

export function breakEvenVolumeRetention(c0: bigint, c1: bigint): {
  retention: number;
  maxDecline: number;
} {
  if (c1 <= 0n) return { retention: Number.POSITIVE_INFINITY, maxDecline: Number.NEGATIVE_INFINITY };
  const retention = Number(c0) / Number(c1);
  return { retention, maxDecline: 1 - retention };
}

export function staticVolumeUpside(newPrice: bigint, currentPrice: bigint, t12mQty: number): bigint {
  const q = BigInt(Math.round(t12mQty * 10_000));
  return ((newPrice - currentPrice) * q) / 10_000n;
}
