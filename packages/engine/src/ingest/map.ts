import { mapHeader, type CanonicalField } from './synonyms';
import type { ParsedTable } from './parse';

export interface MappingSuggestion {
  source: string;
  target?: CanonicalField;
  confidence: number;
  needsConfirmation: boolean;
}

export function suggestMapping(table: ParsedTable): MappingSuggestion[] {
  return table.headers.map((header) => {
    const target = mapHeader(header);
    return {
      source: header,
      target,
      confidence: target ? 0.9 : 0,
      needsConfirmation: !target || ['invoice_revenue', 'erp_cost', 'freight_cost', 'freight_charged'].includes(target),
    };
  });
}

export function applyMapping(
  table: ParsedTable,
  mapping: Record<string, CanonicalField>,
): Record<CanonicalField, string>[] {
  return table.rows.map((row) => {
    const record = {} as Record<CanonicalField, string>;
    for (const [index, header] of table.headers.entries()) {
      const target = mapping[header];
      if (target) record[target] = row[index] ?? '';
    }
    return record;
  });
}
