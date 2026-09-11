import { describe, expect, it } from 'vitest';
import { ValueClassSchema, FindingSchema, DEFAULT_COMMERCIAL } from './index.js';

describe('schemas', () => {
  it('parses value classes', () => {
    expect(ValueClassSchema.parse('DETECTED_LEAKAGE')).toBe('DETECTED_LEAKAGE');
    expect(ValueClassSchema.parse('MODELLED_MARGIN_OPPORTUNITY')).toBe(
      'MODELLED_MARGIN_OPPORTUNITY',
    );
  });

  it('rejects prohibited labels', () => {
    expect(() => ValueClassSchema.parse('GROSS_LEAKAGE')).toThrow();
  });

  it('accepts a finding', () => {
    const f = FindingSchema.parse({
      findingId: 'MSF-1',
      runHash: 'abc',
      checkId: 'P1',
      family: 'SELL',
      valueClass: 'DETECTED_LEAKAGE',
      basisClass: 'CONTRACTUAL',
      status: 'DETECTED',
      rawGap: '1000.0000',
      allocatedValue: '1000.0000',
      evidenceGrade: 'A',
      captureLow: 0.5,
      captureBase: 0.75,
      captureHigh: 0.9,
      riskBand: 'LOW',
      bankableLow: '500.0000',
      bankableBase: '750.0000',
      bankableHigh: '900.0000',
      rootCause: 'Below agreement',
      question: 'P1?',
      factsJson: {},
      methodVersion: '1.0.0',
    });
    expect(f.checkId).toBe('P1');
  });

  it('exposes commercial defaults', () => {
    expect(DEFAULT_COMMERCIAL.scanPriceAud).toBe(9500);
  });
});
