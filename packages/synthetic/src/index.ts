export type SynthVariant = 'clean' | 'planted' | 'messy' | 'partial';

export type SynthOptions = { seed: number; variant: SynthVariant };

/** Phase 2 replaces this stub with the full Harbourline generator. */
export function describeSynth(options: SynthOptions): string {
  return `Harbourline Trade Supply — seed=${options.seed} variant=${options.variant}`;
}

export const HARBOURLINE_PROFILE = {
  name: 'Harbourline Trade Supply Pty Ltd',
  fictional: true as const,
  approxT12mRevenueAud: 85_000_000,
} as const;
