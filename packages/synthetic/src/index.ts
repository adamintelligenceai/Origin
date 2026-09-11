export const HARBOURLINE_COMPANY = 'Harbourline Trade Supply Pty Ltd';
export const HARBOURLINE_REVENUE_TARGET_AUD = 85_000_000;
export const HARBOURLINE_ADDRESSABLE_TARGET_AUD = 1_840_000;

export type SyntheticVariant = 'clean' | 'planted' | 'messy' | 'partial';

export interface SynthOptions {
  seed: number;
  variant: SyntheticVariant;
  outputDir: string;
}

export interface GroundTruthSummary {
  company: string;
  variant: SyntheticVariant;
  seed: number;
  t12m_sales_aud: number;
  total_addressable_aud: number;
  detected_leakage_aud: number;
  modelled_opportunity_aud: number;
  cash_claimable_aud: number;
  planted_checks: Record<string, number>;
}

/** Placeholder generator — expanded in Phase 2 */
export function buildGroundTruthSummary(options: SynthOptions): GroundTruthSummary {
  const plantedChecks: Record<string, number> =
    options.variant === 'clean'
      ? {}
      : {
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

  const detected =
    options.variant === 'clean'
      ? 0
      : (plantedChecks.P1 ?? 0) +
        (plantedChecks.S1 ?? 0) +
        (plantedChecks.S2 ?? 0) +
        (plantedChecks.S3 ?? 0) +
        (plantedChecks.B1 ?? 0);

  const modelled =
    options.variant === 'clean'
      ? 0
      : (plantedChecks.P2 ?? 0) +
        (plantedChecks.P3 ?? 0) +
        (plantedChecks.P4 ?? 0) +
        (plantedChecks.P5 ?? 0) +
        (plantedChecks.P6 ?? 0);

  return {
    company: HARBOURLINE_COMPANY,
    variant: options.variant,
    seed: options.seed,
    t12m_sales_aud: HARBOURLINE_REVENUE_TARGET_AUD,
    total_addressable_aud: detected + modelled,
    detected_leakage_aud: detected,
    modelled_opportunity_aud: modelled,
    cash_claimable_aud: options.variant === 'clean' ? 0 : 124_000,
    planted_checks: plantedChecks,
  };
}
