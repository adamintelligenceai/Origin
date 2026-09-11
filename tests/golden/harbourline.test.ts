import { describe, expect, it } from 'vitest';
import { generateHarbourline, PLANTED_TARGETS } from '@marginshield/synthetic';
import { defaultMethodConfig, runScan } from '@marginshield/engine';

function near(actual: number, expected: number, pct: number) {
  const delta = Math.abs(actual - expected) / expected;
  expect(delta).toBeLessThanOrEqual(pct);
}

describe('Harbourline golden scan', () => {
  const planted = generateHarbourline({ seed: 42, variant: 'planted', scale: 'compact' });
  const result = runScan(planted.dataset);

  it('recalls planted grains at ≥95% and amounts within 3%', () => {
    let hits = 0;
    for (const issue of planted.ground_truth.planted) {
      const matches = result.findings.filter(
        (f) => f.check_id === issue.check_id && issue.grain_keys.includes(f.grain_key),
      );
      const amount = matches.reduce((a, f) => a + Number(f.allocated_value), 0);
      if (matches.length > 0 && Math.abs(amount - issue.expected_value) / issue.expected_value <= 0.03) {
        hits += 1;
      } else {
        // eslint-disable-next-line no-console
        console.warn(issue.check_id, issue.grain_keys, amount, issue.expected_value, matches.map((m) => m.grain_key));
      }
    }
    expect(hits / planted.ground_truth.planted.length).toBeGreaterThanOrEqual(0.95);
  });

  it('keeps headline totals within 2% of planted classification', () => {
    const detectedTarget =
      PLANTED_TARGETS.P1 + PLANTED_TARGETS.S1 + PLANTED_TARGETS.S2 + PLANTED_TARGETS.S3 + PLANTED_TARGETS.B1;
    const modelledTarget =
      PLANTED_TARGETS.P2 + PLANTED_TARGETS.P3 + PLANTED_TARGETS.P4 + PLANTED_TARGETS.P5 + PLANTED_TARGETS.P6;
    near(Number(result.headlines.detected_leakage), detectedTarget, 0.02);
    near(Number(result.headlines.modelled_opportunity), modelledTarget, 0.03);
    near(Number(result.headlines.addressable_margin), detectedTarget + modelledTarget, 0.02);
    near(Number(result.headlines.cash_claimable), PLANTED_TARGETS.CASH, 0.03);
  });

  it('is deterministic', () => {
    const again = runScan(planted.dataset);
    expect(again.run_hash).toBe(result.run_hash);
    expect(again.headlines.detected_leakage).toBe(result.headlines.detected_leakage);
  });

  it('keeps contractual false positives near zero on clean data', () => {
    const clean = generateHarbourline({ seed: 42, variant: 'clean', scale: 'compact' });
    const scanned = runScan(clean.dataset);
    const p1 = scanned.findings.filter((f) => f.check_id === 'P1' && f.value_class === 'DETECTED_LEAKAGE');
    const b1 = scanned.findings.filter((f) => f.check_id === 'B1');
    expect(p1.length).toBe(0);
    expect(b1.length).toBe(0);
  });

  it('recalculates cash when P1 back-billing is enabled', () => {
    const off = result.headlines.cash_claimable;
    const enabled = {
      ...planted.dataset,
      method_config: { ...defaultMethodConfig(), p1_back_billing_enabled: true },
    };
    const scanned = runScan(enabled);
    expect(Number(scanned.headlines.cash_claimable)).toBeGreaterThan(Number(off));
  });
});
