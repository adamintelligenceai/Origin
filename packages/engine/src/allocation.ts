export type SellCheckId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type DetectorGap = { checkId: SellCheckId; gap: bigint };
export type AllocatedGap = DetectorGap & { allocated: bigint; primary: boolean };

export const SELL_PRIORITY: SellCheckId[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

function aggregateByCheck(gaps: DetectorGap[]): Map<SellCheckId, bigint> {
  const byId = new Map<SellCheckId, bigint>();
  for (const g of gaps) byId.set(g.checkId, (byId.get(g.checkId) ?? 0n) + g.gap);
  return byId;
}

/** Property: sum(allocated) === max(gaps aggregated by checkId) */
export function allocateTranches(gaps: DetectorGap[]): AllocatedGap[] {
  const byId = aggregateByCheck(gaps);
  let runningMax = 0n;
  let primarySet = false;
  const out: AllocatedGap[] = [];
  for (const checkId of SELL_PRIORITY) {
    const gap = byId.get(checkId) ?? 0n;
    if (gap <= 0n) continue;
    const allocated = gap > runningMax ? gap - runningMax : 0n;
    const primary = allocated > 0n && !primarySet;
    if (primary) primarySet = true;
    out.push({ checkId, gap, allocated, primary });
    if (gap > runningMax) runningMax = gap;
  }
  return out;
}

export function sumAllocated(rows: AllocatedGap[]): bigint {
  return rows.reduce((s, r) => s + r.allocated, 0n);
}

export function maxGap(gaps: DetectorGap[]): bigint {
  let m = 0n;
  for (const gap of aggregateByCheck(gaps).values()) {
    if (gap > m) m = gap;
  }
  return m;
}
