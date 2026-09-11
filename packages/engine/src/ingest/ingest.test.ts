import { describe, expect, it } from 'vitest';
import { inspectFileName, parseDelimitedText, suggestColumnMapping } from './index.js';

describe('ingest security + mapping', () => {
  it('blocks macro workbooks', () => {
    expect(inspectFileName('ledger.xlsm').ok).toBe(false);
  });

  it('allows csv and suggests synonyms', () => {
    expect(inspectFileName('sales.csv').ok).toBe(true);
    const table = parseDelimitedText('Invoice Number,Qty,Net Amount\nA1,2,10.5\n');
    expect(table.headers).toEqual(['Invoice Number', 'Qty', 'Net Amount']);
    const map = suggestColumnMapping(table.headers);
    expect(map.find((m) => m.source === 'Invoice Number')?.canonical).toBe('invoice_no');
    expect(map.find((m) => m.source === 'Qty')?.canonical).toBe('qty');
    expect(map.find((m) => m.source === 'Net Amount')?.canonical).toBe('net_sales');
  });
});
