/** Synonym mapping from ERP column names → canonical MarginShield fields. */

export const CANONICAL_FIELDS = [
  'invoice_no', 'invoice_date', 'customer_id', 'sku', 'product_group', 'branch',
  'qty', 'list_price', 'unit_price', 'net_sales', 'direct_cost', 'freight_charged',
  'supplier_id', 'agreement_id', 'agreed_price', 'valid_from', 'valid_to', 'price_basis',
  'rebate_id', 'earned_aud', 'claimed_aud', 'landed_cost', 'effective_from', 'freight_cost',
  'plant_check', 'plant_gap_aud',
] as const;

export type CanonicalField = (typeof CANONICAL_FIELDS)[number];

const SYNONYMS: Record<CanonicalField, string[]> = {
  invoice_no: ['invoice', 'invoice_number', 'inv_no', 'invoice_no', 'doc_no'],
  invoice_date: ['date', 'inv_date', 'trx_date', 'transaction_date', 'invoice_date'],
  customer_id: ['customer', 'cust_id', 'account_id', 'sold_to', 'customer_id'],
  sku: ['item', 'item_code', 'product_code', 'material', 'part_number', 'sku'],
  product_group: ['category', 'product_category', 'family', 'product_group'],
  branch: ['warehouse', 'depot', 'location', 'site', 'branch'],
  qty: ['quantity', 'qty_shipped', 'units', 'qty'],
  list_price: ['list', 'rrp', 'standard_price', 'list_price'],
  unit_price: ['price', 'sell_price', 'net_price', 'invoice_price', 'unit_price'],
  net_sales: ['sales', 'revenue', 'net_amount', 'extended_price', 'net_sales'],
  direct_cost: ['cost', 'cogs', 'unit_cost', 'standard_cost', 'direct_cost'],
  freight_charged: ['freight', 'freight_charge', 'delivery_charge', 'freight_charged'],
  supplier_id: ['vendor', 'vendor_id', 'supplier', 'supplier_id'],
  agreement_id: ['contract_id', 'deal_id', 'agreement', 'agreement_id'],
  agreed_price: ['contract_price', 'agreement_price', 'deal_price', 'agreed_price'],
  valid_from: ['start_date', 'from_date', 'effective_start', 'valid_from'],
  valid_to: ['end_date', 'to_date', 'expiry', 'valid_to'],
  price_basis: ['basis', 'pricing_basis', 'price_basis'],
  rebate_id: ['rebate', 'claim_id', 'rebate_id'],
  earned_aud: ['earned', 'accrued', 'rebate_earned', 'earned_aud'],
  claimed_aud: ['claimed', 'rebate_claimed', 'claim_amount', 'claimed_aud'],
  landed_cost: ['landed', 'true_cost', 'supplier_cost', 'landed_cost'],
  effective_from: ['cost_from', 'cost_effective_from', 'effective_from'],
  freight_cost: ['freight_expense', 'delivery_cost', 'shipping_cost', 'freight_cost'],
  plant_check: ['plant_check'],
  plant_gap_aud: ['plant_gap_aud', 'plant_gap'],
};

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/[\s\-]+/g, '_').replace(/[^a-z0-9_]/g, '');
}

export type MappingSuggestion = {
  source: string;
  canonical: CanonicalField | null;
  confidence: 'exact' | 'synonym' | 'none';
};

export function suggestColumnMapping(headers: string[]): MappingSuggestion[] {
  return headers.map((source) => {
    const norm = normalizeHeader(source);
    for (const field of CANONICAL_FIELDS) {
      if (norm === field) return { source, canonical: field, confidence: 'exact' as const };
    }
    for (const field of CANONICAL_FIELDS) {
      if (SYNONYMS[field].includes(norm)) {
        return { source, canonical: field, confidence: 'synonym' as const };
      }
    }
    return { source, canonical: null, confidence: 'none' as const };
  });
}

export function applyColumnMapping(
  rows: Array<Record<string, string>>,
  mapping: Record<string, CanonicalField | null>,
): Array<Record<string, string>> {
  return rows.map((row) => {
    const out: Record<string, string> = {};
    for (const [source, canonical] of Object.entries(mapping)) {
      if (!canonical) continue;
      out[canonical] = row[source] ?? '';
    }
    return out;
  });
}
