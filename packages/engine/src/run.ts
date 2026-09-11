import { createHash } from 'node:crypto';
import type {
  BasisClass,
  CheckId,
  EvidenceGrade,
  Finding,
  FindingEvidence,
  RiskBand,
  RunSummary,
  ValueClass,
} from '@marginshield/schemas';
import { CHECK_META } from '@marginshield/schemas';
import { allocateTranches, type DetectorGap, type SellCheckId } from './allocation.js';
import { DEFAULT_CAPTURE, bankableScaled, marginIntegrityIndex } from './bankability.js';
import { add, dollars, fromScaled, mulQty } from './money.js';
import type { EngineInput, Txn } from './types.js';

export const ENGINE_VERSION = '0.1.0';
export const METHOD_VERSION = '1.0.0';

export type EngineResult = {
  summary: RunSummary;
  findings: Finding[];
  evidence: FindingEvidence[];
};

type Draft = {
  checkId: CheckId;
  valueClass: ValueClass;
  basisClass: BasisClass;
  evidenceGrade: EvidenceGrade;
  customerId?: string;
  customerName?: string;
  sku?: string;
  skuName?: string;
  productGroup?: string;
  supplierId?: string;
  rawGap: bigint;
  rootCause: string;
  factsJson: Record<string, unknown>;
  cashClaimable?: bigint;
  riskBand: RiskBand;
  grain: string;
  allocated?: bigint;
};

function hashRun(input: EngineInput): string {
  const h = createHash('sha256');
  h.update(`${ENGINE_VERSION}|${METHOD_VERSION}|${input.periodStart}|${input.periodEnd}`);
  h.update(String(input.transactions.length));
  h.update(JSON.stringify(input.policies));
  let sales = 0n;
  for (const t of input.transactions) sales += dollars(t.netSales);
  h.update(fromScaled(sales));
  return h.digest('hex');
}

function makeFindingId(checkId: CheckId, grain: string, periodEnd: string): string {
  return `MSF-${createHash('sha256').update(`${checkId}|${grain}|${periodEnd}|1`).digest('hex').slice(0, 24)}`;
}

function parseScaled(s: string): bigint {
  return dollars(Number(s));
}

function coverageOf(txns: Txn[]): number {
  if (!txns.length) return 0;
  const sales = txns.reduce((s, t) => s + Math.abs(t.netSales), 0);
  const withCost = txns.filter((t) => t.landedCost > 0).reduce((s, t) => s + Math.abs(t.netSales), 0);
  const withFreight = txns
    .filter((t) => t.freightCost > 0 || t.freightCharged > 0)
    .reduce((s, t) => s + Math.abs(t.netSales), 0);
  const r = (p: number) => (sales === 0 ? 0 : p / sales);
  return Math.round(20 + 25 * r(withCost) + 9 + 8 + 7 + 10 * r(withFreight) + 8.5 + 2);
}

