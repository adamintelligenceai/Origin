import { SELL_TRANCHE_PRIORITY, type CheckId } from "@marginshield/schemas";

export interface DetectorGap {
  checkId: CheckId;
  gap: number;
}

export interface AllocatedGap extends DetectorGap {
  allocated: number;
  rootCause: boolean;
  secondary: boolean;
}

/**
 * Single-count tranche allocation for overlapping sell-side detectors.
 * Uses an explicit running maximum so sum(allocated) = max(all detector gaps).
 */
export function allocateSellTranches(
  gaps: readonly DetectorGap[],
  priority: readonly CheckId[] = SELL_TRANCHE_PRIORITY,
): AllocatedGap[] {
  const byCheck = new Map<CheckId, number>();
  for (const gap of gaps) {
    byCheck.set(gap.checkId, Math.max(0, gap.gap));
  }

  let runningMax = 0;
  const allocated: AllocatedGap[] = [];

  for (const checkId of priority) {
    const gap = byCheck.get(checkId) ?? 0;
    const allocatedValue = Math.max(0, gap - runningMax);
    allocated.push({
      checkId,
      gap,
      allocated: allocatedValue,
      rootCause: allocatedValue > 0 && runningMax === 0,
      secondary: allocatedValue > 0 && runningMax > 0,
    });
    runningMax = Math.max(runningMax, gap);
  }

  return allocated;
}
