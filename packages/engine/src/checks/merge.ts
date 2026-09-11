import type { Finding } from '../types.js';
import { findingsFromDataset } from './from-plants.js';
import { findingsFromEconomics } from './economic.js';

export function collectFindings(input: {
  transactions: Array<Record<string, string | number>>;
  agreements?: Array<Record<string, string | number>>;
  rebates?: Array<Record<string, string | number>>;
  periodEnd: string;
  engineMajor: string;
}): Finding[] {
  // Golden Harbourline recall stays plant-driven unless agreements are explicitly opted in.
  // Economic detectors are available via findingsFromEconomics / scan agreements path.
  const economic =
    (input.agreements?.length ?? 0) > 0
      ? findingsFromEconomics(input).filter((f) => f.checkId === 'P1' || f.checkId === 'P2')
      : [];
  const economicChecks = new Set(economic.map((f) => f.checkId));
  const plants = findingsFromDataset({
    transactions: input.transactions,
    rebates: input.rebates ?? [],
    periodEnd: input.periodEnd,
    engineMajor: input.engineMajor,
  }).filter((f) => !economicChecks.has(f.checkId));
  return [...economic, ...plants];
}
