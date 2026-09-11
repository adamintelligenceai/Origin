import { describe, expect, it } from 'vitest';
import {
  classifyDataset,
  inspectFileName,
  mapHeader,
  mapHeaders,
  parseAuDate,
  parseAuNumber,
  parseCsv,
  sha256Hex,
} from '../ingest/index.js';

describe('ingest mapping', () => {
  it('maps AU distributor header synonyms', () => {
    expect(mapHeader('Inv No')).toBe('invoice_no');
    expect(mapHeader('Account Name')).toBe('customer_name');
    expect(mapHeader('Ext Sell')).toBe('line_sales');
    const mapped = mapHeaders(['Inv No', 'Cust ID', 'Weird']);
    expect(mapped.coverage).toBeCloseTo(2 / 3);
    expect(mapped.unmapped).toEqual(['Weird']);
  });

  it('classifies sales files from name + headers', () => {
    expect(classifyDataset('sales_export.csv', ['Invoice #', 'Net Sales', 'Customer Code'])).toBe(
      'sales_lines',
    );
  });
});

describe('ingest parse/security', () => {
  it('parses AU numbers and dates', () => {
    expect(parseAuNumber('(1,234.50)')).toBe(-1234.5);
    expect(parseAuNumber('A$99.00')).toBe(99);
    expect(parseAuDate('15/03/2025')).toBe('2025-03-15');
    expect(parseAuDate('2025-03-15')).toBe('2025-03-15');
  });

  it('parses CSV and hashes deterministically', async () => {
    const csv = 'a,b\n1,"2,3"\n';
    const parsed = parseCsv(csv);
    expect(parsed.headers).toEqual(['a', 'b']);
    expect(parsed.rows[0]).toEqual(['1', '2,3']);
    const h1 = await sha256Hex(csv);
    const h2 = await sha256Hex(csv);
    expect(h1).toBe(h2);
    expect(h1).toHaveLength(64);
  });

  it('rejects macro-enabled workbook names', () => {
    const v = inspectFileName('ledger.xlsm', 1000);
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.code).toBe('MACRO');
  });
});
