import type { CheckId, EvidenceGrade, RiskBand } from '@marginshield/schemas';
import type { MethodConfig } from './types';

const BASE: Record<CheckId, number> = {
  B1: 0.8,
  B2: 0,
  B3: 0,
  S1: 0.5,
  S2: 0.3,
  S3: 0.3,
  P1: 0.75,
  P2: 0.6,
  P3: 0.45,
  P4: 0.4,
  P5: 0.35,
  P6: 0.25,
  P7: 0,
};

function capture(check: CheckId): { low: number; base: number; high: number } {
  const base = BASE[check];
  return {
    low: Math.round(base * 0.7 * 1000) / 1000,
    base,
    high: Math.min(1, Math.round(base * 1.3 * 1000) / 1000),
  };
}

const CHECKS: CheckId[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'S1', 'S2', 'S3', 'B1', 'B2', 'B3'];

export function defaultMethodConfig(): MethodConfig {
  const captureMap = {} as MethodConfig['capture'];
  for (const check of CHECKS) {
    captureMap[check] = capture(check);
  }
  return {
    materiality_absolute: 250,
    min_transaction_count: 1,
    agreement_tolerance: 0.005,
    p3_material_cost_increase: 0.02,
    p3_pass_through_gap: 0.03,
    p4_derived_percentile: 0.1,
    p5_min_months: 9,
    p5_trend_pp_per_month: 0.1,
    p5_current_vs_baseline_pp: 2,
    p6_min_peers: 8,
    p6_flag_percentile: 0.25,
    p6_target_percentile: 0.4,
    p6_min_gap_pct: 0.05,
    p6_min_annual_gap: 500,
    b2_near_miss_pct: 0.05,
    p1_back_billing_enabled: false,
    capture: captureMap,
    evidence_weight: { A: 1, B: 0.85, C: 0.6 },
    risk_multiplier: { LOW: 1, MEDIUM: 0.8, HIGH: 0.6 },
    risk_weights: {
      concentration: 0.25,
      price_position: 0.25,
      recency: 0.2,
      volume: 0.15,
      breadth: 0.1,
      tenure: 0.05,
    },
    guardrail_increase: { LOW: 0.1, MEDIUM: 0.06, HIGH: 0.03 },
    coverage_weights: {
      realised_sales: 20,
      supplier_direct_cost: 25,
      customer_discounts_credits: 10,
      supplier_adjustments_rebates: 10,
      inbound_freight: 10,
      outbound_freight: 10,
      agreement_data: 10,
      variable_cost_to_serve: 5,
    },
    shrinkage_k: 10,
    annualisation_days: 365,
  };
}

export function familyOf(check: CheckId): 'BUY' | 'SERVE' | 'SELL' {
  if (check.startsWith('B')) return 'BUY';
  if (check.startsWith('S')) return 'SERVE';
  return 'SELL';
}

export function checkQuestion(check: CheckId): string {
  switch (check) {
    case 'P1':
      return 'Were invoices priced differently from an active documented customer agreement?';
    case 'P2':
      return 'Are expired commercial terms still being honoured without a replacement agreement?';
    case 'P3':
      return 'Did supplier/landed cost increase materially faster than customer pricing?';
    case 'P4':
      return 'Is realised pricing below the approved or derived margin floor?';
    case 'P5':
      return 'Has effective customer discount progressively deteriorated?';
    case 'P6':
      return 'Is this customer materially below comparable realised prices?';
    case 'P7':
      return 'Do any lines earn negative pocket or economic contribution?';
    case 'S1':
      return 'Was contractually or policy-chargeable freight under-recovered?';
    case 'S2':
      return 'Are small orders draining contribution relative to policy or cost-to-serve?';
    case 'S3':
      return 'Are credits and returns missing approved restocking treatment?';
    case 'B1':
      return 'Was earned supplier rebate under-claimed?';
    case 'B2':
      return 'Is the supplier rebate programme close to the next tier?';
    case 'B3':
      return 'Does reconstructed landed cost differ from ERP front-end cost?';
    default: {
      const _exhaustive: never = check;
      return _exhaustive;
    }
  }
}

export function evidenceWeight(grade: EvidenceGrade, config: MethodConfig): number {
  return config.evidence_weight[grade];
}

export function riskMultiplier(band: RiskBand, config: MethodConfig): number {
  return config.risk_multiplier[band];
}
