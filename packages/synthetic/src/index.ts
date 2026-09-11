import {
  HARBOURLINE_PROFILE,
  SYNTHETIC_VARIANTS,
  type SyntheticVariant,
} from "@marginshield/schemas";

export interface SynthOptions {
  seed: number;
  variant: SyntheticVariant;
}

export const DEFAULT_SYNTH_OPTIONS: SynthOptions = {
  seed: 42,
  variant: "planted",
};

export function parseSynthArgs(argv: readonly string[]): SynthOptions {
  const options: SynthOptions = { ...DEFAULT_SYNTH_OPTIONS };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--seed" && next) {
      options.seed = Number(next);
      index += 1;
      continue;
    }
    if (arg === "--variant" && next) {
      if (!SYNTHETIC_VARIANTS.includes(next as SyntheticVariant)) {
        throw new Error(`Unknown synthetic variant: ${next}`);
      }
      options.variant = next as SyntheticVariant;
      index += 1;
    }
  }
  return options;
}

export function describeHarbourline(): string {
  return `${HARBOURLINE_PROFILE.legalName} — ${HARBOURLINE_PROFILE.fictionalNotice}`;
}
