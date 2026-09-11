export type PlantedCheckId =
  | 'P1'
  | 'P2'
  | 'P3'
  | 'P4'
  | 'P5'
  | 'P6'
  | 'S1'
  | 'S2'
  | 'S3'
  | 'B1';

export type ValueClass =
  | 'DETECTED_LEAKAGE'
  | 'POLICY_LEAKAGE'
  | 'MODELLED_MARGIN_OPPORTUNITY'
  | 'CASH_ENTITLEMENT';

/** Blueprint §68 planted economics (AUD dollars). */
export const PLANTED_AMOUNTS: Record<PlantedCheckId, number> = {
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
};

export const PLANTED_CLASS: Record<PlantedCheckId, ValueClass> = {
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

export const PLANTED_TOTAL = Object.values(PLANTED_AMOUNTS).reduce((a, b) => a + b, 0);
export const DETECTED_TOTAL =
  PLANTED_AMOUNTS.P1 +
  PLANTED_AMOUNTS.S1 +
  PLANTED_AMOUNTS.S2 +
  PLANTED_AMOUNTS.S3 +
  PLANTED_AMOUNTS.B1;
export const MODELLED_TOTAL =
  PLANTED_AMOUNTS.P2 +
  PLANTED_AMOUNTS.P3 +
  PLANTED_AMOUNTS.P4 +
  PLANTED_AMOUNTS.P5 +
  PLANTED_AMOUNTS.P6;
export const CASH_ENTITLEMENT = 124_000;

export type GroundTruthIssue = {
  checkId: PlantedCheckId;
  grainKeys: { customerId: string; sku: string; supplierId: string };
  expectedValueAud: number;
  valueClass: ValueClass;
  sourceRecords: string[];
  narrative: string;
};

function narrative(id: PlantedCheckId): string {
  switch (id) {
    case 'P1':
      return 'Invoices priced below active customer agreement rate.';
    case 'P2':
      return 'Expired commercial terms still honoured without replacement.';
    case 'P3':
      return 'Landed cost rose faster than customer sell price.';
    case 'P4':
      return 'Realised pricing below margin floor.';
    case 'P5':
      return 'Effective discount drifted versus historical baseline.';
    case 'P6':
      return 'Customer below comparable realised peer prices.';
    case 'S1':
      return 'Chargeable freight not recovered per policy.';
    case 'S2':
      return 'Small-order surcharge omitted.';
    case 'S3':
      return 'Restocking fee not collected on returns.';
    case 'B1':
      return 'Supplier rebate earned exceeds claims lodged.';
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function buildGroundTruthIssues(): GroundTruthIssue[] {
  return (Object.keys(PLANTED_AMOUNTS) as PlantedCheckId[]).map((checkId) => ({
    checkId,
    grainKeys: {
      customerId: `CUST-PLANT-${checkId}`,
      sku: checkId.startsWith('P') ? `SKU-PLANT-${checkId}` : '',
      supplierId: checkId.startsWith('B') || checkId.startsWith('S') ? `SUP-PLANT-${checkId}` : '',
    },
    expectedValueAud: PLANTED_AMOUNTS[checkId],
    valueClass: PLANTED_CLASS[checkId],
    sourceRecords: [`INV-PLANT-${checkId}-001`, `AGR-PLANT-${checkId}`],
    narrative: narrative(checkId),
  }));
}
