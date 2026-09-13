import type { NormalizedObservation, ObservationKind, RawObservation } from "../types.js";
import { asText } from "./text.js";

export function parseMessagePayload(
  observation: RawObservation,
  kind: Exclude<ObservationKind, "manual" | "calendar_event">
): NormalizedObservation {
  return {
    id: observation.id,
    kind,
    title: asText(observation.payload.subject, asText(observation.payload.title, "Untitled")),
    body: asText(observation.payload.body, ""),
    participants: [asText(observation.payload.from, "unknown")],
    sourceRef: {
      sourceId: observation.id,
      provider: observation.provider,
      providerId: observation.providerId,
      contentHash: asText(observation.payload.hash, observation.id)
    },
    signals: []
  };
}
