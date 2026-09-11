import { mapHeader, type CanonicalField } from './synonyms';
import type { ParsedTable } from './parse';

export const TABLE_ROLES = [
  'sales',
  'customers',
  'skus',
  'agreements',
  'rebates',
  'costs',
  'policies',
  'freight',
  'unknown',
] as const;

export type TableRole = (typeof TABLE_ROLES)[number];

export function inferTableRole(name: string, table: ParsedTable): TableRole {
  const n = name.toLowerCase();
  if (n.includes('sales') || n.includes('invoice') || n.includes('transaction')) return 'sales';
  if (n.includes('customer') || n.includes('account')) return 'customers';
  if (n.includes('sku') || n.includes('product') || n.includes('item master')) return 'skus';
  if (n.includes('agreement') || n.includes('contract') || n.includes('price list')) return 'agreements';
  if (n.includes('rebate')) return 'rebates';
  if (n.includes('cost') || n.includes('landed')) return 'costs';
  if (n.includes('polic')) return 'policies';
  if (n.includes('freight') || n.includes('carrier')) return 'freight';

  const mapped = table.headers.map((h) => mapHeader(h)).filter((h): h is CanonicalField => Boolean(h));
  if (mapped.includes('invoice_no') && (mapped.includes('sku') || mapped.includes('invoice_revenue'))) return 'sales';
  const headers = table.headers.map((h) => h.toLowerCase());
  if (headers.some((h) => h.includes('agreement'))) return 'agreements';
  if (headers.some((h) => h.includes('rebate'))) return 'rebates';
  if (headers.some((h) => h.includes('landed'))) return 'costs';
  if (headers.some((h) => h.includes('policy'))) return 'policies';
  if (headers.includes('name') && headers.some((h) => h.includes('customer'))) return 'customers';
  if (headers.includes('description') && headers.includes('sku')) return 'skus';
  return 'unknown';
}
