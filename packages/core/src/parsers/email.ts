import type { NormalizedObservation, RawObservation } from "../types.js";
import { asText } from "./text.js";

export function parseEmailPayload(observation: RawObservation): NormalizedObservation | undefined {
  return {
    id: observation.id,
    kind: "email",
    title: asText(observation.payload.subject, "Untitled message"),
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
