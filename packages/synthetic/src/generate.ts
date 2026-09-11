import {
  HARBOURLINE_PROFILE,
  PLANTED_APPROXIMATE_AUD,
  type CheckId,
  type SyntheticVariant,
  type ValueClass,
} from "@marginshield/schemas";
import { BRANCHES, PRODUCT_GROUPS, fictionalCompany, fictionalPerson } from "./names";
import { intBetween, mulberry32, pick } from "./rng";

export interface PlantedCase {
  checkId: CheckId;
  grainKeys: Record<string, string>;
  expectedValue: number;
  valueClass: ValueClass;
  sourceRecords: string[];
}

export interface GroundTruth {
  company: string;
  fictional: true;
  seed: number;
  variant: SyntheticVariant;
  period: { start: string; end: string };
  t12mSalesAud: number;
  planted: PlantedCase[];
  totals: {
    detectedOrPolicy: number;
    modelledOpportunity: number;
    totalAddressable: number;
    cashEntitlement: number;
  };
}

export interface GeneratedFile {
  name: string;
  contents: string;
}

export interface SynthResult {
  files: GeneratedFile[];
  groundTruth: GroundTruth;
}

const PERIOD = { start: "2024-07-01", end: "2026-06-30" } as const;

const PLANTS: { checkId: CheckId; expectedValue: number; valueClass: ValueClass }[] = [
  { checkId: "P1", expectedValue: PLANTED_APPROXIMATE_AUD.P1, valueClass: "DETECTED_LEAKAGE" },
  {
    checkId: "P2",
    expectedValue: PLANTED_APPROXIMATE_AUD.P2,
    valueClass: "MODELLED_MARGIN_OPPORTUNITY",
  },
  {
    checkId: "P3",
    expectedValue: PLANTED_APPROXIMATE_AUD.P3,
    valueClass: "MODELLED_MARGIN_OPPORTUNITY",
  },
  {
    checkId: "P4",
    expectedValue: PLANTED_APPROXIMATE_AUD.P4,
    valueClass: "MODELLED_MARGIN_OPPORTUNITY",
  },
  {
    checkId: "P5",
    expectedValue: PLANTED_APPROXIMATE_AUD.P5,
    valueClass: "MODELLED_MARGIN_OPPORTUNITY",
  },
  {
    checkId: "P6",
    expectedValue: PLANTED_APPROXIMATE_AUD.P6,
    valueClass: "MODELLED_MARGIN_OPPORTUNITY",
  },
  { checkId: "S1", expectedValue: PLANTED_APPROXIMATE_AUD.S1, valueClass: "DETECTED_LEAKAGE" },
  { checkId: "S2", expectedValue: PLANTED_APPROXIMATE_AUD.S2, valueClass: "POLICY_LEAKAGE" },
  { checkId: "S3", expectedValue: PLANTED_APPROXIMATE_AUD.S3, valueClass: "POLICY_LEAKAGE" },
  { checkId: "B1", expectedValue: PLANTED_APPROXIMATE_AUD.B1, valueClass: "DETECTED_LEAKAGE" },
];

