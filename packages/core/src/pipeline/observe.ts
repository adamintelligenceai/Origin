import type { RawObservation } from "../types.js";

/** Observe: collect raw provider events without interpretation. */
export function observe(raw: readonly RawObservation[]): RawObservation[] {
  return [...raw].sort((a, b) => a.capturedAt.localeCompare(b.capturedAt));
}
