import { parseCalendarPayload } from "../parsers/calendar.js";
import { parseEmailPayload } from "../parsers/email.js";
import { parseMessagePayload } from "../parsers/message.js";
import type { NormalizedObservation, RawObservation } from "../types.js";

/** Normalize: map raw observations into a canonical shape with deterministic parsers. */
export function normalize(observations: readonly RawObservation[]): NormalizedObservation[] {
  const normalized: NormalizedObservation[] = [];

  for (const obs of observations) {
    switch (obs.kind) {
      case "email": {
        const parsed = parseEmailPayload(obs);
        if (parsed) normalized.push(parsed);
        break;
      }
      case "calendar_event": {
        const parsed = parseCalendarPayload(obs);
        if (parsed) normalized.push(parsed);
        break;
      }
      case "sms":
      case "missed_call":
      case "social_message":
        normalized.push(parseMessagePayload(obs, obs.kind));
        break;
      case "manual":
        break;
      default: {
        const exhaustive: never = obs.kind;
        return exhaustive;
      }
    }
  }

  return normalized;
}
