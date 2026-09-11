import type { Finding, RunSummary } from '@marginshield/schemas';
import { CHECK_META } from '@marginshield/schemas';
import { DEFAULT_CAPTURE, bankableScaled } from './bankability.js';
import { dollars, fromScaled } from './money.js';
import type { EngineResult } from './run.js';

export const HARBOURLINE_PLANTED = {
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

type PlantedId = keyof typeof HARBOURLINE_PLANTED;

const VALUE_CLASS: Record<PlantedId, Finding['valueClass']> = {
  P1: 'DETECTED_LEAKAGE',
  P2: 'MODELLED_MARGIN_OPPORTUNITY',
  P3: 'MODELLED_MARGIN_OPPORTUNITY',
  P4: 'MODELLED_MARGIN_OPPORTUNITY',
  P5: 'MODELLED_MARGIN_OPPORTUNITY',
  P6: 'MODELLED_MARGIN_OPPORTUNITY',
  S1: 'POLICY_LEAKAGE',
  S2: 'POLICY_LEAKAGE',
  S3: 'POLICY_LEAKAGE',
  B1: 'DETECTED_LEAKAGE',
};

const BASIS: Record<PlantedId, Finding['basisClass']> = {
  P1: 'CONTRACTUAL',
  P2: 'HISTORICAL',
  P3: 'DERIVED',
  P4: 'DERIVED',
  P5: 'HISTORICAL',
  P6: 'PEER_BENCHMARK',
  S1: 'INTERNAL_POLICY',
  S2: 'INTERNAL_POLICY',
  S3: 'INTERNAL_POLICY',
  B1: 'CONTRACTUAL',
};

const GRADE: Record<PlantedId, Finding['evidenceGrade']> = {
  P1: 'A', P2: 'B', P3: 'B', P4: 'C', P5: 'B', P6: 'C',
  S1: 'B', S2: 'B', S3: 'B', B1: 'A',
};

/** Deterministic Harbourline Trade Supply demo — totals match blueprint planted economics. */
export function runHarbourlineDemo(): EngineResult {
  const runHash = 'harbourline-demo-seed-42';
  const findings: Finding[] = [];

  for (const [checkId, amount] of Object.entries(HARBOURLINE_PLANTED) as Array<[PlantedId, number]>) {
    const allocated = dollars(amount);
    const capture = DEFAULT_CAPTURE[checkId];
    const grade = GRADE[checkId];
    const risk = checkId === 'P6' ? 'HIGH' : checkId === 'P1' ? 'MEDIUM' : 'LOW';
    const cash = checkId === 'B1' ? dollars(124_000) : undefined;

    findings.push({
      findingId: `MSF-harbourline-${checkId}`,
      runHash,
      checkId,
      family: CHECK_META[checkId].family,
      valueClass: VALUE_CLASS[checkId],
      basisClass: BASIS[checkId],
      status: 'DETECTED',
      customerId: checkId.startsWith('P') || checkId.startsWith('S') ? 'CUST-HL-001' : undefined,
      customerName: checkId.startsWith('P') || checkId.startsWith('S') ? 'Meridian Mechanical' : undefined,
      sku: checkId.startsWith('P') ? 'SKU-HVAC-2040' : undefined,
      skuName: checkId.startsWith('P') ? 'Compressor 5.5kW' : undefined,
      productGroup: 'HVAC',
      supplierId: checkId.startsWith('B') ? 'SUP-ACME' : undefined,
      rawGap: fromScaled(allocated),
      allocatedValue: fromScaled(allocated),
      evidenceGrade: grade,
      captureLow: capture.low,
      captureBase: capture.base,
      captureHigh: capture.high,
      riskBand: risk,
      bankableLow: fromScaled(bankableScaled(allocated, checkId, grade, risk, 'LOW')),
      bankableBase: fromScaled(bankableScaled(allocated, checkId, grade, risk, 'BASE')),
      bankableHigh: fromScaled(bankableScaled(allocated, checkId, grade, risk, 'HIGH')),
      cashClaimable: cash !== undefined ? fromScaled(cash) : undefined,
      rootCause: `Harbourline planted ${checkId} finding`,
      question: CHECK_META[checkId].question,
      factsJson: { planted: true, amount },
      methodVersion: '1.0.0',
    });
  }

  const detected = dollars(286_000 + 221_000 + 64_000 + 57_000 + 168_000);
  const modelled = dollars(196_000 + 411_000 + 188_000 + 151_000 + 98_000);
  const bankableBase = findings.reduce((s, f) => s + dollars(Number(f.bankableBase)), 0n);
  const bankableLow = findings.reduce((s, f) => s + dollars(Number(f.bankableLow)), 0n);
  const bankableHigh = findings.reduce((s, f) => s + dollars(Number(f.bankableHigh)), 0n);
  const cash = dollars(124_000);
  const t12m = dollars(85_000_000);
  const exposure = Number(detected + modelled / 2n) / Number(t12m);
  const mii = Math.round(Math.min(100, Math.max(0, 100 - 1000 * exposure)));

  const byCheck: Record<string, string> = {};
  for (const f of findings) byCheck[f.checkId] = f.allocatedValue;

  const summary: RunSummary = {
    runHash,
    engineVersion: '0.1.0',
    methodVersion: '1.0.0',
    periodStart: '2024-07-01',
    periodEnd: '2025-06-30',
    currency: 'AUD',
    economicCoverage: 86,
    detectedLeakage: fromScaled(detected),
    policyLeakage: fromScaled(dollars(221_000 + 64_000 + 57_000)),
    modelledOpportunity: fromScaled(modelled),
    totalAddressable: fromScaled(detected + modelled),
    bankableBase: fromScaled(bankableBase),
    bankableLow: fromScaled(bankableLow),
    bankableHigh: fromScaled(bankableHigh),
    cashClaimableNow: fromScaled(cash),
    marginIntegrityIndex: mii,
    t12mNetSales: fromScaled(t12m),
    salesTieOutConfirmed: true,
    byFamily: {
      buy: fromScaled(dollars(168_000)),
      serve: fromScaled(dollars(221_000 + 64_000 + 57_000)),
      sell: fromScaled(dollars(286_000 + 196_000 + 411_000 + 188_000 + 151_000 + 98_000)),
    },
    byCheck,
  };

  return { summary, findings, evidence: [] };
}
