import { ENGINE_MAJOR_VERSION } from "@marginshield/schemas";
import { sha256Hex } from "./hash";

export interface FindingIdInput {
  checkId: string;
  grainKeys: Record<string, string>;
  periodEnd: string;
  engineMajorVersion?: number;
}

export function makeFindingId(input: FindingIdInput): string {
  const grain = Object.keys(input.grainKeys)
    .sort()
    .map((key) => `${key}=${input.grainKeys[key]}`)
    .join("|");
  const major = input.engineMajorVersion ?? ENGINE_MAJOR_VERSION;
  const material = `${input.checkId}|${grain}|${input.periodEnd}|${major}`;
  return `MSF-${sha256Hex(material).slice(0, 24)}`;
}
