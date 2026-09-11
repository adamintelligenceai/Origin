import { defaultMethodConfig } from '../config';
import { sha256 } from '../hash';
import { moneyString } from '../money';
import type {
  CanonicalDataset,
  CommercialPolicy,
  Customer,
  CustomerAgreement,
  FreightRecord,
  MappingProfile,
  MethodConfig,
  PolicyKind,
  Sku,
  Supplier,
  SupplierCost,
  SupplierRebate,
  Transaction,
} from '../types';
import { parseAuDate, parseAuNumber } from './normalise';
import type { ParsedTable } from './parse';
import { inferTableRole, type TableRole } from './roles';
import { mapHeader, type CanonicalField } from './synonyms';

export interface SemanticConfirmation {
  net_sales_includes_discount: boolean;
  net_sales_includes_credit: boolean;
  net_sales_includes_freight: boolean;
  net_sales_includes_rebate: boolean;
  cost_is_landed: boolean;
}

export const DEFAULT_SEMANTICS: SemanticConfirmation = {
  net_sales_includes_discount: false,
  net_sales_includes_credit: false,
  net_sales_includes_freight: false,
  net_sales_includes_rebate: false,
  cost_is_landed: false,
};

export interface MappedTable {
  name: string;
  table: ParsedTable;
  role: TableRole;
  mapping: Record<string, string>;
}

export function defaultSalesMapping(table: ParsedTable): Record<string, CanonicalField> {
  const mapping: Record<string, CanonicalField> = {};
  for (const header of table.headers) {
    const target = mapHeader(header);
    if (target) mapping[header] = target;
  }
  return mapping;
}

function cell(row: Record<string, string>, ...keys: string[]): string {
  for (const key of keys) {
    const direct = row[key];
    if (direct !== undefined && direct !== '') return direct;
    const lower = key.toLowerCase();
    for (const [header, value] of Object.entries(row)) {
      if (header.toLowerCase() === lower && value !== '') return value;
    }
  }
  return '';
}

function asMoney(value: string, fallback = '0.0000'): string {
  const parsed = parseAuNumber(value);
  return parsed ?? fallback;
}

function asDate(value: string): string {
  return parseAuDate(value) ?? value;
}

function asRate(value: string): string | undefined {
  const parsed = parseAuNumber(value);
  return parsed;
}

function objects(table: ParsedTable): Record<string, string>[] {
  return table.rows.map((row) => {
    const rec: Record<string, string> = {};
    for (const [index, header] of table.headers.entries()) {
      rec[header] = row[index] ?? '';
    }
    return rec;
  });
}

function mappedSalesRows(table: ParsedTable, mapping: Record<string, string>): Record<CanonicalField | string, string>[] {
  return table.rows.map((row) => {
    const rec: Record<string, string> = {};
    for (const [index, header] of table.headers.entries()) {
      const target = mapping[header];
      if (target) rec[target] = row[index] ?? '';
    }
    return rec;
  });
}

function policyKind(value: string): PolicyKind {
  const v = value.toUpperCase();
  if (v === 'FREIGHT' || v === 'MINIMUM_ORDER' || v === 'RESTOCKING' || v === 'MARGIN_FLOOR') return v;
  return 'FREIGHT';
}

