import { parseEmailPayload } from "../parsers/email.js";
import { parseCalendarPayload } from "../parsers/calendar.js";
import type { NormalizedObservation, RawObservation } from "../types.js";

/** Normalize: map raw observations into a canonical shape with deterministic parsers. */
export function normalize(observations: readonly RawObservation[]): NormalizedObservation[] {
  const normalized: NormalizedObservation[] = [];

  for (const obs of observations) {
    if (obs.kind === "email") {
      const parsed = parseEmailPayload(obs);
      if (parsed) normalized.push(parsed);
      continue;
    }
    if (obs.kind === "calendar_event") {
      const parsed = parseCalendarPayload(obs);
      if (parsed) normalized.push(parsed);
    }
  }

  return normalized;
}
