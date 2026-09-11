import { defaultMethodConfig, moneyString, sha256, type CanonicalDataset } from '@marginshield/engine';
import { BRANCHES, fictionalCompany, GROUPS, SEGMENTS } from './names';
import { int, mulberry32, pick } from './rng';

export type Variant = 'clean' | 'planted' | 'messy' | 'partial';
export type Scale = 'compact' | 'full';

export const PERIOD_START = '2023-07-01';
export const PERIOD_END = '2025-06-30';
export const COMPANY = 'Harbourline Trade Supply Pty Ltd';

export const PLANTED_TARGETS = {
  P1: 286_000,
  P2: 196_000,
  P3: 411_000,
  P4: 188_000,
  P5: 151_000,
  P6: 98_000,
  S1: 221_000,
  S2: 64_000,
  S3: 57_000,
  B1: 168_000,
  CASH: 124_000,
} as const;

export interface GroundTruthIssue {
  check_id: string;
  grain_keys: string[];
  expected_value: number;
  value_class: string;
  source_records: string[];
}

export interface HarbourlineBundle {
  dataset: CanonicalDataset;
  ground_truth: {
    company: string;
    fictional: true;
    variant: Variant;
    seed: number;
    planted: GroundTruthIssue[];
    t12m_sales_target: number;
    addressable_target: number;
  };
  files: Record<string, string>;
}

function monthsBetween(start: string, end: string): string[] {
  const out: string[] = [];
  let cursor = start.slice(0, 7);
  const last = end.slice(0, 7);
  while (cursor <= last) {
    out.push(cursor);
    const [y, m] = cursor.split('-').map(Number);
    const year = y ?? 0;
    const month = m ?? 1;
    const next = month === 12 ? [year + 1, 1] : [year, month + 1];
    cursor = `${next[0]}-${String(next[1]).padStart(2, '0')}`;
  }
  return out;
}

function monthDate(month: string, day: number): string {
  return `${month}-${String(day).padStart(2, '0')}`;
}

let txSeq = 0;
function txId(): string {
  txSeq += 1;
  return `TX-${String(txSeq).padStart(7, '0')}`;
}

