import { max0, money, zero, type Dec } from './money';
import type { CheckId, FindingDraft } from './types';

export const SELL_PRIORITY: CheckId[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

export interface AllocatedDraft extends FindingDraft {
  allocated: Dec;
  root_cause: boolean;
}

/**
 * Single-count tranche allocation for sell-side detectors.
 * running_max is explicit so sum(allocated) = max(gaps) at each grain.
 */
export function allocateSellSide(drafts: FindingDraft[]): AllocatedDraft[] {
  const sell = drafts.filter((draft) => SELL_PRIORITY.includes(draft.check_id));
  const other = drafts.filter((draft) => !SELL_PRIORITY.includes(draft.check_id));
  const byGrain = new Map<string, FindingDraft[]>();
  for (const draft of sell) {
    const list = byGrain.get(draft.grain_key) ?? [];
    list.push(draft);
    byGrain.set(draft.grain_key, list);
  }

  const allocated: AllocatedDraft[] = [];
  for (const group of byGrain.values()) {
    const ordered = SELL_PRIORITY.flatMap((check) => group.filter((item) => item.check_id === check));
    let runningMax = zero();
    const withAlloc: AllocatedDraft[] = ordered.map((item) => {
      const gap = max0(item.raw_gap);
      const slice = max0(gap.minus(runningMax));
      runningMax = runningMax.greaterThan(gap) ? runningMax : gap;
      return { ...item, allocated: money(slice), root_cause: false };
    });
    const root = withAlloc.find((item) => item.allocated.gt(0));
    for (const item of withAlloc) {
      item.root_cause = root?.check_id === item.check_id && item.allocated.gt(0);
      if (item.allocated.gt(0) || item.value_class === 'BILLING_RISK') {
        allocated.push(item);
      }
    }
  }

  const rest: AllocatedDraft[] = other.map((item) => ({
    ...item,
    allocated: money(max0(item.raw_gap)),
    root_cause: item.value_class !== 'OVERLAY' && item.value_class !== 'INSIGHT',
  }));

  return [...allocated, ...rest];
}

export function runningMaxIdentity(gaps: number[]): { allocated: number[]; sum: number; max: number } {
  let runningMax = 0;
  const allocated = gaps.map((gap) => {
    const slice = Math.max(0, gap - runningMax);
    runningMax = Math.max(runningMax, gap);
    return slice;
  });
  return {
    allocated,
    sum: allocated.reduce((a, b) => a + b, 0),
    max: gaps.reduce((a, b) => Math.max(a, b), 0),
  };
}