export function buildCanonicalDataset(input: {
  tables: MappedTable[];
  semantics?: SemanticConfirmation;
  method_config?: MethodConfig;
  sales_tieout_confirmed?: boolean;
  known_sales_total?: string;
  source_texts?: Record<string, string>;
}): CanonicalDataset {
  const semantics = input.semantics ?? DEFAULT_SEMANTICS;
  const customers: Customer[] = [];
  const skus: Sku[] = [];
  const suppliers = new Map<string, Supplier>();
  const transactions: Transaction[] = [];
  const supplier_costs: SupplierCost[] = [];
  const customer_agreements: CustomerAgreement[] = [];
  const supplier_rebates: SupplierRebate[] = [];
  const freight: FreightRecord[] = [];
  const commercial_policies: CommercialPolicy[] = [];
  const mappingFiles: Record<string, string> = {};

  for (const mapped of input.tables) {
    const role = mapped.role === 'unknown' ? inferTableRole(mapped.name, mapped.table) : mapped.role;
    mappingFiles[mapped.name] = role;
    if (role === 'sales') {
      const rows = mappedSalesRows(mapped.table, mapped.mapping);
      rows.forEach((row, index) => {
        const quantity = asMoney(row.quantity ?? '1', '1.0000');
        const unit = asMoney(row.invoice_unit_price ?? '');
        const revenue = row.invoice_revenue ? asMoney(row.invoice_revenue) : moneyString(Number(quantity) * Number(unit));
        const customer_id = row.customer_id || 'UNKNOWN';
        const sku = row.sku || 'UNKNOWN';
        const supplier_id = row.supplier_id || 'SUP-UNK';
        transactions.push({
          transaction_id: `TX-${mapped.name}-${index + 1}`,
          invoice_no: row.invoice_no || `INV-${index + 1}`,
          invoice_date: asDate(row.invoice_date ?? ''),
          customer_id,
          sku,
          product_group: row.product_group || 'Unspecified',
          supplier_id,
          branch_id: row.branch_id || 'HQ',
          sales_rep_id: row.sales_rep_id || 'UNASSIGNED',
          quantity,
          list_price_per_unit: row.list_price ? asMoney(row.list_price) : undefined,
          invoice_unit_price: unit,
          invoice_revenue: revenue,
          discount_amount: asMoney(row.discount_amount ?? '0'),
          promotional_discount: '0.0000',
          credit_amount: asMoney(row.credit_amount ?? '0'),
          freight_charged: asMoney(row.freight_charged ?? '0'),
          freight_cost: asMoney(row.freight_cost ?? '0'),
          erp_cost: asMoney((semantics.cost_is_landed ? row.landed_cost : row.erp_cost) ?? row.landed_cost ?? row.erp_cost ?? '0'),
          customer_rebate: '0.0000',
          commercial_allowance: '0.0000',
          pick_pack: '0.0000',
          commission: '0.0000',
          payment_processing: '0.0000',
          service_expense: '0.0000',
          net_sales_includes_discount: semantics.net_sales_includes_discount,
          net_sales_includes_credit: semantics.net_sales_includes_credit,
          net_sales_includes_freight: semantics.net_sales_includes_freight,
          net_sales_includes_rebate: semantics.net_sales_includes_rebate,
          is_return: Number(asMoney(row.credit_amount ?? '0')) > 0 && Number(quantity) < 0,
          restocking_fee_charged: '0.0000',
          currency: row.currency || 'AUD',
          source_file: mapped.name,
          source_row: index + 2,
        });
      });
      continue;
    }

    const rows = objects(mapped.table);
    if (role === 'customers') {
      for (const row of rows) {
        const customer_id = cell(row, 'customer_id', 'account', 'account code');
        if (!customer_id) continue;
        customers.push({
          customer_id,
          name: cell(row, 'name', 'customer', 'customer name') || customer_id,
          segment: cell(row, 'segment') || 'Trade',
          region: cell(row, 'region', 'branch_id', 'branch') || 'Unspecified',
          branch_id: cell(row, 'branch_id', 'branch') || 'HQ',
          sales_rep_id: cell(row, 'sales_rep_id', 'rep') || 'UNASSIGNED',
          opened_on: asDate(cell(row, 'opened_on') || '2018-01-01'),
          currency: cell(row, 'currency') || 'AUD',
        });
      }
    } else if (role === 'skus') {
      for (const row of rows) {
        const sku = cell(row, 'sku', 'item', 'item code');
        if (!sku) continue;
        const supplier_id = cell(row, 'supplier_id', 'vendor') || 'SUP-UNK';
        skus.push({
          sku,
          description: cell(row, 'description') || sku,
          product_group: cell(row, 'product_group', 'category') || 'Unspecified',
          supplier_id,
          standard_price: cell(row, 'standard_price', 'list_price') ? asMoney(cell(row, 'standard_price', 'list_price')) : undefined,
        });
        suppliers.set(supplier_id, { supplier_id, name: supplier_id });
      }
    } else if (role === 'agreements') {
      rows.forEach((row, index) => {
        const agreement_id = cell(row, 'agreement_id') || `AGR-${index + 1}`;
        const customer_id = cell(row, 'customer_id');
        if (!customer_id) return;
        const basis = cell(row, 'price_basis').toUpperCase() === 'POCKET' ? 'POCKET' : 'INVOICE';
        customer_agreements.push({
          agreement_id,
          customer_id,
          sku: cell(row, 'sku') || undefined,
          product_group: cell(row, 'product_group') || undefined,
          valid_from: asDate(cell(row, 'valid_from')),
          valid_to: asDate(cell(row, 'valid_to')),
          price_basis: basis,
          unit_price: cell(row, 'unit_price') ? asMoney(cell(row, 'unit_price')) : undefined,
          discount_rate: asRate(cell(row, 'discount_rate')),
          source_file: mapped.name,
          source_row: index + 2,
        });
      });
    } else if (role === 'rebates') {
      rows.forEach((row, index) => {
        const rebate_id = cell(row, 'rebate_id') || `REB-${index + 1}`;
        const supplier_id = cell(row, 'supplier_id');
        if (!supplier_id) return;
        const typeRaw = cell(row, 'rebate_type').toUpperCase();
        const rebate_type =
          typeRaw === 'RETROSPECTIVE_TIER' ||
          typeRaw === 'INCREMENTAL_TIER' ||
          typeRaw === 'GROWTH' ||
          typeRaw === 'CLAIM_BACK'
            ? typeRaw
            : 'FLAT';
        supplier_rebates.push({
          rebate_id,
          supplier_id,
          rebate_type,
          period_start: asDate(cell(row, 'period_start')),
          period_end: asDate(cell(row, 'period_end')),
          claim_window_end: asDate(cell(row, 'claim_window_end') || cell(row, 'period_end')),
          rate: asRate(cell(row, 'rate')),
          eligible_base: asMoney(cell(row, 'eligible_base')),
          earned: asMoney(cell(row, 'earned')),
          claimed: asMoney(cell(row, 'claimed')),
          received_pending_match: asMoney(cell(row, 'received_pending_match') || '0'),
          source_file: mapped.name,
          source_row: index + 2,
        });
      });
    } else if (role === 'costs') {
      rows.forEach((row, index) => {
        const sku = cell(row, 'sku');
        if (!sku) return;
        const landed = asMoney(cell(row, 'true_landed_cost', 'landed_cost'));
        supplier_costs.push({
          sku,
          effective_from: asDate(cell(row, 'effective_from')),
          effective_to: cell(row, 'effective_to') ? asDate(cell(row, 'effective_to')) : undefined,
          supplier_list_cost: asMoney(cell(row, 'supplier_list_cost') || landed),
          supplier_discount: asMoney(cell(row, 'supplier_discount') || '0'),
          earned_rebate_per_unit: asMoney(cell(row, 'earned_rebate_per_unit') || '0'),
          inbound_freight: asMoney(cell(row, 'inbound_freight') || '0'),
          duty: asMoney(cell(row, 'duty') || '0'),
          import_charges: asMoney(cell(row, 'import_charges') || '0'),
          fx_adjustment: asMoney(cell(row, 'fx_adjustment') || '0'),
          true_landed_cost: landed,
          rebate_component_status: 'unavailable',
          source_file: mapped.name,
          source_row: index + 2,
        });
      });
    } else if (role === 'policies') {
      rows.forEach((row, index) => {
        commercial_policies.push({
          policy_id: cell(row, 'policy_id') || `POL-${index + 1}`,
          kind: policyKind(cell(row, 'kind')),
          basis: cell(row, 'basis').toUpperCase() === 'CONTRACTUAL' ? 'CONTRACTUAL' : 'INTERNAL_POLICY',
          valid_from: asDate(cell(row, 'valid_from') || '2020-01-01'),
          valid_to: cell(row, 'valid_to') ? asDate(cell(row, 'valid_to')) : undefined,
          min_order_value: cell(row, 'min_order_value') ? asMoney(cell(row, 'min_order_value')) : undefined,
          surcharge: cell(row, 'surcharge') ? asMoney(cell(row, 'surcharge')) : undefined,
          restocking_rate: asRate(cell(row, 'restocking_rate')),
          floor_margin: asRate(cell(row, 'floor_margin')),
          freight_flat: cell(row, 'freight_flat') ? asMoney(cell(row, 'freight_flat')) : undefined,
          freight_free_above: cell(row, 'freight_free_above') ? asMoney(cell(row, 'freight_free_above')) : undefined,
          source_file: mapped.name,
          source_row: index + 2,
        });
      });
    } else if (role === 'freight') {
      rows.forEach((row, index) => {
        freight.push({
          freight_id: cell(row, 'freight_id') || `FR-${index + 1}`,
          invoice_no: cell(row, 'invoice_no') || undefined,
          customer_id: cell(row, 'customer_id') || undefined,
          freight_date: asDate(cell(row, 'freight_date', 'invoice_date')),
          freight_cost: asMoney(cell(row, 'freight_cost')),
          freight_charged: asMoney(cell(row, 'freight_charged')),
          source_file: mapped.name,
          source_row: index + 2,
        });
      });
    }
  }

  const customerIds = new Set(customers.map((c) => c.customer_id));
  const skuIds = new Set(skus.map((s) => s.sku));
  for (const tx of transactions) {
    if (!customerIds.has(tx.customer_id)) {
      customers.push({
        customer_id: tx.customer_id,
        name: tx.customer_id,
        segment: 'Trade',
        region: tx.branch_id,
        branch_id: tx.branch_id,
        sales_rep_id: tx.sales_rep_id,
        opened_on: '2018-01-01',
        currency: tx.currency,
      });
      customerIds.add(tx.customer_id);
    }
    if (!skuIds.has(tx.sku)) {
      skus.push({
        sku: tx.sku,
        description: tx.sku,
        product_group: tx.product_group,
        supplier_id: tx.supplier_id,
      });
      skuIds.add(tx.sku);
    }
    if (!suppliers.has(tx.supplier_id)) {
      suppliers.set(tx.supplier_id, { supplier_id: tx.supplier_id, name: tx.supplier_id });
    }
  }

  const dates = transactions.map((t) => t.invoice_date).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
  const start = dates[0] ?? '2023-07-01';
  const end = dates[dates.length - 1] ?? '2025-06-30';

  const hashes: Record<string, string> = {};
  for (const [name, body] of Object.entries(input.source_texts ?? {})) hashes[name] = sha256(body);
  for (const table of input.tables) {
    if (!hashes[table.name]) hashes[table.name] = sha256(table.table.headers.join('|'));
  }

  const mapping_profile: MappingProfile = {
    files: mappingFiles,
    confirmed_semantics: {
      invoice_revenue: semantics.net_sales_includes_freight ? 'NET_SALES_INCL_FREIGHT' : 'NET_SALES_EX_FREIGHT',
      erp_cost: semantics.cost_is_landed ? 'LANDED_COST' : 'ERP_DIRECT_COST',
    },
  };

  return {
    customers,
    skus,
    suppliers: [...suppliers.values()],
    transactions,
    supplier_costs,
    customer_agreements,
    supplier_rebates,
    purchases: [],
    freight,
    commercial_policies,
    analysis_period: { start, end },
    reporting_currency: 'AUD',
    mapping_profile,
    method_config: input.method_config ?? defaultMethodConfig(),
    source_file_hashes: hashes,
    sales_tieout_confirmed: Boolean(input.sales_tieout_confirmed),
    cost_tieout_confirmed: false,
    known_sales_total: input.known_sales_total,
  };
}
