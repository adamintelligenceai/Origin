import { describe, expect, it } from 'vitest';
import { buildGroundTruthSummary } from '@marginshield/synthetic';

describe('golden tests (placeholder)', () => {
  it('planted Harbourline totals match blueprint targets', () => {
    const summary = buildGroundTruthSummary({
      seed: 42,
      variant: 'planted',
      outputDir: 'data/synthetic',
    });

    expect(summary.t12m_sales_aud).toBe(85_000_000);
    expect(summary.total_addressable_aud).toBe(1_840_000);
    expect(summary.detected_leakage_aud).toBe(796_000);
    expect(summary.modelled_opportunity_aud).toBe(1_044_000);
    expect(summary.cash_claimable_aud).toBe(124_000);
  });

  it('clean variant has no intentional planted cases', () => {
    const summary = buildGroundTruthSummary({
      seed: 42,
      variant: 'clean',
      outputDir: 'data/synthetic',
    });

    expect(summary.detected_leakage_aud).toBe(0);
    expect(summary.modelled_opportunity_aud).toBe(0);
    expect(Object.keys(summary.planted_checks)).toHaveLength(0);
  });
});
