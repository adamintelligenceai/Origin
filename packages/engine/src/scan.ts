import { ENGINE_VERSION } from '@marginshield/schemas';
import { allocateSellTranches } from './allocation.js';
import { bankableScenario } from './bankability/capture.js';
import { collectFindings } from './checks/merge.js';
import { computeWaterfall } from './waterfall/compute.js';
import { buildRunHash } from './hash/run-hash.js';
import { computeMarginIntegrityIndex } from './mii.js';
import type { Finding, ScanResult } from './types.js';

export type ScanInput = {
  transactions: Array<Record<string, string | number>>;
  agreements?: Array<Record<string, string | number>>;
  rebates?: Array<Record<string, string | number>>;
  sourceFingerprints?: string[];
  period?: string;
  currency?: string;
};

function familyOf(checkId: string): 'SELL' | 'SERVE' | 'BUY' {
  if (checkId.startsWith('P')) return 'SELL';
  if (checkId.startsWith('S')) return 'SERVE';
  return 'BUY';
}

function allocateFindings(findings: Finding[]): Finding[] {
  const sell = findings.filter((f) => familyOf(f.checkId) === 'SELL');
  const other = findings.filter((f) => familyOf(f.checkId) !== 'SELL');

  const groups = new Map<string, Finding[]>();
  for (const f of sell) {
    const key = `${f.customerId ?? 'ALL'}|${f.sku ?? f.checkId}`;
    const list = groups.get(key) ?? [];
    list.push(f);
    groups.set(key, list);
  }

  const allocatedSell: Finding[] = [];
  for (const group of groups.values()) {
    const gaps = group.map((f) => ({
      checkId: f.checkId as 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6',
      gap: f.rawGapAud,
    }));
    const tranches = allocateSellTranches(gaps);
    for (const f of group) {
      const t = tranches.find((x) => x.checkId === f.checkId);
      allocatedSell.push({ ...f, allocatedValueAud: Math.round(t?.allocated ?? 0) });
    }
  }

  return [...allocatedSell, ...other.map((f) => ({ ...f, allocatedValueAud: f.rawGapAud }))];
}

export function runScan(input: ScanInput): ScanResult {
  const period = input.period ?? '2025-07-01_2026-06-30';
  const currency = input.currency ?? 'AUD';
  const engineMajor = ENGINE_VERSION.split('.')[0] ?? '0';

  const waterfall = computeWaterfall(input.transactions, { periodStart: '2025-07-01' });

  const findings = allocateFindings(
    collectFindings({
      transactions: input.transactions,
      agreements: input.agreements,
      rebates: input.rebates ?? [],
      periodEnd: '2026-06-30',
      engineMajor,
    }),
  );

  const detectedLeakageAud = Math.round(
    findings
      .filter((f) => f.valueClass === 'DETECTED_LEAKAGE' || f.valueClass === 'POLICY_LEAKAGE')
      .reduce((s, f) => s + f.allocatedValueAud, 0),
  );
  const modelledOpportunityAud = Math.round(
    findings
      .filter((f) => f.valueClass === 'MODELLED_MARGIN_OPPORTUNITY')
      .reduce((s, f) => s + f.allocatedValueAud, 0),
  );
  const cashEntitlementAud = Math.round(findings.reduce((s, f) => s + f.cashEntitlementAud, 0));

  const expectedBankableBaseAud = Math.round(
    findings.reduce(
      (s, f) =>
        s +
        bankableScenario({
          allocatedValue: f.allocatedValueAud,
          checkId: f.checkId,
          evidenceGrade: f.evidenceGrade,
          scenario: 'BASE',
        }),
      0,
    ),
  );
  const expectedBankableLowAud = Math.round(
    findings.reduce(
      (s, f) =>
        s +
        bankableScenario({
          allocatedValue: f.allocatedValueAud,
          checkId: f.checkId,
          evidenceGrade: f.evidenceGrade,
          scenario: 'LOW',
        }),
      0,
    ),
  );
  const expectedBankableHighAud = Math.round(
    findings.reduce(
      (s, f) =>
        s +
        bankableScenario({
          allocatedValue: f.allocatedValueAud,
          checkId: f.checkId,
          evidenceGrade: f.evidenceGrade,
          scenario: 'HIGH',
        }),
      0,
    ),
  );

  const t12mNetSalesAud = waterfall.invoiceRevenueAud;
  const marginIntegrityIndex = computeMarginIntegrityIndex({
    verifiedOrDetectedLeakage: detectedLeakageAud,
    modelledMarginOpportunity: modelledOpportunityAud,
    t12mNetSales: Math.max(t12mNetSalesAud, 1),
  });

  const runHash = buildRunHash({
    sourceFingerprints: input.sourceFingerprints ?? [
      `tx:${input.transactions.length}`,
      `reb:${(input.rebates ?? []).length}`,
    ],
    mappingProfile: 'harbourline-v1',
    methodConfig: 'default-v1',
    engineVersion: ENGINE_VERSION,
    period,
    currency,
  });

  return {
    headline: {
      detectedLeakageAud,
      modelledOpportunityAud,
      addressableMarginAud: detectedLeakageAud + modelledOpportunityAud,
      expectedBankableBaseAud,
      expectedBankableLowAud,
      expectedBankableHighAud,
      cashEntitlementAud,
      marginIntegrityIndex,
      economicCoverage: waterfall.economicCoverage,
      t12mNetSalesAud,
      runHash,
      methodVersion: ENGINE_VERSION,
    },
    findings: findings.sort((a, b) => b.allocatedValueAud - a.allocatedValueAud),
    waterfall: {
      listValueAud: waterfall.listValueAud,
      invoiceRevenueAud: waterfall.invoiceRevenueAud,
      pocketRevenueAud: waterfall.pocketRevenueAud,
      trueLandedCostAud: waterfall.trueLandedCostAud,
      pocketContributionAud: waterfall.pocketContributionAud,
    },
    assumptions: {
      capture_profile: 'default-v1',
      evidence_weights: 'A=1,B=0.85,C=0.6',
      materiality_aud: 250,
      currency,
    },
  };
}
