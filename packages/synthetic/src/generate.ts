import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  BRANCHES,
  SECTORS,
  customerName,
  personName,
  skuName,
  supplierName,
} from './names.js';
import {
  CASH_ENTITLEMENT,
  DETECTED_TOTAL,
  MODELLED_TOTAL,
  PLANTED_TOTAL,
  buildGroundTruthIssues,
} from './planted.js';
import { createRng, type Rng } from './rng.js';

export type SynthVariant = 'clean' | 'planted' | 'messy' | 'partial';

export type GenerateOptions = {
  seed: number;
  variant: SynthVariant;
  outDir: string;
  targetSalesAud?: number;
  lineCount?: number;
};

export type GenerateResult = {
  outDir: string;
  variant: SynthVariant;
  seed: number;
  files: Record<string, string>;
  hashes: Record<string, string>;
  summary: {
    t12mSalesAud: number;
    customerCount: number;
    skuCount: number;
    supplierCount: number;
    lineCount: number;
    plantedTotalAud: number;
    detectedTotalAud: number;
    modelledTotalAud: number;
    cashEntitlementAud: number;
  };
};

type Row = Record<string, string | number>;

function toCsv(rows: Row[], headers: string[]): string {
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return `${[headers.join(','), ...rows.map((r) => headers.map((h) => esc(r[h] ?? '')).join(','))].join('\n')}\n`;
}

function sha256(content: string): string {
  return createHash('sha256').update(content, 'utf8').digest('hex');
}

function money(n: number): string {
  return n.toFixed(4);
}

