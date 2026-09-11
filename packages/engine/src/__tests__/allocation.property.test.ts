import { describe, expect, it } from 'vitest';
import * as fc from 'fast-check';
import { runningMaxIdentity } from '../allocation';

describe('allocation property', () => {
  it('sum(allocated) = max(gaps) for non-negative gaps', () => {
    fc.assert(
      fc.property(fc.array(fc.float({ min: 0, max: 1_000_000, noNaN: true }), { maxLength: 8 }), (gaps) => {
        const finite = gaps.filter((g) => Number.isFinite(g));
        const result = runningMaxIdentity(finite);
        expect(result.sum).toBeCloseTo(result.max, 5);
      }),
      { numRuns: 50 },
    );
  });
});
