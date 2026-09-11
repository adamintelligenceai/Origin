import { clamp } from './money';

export function marginIntegrityIndex(detectedLeakage: number, modelledOpportunity: number, t12mNetSales: number): number {
  if (t12mNetSales <= 0) return 0;
  const weightedExposure = detectedLeakage + 0.5 * modelledOpportunity;
  const exposureRate = weightedExposure / t12mNetSales;
  return Math.round(clamp(100 - 1000 * exposureRate, 0, 100));
}
