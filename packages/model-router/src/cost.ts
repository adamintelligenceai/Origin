export function estimateUsd(inputTokens: number, outputTokens: number, usdPerMillion = 3): number {
  return ((inputTokens + outputTokens) * usdPerMillion) / 1_000_000;
}

export class LocalCostLedger {
  private totalUsd = 0;

  record(usd: number): void {
    this.totalUsd += usd;
  }

  total(): number {
    return this.totalUsd;
  }
}
