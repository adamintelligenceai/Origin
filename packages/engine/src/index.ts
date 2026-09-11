import { createHash } from 'node:crypto';
import { ENGINE_MAJOR_VERSION } from '@marginshield/schemas';

export { ENGINE_MAJOR_VERSION };

export const ENGINE_VERSION = `${ENGINE_MAJOR_VERSION}.0.0`;

export interface RunHashInput {
  sourceFileHashes: string[];
  mappingProfileHash: string;
  methodConfigHash: string;
  analysisPeriodEnd: string;
  currencyConfigHash: string;
}

/** Deterministic run hash — no timestamp dependency */
export function computeRunHash(input: RunHashInput): string {
  const canonical = JSON.stringify({
    sourceFileHashes: [...input.sourceFileHashes].sort(),
    mappingProfileHash: input.mappingProfileHash,
    methodConfigHash: input.methodConfigHash,
    engineVersion: ENGINE_VERSION,
    analysisPeriodEnd: input.analysisPeriodEnd,
    currencyConfigHash: input.currencyConfigHash,
  });
  return createHash('sha256').update(canonical).digest('hex');
}

export interface FindingIdInput {
  checkId: string;
  grainKeys: string[];
  periodEnd: string;
}

/** Stable finding ID with MSF- prefix */
export function computeFindingId(input: FindingIdInput): string {
  const payload = [input.checkId, ...input.grainKeys, input.periodEnd, ENGINE_MAJOR_VERSION].join(
    '|',
  );
  const hash = createHash('sha256').update(payload).digest('hex').slice(0, 24);
  return `MSF-${hash}`;
}

/** Single-count tranche allocation per blueprint §18 */
export function allocateTranches(
  gaps: Record<string, number>,
  priority: readonly string[],
): Record<string, number> {
  let runningMax = 0;
  const allocated: Record<string, number> = {};

  for (const detector of priority) {
    const gap = gaps[detector] ?? 0;
    const allocatedDetector = Math.max(0, gap - runningMax);
    allocated[detector] = allocatedDetector;
    runningMax = Math.max(runningMax, gap);
  }

  return allocated;
}

export function sumAllocated(allocated: Record<string, number>): number {
  return Object.values(allocated).reduce((sum, v) => sum + v, 0);
}

export function maxGap(gaps: Record<string, number>): number {
  return Math.max(0, ...Object.values(gaps));
}
