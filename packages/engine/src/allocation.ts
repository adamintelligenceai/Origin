/**
 * Single-count sell-side tranche allocation (BLUEPRINT §18).
 * Priority: P1 > P2 > P3 > P4 > P5 > P6
 */
export type SellGap = {
  checkId: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
  gap: number;
};

export type TrancheAllocation = SellGap & {
  allocated: number;
  isPrimary: boolean;
};

const PRIORITY: SellGap['checkId'][] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

export function allocateSellTranches(gaps: readonly SellGap[]): TrancheAllocation[] {
  const byId = new Map(gaps.map((g) => [g.checkId, g.gap]));
  let runningMax = 0;
  const out: TrancheAllocation[] = [];
  for (const checkId of PRIORITY) {
    const gap = byId.get(checkId) ?? 0;
    const allocated = Math.max(0, gap - runningMax);
    runningMax = Math.max(runningMax, gap);
    if (gap > 0 || allocated > 0) {
      out.push({ checkId, gap, allocated, isPrimary: false });
    }
  }
  const primary = out
    .filter((r) => r.allocated > 0)
    .sort((a, b) => PRIORITY.indexOf(a.checkId) - PRIORITY.indexOf(b.checkId))[0];
  return out.map((r) => ({
    ...r,
    isPrimary: primary !== undefined && r.checkId === primary.checkId,
  }));
}
