import type { NormalizedObservation, RawObservation } from "../types.js";
import { asText } from "./text.js";

export function parseCalendarPayload(
  observation: RawObservation
): NormalizedObservation | undefined {
  return {
    id: observation.id,
    kind: "calendar_event",
    title: asText(observation.payload.title, "Untitled event"),
    startsAt: asText(observation.payload.start, ""),
    endsAt: asText(observation.payload.end, ""),
    participants: attendeesFrom(observation.payload.attendees),
    sourceRef: {
      sourceId: observation.id,
      provider: observation.provider,
      providerId: observation.providerId,
      contentHash: asText(observation.payload.hash, observation.id)
    },
    signals: []
  };
}

function attendeesFrom(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}
