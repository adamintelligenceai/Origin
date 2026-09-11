import { describe, expect, it } from 'vitest';
import { escapeSpreadsheetText } from './index.js';

describe('escapeSpreadsheetText', () => {
  it('prefixes formula-like text', () => {
    expect(escapeSpreadsheetText('=HYPERLINK("x")')).toBe("'=HYPERLINK(\"x\")");
  });

  it('leaves ordinary text', () => {
    expect(escapeSpreadsheetText('Acme Plumbing')).toBe('Acme Plumbing');
  });
});
