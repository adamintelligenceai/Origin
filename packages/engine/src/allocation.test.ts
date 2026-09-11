import { describe, expect, it } from 'vitest';
import * as fc from 'fast-check';
import { allocateSellTranches } from './allocation.js';

describe('allocateSellTranches', () => {
  it('sum(allocated) equals max(gaps)', () => {
    const gaps = [
      { checkId: 'P1' as const, gap: 100 },
      { checkId: 'P3' as const, gap: 250 },
      { checkId: 'P5' as const, gap: 80 },
    ];
    const result = allocateSellTranches(gaps);
    const sum = result.reduce((a, r) => a + r.allocated, 0);
    expect(sum).toBe(250);
  });

  it('property: sum allocation = maximum overlapping sell gap', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            checkId: fc.constantFrom('P1', 'P2', 'P3', 'P4', 'P5', 'P6'),
            gap: fc.float({ min: 0, max: 1_000_000, noNaN: true }),
          }),
          { minLength: 0, maxLength: 6 },
        ),
        (gaps) => {
          const map = new Map();
          for (const g of gaps) {
            map.set(g.checkId, Math.max(map.get(g.checkId) ?? 0, g.gap));
          }
          const unique = [...map.entries()].map(([checkId, gap]) => ({
            checkId,
            gap,
          }));
          const result = allocateSellTranches(unique);
          const sum = result.reduce((a, r) => a + r.allocated, 0);
          const maxGap = unique.reduce((m, g) => Math.max(m, g.gap), 0);
          expect(Math.abs(sum - maxGap)).toBeLessThan(1e-6);
        },
      ),
    );
  });
});