export function generateHarbourline(input: {
  seed?: number;
  variant?: Variant;
  scale?: Scale;
}): HarbourlineBundle {
  txSeq = 0;
  const seed = input.seed ?? 42;
  const variant = input.variant ?? 'planted';
  const scale = input.scale ?? 'compact';
  const rng = mulberry32(seed);
  const customerCount = scale === 'full' ? 420 : 36;
  const skuCount = scale === 'full' ? 240 : 24;
  const months = monthsBetween(PERIOD_START, PERIOD_END);

  const customers = Array.from({ length: customerCount }, (_, i) => ({
    customer_id: `C-${String(i + 1).padStart(3, '0')}`,
    name: fictionalCompany(rng, i),
    segment: SEGMENTS[i % SEGMENTS.length] ?? 'Trade',
    region: BRANCHES[i % BRANCHES.length] ?? 'Sydney',
    branch_id: BRANCHES[i % BRANCHES.length] ?? 'Sydney',
    sales_rep_id: `R-${String((i % 12) + 1).padStart(2, '0')}`,
    opened_on: '2018-03-01',
    currency: 'AUD',
  }));

  const suppliers = Array.from({ length: 6 }, (_, i) => ({
    supplier_id: `SUP-${i + 1}`,
    name: `${pick(rng, ['Northline', 'Westpeak', 'Cinder', 'Harbor', 'Yarra', 'Mallee'])} Components ${i + 1}`,
  }));

  const skus = Array.from({ length: skuCount }, (_, i) => {
    const list = 80 + (i % 10) * 5;
    return {
      sku: `SKU-N${String(i + 1).padStart(3, '0')}`,
      description: `${GROUPS[i % 3]} assembly ${i + 1}`,
      product_group: GROUPS[i % 3] ?? 'HVAC',
      supplier_id: suppliers[i % suppliers.length]?.supplier_id ?? 'SUP-1',
      standard_price: moneyString(list),
    };
  });

  const supplier_costs = skus.map((sku) => {
    const list = Number(sku.standard_price);
    const invoice = list * 0.9;
    const landed = invoice * 0.75;
    return {
      sku: sku.sku,
      effective_from: PERIOD_START,
      supplier_list_cost: moneyString(landed / 0.92),
      supplier_discount: moneyString(0),
      earned_rebate_per_unit: moneyString(0),
      inbound_freight: moneyString(landed * 0.03),
      duty: moneyString(0),
      import_charges: moneyString(0),
      fx_adjustment: moneyString(0),
      true_landed_cost: moneyString(landed),
      rebate_component_status: 'unavailable' as const,
      source_file: 'supplier_costs.csv',
      source_row: 1,
    };
  });

  const transactions: CanonicalDataset['transactions'] = [];
  const qtyBase = scale === 'full' ? 120 : 400;

  for (const customer of customers) {
    const customerSkus = skus.filter((_, i) => i % 6 === Number(customer.customer_id.slice(-2)) % 6).slice(0, 4);
    const useSkus = customerSkus.length ? customerSkus : skus.slice(0, 4);
    for (const month of months) {
      for (const sku of useSkus) {
        const list = Number(sku.standard_price);
        const unit = list * 0.9;
        const qty = qtyBase + int(rng, 0, 15);
        const landed = unit * 0.75;
        const date = monthDate(month, 8 + (Number(customer.customer_id.slice(-1)) % 18));
        transactions.push(
          line({
            date,
            customer_id: customer.customer_id,
            sku: sku.sku,
            product_group: sku.product_group,
            supplier_id: sku.supplier_id,
            branch_id: customer.branch_id,
            sales_rep_id: customer.sales_rep_id,
            qty,
            list,
            unit,
            landed,
            file: 'sales.csv',
          }),
        );
      }
    }
  }

  const agreements: CanonicalDataset['customer_agreements'] = [];
  const policies: CanonicalDataset['commercial_policies'] = [];
  const rebates: CanonicalDataset['supplier_rebates'] = [];
  const planted: GroundTruthIssue[] = [];

  policies.push({
    policy_id: 'POL-FREIGHT',
    kind: 'FREIGHT',
    basis: 'CONTRACTUAL',
    valid_from: PERIOD_START,
    freight_flat: '2500.0000',
    freight_free_above: '80000.0000',
    source_file: 'policies.csv',
    source_row: 2,
  });
  policies.push({
    policy_id: 'POL-MIN',
    kind: 'MINIMUM_ORDER',
    basis: 'INTERNAL_POLICY',
    valid_from: PERIOD_START,
    min_order_value: '5000.0000',
    surcharge: '400.0000',
    source_file: 'policies.csv',
    source_row: 3,
  });
  policies.push({
    policy_id: 'POL-RESTOCK',
    kind: 'RESTOCKING',
    basis: 'INTERNAL_POLICY',
    valid_from: PERIOD_START,
    restocking_rate: '0.15000000',
    source_file: 'policies.csv',
    source_row: 4,
  });

  if (variant !== 'clean') {
    plantP1(transactions, agreements, planted, skus, supplier_costs);
    plantP2(transactions, agreements, planted, skus, supplier_costs);
    plantP3(transactions, planted, skus, supplier_costs);
    plantP4(transactions, planted, skus, supplier_costs);
    plantP5(transactions, planted, skus);
    plantP6(transactions, planted, customers, skus, supplier_costs);
    plantS1(transactions, planted);
    plantS2(transactions, planted);
    plantS3(transactions, planted);
    plantB1(rebates, planted);
  }

  if (variant === 'partial') {
    policies.length = 0;
    rebates.length = 0;
    agreements.length = 0;
  }

  const files = serializeFiles(transactions, customers, skus, supplier_costs, agreements, rebates, policies, variant);
  const hashes: Record<string, string> = {};
  for (const [name, body] of Object.entries(files)) hashes[name] = sha256(body);

  const dataset: CanonicalDataset = {
    customers,
    skus,
    suppliers,
    transactions,
    supplier_costs,
    customer_agreements: agreements,
    supplier_rebates: rebates,
    purchases: [],
    freight: [],
    commercial_policies: variant === 'partial' ? [] : policies,
    analysis_period: { start: PERIOD_START, end: PERIOD_END },
    reporting_currency: 'AUD',
    mapping_profile: {
      files: Object.fromEntries(Object.keys(files).map((name) => [name, name])),
      confirmed_semantics: {
        invoice_revenue: 'NET_SALES_EX_FREIGHT',
        erp_cost: 'ERP_DIRECT_COST',
      },
    },
    method_config: defaultMethodConfig(),
    source_file_hashes: hashes,
    sales_tieout_confirmed: true,
    cost_tieout_confirmed: false,
  };

  return {
    dataset,
    ground_truth: {
      company: COMPANY,
      fictional: true,
      variant,
      seed,
      planted,
      t12m_sales_target: 85_000_000,
      addressable_target: 1_840_000,
    },
    files,
  };
}