function dateIso(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function auDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

type Master = {
  customers: Row[];
  skus: Row[];
  suppliers: Row[];
  reps: Row[];
  branches: Row[];
};

function buildMaster(rng: Rng): Master {
  const customers = Array.from({ length: 420 }, (_, i) => ({
    customer_id: `CUST-${String(i + 1).padStart(4, '0')}`,
    customer_name: customerName(i),
    branch_id: BRANCHES[i % BRANCHES.length]!.id,
    sector: SECTORS[i % SECTORS.length]!,
    rep_id: `REP-${String((i % 28) + 1).padStart(2, '0')}`,
  }));

  const skus = Array.from({ length: 580 }, (_, i) => {
    const list = 20 + (i % 480) + rng.next() * 40;
    const cost = list * (0.55 + rng.next() * 0.2);
    return {
      sku: `SKU-${String(i + 1).padStart(5, '0')}`,
      sku_name: skuName(i),
      product_group: SECTORS[i % SECTORS.length]!,
      list_price: money(list),
      standard_cost: money(cost),
      supplier_id: `SUP-${String((i % 60) + 1).padStart(3, '0')}`,
      margin_floor_pct: money(12 + (i % 10)),
    };
  });

  const suppliers = Array.from({ length: 60 }, (_, i) => ({
    supplier_id: `SUP-${String(i + 1).padStart(3, '0')}`,
    supplier_name: supplierName(i),
    rebate_rate_pct: money(2 + (i % 5)),
  }));

  const reps = Array.from({ length: 28 }, (_, i) => ({
    rep_id: `REP-${String(i + 1).padStart(2, '0')}`,
    rep_name: personName(i + 50),
    branch_id: BRANCHES[i % BRANCHES.length]!.id,
  }));

  const branches = BRANCHES.map((b) => ({
    branch_id: b.id,
    branch_name: b.name,
    state: b.state,
  }));

  return { customers, skus, suppliers, reps, branches };
}

function buildSalesLines(
  rng: Rng,
  master: Master,
  lineCount: number,
  targetSalesAud: number,
): Row[] {
  const avg = targetSalesAud / lineCount;
  const rows: Row[] = [];
  let remaining = targetSalesAud;

  for (let i = 0; i < lineCount; i++) {
    const cust = master.customers[i % master.customers.length]!;
    const sku = master.skus[i % master.skus.length]!;
    const list = Number(sku.list_price);
    const cost = Number(sku.standard_cost);
    const monthsAgo = i % 24;
    const year = monthsAgo >= 12 ? 2024 : 2025;
    const month = ((11 - (monthsAgo % 12)) % 12) + 1;
    const day = 1 + (i % 27);
    const qty = Math.max(1, Math.round(avg / list) || 1);
    const discount = 0.02 + rng.next() * 0.08;
    const unitPrice = list * (1 - discount);
    const lineSales = unitPrice * qty;
    remaining -= lineSales;

    rows.push({
      invoice_no: `INV-${String(i + 1).padStart(7, '0')}`,
      invoice_date: dateIso(year, month, day),
      customer_id: String(cust.customer_id),
      customer_name: String(cust.customer_name),
      sku: String(sku.sku),
      sku_name: String(sku.sku_name),
      product_group: String(sku.product_group),
      branch_id: String(cust.branch_id),
      rep_id: String(cust.rep_id),
      qty,
      list_price: money(list),
      unit_price: money(unitPrice),
      line_sales: money(lineSales),
      unit_cost: money(cost),
      line_cogs: money(cost * qty),
      currency: 'AUD',
    });
  }

  if (rows.length > 0) {
    const last = rows[rows.length - 1]!;
    last.line_sales = money(Number(last.line_sales) + remaining);
    last.unit_price = money(Number(last.line_sales) / Number(last.qty));
  }

  return rows;
}

function baselineAgreements(master: Master): Row[] {
  return Array.from({ length: 40 }, (_, i) => {
    const cust = master.customers[i]!;
    const sku = master.skus[i]!;
    return {
      agreement_id: `AGR-BASE-${String(i + 1).padStart(3, '0')}`,
      customer_id: String(cust.customer_id),
      sku: String(sku.sku),
      valid_from: '2024-01-01',
      valid_to: '2026-12-31',
      agreed_price: String(sku.list_price),
      status: 'ACTIVE',
      planted_check: '',
      planted_value_aud: 0,
    };
  });
}

function injectPlanted(sales: Row[], master: Master) {
  const issues = buildGroundTruthIssues();
  const agreements: Row[] = [];
  const freight: Row[] = [];
  const rebates: Row[] = [];
  const policies: Row[] = [];
  const purchases: Row[] = [];
  const costs: Row[] = [];

  for (const issue of issues) {
    const checkId = issue.checkId;
    const customerId = issue.grainKeys.customerId;
    const sku = issue.grainKeys.sku || String(master.skus[0]!.sku);
    const supplierId = issue.grainKeys.supplierId || String(master.suppliers[0]!.supplier_id);
    const anchor = sales[checkId.charCodeAt(0)! % sales.length]!;

    anchor.customer_id = customerId;
    anchor.customer_name = `Planted ${checkId} Customer`;
    if (checkId.startsWith('P')) {
      anchor.sku = sku;
      anchor.sku_name = `Planted ${checkId} SKU`;
    }

    agreements.push({
      agreement_id: `AGR-PLANT-${checkId}`,
      customer_id: customerId,
      sku: checkId.startsWith('P') ? sku : '',
      valid_from: '2024-01-01',
      valid_to: checkId === 'P2' ? '2024-06-30' : '2026-12-31',
      agreed_price: money(Number(anchor.list_price) * (checkId === 'P1' ? 0.92 : 0.95)),
      status: checkId === 'P2' ? 'EXPIRED' : 'ACTIVE',
      planted_check: checkId,
      planted_value_aud: issue.expectedValueAud,
    });

    if (checkId === 'S1' || checkId === 'S2' || checkId === 'S3') {
      freight.push({
        freight_id: `FR-PLANT-${checkId}`,
        invoice_no: String(anchor.invoice_no),
        customer_id: customerId,
        freight_cost: money(issue.expectedValueAud * (checkId === 'S1' ? 1 : 0.4)),
        freight_charged: money(0),
        policy_code: checkId,
        planted_check: checkId,
        planted_value_aud: issue.expectedValueAud,
      });
      policies.push({
        policy_id: `POL-${checkId}`,
        policy_code: checkId,
        policy_name:
          checkId === 'S1'
            ? 'Recoverable freight'
            : checkId === 'S2'
              ? 'Small order surcharge'
              : 'Restocking fee',
        threshold_aud: checkId === 'S2' ? 250 : 0,
        rate_pct: checkId === 'S3' ? 15 : 0,
        active: 'Y',
      });
    }

    if (checkId === 'B1') {
      rebates.push({
        rebate_id: 'RB-PLANT-B1',
        supplier_id: supplierId,
        period_start: '2025-01-01',
        period_end: '2025-12-31',
        earned_aud: money(issue.expectedValueAud + CASH_ENTITLEMENT),
        claimed_aud: money(issue.expectedValueAud),
        claimable_now_aud: money(CASH_ENTITLEMENT),
        planted_check: 'B1',
        planted_value_aud: issue.expectedValueAud,
      });
      purchases.push({
        purchase_id: 'PO-PLANT-B1',
        supplier_id: supplierId,
        sku,
        qty: 1000,
        unit_cost: money(50),
        purchase_date: '2025-03-15',
      });
    }

    if (checkId === 'P3') {
      costs.push({
        cost_id: 'COST-PLANT-P3',
        sku,
        effective_from: '2025-01-01',
        landed_cost: money(Number(anchor.unit_cost) * 1.18),
        prior_landed_cost: money(Number(anchor.unit_cost)),
        planted_check: 'P3',
        planted_value_aud: issue.expectedValueAud,
      });
    }
  }

  agreements.push(...baselineAgreements(master));
  return { agreements, freight, rebates, policies, purchases, costs };
}

function messifyHeaders(headers: string[], rng: Rng): string[] {
  const synonyms: Record<string, string[]> = {
    invoice_no: ['Inv No', 'Invoice #', 'DocNum'],
    invoice_date: ['Inv Date', 'Document Date', 'TxnDate'],
    customer_id: ['Cust ID', 'Customer Code', 'Account'],
    customer_name: ['Customer', 'Account Name', 'Cust Name'],
    unit_price: ['Sell Price', 'Unit Sell', 'Price'],
    line_sales: ['Ext Sell', 'Net Sales', 'Line Amount'],
    unit_cost: ['Unit Cost', 'Std Cost', 'Cost'],
  };
  return headers.map((h) => {
    const opts = synonyms[h];
    return opts ? rng.pick(opts) : h;
  });
}

function salesCsvBody(rows: Row[], headers: string[], variant: SynthVariant, rng: Rng): string {
  if (variant !== 'messy') return toCsv(rows, headers);

  const hdrs = messifyHeaders(headers, rng);
  const out: Row[] = [];
  for (const row of rows) {
    const copy: Row = {};
    headers.forEach((h, i) => {
      let v = row[h]!;
      if (h === 'invoice_date') v = auDate(String(v));
      if (h === 'line_sales' && rng.chance(0.02)) v = `(${v})`;
      copy[hdrs[i]!] = v;
    });
    out.push(copy);
    if (rng.chance(0.01)) out.push({ ...copy });
  }
  return toCsv(out, hdrs);
}

export function generateHarbourline(options: GenerateOptions): GenerateResult {
  const { seed, variant, outDir } = options;
  const targetSalesAud = options.targetSalesAud ?? 85_000_000;
  const lineCount = options.lineCount ?? 42_500;
  const rng = createRng(seed);
  const master = buildMaster(rng);
  const sales = buildSalesLines(rng, master, lineCount, targetSalesAud);

  const planted =
    variant === 'clean'
      ? {
          agreements: baselineAgreements(master),
          freight: [] as Row[],
          rebates: [] as Row[],
          policies: [] as Row[],
          purchases: [] as Row[],
          costs: [] as Row[],
        }
      : injectPlanted(sales, master);

  const salesHeaders = [
    'invoice_no',
    'invoice_date',
    'customer_id',
    'customer_name',
    'sku',
    'sku_name',
    'product_group',
    'branch_id',
    'rep_id',
    'qty',
    'list_price',
    'unit_price',
    'line_sales',
    'unit_cost',
    'line_cogs',
    'currency',
  ];

  const files: Record<string, string> = {
    'customers.csv': toCsv(master.customers, [
      'customer_id',
      'customer_name',
      'branch_id',
      'sector',
      'rep_id',
    ]),
    'skus.csv': toCsv(master.skus, [
      'sku',
      'sku_name',
      'product_group',
      'list_price',
      'standard_cost',
      'supplier_id',
      'margin_floor_pct',
    ]),
    'suppliers.csv': toCsv(master.suppliers, ['supplier_id', 'supplier_name', 'rebate_rate_pct']),
    'reps.csv': toCsv(master.reps, ['rep_id', 'rep_name', 'branch_id']),
    'branches.csv': toCsv(master.branches, ['branch_id', 'branch_name', 'state']),
    'sales_lines.csv': salesCsvBody(sales, salesHeaders, variant, rng),
  };

  if (variant !== 'partial') {
    files['customer_agreements.csv'] = toCsv(planted.agreements, [
      'agreement_id',
      'customer_id',
      'sku',
      'valid_from',
      'valid_to',
      'agreed_price',
      'status',
      'planted_check',
      'planted_value_aud',
    ]);
    files['freight.csv'] = toCsv(planted.freight, [
      'freight_id',
      'invoice_no',
      'customer_id',
      'freight_cost',
      'freight_charged',
      'policy_code',
      'planted_check',
      'planted_value_aud',
    ]);
    files['supplier_rebates.csv'] = toCsv(planted.rebates, [
      'rebate_id',
      'supplier_id',
      'period_start',
      'period_end',
      'earned_aud',
      'claimed_aud',
      'claimable_now_aud',
      'planted_check',
      'planted_value_aud',
    ]);
    files['commercial_policies.csv'] = toCsv(planted.policies, [
      'policy_id',
      'policy_code',
      'policy_name',
      'threshold_aud',
      'rate_pct',
      'active',
    ]);
    files['purchases.csv'] = toCsv(planted.purchases, [
      'purchase_id',
      'supplier_id',
      'sku',
      'qty',
      'unit_cost',
      'purchase_date',
    ]);
    files['supplier_costs.csv'] = toCsv(planted.costs, [
      'cost_id',
      'sku',
      'effective_from',
      'landed_cost',
      'prior_landed_cost',
      'planted_check',
      'planted_value_aud',
    ]);
  }

  const plantedTotalAud = variant === 'clean' ? 0 : PLANTED_TOTAL;
  const detectedTotalAud = variant === 'clean' ? 0 : DETECTED_TOTAL;
  const modelledTotalAud = variant === 'clean' ? 0 : MODELLED_TOTAL;
  const cashEntitlementAud = variant === 'clean' || variant === 'partial' ? 0 : CASH_ENTITLEMENT;
  const t12mSalesAud = sales.reduce((s, r) => s + Number(r.line_sales), 0);

  const groundTruth = {
    company: 'Harbourline Trade Supply Pty Ltd',
    fictional: true,
    seed,
    variant,
    t12mSalesAud: Number(t12mSalesAud.toFixed(4)),
    plantedTotalAud,
    detectedTotalAud,
    modelledTotalAud,
    cashEntitlementAud,
    classification: {
      detectedOrPolicy: detectedTotalAud,
      modelledOpportunity: modelledTotalAud,
      addressable: plantedTotalAud,
    },
    issues: variant === 'clean' ? [] : buildGroundTruthIssues(),
    notes:
      'Transaction volume is CI-scaled (~42.5k lines) while preserving T12M ≈ A$85m and planted economics. Full 1.1m-line volume is a later scale-up.',
  };

  files['ground_truth.json'] = `${JSON.stringify(groundTruth, null, 2)}\n`;

  const hashes: Record<string, string> = {};
  mkdirSync(outDir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(path.join(outDir, name), content, 'utf8');
    hashes[name] = sha256(content);
  }
  writeFileSync(path.join(outDir, 'manifest.sha256.json'), `${JSON.stringify(hashes, null, 2)}\n`);

  return {
    outDir,
    variant,
    seed,
    files,
    hashes,
    summary: {
      t12mSalesAud: Number(t12mSalesAud.toFixed(2)),
      customerCount: master.customers.length,
      skuCount: master.skus.length,
      supplierCount: master.suppliers.length,
      lineCount: sales.length,
      plantedTotalAud,
      detectedTotalAud,
      modelledTotalAud,
      cashEntitlementAud,
    },
  };
}
