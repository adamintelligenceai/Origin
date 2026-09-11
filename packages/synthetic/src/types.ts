export const HARBOURLINE_COMPANY = "Harbourline Trade Supply Pty Ltd";
export const HARBOURLINE_TAG = "Fictional demonstration company";

export type SyntheticVariant = "clean" | "planted" | "messy" | "partial";

export interface SynthOptions {
  seed: number;
  variant: SyntheticVariant;
  outputDir: string;
  scale?: number;
}
