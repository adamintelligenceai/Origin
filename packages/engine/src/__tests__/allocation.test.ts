import { describe, expect, it } from 'vitest';
import * as fc from 'fast-check';
import { allocateTranches, maxGap, sumAllocated, type DetectorGap } from '../allocation.js';

describe('allocateTranches', () => {
  it('sum(allocated) equals max(gap) for any non-negative gaps', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            checkId: fc.constantFrom('P1', 'P2', 'P3', 'P4', 'P5', 'P6') as fc.Arbitrary<
              DetectorGap['checkId']
            >,
            gap: fc.integer({ min: 0, max: 1_000_000 }).map((n) => BigInt(n) * 10000n),
          }),
          { maxLength: 12 },
        ),
        (gaps) => {
          expect(sumAllocated(allocateTranches(gaps))).toBe(maxGap(gaps));
        },
      ),
    );
  });

  it('prioritises P1 over P3', () => {
    const rows = allocateTranches([
      { checkId: 'P3', gap: 100_000n },
      { checkId: 'P1', gap: 60_000n },
    ]);
    expect(rows.find((r) => r.checkId === 'P1')!.allocated).toBe(60_000n);
    expect(rows.find((r) => r.checkId === 'P3')!.allocated).toBe(40_000n);
  });
});