export function generateHarbourline(options: {
  seed: number;
  variant: SyntheticVariant;
  lineTarget?: number;
}): SynthResult {
  const rng = mulberry32(options.seed);
  const lineTarget = options.lineTarget ?? HARBOURLINE_PROFILE.approximateTransactionLines;
  const customers = Array.from({ length: HARBOURLINE_PROFILE.customers }, (_, index) => ({
    customer_id: `C-${String(index + 1).padStart(3, "0")}`,
    name: fictionalCompany(rng, index),
    segment: pick(rng, ["trade", "project", "retail"] as const),
    branch: pick(rng, BRANCHES),
  }));
  const skus = Array.from(
    { length: Math.min(HARBOURLINE_PROFILE.skus, Math.max(80, lineTarget / 50)) },
    (_, index) => ({
      sku: `HL-${pick(rng, PRODUCT_GROUPS).slice(0, 3).toUpperCase()}-${String(index + 1).padStart(4, "0")}`,
      product_group: pick(rng, PRODUCT_GROUPS),
      list_price: 20 + rng() * 480,
    }),
  );
  const suppliers = Array.from({ length: HARBOURLINE_PROFILE.suppliers }, (_, index) => ({
    supplier_id: `S-${String(index + 1).padStart(2, "0")}`,
    name: fictionalCompany(rng, index + 500),
  }));
  const reps = Array.from({ length: HARBOURLINE_PROFILE.salesRepresentatives }, () =>
    fictionalPerson(rng),
  );

  const salesRows: string[] = [
    "invoice_no,invoice_date,customer_id,sku,qty,list_price,invoice_price,net_sales,cost,freight_charged,rep,branch",
  ];
  let t12mSales = 0;

  for (let index = 0; index < lineTarget; index += 1) {
    const customer = pick(rng, customers);
    const sku = pick(rng, skus);
    const qty = intBetween(rng, 1, 24);
    const invoicePrice = sku.list_price * (0.82 + rng() * 0.16);
    const netSales = invoicePrice * qty;
    const cost = invoicePrice * (0.62 + rng() * 0.12) * qty;
    const date = invoiceDate(rng, index, lineTarget);
    if (date >= "2025-07-01" && date <= PERIOD.end) {
      t12mSales += netSales;
    }
    const invoiceNo = `INV-${String(index + 1).padStart(7, "0")}`;
    salesRows.push(
      [
        invoiceNo,
        date,
        customer.customer_id,
        sku.sku,
        qty,
        sku.list_price.toFixed(4),
        invoicePrice.toFixed(4),
        netSales.toFixed(4),
        cost.toFixed(4),
        (rng() * 18).toFixed(4),
        pick(rng, reps),
        customer.branch,
      ].join(","),
    );
  }

  const scale = HARBOURLINE_PROFILE.approximateT12mSalesAud / Math.max(t12mSales, 1);
  t12mSales *= scale;
  const scaledSales = [salesRows[0]];
  for (let rowIndex = 1; rowIndex < salesRows.length; rowIndex += 1) {
    const row = salesRows[rowIndex];
    if (!row) continue;
    const cols = row.split(",");
    const net = Number(cols[7]) * scale;
    const cost = Number(cols[8]) * scale;
    const list = Number(cols[5]) * scale;
    const invoicePrice = Number(cols[6]) * scale;
    cols[5] = list.toFixed(4);
    cols[6] = invoicePrice.toFixed(4);
    cols[7] = net.toFixed(4);
    cols[8] = cost.toFixed(4);
    scaledSales.push(cols.join(","));
  }

  const planted =
    options.variant === "clean"
      ? []
      : PLANTS.map((plant, index) => ({
          checkId: plant.checkId,
          grainKeys: {
            customer_id: customers[index % customers.length]?.customer_id ?? "C-001",
            sku: skus[index % skus.length]?.sku ?? "HL-HVA-0001",
          },
          expectedValue: plant.expectedValue,
          valueClass: plant.valueClass,
          sourceRecords: [`plant:${plant.checkId}`],
        }));

  if (options.variant === "messy" && scaledSales[2]) {
    scaledSales.push(scaledSales[2]);
  }

  const files: GeneratedFile[] = [
    { name: salesFileName(options.variant), contents: scaledSales.join("\n") + "\n" },
    {
      name: "customers.csv",
      contents:
        "customer_id,name,segment,branch\n" +
        customers
          .map((row) => `${row.customer_id},${row.name},${row.segment},${row.branch}`)
          .join("\n") +
        "\n",
    },
    {
      name: "skus.csv",
      contents:
        "sku,product_group,list_price\n" +
        skus
          .map((row) => `${row.sku},${row.product_group},${row.list_price.toFixed(4)}`)
          .join("\n") +
        "\n",
    },
    {
      name: "suppliers.csv",
      contents:
        "supplier_id,name\n" +
        suppliers.map((row) => `${row.supplier_id},${row.name}`).join("\n") +
        "\n",
    },
  ];

  if (options.variant !== "partial") {
    files.push({
      name: "customer_agreements.csv",
      contents: agreementCsv(customers, skus, planted, options.variant),
    });
    files.push({
      name: "freight.csv",
      contents: "invoice_no,freight_cost,freight_charged\nINV-0000001,24.50,12.00\n",
    });
    files.push({
      name: "supplier_rebates.csv",
      contents:
        "supplier_id,rebate_type,rate,claimed,earned,claim_window_end\nS-01,FLAT,0.03,0,168000,2026-08-31\n",
    });
  }

  const detectedOrPolicy = planted
    .filter(
      (item) => item.valueClass === "DETECTED_LEAKAGE" || item.valueClass === "POLICY_LEAKAGE",
    )
    .reduce((sum, item) => sum + item.expectedValue, 0);
  const modelledOpportunity = planted
    .filter((item) => item.valueClass === "MODELLED_MARGIN_OPPORTUNITY")
    .reduce((sum, item) => sum + item.expectedValue, 0);

  return {
    files,
    groundTruth: {
      company: `${HARBOURLINE_PROFILE.legalName} — ${HARBOURLINE_PROFILE.fictionalNotice}`,
      fictional: true,
      seed: options.seed,
      variant: options.variant,
      period: PERIOD,
      t12mSalesAud: Math.round(t12mSales),
      planted,
      totals: {
        detectedOrPolicy,
        modelledOpportunity,
        totalAddressable: detectedOrPolicy + modelledOpportunity,
        cashEntitlement: options.variant === "clean" ? 0 : PLANTED_APPROXIMATE_AUD.cashEntitlement,
      },
    },
  };
}

function invoiceDate(rng: () => number, index: number, lineTarget: number): string {
  const start = Date.parse(PERIOD.start);
  const end = Date.parse(PERIOD.end);
  const t = start + ((index + rng()) / lineTarget) * (end - start);
  return new Date(t).toISOString().slice(0, 10);
}

function salesFileName(variant: SyntheticVariant): string {
  switch (variant) {
    case "messy":
      return "sales_lines_export.csv";
    case "partial":
      return "sales.csv";
    case "clean":
    case "planted":
      return "sales_transactions.csv";
    default: {
      const exhaustive: never = variant;
      return exhaustive;
    }
  }
}

function agreementCsv(
  customers: { customer_id: string }[],
  skus: { sku: string; list_price: number }[],
  planted: PlantedCase[],
  variant: SyntheticVariant,
): string {
  const header = "customer_id,sku,valid_from,valid_to,price_basis,price\n";
  const p1 = planted.find((item) => item.checkId === "P1");
  if (!p1 || variant === "clean") {
    const customer = customers[0];
    const sku = skus[0];
    if (!customer || !sku) return header;
    return `${header}${customer.customer_id},${sku.sku},2025-07-01,2026-06-30,INVOICE,${sku.list_price.toFixed(4)}\n`;
  }
  return `${header}${p1.grainKeys.customer_id},${p1.grainKeys.sku},2025-07-01,2026-06-30,INVOICE,140.0000\n`;
}
