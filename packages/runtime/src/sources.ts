import type { RawObservation } from "@project-chief/core";
import type { ConnectionId, ConnectionStatus } from "./connections.js";

export function observationAllowed(
  observation: RawObservation,
  connections: Record<ConnectionId, ConnectionStatus>
): boolean {
  switch (observation.provider) {
    case "gmail":
      return connections.gmail === "connected";
    case "google_calendar":
      return connections.calendar === "connected";
    case "drive":
      return connections.drive === "connected";
    case "manual":
      return true;
    case "sms":
      return connections.sms === "connected";
    case "phone":
      return observation.kind === "missed_call"
        ? connections.missed_calls === "connected"
        : connections.phone === "connected";
    case "linkedin":
      return connections.linkedin === "connected";
    case "instagram":
      return connections.instagram === "connected";
    case "facebook":
      return connections.facebook === "connected";
    case "x":
      return connections.x === "connected";
    default: {
      const exhaustive: never = observation.provider;
      return exhaustive;
    }
  }
}
