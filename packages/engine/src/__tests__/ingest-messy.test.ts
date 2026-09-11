import { describe, expect, it } from 'vitest';
import { generateHarbourline, PLANTED_TARGETS } from '@marginshield/synthetic';
import { parseCsv, prepareUploads, runIngestedScan, mapHeader } from '../index';

describe('messy Harbourline ingest', () => {
  const messy = generateHarbourline({ seed: 42, variant: 'messy', scale: 'compact' });

  it('maps messy sales headers onto canonical fields', () => {
    expect(mapHeader('Inv No')).toBe('invoice_no');
    expect(mapHeader('Nett Sales')).toBe('invoice_revenue');
    expect(mapHeader('Unit Cost')).toBe('erp_cost');
    const sales = parseCsv('sales.csv', messy.files['sales.csv'] ?? '');
    expect(sales.headers[0]).toBe('Inv No');
  });

  it('reconstructs planted economics from exported files', () => {
    const files = Object.entries(messy.files).map(([name, text]) => ({ name, text }));
    const prepared = prepareUploads(files);
    const { result } = runIngestedScan({
      tables: prepared,
      source_texts: messy.files,
      sales_tieout_confirmed: true,
    });
    const detectedTarget =
      PLANTED_TARGETS.P1 + PLANTED_TARGETS.S1 + PLANTED_TARGETS.S2 + PLANTED_TARGETS.S3 + PLANTED_TARGETS.B1;
    const modelledTarget =
      PLANTED_TARGETS.P2 + PLANTED_TARGETS.P3 + PLANTED_TARGETS.P4 + PLANTED_TARGETS.P5 + PLANTED_TARGETS.P6;
    const near = (actual: number, expected: number, pct: number) => {
      expect(Math.abs(actual - expected) / expected).toBeLessThanOrEqual(pct);
    };
    near(Number(result.headlines.detected_leakage), detectedTarget, 0.02);
    near(Number(result.headlines.modelled_opportunity), modelledTarget, 0.03);
    near(Number(result.headlines.cash_claimable), PLANTED_TARGETS.CASH, 0.03);
  });
});
