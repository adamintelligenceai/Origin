export const CANONICAL_FIELDS = [
  'invoice_no',
  'invoice_date',
  'customer_id',
  'sku',
  'quantity',
  'list_price',
  'invoice_unit_price',
  'invoice_revenue',
  'discount_amount',
  'credit_amount',
  'freight_charged',
  'freight_cost',
  'erp_cost',
  'landed_cost',
  'product_group',
  'supplier_id',
  'branch_id',
  'sales_rep_id',
  'currency',
] as const;

export type CanonicalField = (typeof CANONICAL_FIELDS)[number];

export const SYNONYMS: Record<CanonicalField, string[]> = {
  invoice_no: ['invoice_no', 'invoice #', 'inv no', 'inv_no', 'docnum', 'document number', 'invoice number'],
  invoice_date: ['invoice_date', 'inv date', 'doc date', 'transaction date', 'date'],
  customer_id: ['customer_id', 'customer', 'cust id', 'account', 'account code', 'customer code'],
  sku: ['sku', 'item', 'item code', 'product code', 'stock code', 'part no', 'part number'],
  quantity: ['quantity', 'qty', 'units', 'ship qty'],
  list_price: ['list_price', 'list price', 'gross price', 'unit list'],
  invoice_unit_price: ['invoice_unit_price', 'unit price', 'net price', 'sell price', 'invoice price'],
  invoice_revenue: ['invoice_revenue', 'net sales', 'extended', 'line amount', 'nett sales', 'revenue'],
  discount_amount: ['discount_amount', 'discount', 'disc', 'line discount'],
  credit_amount: ['credit_amount', 'credit', 'credit note', 'adjustment'],
  freight_charged: ['freight_charged', 'freight charge', 'freight billed', 'delivery charge'],
  freight_cost: ['freight_cost', 'freight cost', 'carrier cost', 'delivery cost'],
  erp_cost: ['erp_cost', 'unit cost', 'cogs', 'average cost', 'std cost'],
  landed_cost: ['landed_cost', 'true cost', 'landed', 'standard landed'],
  product_group: ['product_group', 'category', 'product class', 'group'],
  supplier_id: ['supplier_id', 'vendor', 'supplier', 'vendor code'],
  branch_id: ['branch_id', 'branch', 'warehouse', 'site', 'location'],
  sales_rep_id: ['sales_rep_id', 'rep', 'salesperson', 'sales rep'],
  currency: ['currency', 'ccy', 'curr'],
};

export function normaliseHeader(value: string): string {
  return value.trim().toLowerCase().replace(/[_#]+/g, ' ').replace(/\s+/g, ' ');
}

export function mapHeader(header: string): CanonicalField | undefined {
  const n = normaliseHeader(header);
  for (const [field, names] of Object.entries(SYNONYMS) as [CanonicalField, string[]][]) {
    if (names.some((alias) => normaliseHeader(alias) === n)) return field;
  }
  let best: { field: CanonicalField; score: number } | undefined;
  for (const [field, names] of Object.entries(SYNONYMS) as [CanonicalField, string[]][]) {
    for (const alias of names) {
      const score = similarity(n, normaliseHeader(alias));
      if (score > 0.76 && (!best || score > best.score)) best = { field, score };
    }
  }
  return best?.field;
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1;
  const dist = levenshtein(longer, shorter);
  return (longer.length - dist) / longer.length;
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const row = dp[i];
      const prev = dp[i - 1];
      if (!row || !prev) continue;
      row[j] = Math.min((prev[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
    }
  }
  return dp[a.length]?.[b.length] ?? 0;
}

export const AMBIGUOUS_FIELDS = new Set<CanonicalField>(['invoice_revenue', 'erp_cost', 'freight_cost', 'freight_charged']);
