import type { CanonicalTable } from './ddl.js';

/** Deterministic header synonyms for AU distributor exports. */
export const FIELD_SYNONYMS: Record<string, string[]> = {
  invoice_no: ['invoice_no', 'invoice #', 'invoice number', 'inv no', 'inv_no', 'docnum', 'doc num', 'document number'],
  invoice_date: ['invoice_date', 'inv date', 'document date', 'txn date', 'txndate', 'date'],
  customer_id: ['customer_id', 'cust id', 'customer code', 'account', 'account code', 'cust_code'],
  customer_name: ['customer_name', 'customer', 'account name', 'cust name', 'customer name'],
  sku: ['sku', 'item', 'item code', 'product code', 'stock code', 'part number', 'part no'],
  sku_name: ['sku_name', 'item name', 'description', 'product description', 'stock description'],
  product_group: ['product_group', 'product group', 'category', 'family', 'class'],
  branch_id: ['branch_id', 'branch', 'warehouse', 'location', 'site'],
  rep_id: ['rep_id', 'sales rep', 'salesperson', 'rep', 'account manager'],
  qty: ['qty', 'quantity', 'qty sold', 'units'],
  list_price: ['list_price', 'list', 'list price', 'rrp', 'tariff'],
  unit_price: ['unit_price', 'sell price', 'unit sell', 'price', 'net price'],
  line_sales: ['line_sales', 'ext sell', 'net sales', 'line amount', 'extended amount', 'sales'],
  unit_cost: ['unit_cost', 'std cost', 'cost', 'unit cost', 'cogs unit'],
  line_cogs: ['line_cogs', 'ext cost', 'cogs', 'cost amount'],
  currency: ['currency', 'curr', 'ccy'],
  supplier_id: ['supplier_id', 'vendor', 'vendor code', 'supplier code'],
  supplier_name: ['supplier_name', 'vendor name', 'supplier'],
  agreed_price: ['agreed_price', 'contract price', 'agreement price', 'deal price'],
  freight_cost: ['freight_cost', 'freight', 'shipping cost', 'delivery cost'],
  freight_charged: ['freight_charged', 'freight billed', 'freight charge'],
};

export type DatasetKind =
  | 'sales_lines'
  | 'customers'
  | 'skus'
  | 'suppliers'
  | 'customer_agreements'
  | 'freight'
  | 'supplier_rebates'
  | 'commercial_policies'
  | 'purchases'
  | 'supplier_costs'
  | 'unknown';

const KIND_HINTS: Record<Exclude<DatasetKind, 'unknown'>, string[]> = {
  sales_lines: ['invoice', 'sales', 'transaction', 'orders'],
  customers: ['customer', 'account', 'debtor'],
  skus: ['sku', 'item', 'product', 'stock'],
  suppliers: ['supplier', 'vendor'],
  customer_agreements: ['agreement', 'contract', 'price list', 'deal'],
  freight: ['freight', 'shipping', 'delivery'],
  supplier_rebates: ['rebate', 'claim', 'accrual'],
  commercial_policies: ['policy', 'surcharge', 'restock'],
  purchases: ['purchase', 'po', 'receipt'],
  supplier_costs: ['cost', 'landed', 'buy price'],
};

export function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/[\s#./-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function mapHeader(header: string): string | null {
  const n = normalizeHeader(header);
  for (const [canonical, synonyms] of Object.entries(FIELD_SYNONYMS)) {
    if (synonyms.some((s) => normalizeHeader(s) === n)) return canonical;
  }
  return null;
}

export function mapHeaders(headers: string[]): {
  mapping: Record<string, string | null>;
  coverage: number;
  unmapped: string[];
} {
  const mapping: Record<string, string | null> = {};
  const unmapped: string[] = [];
  for (const h of headers) {
    const m = mapHeader(h);
    mapping[h] = m;
    if (!m) unmapped.push(h);
  }
  const mapped = Object.values(mapping).filter(Boolean).length;
  return { mapping, coverage: headers.length ? mapped / headers.length : 0, unmapped };
}

export function classifyDataset(fileName: string, headers: string[]): DatasetKind {
  const blob = `${fileName} ${headers.join(' ')}`.toLowerCase();
  let best: DatasetKind = 'unknown';
  let bestScore = 0;
  for (const [kind, hints] of Object.entries(KIND_HINTS) as Array<
    [Exclude<DatasetKind, 'unknown'>, string[]]
  >) {
    let score = 0;
    for (const hint of hints) if (blob.includes(hint)) score += 1;
    const mapped = headers.map(mapHeader).filter(Boolean);
    if (kind === 'sales_lines' && mapped.includes('invoice_no') && mapped.includes('line_sales')) score += 3;
    if (kind === 'customers' && mapped.includes('customer_id') && mapped.includes('customer_name')) score += 2;
    if (score > bestScore) {
      bestScore = score;
      best = kind;
    }
  }
  return bestScore > 0 ? best : 'unknown';
}

export function targetTableForKind(kind: DatasetKind): CanonicalTable | null {
  if (kind === 'unknown') return null;
  return kind;
}