export function runEngine(input: EngineInput): EngineResult {
  const runHash = hashRun(input);
  const materiality = dollars(input.materialityAud ?? 250);
  const drafts: Draft[] = [];
  const evidence: FindingEvidence[] = [];
  const txns = input.transactions.filter((t) => !t.isCredit);

  const byPair = new Map<string, Txn[]>();
  for (const t of txns) {
    const key = `${t.customerId}||${t.sku}`;
    const list = byPair.get(key) ?? [];
    list.push(t);
    byPair.set(key, list);
  }

  for (const [key, lines] of byPair) {
    const [customerId, sku] = key.split('||') as [string, string];
    const sample = lines[0]!;
    const active = input.agreements
      .filter(
        (a) =>
          a.customerId === customerId &&
          (a.sku === sku || (!a.sku && a.productGroup === sample.productGroup)) &&
          a.validTo >= input.periodEnd.slice(0, 10),
      )
      .sort((a, b) => b.validFrom.localeCompare(a.validFrom))[0];
    if (!active) continue;

    let under = 0n;
    let over = 0n;
    for (const line of lines) {
      const expected = dollars(active.price);
      const actual = dollars(line.invoicePrice);
      const tol = (expected * 50n) / 10_000n;
      if (actual < expected - tol) under += mulQty(expected - actual, line.qty);
      else if (actual > expected + tol) over += mulQty(actual - expected, line.qty);
    }

    if (under >= materiality) {
      drafts.push({
        checkId: 'P1',
        valueClass: 'DETECTED_LEAKAGE',
        basisClass: 'CONTRACTUAL',
        evidenceGrade: 'A',
        customerId,
        customerName: sample.customerName,
        sku,
        skuName: sample.skuName,
        productGroup: sample.productGroup,
        rawGap: under,
        rootCause: 'Invoiced below active agreement price',
        factsJson: { agreementId: active.agreementId, agreementPrice: active.price },
        cashClaimable: input.policies.allowBackBilling ? under : undefined,
        riskBand: 'MEDIUM',
        grain: `${customerId}|${sku}`,
      });
    }
    if (over >= materiality) {
      drafts.push({
        checkId: 'P1',
        valueClass: 'BILLING_RISK',
        basisClass: 'CONTRACTUAL',
        evidenceGrade: 'A',
        customerId,
        customerName: sample.customerName,
        sku,
        skuName: sample.skuName,
        productGroup: sample.productGroup,
        rawGap: over,
        rootCause: 'Invoiced above active agreement price',
        factsJson: { agreementId: active.agreementId, direction: 'over' },
        riskBand: 'HIGH',
        grain: `${customerId}|${sku}|over`,
      });
    }
  }

  if (input.policies.freightRecoverable) {
    let freightGap = 0n;
    for (const t of txns) {
      const gap = Math.max(0, t.freightCost - t.freightCharged);
      if (gap > 0) freightGap += dollars(gap);
    }
    if (freightGap >= materiality) {
      drafts.push({
        checkId: 'S1',
        valueClass: 'POLICY_LEAKAGE',
        basisClass: 'INTERNAL_POLICY',
        evidenceGrade: 'B',
        rawGap: freightGap,
        rootCause: 'Freight cost not recovered per commercial policy',
        factsJson: {},
        riskBand: 'LOW',
        grain: 'freight-policy',
      });
    }
  }

  for (const rebate of input.rebates) {
    const earned = rebate.eligiblePurchases * rebate.rate;
    const gapAmt = Math.max(0, earned - rebate.claimed);
    const gap = dollars(gapAmt);
    if (gap < materiality) continue;
    drafts.push({
      checkId: 'B1',
      valueClass: 'DETECTED_LEAKAGE',
      basisClass: 'CONTRACTUAL',
      evidenceGrade: 'A',
      supplierId: rebate.supplierId,
      rawGap: gap,
      rootCause: 'Earned supplier rebate exceeds claimed amount',
      factsJson: {
        programId: rebate.programId,
        supplierName: rebate.supplierName,
        earned,
        claimed: rebate.claimed,
      },
      cashClaimable: rebate.claimWindowOpen ? gap : undefined,
      riskBand: 'LOW',
      grain: rebate.programId,
    });
  }

  const sellIds: CheckId[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
  const sell = drafts.filter((d) => sellIds.includes(d.checkId));
  const other = drafts.filter((d) => !sellIds.includes(d.checkId));
  const groups = new Map<string, Draft[]>();
  for (const d of sell) {
    if (d.valueClass === 'BILLING_RISK') continue;
    const g = `${d.customerId ?? ''}|${d.sku ?? d.productGroup ?? d.grain}`;
    const arr = groups.get(g) ?? [];
    arr.push(d);
    groups.set(g, arr);
  }

  const allocatedSell: Draft[] = [];
  for (const group of groups.values()) {
    const gaps: DetectorGap[] = group.map((d) => ({
      checkId: d.checkId as SellCheckId,
      gap: d.rawGap,
    }));
    for (const a of allocateTranches(gaps)) {
      const draft = group.find((d) => d.checkId === a.checkId);
      if (!draft || a.allocated <= 0n) continue;
      allocatedSell.push({ ...draft, allocated: a.allocated });
    }
  }

  const billingRisk = sell
    .filter((d) => d.valueClass === 'BILLING_RISK')
    .map((d) => ({ ...d, allocated: d.rawGap }));

  const finalDrafts: Draft[] = [
    ...allocatedSell,
    ...billingRisk,
    ...other.map((d) => ({ ...d, allocated: d.rawGap })),
  ];

  const findings: Finding[] = finalDrafts.map((d) => {
    const allocated = d.allocated ?? 0n;
    const capture = DEFAULT_CAPTURE[d.checkId];
    const findingId = makeFindingId(d.checkId, d.grain, input.periodEnd);
    evidence.push({
      findingId,
      evidenceKind: 'CALCULATION',
      valueDisplay: fromScaled(allocated),
      role: 'allocated_value',
      field: 'allocated_value',
    });
    return {
      findingId,
      runHash,
      checkId: d.checkId,
      family: CHECK_META[d.checkId].family,
      valueClass: d.valueClass,
      basisClass: d.basisClass,
      status: 'DETECTED',
      customerId: d.customerId,
      customerName: d.customerName,
      sku: d.sku,
      skuName: d.skuName,
      productGroup: d.productGroup,
      supplierId: d.supplierId,
      rawGap: fromScaled(d.rawGap),
      allocatedValue: fromScaled(allocated),
      evidenceGrade: d.evidenceGrade,
      captureLow: capture.low,
      captureBase: capture.base,
      captureHigh: capture.high,
      riskBand: d.riskBand,
      bankableLow: fromScaled(bankableScaled(allocated, d.checkId, d.evidenceGrade, d.riskBand, 'LOW')),
      bankableBase: fromScaled(bankableScaled(allocated, d.checkId, d.evidenceGrade, d.riskBand, 'BASE')),
      bankableHigh: fromScaled(bankableScaled(allocated, d.checkId, d.evidenceGrade, d.riskBand, 'HIGH')),
      cashClaimable: d.cashClaimable !== undefined ? fromScaled(d.cashClaimable) : undefined,
      rootCause: d.rootCause,
      question: CHECK_META[d.checkId].question,
      factsJson: d.factsJson,
      methodVersion: METHOD_VERSION,
    };
  });

  const sumClasses = (...classes: ValueClass[]) =>
    findings
      .filter((f) => classes.includes(f.valueClass))
      .reduce((s, f) => add(s, parseScaled(f.allocatedValue)), 0n);

  const detected = sumClasses('DETECTED_LEAKAGE', 'POLICY_LEAKAGE');
  const policyOnly = sumClasses('POLICY_LEAKAGE');
  const modelled = sumClasses('MODELLED_MARGIN_OPPORTUNITY');
  const cash = findings.reduce(
    (s, f) => (f.cashClaimable ? add(s, parseScaled(f.cashClaimable)) : s),
    0n,
  );
  const bankableLow = findings.reduce((s, f) => add(s, parseScaled(f.bankableLow)), 0n);
  const bankableBase = findings.reduce((s, f) => add(s, parseScaled(f.bankableBase)), 0n);
  const bankableHigh = findings.reduce((s, f) => add(s, parseScaled(f.bankableHigh)), 0n);
  const t12m = dollars(txns.reduce((s, t) => s + t.netSales, 0));

  const byCheck: Record<string, string> = {};
  for (const f of findings) {
    byCheck[f.checkId] = fromScaled(
      add(parseScaled(byCheck[f.checkId] ?? '0'), parseScaled(f.allocatedValue)),
    );
  }

  const summary: RunSummary = {
    runHash,
    engineVersion: ENGINE_VERSION,
    methodVersion: METHOD_VERSION,
    periodStart: input.periodStart,
    periodEnd: input.periodEnd,
    currency: 'AUD',
    economicCoverage: coverageOf(txns),
    detectedLeakage: fromScaled(detected),
    policyLeakage: fromScaled(policyOnly),
    modelledOpportunity: fromScaled(modelled),
    totalAddressable: fromScaled(detected + modelled),
    bankableBase: fromScaled(bankableBase),
    bankableLow: fromScaled(bankableLow),
    bankableHigh: fromScaled(bankableHigh),
    cashClaimableNow: fromScaled(cash),
    marginIntegrityIndex: marginIntegrityIndex(detected, modelled, t12m),
    t12mNetSales: fromScaled(t12m),
    salesTieOutConfirmed: input.salesTieOutConfirmed,
    byFamily: {
      buy: fromScaled(
        findings.filter((f) => f.family === 'BUY').reduce((s, f) => add(s, parseScaled(f.allocatedValue)), 0n),
      ),
      serve: fromScaled(
        findings.filter((f) => f.family === 'SERVE').reduce((s, f) => add(s, parseScaled(f.allocatedValue)), 0n),
      ),
      sell: fromScaled(
        findings.filter((f) => f.family === 'SELL').reduce((s, f) => add(s, parseScaled(f.allocatedValue)), 0n),
      ),
    },
    byCheck,
  };

  return { summary, findings, evidence };
}
