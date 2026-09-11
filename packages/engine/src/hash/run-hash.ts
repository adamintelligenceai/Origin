/** FNV-1a 32-bit hash — deterministic, no timestamp. */
export function fnv1a(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

export function buildRunHash(parts: {
  sourceFingerprints: string[];
  mappingProfile: string;
  methodConfig: string;
  engineVersion: string;
  period: string;
  currency: string;
}): string {
  const canonical = [
    ...parts.sourceFingerprints.slice().sort(),
    parts.mappingProfile,
    parts.methodConfig,
    parts.engineVersion,
    parts.period,
    parts.currency,
  ].join('|');
  return `ms_${fnv1a(canonical)}`;
}

export function buildFindingId(checkId: string, grainKeys: string, periodEnd: string, engineMajor: string): string {
  return `MSF-${fnv1a([checkId, grainKeys, periodEnd, engineMajor].join('|')).slice(0, 24)}`;
}