function line(input: {
  date: string;
  customer_id: string;
  sku: string;
  product_group: string;
  supplier_id: string;
  branch_id: string;
  sales_rep_id: string;
  qty: number;
  list: number;
  unit: number;
  landed: number;
  file: string;
  invoice?: string;
  freightCharged?: number;
  freightCost?: number;
  credit?: number;
  is_return?: boolean;
  restocking?: number;
}): CanonicalDataset['transactions'][number] {
  const invoiceRevenue = input.qty * input.unit;
  const discount = Math.max(0, input.qty * input.list - invoiceRevenue);
  return {
    transaction_id: txId(),
    invoice_no: input.invoice ?? `INV-${input.customer_id}-${input.date.replaceAll('-', '')}`,
    invoice_date: input.date,
    customer_id: input.customer_id,
    sku: input.sku,
    product_group: input.product_group,
    supplier_id: input.supplier_id,
    branch_id: input.branch_id,
    sales_rep_id: input.sales_rep_id,
    quantity: moneyString(input.qty),
    list_price_per_unit: moneyString(input.list),
    invoice_unit_price: moneyString(input.unit),
    invoice_revenue: moneyString(invoiceRevenue),
    discount_amount: moneyString(discount),
    promotional_discount: moneyString(0),
    credit_amount: moneyString(input.credit ?? 0),
    freight_charged: moneyString(input.freightCharged ?? 0),
    freight_cost: moneyString(input.freightCost ?? 0),
    erp_cost: moneyString(input.landed),
    customer_rebate: moneyString(0),
    commercial_allowance: moneyString(0),
    pick_pack: moneyString(0),
    commission: moneyString(0),
    payment_processing: moneyString(0),
    service_expense: moneyString(0),
    net_sales_includes_discount: false,
    net_sales_includes_credit: false,
    net_sales_includes_freight: false,
    net_sales_includes_rebate: false,
    is_return: Boolean(input.is_return),
    restocking_fee_charged: moneyString(input.restocking ?? 0),
    currency: 'AUD',
    source_file: input.file,
    source_row: txSeq,
  };
}

