/** Margin Integrity Index — longitudinal self-comparison only (BLUEPRINT §29). */
export function computeMarginIntegrityIndex(input: {
  verifiedOrDetectedLeakage: number;
  modelledMarginOpportunity: number;
  t12mNetSales: number;
}): number {
  if (input.t12mNetSales <= 0) return 0;
  const weighted =
    input.verifiedOrDetectedLeakage + 0.5 * input.modelledMarginOpportunity;
  const exposureRate = weighted / input.t12mNetSales;
  const raw = 100 - 1000 * exposureRate;
  return Math.round(Math.min(100, Math.max(0, raw)));
}
