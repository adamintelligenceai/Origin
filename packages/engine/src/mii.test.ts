import { describe, expect, it } from 'vitest';
import { computeMarginIntegrityIndex } from './mii.js';

describe('computeMarginIntegrityIndex', () => {
  it('scores Harbourline-like exposure', () => {
    const mii = computeMarginIntegrityIndex({
      verifiedOrDetectedLeakage: 796_000,
      modelledMarginOpportunity: 1_044_000,
      t12mNetSales: 85_000_000,
    });
    expect(mii).toBeGreaterThan(0);
    expect(mii).toBeLessThanOrEqual(100);
  });

  it('returns 0 for non-positive sales', () => {
    expect(
      computeMarginIntegrityIndex({
        verifiedOrDetectedLeakage: 1,
        modelledMarginOpportunity: 1,
        t12mNetSales: 0,
      }),
    ).toBe(0);
  });
});