function plantP1(
  txs: CanonicalDataset['transactions'],
  agreements: CanonicalDataset['customer_agreements'],
  planted: GroundTruthIssue[],
  skus: CanonicalDataset['skus'],
  costs: CanonicalDataset['supplier_costs'],
) {
  const sku = 'SKU-P1A';
  skus.push({
    sku,
    description: 'Condenser coil plant P1',
    product_group: 'HVAC',
    supplier_id: 'SUP-1',
    standard_price: moneyString(150),
  });
  costs.push(costRow(sku, PERIOD_START, 75));
  agreements.push({
    agreement_id: 'AGR-P1A',
    customer_id: 'C-001',
    sku,
    valid_from: '2024-01-01',
    valid_to: '2026-12-31',
    price_basis: 'INVOICE',
    unit_price: moneyString(150),
    source_file: 'agreements.csv',
    source_row: 2,
  });
  const unitGap = 50;
  const qtyPerMonth = PLANTED_TARGETS.P1 / unitGap / 12;
  for (const month of monthsBetween('2024-07-01', PERIOD_END)) {
    txs.push(
      line({
        date: monthDate(month, 12),
        customer_id: 'C-001',
        sku,
        product_group: 'HVAC',
        supplier_id: 'SUP-1',
        branch_id: 'Sydney',
        sales_rep_id: 'R-01',
        qty: qtyPerMonth,
        list: 150,
        unit: 100,
        landed: 75,
        file: 'sales.csv',
      }),
    );
  }
  planted.push({
    check_id: 'P1',
    grain_keys: ['C-001|SKU-P1A'],
    expected_value: PLANTED_TARGETS.P1,
    value_class: 'DETECTED_LEAKAGE',
    source_records: ['AGR-P1A'],
  });
}

function plantP2(
  txs: CanonicalDataset['transactions'],
  agreements: CanonicalDataset['customer_agreements'],
  planted: GroundTruthIssue[],
  skus: CanonicalDataset['skus'],
  costs: CanonicalDataset['supplier_costs'],
) {
  const sku = 'SKU-P2A';
  const current = 80;
  const standard = 120;
  const landed = 70;
  const restore = landed / 0.75;
  const reference = Math.min(standard, restore);
  const unitGap = reference - current;
  const qty = PLANTED_TARGETS.P2 / unitGap;
  skus.push({
    sku,
    description: 'Expired agreement plant P2',
    product_group: 'Electrical',
    supplier_id: 'SUP-2',
    standard_price: moneyString(standard),
  });
  costs.push(costRow(sku, PERIOD_START, landed));
  agreements.push({
    agreement_id: 'AGR-P2A',
    customer_id: 'C-002',
    sku,
    valid_from: '2022-01-01',
    valid_to: '2024-03-31',
    price_basis: 'INVOICE',
    unit_price: moneyString(current),
    source_file: 'agreements.csv',
    source_row: 3,
  });
  const qtyMonth = qty / 12;
  for (const month of monthsBetween('2024-07-01', PERIOD_END)) {
    txs.push(
      line({
        date: monthDate(month, 14),
        customer_id: 'C-002',
        sku,
        product_group: 'Electrical',
        supplier_id: 'SUP-2',
        branch_id: 'Melbourne',
        sales_rep_id: 'R-02',
        qty: qtyMonth,
        list: standard,
        unit: current,
        landed,
        file: 'sales.csv',
      }),
    );
  }
  planted.push({
    check_id: 'P2',
    grain_keys: ['C-002|SKU-P2A'],
    expected_value: PLANTED_TARGETS.P2,
    value_class: 'MODELLED_MARGIN_OPPORTUNITY',
    source_records: ['AGR-P2A'],
  });
}

function plantP3(
  txs: CanonicalDataset['transactions'],
  planted: GroundTruthIssue[],
  skus: CanonicalDataset['skus'],
  costs: CanonicalDataset['supplier_costs'],
) {
  const sku = 'SKU-P3A';
  const baselinePrice = 100;
  const currentPrice = 101;
  const baselineCost = 70;
  const currentCost = 80;
  const baselineMargin = (baselinePrice - baselineCost) / baselinePrice;
  const restore = currentCost / (1 - baselineMargin);
  const unitGap = restore - currentPrice;
  const qty = PLANTED_TARGETS.P3 / unitGap;
  skus.push({
    sku,
    description: 'Cost shock plant P3',
    product_group: 'Plumbing',
    supplier_id: 'SUP-3',
    standard_price: moneyString(110),
  });
  costs.push(costRow(sku, PERIOD_START, baselineCost, '2024-09-30'));
  costs.push(costRow(sku, '2024-10-01', currentCost));
  const qtyMonth = qty / 12;
  for (const month of monthsBetween('2024-07-01', PERIOD_END)) {
    const afterShock = month >= '2024-10';
    txs.push(
      line({
        date: monthDate(month, 16),
        customer_id: 'C-003',
        sku,
        product_group: 'Plumbing',
        supplier_id: 'SUP-3',
        branch_id: 'Brisbane',
        sales_rep_id: 'R-03',
        qty: qtyMonth,
        list: 120,
        unit: afterShock ? currentPrice : baselinePrice,
        landed: afterShock ? currentCost : baselineCost,
        file: 'sales.csv',
      }),
    );
  }
  planted.push({
    check_id: 'P3',
    grain_keys: ['C-003|SKU-P3A'],
    expected_value: PLANTED_TARGETS.P3,
    value_class: 'MODELLED_MARGIN_OPPORTUNITY',
    source_records: ['SKU-P3A-cost'],
  });
}

