import { describe, expect, it } from 'vitest';
import { generateHarbourline } from '@marginshield/synthetic';
import { runScan } from './scan.js';

describe('runScan', () => {
  it('recovers planted Harbourline addressable margin within tolerance', () => {
    const ds = generateHarbourline({ seed: 42, variant: 'planted', mode: 'compact' });
    const result = runScan({
      transactions: ds.transactions,
      rebates: ds.rebates,
      sourceFingerprints: ['harbourline-planted-42'],
    });
    const planted = ds.groundTruth.totals.addressableMarginAud;
    const got = result.headline.addressableMarginAud;
    expect(Math.abs(got - planted) / planted).toBeLessThan(0.05);
    expect(result.headline.detectedLeakageAud).toBeGreaterThan(0);
    expect(result.headline.modelledOpportunityAud).toBeGreaterThan(0);
    expect(result.headline.runHash.startsWith('ms_')).toBe(true);
    expect(result.findings.length).toBeGreaterThanOrEqual(8);
  });

  it('is deterministic', () => {
    const ds = generateHarbourline({ seed: 42, variant: 'planted', mode: 'compact' });
    const a = runScan({ transactions: ds.transactions, rebates: ds.rebates });
    const b = runScan({ transactions: ds.transactions, rebates: ds.rebates });
    expect(a.headline).toEqual(b.headline);
    expect(a.findings.map((f) => f.findingId)).toEqual(b.findings.map((f) => f.findingId));
  });

  it('clean variant yields near-zero planted leakage', () => {
    const ds = generateHarbourline({ seed: 3, variant: 'clean', mode: 'compact' });
    const result = runScan({ transactions: ds.transactions, rebates: ds.rebates });
    expect(result.headline.addressableMarginAud).toBe(0);
  });
});
