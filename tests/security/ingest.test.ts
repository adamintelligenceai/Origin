import { describe, expect, it } from 'vitest';
import { escapeSpreadsheetText, classifyUpload } from '@marginshield/engine';

describe('security ingest', () => {
  it('blocks executable and macro formats', () => {
    expect(classifyUpload('book.xlsm', 10).ok).toBe(false);
    expect(classifyUpload('payload.exe', 10).ok).toBe(false);
    expect(classifyUpload('sales.xlsx', 10).ok).toBe(true);
  });

  it('formula-escapes exported text', () => {
    expect(escapeSpreadsheetText('+HYPERLINK(1)', false).startsWith("'")).toBe(true);
  });
});
