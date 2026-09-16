export function estimateUsd(inputTokens: number, outputTokens: number, usdPerMillion = 3): number {
  return ((inputTokens + outputTokens) * usdPerMillion) / 1_000_000;
}

export interface CostEntry {
  usd: number;
}

export class LocalCostLedger {
  private readonly entries: CostEntry[] = [];

  record(usd: number): void {
    this.entries.push({ usd });
  }

  total(): number {
    return this.entries.reduce((sum, entry) => sum + entry.usd, 0);
  }

  snapshot(): readonly CostEntry[] {
    return this.entries;
  }
}

export class BudgetGuard {
  private totalUsd = 0;

  constructor(private readonly maxUsdPerDay: number) {}

  assertWithinBudget(nextUsd: number): void {
    if (this.totalUsd + nextUsd > this.maxUsdPerDay) {
      throw new Error("Model budget exceeded");
    }
    this.totalUsd += nextUsd;
  }
}

export class RateLimiter {
  private lastCallMs: number | undefined;
  private readonly minIntervalMs: number;

  constructor(minIntervalMs = 1000) {
    this.minIntervalMs = minIntervalMs;
  }

  assertAllowed(nowMs = Date.now()): void {
    if (this.lastCallMs !== undefined && nowMs - this.lastCallMs < this.minIntervalMs) {
      throw new Error("Model rate limited");
    }
    this.lastCallMs = nowMs;
  }
}