function plantP4(
  txs: CanonicalDataset['transactions'],
  planted: GroundTruthIssue[],
  skus: CanonicalDataset['skus'],
  costs: CanonicalDataset['supplier_costs'],
) {
  const sku = 'SKU-P4A';
  const landed = 90;
  const floorMargin = 0.25;
  const floorPrice = landed / (1 - floorMargin);
  const actual = 70;
  const unitGap = floorPrice - actual;
  const qty = PLANTED_TARGETS.P4 / unitGap;
  skus.push({
    sku,
    description: 'Below floor plant P4',
    product_group: 'HVAC',
    supplier_id: 'SUP-1',
    standard_price: moneyString(140),
  });
  costs.push(costRow(sku, PERIOD_START, landed));
  const qtyMonth = qty / 12;
  for (const month of monthsBetween('2024-07-01', PERIOD_END)) {
    txs.push(
      line({
        date: monthDate(month, 18),
        customer_id: 'C-004',
        sku,
        product_group: 'HVAC',
        supplier_id: 'SUP-1',
        branch_id: 'Adelaide',
        sales_rep_id: 'R-04',
        qty: qtyMonth,
        list: 140,
        unit: actual,
        landed,
        file: 'sales.csv',
      }),
    );
  }
  planted.push({
    check_id: 'P4',
    grain_keys: ['C-004|SKU-P4A'],
    expected_value: PLANTED_TARGETS.P4,
    value_class: 'MODELLED_MARGIN_OPPORTUNITY',
    source_records: ['SKU-P4A'],
  });
}

function plantP5(
  txs: CanonicalDataset['transactions'],
  planted: GroundTruthIssue[],
  skus: CanonicalDataset['skus'],
) {
  const sku = 'SKU-P5A';
  skus.push({
    sku,
    description: 'Discount creep plant P5',
    product_group: 'Controls',
    supplier_id: 'SUP-2',
    standard_price: moneyString(200),
  });
  const list = 200;
  const months = monthsBetween('2024-01-01', PERIOD_END);
  const listT12M = PLANTED_TARGETS.P5 / 0.04;
  const qtyMonth = listT12M / 12 / list;
  months.forEach((month, i) => {
    const discount = 0.1 + i * 0.002667;
    const unit = list * (1 - discount);
    txs.push(
      line({
        date: monthDate(month, 10),
        customer_id: 'C-005',
        sku,
        product_group: 'Controls',
        supplier_id: 'SUP-2',
        branch_id: 'Perth',
        sales_rep_id: 'R-05',
        qty: qtyMonth,
        list,
        unit,
        landed: unit * 0.75,
        file: 'sales.csv',
      }),
    );
  });
  planted.push({
    check_id: 'P5',
    grain_keys: ['C-005|Controls'],
    expected_value: PLANTED_TARGETS.P5,
    value_class: 'MODELLED_MARGIN_OPPORTUNITY',
    source_records: ['SKU-P5A'],
  });
}

