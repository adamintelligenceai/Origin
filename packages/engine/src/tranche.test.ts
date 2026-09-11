import { describe, expect, it } from 'vitest';
import * as fc from 'fast-check';
import { allocateTranches, maxGap, sumAllocated } from './index.js';

const SELL_PRIORITY = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as const;

describe('tranche allocation', () => {
  it('sum of allocations equals maximum overlapping gap', () => {
    const gaps = { P1: 100, P2: 80, P3: 120, P4: 50, P5: 90, P6: 30 };
    const allocated = allocateTranches(gaps, SELL_PRIORITY);
    expect(sumAllocated(allocated)).toBe(maxGap(gaps));
  });

  it('property: sum allocation equals max gap for random inputs', () => {
    fc.assert(
      fc.property(
        fc.record({
          P1: fc.float({ min: 0, max: 1e6, noNaN: true }),
          P2: fc.float({ min: 0, max: 1e6, noNaN: true }),
          P3: fc.float({ min: 0, max: 1e6, noNaN: true }),
          P4: fc.float({ min: 0, max: 1e6, noNaN: true }),
          P5: fc.float({ min: 0, max: 1e6, noNaN: true }),
          P6: fc.float({ min: 0, max: 1e6, noNaN: true }),
        }),
        (gaps) => {
          const allocated = allocateTranches(gaps, SELL_PRIORITY);
          expect(sumAllocated(allocated)).toBeCloseTo(maxGap(gaps), 5);
        },
      ),
    );
  });

  it('higher-priority detector receives allocation first', () => {
    const gaps = { P1: 50, P2: 100 };
    const allocated = allocateTranches(gaps, SELL_PRIORITY);
    expect(allocated.P1).toBe(50);
    expect(allocated.P2).toBe(50);
  });
});
