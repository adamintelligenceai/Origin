import { describe, expect, it } from 'vitest';
import { generateHarbourline, PLANTED_VALUES } from './generators/harbourline.js';
import { HARBOURLINE_PROFILE } from './profile.js';

describe('Harbourline synthetic generator', () => {
  it('marks the company as fictional', () => {
    expect(HARBOURLINE_PROFILE.fictional).toBe(true);
  });

  it('is deterministic for the same seed', () => {
    const a = generateHarbourline({ seed: 42, variant: 'planted', mode: 'compact' });
    const b = generateHarbourline({ seed: 42, variant: 'planted', mode: 'compact' });
    expect(a.transactions.length).toBe(b.transactions.length);
    expect(a.groundTruth.totals.addressableMarginAud).toBe(
      b.groundTruth.totals.addressableMarginAud,
    );
    expect(a.transactions[0]).toEqual(b.transactions[0]);
  });

  it('plants blueprint-scale addressable margin for planted variant', () => {
    const ds = generateHarbourline({ seed: 42, variant: 'planted', mode: 'compact' });
    const expected =
      PLANTED_VALUES.P1 +
      PLANTED_VALUES.P2 +
      PLANTED_VALUES.P3 +
      PLANTED_VALUES.P4 +
      PLANTED_VALUES.P5 +
      PLANTED_VALUES.P6 +
      PLANTED_VALUES.S1 +
      PLANTED_VALUES.S2 +
      PLANTED_VALUES.S3 +
      PLANTED_VALUES.B1;
    expect(ds.groundTruth.totals.addressableMarginAud).toBe(expected);
    expect(ds.groundTruth.planted).toHaveLength(10);
  });

  it('clean variant has no planted findings', () => {
    const ds = generateHarbourline({ seed: 7, variant: 'clean', mode: 'compact' });
    expect(ds.groundTruth.planted).toHaveLength(0);
    expect(ds.groundTruth.totals.addressableMarginAud).toBe(0);
  });
});