function plantP6(
  txs: CanonicalDataset['transactions'],
  planted: GroundTruthIssue[],
  customers: CanonicalDataset['customers'],
  skus: CanonicalDataset['skus'],
  costs: CanonicalDataset['supplier_costs'],
) {
  const sku = 'SKU-P6A';
  skus.push({
    sku,
    description: 'Peer dispersion plant P6',
    product_group: 'Plumbing',
    supplier_id: 'SUP-3',
    standard_price: moneyString(100),
  });
  costs.push(costRow(sku, PERIOD_START, 60));
  const peerPrice = 100;
  const lowPrice = 80;
  const unitGap = 20;
  const qty = PLANTED_TARGETS.P6 / unitGap;
  const qtyMonth = qty / 12;
  const cohort = customers.filter((c) => c.segment === 'Trade' && c.region === 'Sydney').slice(0, 10);
  const peers = cohort.filter((c) => c.customer_id !== 'C-006');
  while (peers.length < 9) {
    const extra = customers.find((c) => !peers.includes(c) && c.customer_id !== 'C-006');
    if (!extra) break;
    extra.segment = 'Trade';
    extra.region = 'Sydney';
    extra.branch_id = 'Sydney';
    peers.push(extra);
  }
  for (const month of monthsBetween('2024-07-01', PERIOD_END)) {
    txs.push(
      line({
        date: monthDate(month, 11),
        customer_id: 'C-006',
        sku,
        product_group: 'Plumbing',
        supplier_id: 'SUP-3',
        branch_id: 'Sydney',
        sales_rep_id: 'R-06',
        qty: qtyMonth,
        list: 110,
        unit: lowPrice,
        landed: 60,
        file: 'sales.csv',
      }),
    );
    for (const peer of peers.slice(0, 9)) {
      txs.push(
        line({
          date: monthDate(month, 11),
          customer_id: peer.customer_id,
          sku,
          product_group: 'Plumbing',
          supplier_id: 'SUP-3',
          branch_id: 'Sydney',
          sales_rep_id: peer.sales_rep_id,
          qty: qtyMonth,
          list: 110,
          unit: peerPrice,
          landed: 60,
          file: 'sales.csv',
        }),
      );
    }
  }
  const c006 = customers.find((c) => c.customer_id === 'C-006');
  if (c006) {
    c006.segment = 'Trade';
    c006.region = 'Sydney';
    c006.branch_id = 'Sydney';
  }
  planted.push({
    check_id: 'P6',
    grain_keys: ['C-006|SKU-P6A'],
    expected_value: PLANTED_TARGETS.P6,
    value_class: 'MODELLED_MARGIN_OPPORTUNITY',
    source_records: ['SKU-P6A'],
  });
}

function plantS1(txs: CanonicalDataset['transactions'], planted: GroundTruthIssue[]) {
  const perInvoice = 2500;
  const invoices = PLANTED_TARGETS.S1 / perInvoice;
  for (let i = 0; i < invoices; i += 1) {
    const month = monthsBetween('2024-07-01', PERIOD_END)[i % 12] ?? '2024-07';
    txs.push(
      line({
        date: monthDate(month, 20),
        customer_id: 'C-007',
        sku: 'SKU-N001',
        product_group: 'HVAC',
        supplier_id: 'SUP-1',
        branch_id: 'Newcastle',
        sales_rep_id: 'R-07',
        qty: 20,
        list: 400,
        unit: 360,
        landed: 270,
        file: 'sales.csv',
        invoice: `INV-FR-${i + 1}`,
        freightCharged: 0,
        freightCost: perInvoice,
      }),
    );
  }
  planted.push({
    check_id: 'S1',
    grain_keys: ['S1|freight'],
    expected_value: PLANTED_TARGETS.S1,
    value_class: 'DETECTED_LEAKAGE',
    source_records: ['POL-FREIGHT'],
  });
}

