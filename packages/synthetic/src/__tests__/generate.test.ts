import { describe, expect, it } from 'vitest';
import { generateHarbourline, PLANTED_TARGETS } from '../generate';
import { runScan, sha256 } from '@marginshield/engine';

describe('Harbourline generator', () => {
  it('is deterministic for the same seed', () => {
    const a = generateHarbourline({ seed: 42, variant: 'planted' });
    const b = generateHarbourline({ seed: 42, variant: 'planted' });
    expect(sha256(a.files['sales.csv'] ?? '')).toBe(sha256(b.files['sales.csv'] ?? ''));
    expect(a.dataset.transactions.length).toBe(b.dataset.transactions.length);
  });

  it('marks the company as fictional', () => {
    const bundle = generateHarbourline({ seed: 42 });
    expect(bundle.ground_truth.fictional).toBe(true);
    expect(bundle.ground_truth.company).toContain('Harbourline');
  });

  it('plants the target leakage families', () => {
    const bundle = generateHarbourline({ seed: 42, variant: 'planted' });
    const ids = bundle.ground_truth.planted.map((p) => p.check_id);
    expect(ids).toEqual(expect.arrayContaining(['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'S1', 'S2', 'S3', 'B1']));
    const total = bundle.ground_truth.planted.reduce((a, p) => a + p.expected_value, 0);
    expect(total).toBe(
      PLANTED_TARGETS.P1 +
        PLANTED_TARGETS.P2 +
        PLANTED_TARGETS.P3 +
        PLANTED_TARGETS.P4 +
        PLANTED_TARGETS.P5 +
        PLANTED_TARGETS.P6 +
        PLANTED_TARGETS.S1 +
        PLANTED_TARGETS.S2 +
        PLANTED_TARGETS.S3 +
        PLANTED_TARGETS.B1,
    );
  });

  it('produces T12M sales of approximately A$85m', () => {
    const bundle = generateHarbourline({ seed: 42, variant: 'planted' });
    const sales = Number(runScan(bundle.dataset).headlines.t12m_net_sales);
    expect(sales).toBeGreaterThan(70_000_000);
    expect(sales).toBeLessThan(100_000_000);
  });

  it('omits planted cases in the clean variant', () => {
    const clean = generateHarbourline({ seed: 42, variant: 'clean' });
    expect(clean.ground_truth.planted).toEqual([]);
  });
});
