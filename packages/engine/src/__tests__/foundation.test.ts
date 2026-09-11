import { describe, expect, it } from 'vitest';
import { money, moneyString, zero, max0 } from '../money';
import { runningMaxIdentity } from '../allocation';
import { marginIntegrityIndex } from '../mii';
import { breakEvenVolumeRetention } from '../price-action';
import { parseAuDate, parseAuNumber, escapeSpreadsheetText } from '../ingest/normalise';
import { classifyUpload } from '../ingest/limits';
import { mapHeader } from '../ingest/synonyms';

describe('money', () => {
  it('quantises to 4 decimal places', () => {
    expect(moneyString(1.23456)).toBe('1.2346');
    expect(moneyString(zero())).toBe('0.0000');
    expect(max0(money(-3)).toNumber()).toBe(0);
  });
});

describe('tranche allocation identity', () => {
  it('sum of allocated equals the running maximum', () => {
    const gaps = [100, 40, 250, 10, 250];
    const result = runningMaxIdentity(gaps);
    expect(result.sum).toBeCloseTo(result.max, 10);
    expect(result.allocated).toEqual([100, 0, 150, 0, 0]);
  });
});

describe('MII', () => {
  it('clamps and uses weighted exposure', () => {
    expect(marginIntegrityIndex(0, 0, 1_000_000)).toBe(100);
    expect(marginIntegrityIndex(50_000, 100_000, 1_000_000)).toBe(0);
  });
});

describe('break-even volume', () => {
  it('is contribution ratio not revenue ratio', () => {
    expect(breakEvenVolumeRetention(10, 12)).toBeCloseTo(10 / 12);
  });
});

describe('ingest safety', () => {
  it('rejects macro workbooks', () => {
    expect(classifyUpload('leakage.xlsm', 100).ok).toBe(false);
    expect(classifyUpload('sales.csv', 100).ok).toBe(true);
  });
  it('parses Australian dates and negatives', () => {
    expect(parseAuDate('18/03/2025')).toBe('2025-03-18');
    expect(parseAuNumber('(1,234.50)')).toBe('-1234.5000');
    expect(parseAuNumber('1,234-')).toBe('-1234.0000');
  });
  it('escapes spreadsheet formula injection on text only', () => {
    expect(escapeSpreadsheetText('=cmd', false)).toBe("'=cmd");
    expect(escapeSpreadsheetText('-123', true)).toBe('-123');
  });
  it('maps messy invoice headers', () => {
    expect(mapHeader('Inv No')).toBe('invoice_no');
    expect(mapHeader('DocNum')).toBe('invoice_no');
  });
});