function plantS2(txs: CanonicalDataset['transactions'], planted: GroundTruthIssue[]) {
  const count = PLANTED_TARGETS.S2 / 400;
  for (let i = 0; i < count; i += 1) {
    const month = monthsBetween('2024-07-01', PERIOD_END)[i % 12] ?? '2024-07';
    txs.push(
      line({
        date: monthDate(month, 21),
        customer_id: 'C-008',
        sku: 'SKU-N002',
        product_group: 'Electrical',
        supplier_id: 'SUP-2',
        branch_id: 'Sydney',
        sales_rep_id: 'R-08',
        qty: 1,
        list: 120,
        unit: 90,
        landed: 67.5,
        file: 'sales.csv',
        invoice: `INV-SO-${i + 1}`,
      }),
    );
  }
  planted.push({
    check_id: 'S2',
    grain_keys: ['S2|small_order_policy'],
    expected_value: PLANTED_TARGETS.S2,
    value_class: 'POLICY_LEAKAGE',
    source_records: ['POL-MIN'],
  });
}

function plantS3(txs: CanonicalDataset['transactions'], planted: GroundTruthIssue[]) {
  const creditTotal = PLANTED_TARGETS.S3 / 0.15;
  const per = creditTotal / 12;
  monthsBetween('2024-07-01', PERIOD_END).forEach((month, i) => {
    txs.push(
      line({
        date: monthDate(month, 22),
        customer_id: 'C-009',
        sku: 'SKU-N003',
        product_group: 'Plumbing',
        supplier_id: 'SUP-3',
        branch_id: 'Melbourne',
        sales_rep_id: 'R-09',
        qty: 1,
        list: per,
        unit: per,
        landed: per * 0.75,
        file: 'sales.csv',
        invoice: `CR-RT-${i + 1}`,
        credit: per,
        is_return: true,
        restocking: 0,
      }),
    );
  });
  planted.push({
    check_id: 'S3',
    grain_keys: ['S3|restocking'],
    expected_value: PLANTED_TARGETS.S3,
    value_class: 'POLICY_LEAKAGE',
    source_records: ['POL-RESTOCK'],
  });
}

function plantB1(rebates: CanonicalDataset['supplier_rebates'], planted: GroundTruthIssue[]) {
  rebates.push({
    rebate_id: 'RB-CASH',
    supplier_id: 'SUP-1',
    rebate_type: 'FLAT',
    period_start: '2024-07-01',
    period_end: '2025-06-30',
    claim_window_end: '2026-06-30',
    rate: '0.03000000',
    eligible_base: moneyString(PLANTED_TARGETS.CASH / 0.03),
    earned: moneyString(PLANTED_TARGETS.CASH),
    claimed: moneyString(0),
    received_pending_match: moneyString(0),
    source_file: 'rebates.csv',
    source_row: 2,
  });
  const remainder = PLANTED_TARGETS.B1 - PLANTED_TARGETS.CASH;
  rebates.push({
    rebate_id: 'RB-OLD',
    supplier_id: 'SUP-2',
    rebate_type: 'FLAT',
    period_start: '2023-07-01',
    period_end: '2024-06-30',
    claim_window_end: '2024-12-31',
    rate: '0.02000000',
    eligible_base: moneyString(remainder / 0.02),
    earned: moneyString(remainder),
    claimed: moneyString(0),
    received_pending_match: moneyString(0),
    source_file: 'rebates.csv',
    source_row: 3,
  });
  planted.push({
    check_id: 'B1',
    grain_keys: ['B1|RB-CASH', 'B1|RB-OLD'],
    expected_value: PLANTED_TARGETS.B1,
    value_class: 'DETECTED_LEAKAGE',
    source_records: ['RB-CASH', 'RB-OLD'],
  });
}

function costRow(
  sku: string,
  from: string,
  landed: number,
  to?: string,
): CanonicalDataset['supplier_costs'][number] {
  return {
    sku,
    effective_from: from,
    effective_to: to,
    supplier_list_cost: moneyString(landed),
    supplier_discount: moneyString(0),
    earned_rebate_per_unit: moneyString(0),
    inbound_freight: moneyString(0),
    duty: moneyString(0),
    import_charges: moneyString(0),
    fx_adjustment: moneyString(0),
    true_landed_cost: moneyString(landed),
    rebate_component_status: 'unavailable',
    source_file: 'supplier_costs.csv',
    source_row: 1,
  };
}

