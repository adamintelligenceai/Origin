import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as XLSX from "xlsx";
import {
  BRANCH_NAMES,
  CASH_ENTITLEMENT_TARGET,
  COMPANY,
  CUSTOMER_PREFIXES,
  CUSTOMER_SUFFIXES,
  DETECTED_LEAKAGE_TARGET,
  MODELLED_TARGET,
  PLANTED_TOTAL,
  PRODUCT_GROUPS,
} from "./config.js";
import { buildGroundTruthIssues, type GroundTruthFile } from "./ground-truth.js";
import { createRng, hashString, pick, randomInt } from "./rng.js";
import type { SyntheticVariant } from "./index.js";

export interface GenerateOptions {
  seed: number;
  variant: SyntheticVariant;
  outputDir: string;
  /** Scale line count relative to 1.1m — use 0.01 in fast tests */
  scale?: number;
}

export interface GenerateResult {
  groundTruth: GroundTruthFile;
  t12mRevenue: number;
  lineCount: number;
}

interface Customer {
  id: string;
  name: string;
  segment: string;
  branch: string;
}

interface Sku {
  id: string;
  description: string;
  group: string;
  listPrice: number;
}

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function formatDate(year: number, month: number, day: number): string {
  return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
}

export async function generateHarbourline(options: GenerateOptions): Promise<GenerateResult> {
  const { seed, variant, outputDir } = options;
  const scale = options.scale ?? 1;
  const rng = createRng(seed);
  const lineCount = Math.max(1000, Math.round(COMPANY.targetLineCount * scale));
  const targetRevenue = COMPANY.targetT12mRevenue * scale;

  await mkdir(outputDir, { recursive: true });

  const customers: Customer[] = Array.from({ length: COMPANY.customers }, (_, i) => ({
    id: `C-${String(i + 1).padStart(3, "0")}`,
    name: `${pick(rng, CUSTOMER_PREFIXES)} ${pick(rng, CUSTOMER_SUFFIXES)} ${i + 1}`,
    segment: pick(rng, PRODUCT_GROUPS),
    branch: pick(rng, BRANCH_NAMES),
  }));

  const skus: Sku[] = Array.from({ length: Math.min(COMPANY.skus, Math.ceil(5800 * scale)) }, (_, i) => ({
    id: `SKU-${String(i + 1).padStart(5, "0")}`,
    description: `${pick(rng, PRODUCT_GROUPS)} item ${i + 1}`,
    group: pick(rng, PRODUCT_GROUPS),
    listPrice: randomInt(rng, 12, 850),
  }));

  const avgLineValue = targetRevenue / lineCount;
  const transactions: string[] = [
    "invoice_no,invoice_date,customer_id,sku,quantity,list_price,net_sales,branch,rep_id,freight_charged",
  ];

  let runningRevenue = 0;
  const startYear = 2024;
  const startMonth = 1;

  for (let i = 0; i < lineCount; i++) {
    const customer = pick(rng, customers);
    const sku = pick(rng, skus);
    const monthOffset = randomInt(rng, 0, COMPANY.months - 1);
    const month = ((startMonth - 1 + monthOffset) % 12) + 1;
    const year = startYear + Math.floor((startMonth - 1 + monthOffset) / 12);
    const qty = randomInt(rng, 1, 24);
    const listPrice = sku.listPrice;
    let unitNet = avgLineValue / qty / (0.85 + rng() * 0.25);
    unitNet = Math.round(unitNet * 100) / 100;

    if (variant === "planted" || variant === "messy" || variant === "partial") {
      const plantedIndex = i % 10;
      if (plantedIndex === 0) {
        unitNet *= 0.92;
      }
    }

    const netSales = Math.round(unitNet * qty * 100) / 100;
    runningRevenue += netSales;

    const invoiceNo = variant === "messy" ? `Inv ${100000 + i}` : `INV-${100000 + i}`;
    const date =
      variant === "messy"
        ? formatDate(year, month, randomInt(rng, 1, 28))
        : `${year}-${String(month).padStart(2, "0")}-${String(randomInt(rng, 1, 28)).padStart(2, "0")}`;

    transactions.push(
      [
        invoiceNo,
        date,
        customer.id,
        sku.id,
        qty,
        listPrice.toFixed(2),
        netSales.toFixed(2),
        customer.branch,
        `R-${String(randomInt(rng, 1, COMPANY.reps)).padStart(2, "0")}`,
        (rng() * 45).toFixed(2),
      ].join(","),
    );
  }

  const customerCsv = [
    "customer_id,customer_name,segment,branch",
    ...customers.map((c) => `${c.id},"${c.name}",${c.segment},${c.branch}`),
  ].join("\n");

  const skuCsv = [
    "sku,description,product_group,list_price",
    ...skus.map((s) => `${s.id},"${s.description}",${s.group},${s.listPrice.toFixed(2)}`),
  ].join("\n");

  const supplierCsv = [
    "supplier_id,supplier_name",
    ...Array.from({ length: COMPANY.suppliers }, (_, i) =>
      [`SUP-${String(i + 1).padStart(3, "0")}`, `"Supplier ${i + 1}"`].join(","),
    ),
  ].join("\n");

  const agreementsCsv =
    variant === "partial"
      ? "customer_id,sku,valid_from,valid_to,price_basis,agreed_price\n"
      : [
          "customer_id,sku,valid_from,valid_to,price_basis,agreed_price",
          "C-001,SKU-00100,2024-01-01,2025-12-31,INVOICE,118.50",
          "C-002,SKU-00200,2024-01-01,2024-06-30,INVOICE,95.00",
          "C-003,SKU-00300,2023-01-01,2023-12-31,POCKET,142.00",
        ].join("\n");

  const costsCsv = [
    "sku,effective_date,supplier_net_cost,inbound_freight",
    ...skus.slice(0, Math.min(500, skus.length)).flatMap((s) => [
      `${s.id},2024-01-01,${(s.listPrice * 0.62).toFixed(2)},2.50`,
      `${s.id},2024-07-01,${(s.listPrice * 0.71).toFixed(2)},2.80`,
    ]),
  ].join("\n");

  const policiesCsv = [
    "policy_type,parameter,value",
    "minimum_order_value,aud,450",
    "freight_recovery,percent_of_cost,85",
    "restocking_fee,percent,15",
  ].join("\n");

  const rebatesCsv =
    variant === "partial"
      ? "supplier_id,rebate_type,rate,tier_threshold,period_start,period_end\n"
      : [
          "supplier_id,rebate_type,rate,tier_threshold,period_start,period_end",
          "SUP-001,RETROSPECTIVE_TIER,0.02,500000,2024-01-01,2024-12-31",
          "SUP-002,FLAT,0.015,,2024-01-01,2024-12-31",
        ].join("\n");

  const freightCsv =
    variant === "partial"
      ? "invoice_no,freight_cost,freight_charged\n"
      : "invoice_no,freight_cost,freight_charged\nINV-100001,52.00,0.00\n";

  const files: Record<string, string> = {
    "transactions.csv": transactions.join("\n"),
    "customers.csv": customerCsv,
    "skus.csv": skuCsv,
    "suppliers.csv": supplierCsv,
    "customer_agreements.csv": agreementsCsv,
    "supplier_costs.csv": costsCsv,
    "commercial_policies.csv": policiesCsv,
    "supplier_rebates.csv": rebatesCsv,
    "freight.csv": freightCsv,
  };

  const fileHashes: Record<string, string> = {};
  for (const [name, content] of Object.entries(files)) {
    await writeFile(path.join(outputDir, name), content, "utf8");
    fileHashes[name] = sha256(content);
  }

  if (variant === "messy") {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      transactions.slice(1, 5001).map((line) => {
        const parts = line.split(",");
        return {
          "Inv No": parts[0],
          Date: parts[1],
          Customer: parts[2],
          SKU: parts[3],
          Qty: parts[4],
          "List Price": parts[5],
          "Net Sales": parts[6],
        };
      }),
    );
    XLSX.utils.book_append_sheet(wb, ws, "Sales");
    const xlsxPath = path.join(outputDir, "transactions_sample.xlsx");
    XLSX.writeFile(wb, xlsxPath);
    fileHashes["transactions_sample.xlsx"] = hashString(xlsxPath + seed);
  }

  const issues = buildGroundTruthIssues(variant);
  const groundTruth: GroundTruthFile = {
    company: COMPANY.name,
    tag: COMPANY.tag,
    seed,
    variant,
    generated_at: "1970-01-01T00:00:00.000Z",
    totals: {
      addressable_margin: variant === "clean" ? 0 : PLANTED_TOTAL * scale,
      detected_leakage: variant === "clean" ? 0 : DETECTED_LEAKAGE_TARGET * scale,
      modelled_opportunity: variant === "clean" ? 0 : MODELLED_TARGET * scale,
      cash_entitlement: variant === "clean" ? 0 : CASH_ENTITLEMENT_TARGET * scale,
    },
    issues: issues.map((issue) => ({
      ...issue,
      expected_value: Math.round(issue.expected_value * scale),
    })),
    file_hashes: fileHashes,
  };

  await writeFile(
    path.join(outputDir, "ground_truth.json"),
    `${JSON.stringify(groundTruth, null, 2)}\n`,
    "utf8",
  );

  return {
    groundTruth,
    t12mRevenue: runningRevenue,
    lineCount,
  };
}
