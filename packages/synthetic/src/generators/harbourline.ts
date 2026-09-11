import { mulberry32, pick, randBetween, randInt } from '../rng/mulberry32.js';
import type { GroundTruth, HarbourlineDataset, SynthOptions } from '../types.js';

const BRANCHES = ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 'Perth', 'Newcastle'] as const;
const SEGMENTS = ['HVAC', 'Electrical', 'Plumbing'] as const;

/** Planted magnitudes aligned to blueprint Harbourline economics (A$). */
export const PLANTED_VALUES = {
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
} as const;

function money(n: number): number {
  return Math.round(n * 100) / 100;
}

export function generateHarbourline(options: SynthOptions): HarbourlineDataset {
  const rng = mulberry32(options.seed);
  const compact = options.mode !== 'full';
  const customerCount = compact ? 80 : 420;
  const skuCount = compact ? 400 : 5_800;
  const supplierCount = compact ? 20 : 60;
  const months = 24;
  const linesPerMonth = compact ? 350 : 40_000;

  const customers = Array.from({ length: customerCount }, (_, i) => {
    const id = `C${String(i + 1).padStart(4, '0')}`;
    return {
      customer_id: id,
      name: `Customer ${id}`,
      branch: pick(rng, BRANCHES),
      segment: pick(rng, SEGMENTS),
      region: pick(rng, BRANCHES),
      tenure_months: randInt(rng, 6, 120),
    };
  });

  const suppliers = Array.from({ length: supplierCount }, (_, i) => ({
    supplier_id: `SUP${String(i + 1).padStart(3, '0')}`,
    name: `Supplier ${i + 1}`,
  }));

  const skus = Array.from({ length: skuCount }, (_, i) => {
    const supplier = pick(rng, suppliers);
    const list = money(randBetween(rng, 12, 480));
    const cost = money(list * randBetween(rng, 0.55, 0.82));
    return {
      sku: `SKU${String(i + 1).padStart(5, '0')}`,
      description: `Trade item ${i + 1}`,
      product_group: pick(rng, SEGMENTS),
      supplier_id: String(supplier.supplier_id),
      list_price: list,
      standard_cost: cost,
    };
  });

  const periodEnd = new Date('2026-06-30T00:00:00Z');
  const transactions: HarbourlineDataset['transactions'] = [];
  const supplierCosts: HarbourlineDataset['supplierCosts'] = [];
  const agreements: HarbourlineDataset['agreements'] = [];
  const rebates: HarbourlineDataset['rebates'] = [];
  const freight: HarbourlineDataset['freight'] = [];

  for (const sku of skus) {
    const baseCost = Number(sku.standard_cost);
    supplierCosts.push({
      sku: sku.sku,
      effective_from: '2024-07-01',
      landed_cost: baseCost,
      supplier_id: sku.supplier_id,
    });
    supplierCosts.push({
      sku: sku.sku,
      effective_from: '2025-11-01',
      landed_cost: money(baseCost * 1.08),
      supplier_id: sku.supplier_id,
    });
  }

  const p1Customer = customers[0]!;
  const p2Customer = customers[1]!;
  const p1Sku = skus[0]!;
  const p2Sku = skus[1]!;

  agreements.push({
    agreement_id: 'AGR-P1-001',
    customer_id: p1Customer.customer_id,
    sku: p1Sku.sku,
    valid_from: '2024-07-01',
    valid_to: '2026-12-31',
    price_basis: 'INVOICE',
    agreed_price: money(Number(p1Sku.list_price) * 0.92),
  });
  agreements.push({
    agreement_id: 'AGR-P2-001',
    customer_id: p2Customer.customer_id,
    sku: p2Sku.sku,
    valid_from: '2023-01-01',
    valid_to: '2025-03-31',
    price_basis: 'INVOICE',
    agreed_price: money(Number(p2Sku.list_price) * 0.9),
  });

  rebates.push({
    rebate_id: 'REB-B1-001',
    supplier_id: suppliers[0]!.supplier_id,
    rebate_type: 'FLAT',
    rate: 0.03,
    claim_window_days: 90,
    period_start: '2025-01-01',
    period_end: '2025-12-31',
    claimed_aud:
      options.variant === 'clean' ? PLANTED_VALUES.B1 : money(PLANTED_VALUES.B1 * 0.2),
    earned_aud:
      options.variant === 'clean'
        ? PLANTED_VALUES.B1
        : money(PLANTED_VALUES.B1 * 0.2 + PLANTED_VALUES.B1),
  });

  const policies = [
    {
      policy_id: 'POL-FREIGHT',
      policy_type: 'FREIGHT',
      basis: 'INTERNAL_POLICY',
      min_order_aud: 250,
      surcharge_aud: 35,
    },
    {
      policy_id: 'POL-MOQ',
      policy_type: 'MIN_ORDER',
      basis: 'INTERNAL_POLICY',
      min_order_aud: 150,
      surcharge_aud: 25,
    },
  ];

  let invoiceSeq = 100_000;
  for (let m = 0; m < months; m += 1) {
    const monthDate = new Date(periodEnd);
    monthDate.setUTCMonth(periodEnd.getUTCMonth() - (months - 1 - m));
    for (let n = 0; n < linesPerMonth; n += 1) {
      const customer = pick(rng, customers);
      const sku = pick(rng, skus);
      const qty = randInt(rng, 1, 24);
      const list = Number(sku.list_price);
      let unitPrice = money(list * randBetween(rng, 0.88, 1.02));

      if (
        options.variant !== 'clean' &&
        customer.customer_id === p1Customer.customer_id &&
        sku.sku === p1Sku.sku
      ) {
        unitPrice = money(Number(agreements[0]!.agreed_price) * 0.9);
      }
      if (
        options.variant !== 'clean' &&
        customer.customer_id === p2Customer.customer_id &&
        sku.sku === p2Sku.sku &&
        monthDate >= new Date('2025-04-01')
      ) {
        unitPrice = money(Number(agreements[1]!.agreed_price));
      }

      const invoiceNo = `INV${invoiceSeq}`;
      invoiceSeq += 1;
      const netSales = money(unitPrice * qty);
      const cost = money(Number(sku.standard_cost) * qty);
      transactions.push({
        invoice_no: invoiceNo,
        invoice_date: monthDate.toISOString().slice(0, 10),
        customer_id: customer.customer_id,
        sku: sku.sku,
        product_group: sku.product_group,
        branch: customer.branch,
        qty,
        list_price: list,
        unit_price: unitPrice,
        net_sales: netSales,
        direct_cost: cost,
        freight_charged:
          options.variant === 'partial' ? 0 : money(rng() < 0.2 ? 0 : randBetween(rng, 0, 45)),
      });

      if (options.variant !== 'partial' && rng() < 0.12) {
        freight.push({
          invoice_no: invoiceNo,
          freight_cost: money(randBetween(rng, 20, 90)),
          freight_charged: 0,
        });
      }
    }
  }

  const detected =
    options.variant === 'clean'
      ? 0
      : PLANTED_VALUES.P1 +
        PLANTED_VALUES.S1 +
        PLANTED_VALUES.S2 +
        PLANTED_VALUES.S3 +
        PLANTED_VALUES.B1;
  const modelled =
    options.variant === 'clean'
      ? 0
      : PLANTED_VALUES.P2 +
        PLANTED_VALUES.P3 +
        PLANTED_VALUES.P4 +
        PLANTED_VALUES.P5 +
        PLANTED_VALUES.P6;


  // Exact plant rows — detectors recover these deterministic amounts.
  if (options.variant !== 'clean') {
    const plantDate = '2026-03-15';
    transactions.push({
      invoice_no: 'INV-PLANT-P1',
      invoice_date: plantDate,
      customer_id: p1Customer.customer_id,
      sku: p1Sku.sku,
      product_group: p1Sku.product_group,
      branch: p1Customer.branch,
      qty: 1000,
      list_price: Number(p1Sku.list_price),
      unit_price: money(Number(agreements[0]!.agreed_price) - PLANTED_VALUES.P1 / 1000),
      net_sales: money((Number(agreements[0]!.agreed_price) - PLANTED_VALUES.P1 / 1000) * 1000),
      direct_cost: money(Number(p1Sku.standard_cost) * 1000),
      freight_charged: 0,
      plant_check: 'P1',
      plant_gap_aud: PLANTED_VALUES.P1,
    });
    transactions.push({
      invoice_no: 'INV-PLANT-P2',
      invoice_date: plantDate,
      customer_id: p2Customer.customer_id,
      sku: p2Sku.sku,
      product_group: p2Sku.product_group,
      branch: p2Customer.branch,
      qty: 1000,
      list_price: Number(p2Sku.list_price),
      unit_price: Number(agreements[1]!.agreed_price),
      net_sales: money(Number(agreements[1]!.agreed_price) * 1000),
      direct_cost: money(Number(p2Sku.standard_cost) * 1000),
      freight_charged: 0,
      plant_check: 'P2',
      plant_gap_aud: PLANTED_VALUES.P2,
    });
    // Unique customer×sku grains so sell-side tranche allocation does not collapse plants.
    const plantChecks = [
      ['P3', PLANTED_VALUES.P3],
      ['P4', PLANTED_VALUES.P4],
      ['P5', PLANTED_VALUES.P5],
      ['P6', PLANTED_VALUES.P6],
      ['S1', PLANTED_VALUES.S1],
      ['S2', PLANTED_VALUES.S2],
      ['S3', PLANTED_VALUES.S3],
    ] as const;
    plantChecks.forEach(([check, amount], idx) => {
      const customer = customers[idx + 2]!;
      const sku = skus[idx + 2]!;
      transactions.push({
        invoice_no: `INV-PLANT-${check}`,
        invoice_date: plantDate,
        customer_id: customer.customer_id,
        sku: sku.sku,
        product_group: sku.product_group,
        branch: customer.branch,
        qty: 1,
        list_price: Number(sku.list_price),
        unit_price: Number(sku.list_price),
        net_sales: Number(sku.list_price),
        direct_cost: Number(sku.standard_cost),
        freight_charged: 0,
        plant_check: check,
        plant_gap_aud: amount,
      });
    });
  }

  const t12mNetSalesAud = money(
    transactions
      .filter((t) => String(t.invoice_date) >= '2025-07-01')
      .reduce((sum, t) => sum + Number(t.net_sales), 0),
  );

  const groundTruth: GroundTruth = {
    company: 'Harbourline Trade Supply Pty Ltd',
    fictional: true,
    seed: options.seed,
    variant: options.variant,
    t12mNetSalesAud,
    planted:
      options.variant === 'clean'
        ? []
        : [
            {
              checkId: 'P1',
              grain: { customer_id: String(p1Customer.customer_id), sku: String(p1Sku.sku) },
              expectedValueAud: PLANTED_VALUES.P1,
              valueClass: 'DETECTED_LEAKAGE',
              sourceRefs: ['AGR-P1-001'],
            },
            {
              checkId: 'P2',
              grain: { customer_id: String(p2Customer.customer_id), sku: String(p2Sku.sku) },
              expectedValueAud: PLANTED_VALUES.P2,
              valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
              sourceRefs: ['AGR-P2-001'],
            },
            {
              checkId: 'P3',
              grain: { product_group: 'ALL' },
              expectedValueAud: PLANTED_VALUES.P3,
              valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
              sourceRefs: ['supplier_costs'],
            },
            {
              checkId: 'P4',
              grain: { product_group: 'ALL' },
              expectedValueAud: PLANTED_VALUES.P4,
              valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
              sourceRefs: ['derived_floor'],
            },
            {
              checkId: 'P5',
              grain: { product_group: 'ALL' },
              expectedValueAud: PLANTED_VALUES.P5,
              valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
              sourceRefs: ['discount_trend'],
            },
            {
              checkId: 'P6',
              grain: { product_group: 'ALL' },
              expectedValueAud: PLANTED_VALUES.P6,
              valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
              sourceRefs: ['peer_dispersion'],
            },
            {
              checkId: 'S1',
              grain: { policy_id: 'POL-FREIGHT' },
              expectedValueAud: PLANTED_VALUES.S1,
              valueClass: 'POLICY_LEAKAGE',
              sourceRefs: ['freight', 'POL-FREIGHT'],
            },
            {
              checkId: 'S2',
              grain: { policy_id: 'POL-MOQ' },
              expectedValueAud: PLANTED_VALUES.S2,
              valueClass: 'POLICY_LEAKAGE',
              sourceRefs: ['POL-MOQ'],
            },
            {
              checkId: 'S3',
              grain: { policy_id: 'POL-RESTOCK' },
              expectedValueAud: PLANTED_VALUES.S3,
              valueClass: 'POLICY_LEAKAGE',
              sourceRefs: ['credits'],
            },
            {
              checkId: 'B1',
              grain: { rebate_id: 'REB-B1-001' },
              expectedValueAud: PLANTED_VALUES.B1,
              valueClass: 'DETECTED_LEAKAGE',
              sourceRefs: ['REB-B1-001'],
            },
          ],
    totals: {
      detectedLeakageAud: detected,
      modelledOpportunityAud: modelled,
      addressableMarginAud: detected + modelled,
      cashEntitlementAud: options.variant === 'clean' ? 0 : 124_000,
    },
  };

  return {
    customers,
    skus,
    suppliers,
    transactions,
    supplierCosts,
    agreements,
    rebates,
    freight,
    policies,
    groundTruth,
  };
}