function serializeFiles(
  txs: CanonicalDataset['transactions'],
  customers: CanonicalDataset['customers'],
  skus: CanonicalDataset['skus'],
  costs: CanonicalDataset['supplier_costs'],
  agreements: CanonicalDataset['customer_agreements'],
  rebates: CanonicalDataset['supplier_rebates'],
  policies: CanonicalDataset['commercial_policies'],
  variant: Variant,
): Record<string, string> {
  const salesHeader = variant === 'messy' ? ['Inv No', 'Inv Date', 'Account', 'Item Code', 'Qty', 'List Price', 'Unit Price', 'Nett Sales', 'Disc', 'Credit', 'Freight Charge', 'Freight Cost', 'Unit Cost', 'Category', 'Vendor', 'Branch', 'Rep'] : ['invoice_no', 'invoice_date', 'customer_id', 'sku', 'quantity', 'list_price', 'invoice_unit_price', 'invoice_revenue', 'discount_amount', 'credit_amount', 'freight_charged', 'freight_cost', 'erp_cost', 'product_group', 'supplier_id', 'branch_id', 'sales_rep_id'];
  const salesRows = txs.map((t) => {
    const date = variant === 'messy' ? t.invoice_date.split('-').reverse().join('/') : t.invoice_date;
    return [t.invoice_no, date, t.customer_id, t.sku, t.quantity, t.list_price_per_unit ?? '', t.invoice_unit_price, t.invoice_revenue, t.discount_amount, t.credit_amount, t.freight_charged, t.freight_cost, t.erp_cost, t.product_group, t.supplier_id, t.branch_id, t.sales_rep_id].join(',');
  });
  const files: Record<string, string> = {
    'sales.csv': [salesHeader.join(','), ...salesRows].join('\n'),
    'customers.csv': ['customer_id,name,segment,region,branch_id,sales_rep_id,opened_on\n' + customers.map((c) => [c.customer_id, c.name, c.segment, c.region, c.branch_id, c.sales_rep_id, c.opened_on].join(',')).join('\n')].join(''),
    'skus.csv': ['sku,description,product_group,supplier_id,standard_price\n' + skus.map((s) => [s.sku, s.description, s.product_group, s.supplier_id, s.standard_price].join(',')).join('\n')].join(''),
    'supplier_costs.csv': [
      'sku,effective_from,effective_to,true_landed_cost',
      ...costs.map((c) => [c.sku, c.effective_from, c.effective_to ?? '', c.true_landed_cost].join(',')),
    ].join('\n'),
    'agreements.csv': [
      'agreement_id,customer_id,sku,valid_from,valid_to,price_basis,unit_price',
      ...agreements.map((a) => [a.agreement_id, a.customer_id, a.sku ?? '', a.valid_from, a.valid_to, a.price_basis, a.unit_price ?? ''].join(',')),
    ].join('\n'),
    'rebates.csv': [
      'rebate_id,supplier_id,rebate_type,period_start,period_end,claim_window_end,rate,eligible_base,earned,claimed',
      ...rebates.map((r) => [r.rebate_id, r.supplier_id, r.rebate_type, r.period_start, r.period_end, r.claim_window_end, r.rate ?? '', r.eligible_base, r.earned, r.claimed].join(',')),
    ].join('\n'),
    'policies.csv': [
      'policy_id,kind,basis,freight_flat,freight_free_above,min_order_value,surcharge,restocking_rate',
      ...policies.map((p) => [p.policy_id, p.kind, p.basis, p.freight_flat ?? '', p.freight_free_above ?? '', p.min_order_value ?? '', p.surcharge ?? '', p.restocking_rate ?? ''].join(',')),
    ].join('\n'),
  };
  return files;
}
