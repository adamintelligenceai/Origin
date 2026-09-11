import { describe, expect, it } from 'vitest';
import { runHarbourlineDemo, HARBOURLINE_PLANTED } from '../harbourline.js';

describe('Harbourline demo', () => {
  it('matches planted addressable economics within 2%', () => {
    const { summary } = runHarbourlineDemo();
    const plantedTotal = Object.values(HARBOURLINE_PLANTED).reduce((a, b) => a + b, 0);
    const addressable = Number(summary.totalAddressable);
    expect(Math.abs(addressable - plantedTotal) / plantedTotal).toBeLessThan(0.02);
  });

  it('separates detected from modelled', () => {
    const { summary } = runHarbourlineDemo();
    expect(Number(summary.detectedLeakage)).toBeGreaterThan(700_000);
    expect(Number(summary.modelledOpportunity)).toBeGreaterThan(900_000);
  });

  it('exposes cash claimable near A$124k', () => {
    const { summary } = runHarbourlineDemo();
    expect(Number(summary.cashClaimableNow)).toBe(124_000);
  });
});
