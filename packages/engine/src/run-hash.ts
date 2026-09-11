import { ENGINE_VERSION, METHOD_VERSION } from "@marginshield/schemas";
import { canonicalJson, sha256Hex } from "./hash";

export interface RunHashInput {
  sourceFileHashes: readonly string[];
  mappingProfile: unknown;
  methodConfiguration: unknown;
  engineVersion?: string;
  methodVersion?: string;
  analysisPeriod: {
    start: string;
    end: string;
  };
  currencyConfiguration: unknown;
}

export function makeRunHash(input: RunHashInput): string {
  const material = canonicalJson({
    sourceFileHashes: [...input.sourceFileHashes].sort(),
    mappingProfile: input.mappingProfile,
    methodConfiguration: input.methodConfiguration,
    engineVersion: input.engineVersion ?? ENGINE_VERSION,
    methodVersion: input.methodVersion ?? METHOD_VERSION,
    analysisPeriod: input.analysisPeriod,
    currencyConfiguration: input.currencyConfiguration,
  });
  return sha256Hex(material);
}
