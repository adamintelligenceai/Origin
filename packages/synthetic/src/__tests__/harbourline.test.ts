import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { DETECTED_TOTAL, MODELLED_TOTAL, PLANTED_TOTAL } from '../planted.js';
import { generateHarbourline } from '../generate.js';

describe('Harbourline synthetic generator', () => {
  it('is deterministic for the same seed/variant', () => {
    const aDir = mkdtempSync(path.join(tmpdir(), 'hl-a-'));
    const bDir = mkdtempSync(path.join(tmpdir(), 'hl-b-'));
    try {
      const a = generateHarbourline({
        seed: 42,
        variant: 'planted',
        outDir: aDir,
        lineCount: 5_000,
      });
      const b = generateHarbourline({
        seed: 42,
        variant: 'planted',
        outDir: bDir,
        lineCount: 5_000,
      });
      expect(a.hashes).toEqual(b.hashes);
      expect(a.summary.t12mSalesAud).toBe(b.summary.t12mSalesAud);
    } finally {
      rmSync(aDir, { recursive: true, force: true });
      rmSync(bDir, { recursive: true, force: true });
    }
  });

  it('produces T12M sales near A$85m and planted ≈ A$1.84m', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'hl-plant-'));
    try {
      const result = generateHarbourline({ seed: 42, variant: 'planted', outDir: dir });
      expect(result.summary.t12mSalesAud).toBeGreaterThan(80_000_000);
      expect(result.summary.t12mSalesAud).toBeLessThan(90_000_000);
      expect(result.summary.plantedTotalAud).toBe(PLANTED_TOTAL);
      expect(result.summary.detectedTotalAud).toBe(DETECTED_TOTAL);
      expect(result.summary.modelledTotalAud).toBe(MODELLED_TOTAL);
      expect(PLANTED_TOTAL).toBe(1_840_000);

      const gt = JSON.parse(readFileSync(path.join(dir, 'ground_truth.json'), 'utf8')) as {
        issues: unknown[];
        classification: { addressable: number };
      };
      expect(gt.issues).toHaveLength(10);
      expect(gt.classification.addressable).toBe(1_840_000);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('clean variant has no intentional planted cases', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'hl-clean-'));
    try {
      const result = generateHarbourline({
        seed: 42,
        variant: 'clean',
        outDir: dir,
        lineCount: 5_000,
      });
      expect(result.summary.plantedTotalAud).toBe(0);
      const gt = JSON.parse(readFileSync(path.join(dir, 'ground_truth.json'), 'utf8')) as {
        issues: unknown[];
      };
      expect(gt.issues).toEqual([]);
      const agreements = readFileSync(path.join(dir, 'customer_agreements.csv'), 'utf8');
      expect(agreements).not.toMatch(/AGR-PLANT-/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('partial variant omits freight/rebate/agreement files', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'hl-partial-'));
    try {
      const result = generateHarbourline({
        seed: 7,
        variant: 'partial',
        outDir: dir,
        lineCount: 2_000,
      });
      expect(result.files['sales_lines.csv']).toBeTruthy();
      expect(result.files['freight.csv']).toBeUndefined();
      expect(result.files['supplier_rebates.csv']).toBeUndefined();
      expect(result.files['customer_agreements.csv']).toBeUndefined();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
