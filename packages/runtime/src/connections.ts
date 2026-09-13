export type ConnectionId =
  | "phone"
  | "sms"
  | "missed_calls"
  | "gmail"
  | "calendar"
  | "drive"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "x";

export type ConnectionStatus = "connected" | "revoked" | "available";

export type ConnectionGroup = "this_device" | "work" | "social";

export interface ConnectionDescriptor {
  id: ConnectionId;
  group: ConnectionGroup;
  label: string;
  detail: string;
  tokenName: string;
}

export interface ConnectionGroupView {
  id: ConnectionGroup;
  label: string;
  hint: string;
}

export const CONNECTION_GROUPS: readonly ConnectionGroupView[] = [
  {
    id: "this_device",
    label: "This phone",
    hint: "Call log and SMS stay on the paired companion. Nothing is uploaded."
  },
  {
    id: "work",
    label: "Work",
    hint: "Mail and calendar use local OAuth. Refresh tokens never enter the service cloud."
  },
  {
    id: "social",
    label: "Social",
    hint: "Read-only on this device. Posting is A3 and off until you approve a prepared reply."
  }
];

export const CONNECTION_CATALOG: readonly ConnectionDescriptor[] = [
  {
    id: "phone",
    group: "this_device",
    label: "Phone",
    detail: "Paired companion · call audio never leaves the handset",
    tokenName: "phone.companion"
  },
  {
    id: "sms",
    group: "this_device",
    label: "SMS",
    detail: "Local inbox · bodies stay on the paired phone",
    tokenName: "sms.local"
  },
  {
    id: "missed_calls",
    group: "this_device",
    label: "Missed calls",
    detail: "Read from the paired phone · no carrier relay through us",
    tokenName: "calls.local"
  },
  {
    id: "gmail",
    group: "work",
    label: "Gmail",
    detail: "gmail.readonly · refresh token in the local vault",
    tokenName: "google.gmail.refresh"
  },
  {
    id: "calendar",
    group: "work",
    label: "Google Calendar",
    detail: "calendar.readonly · refresh token in the local vault",
    tokenName: "google.calendar.refresh"
  },
  {
    id: "drive",
    group: "work",
    label: "Drive",
    detail: "Available · files stay on this device once paired",
    tokenName: "google.drive.refresh"
  },
  {
    id: "linkedin",
    group: "social",
    label: "LinkedIn",
    detail: "Read-only messages · local token · no posting",
    tokenName: "linkedin.refresh"
  },
  {
    id: "instagram",
    group: "social",
    label: "Instagram",
    detail: "Read-only · local token · comments are not replies",
    tokenName: "instagram.refresh"
  },
  {
    id: "facebook",
    group: "social",
    label: "Facebook",
    detail: "Read-only · local token · events are not purchases",
    tokenName: "facebook.refresh"
  },
  {
    id: "x",
    group: "social",
    label: "X",
    detail: "Read-only · public replies wait for A3",
    tokenName: "x.refresh"
  }
];

export function fixtureConnections(): Record<ConnectionId, ConnectionStatus> {
  return {
    phone: "connected",
    sms: "connected",
    missed_calls: "connected",
    gmail: "connected",
    calendar: "connected",
    drive: "available",
    linkedin: "connected",
    instagram: "connected",
    facebook: "connected",
    x: "connected"
  };
}

export function revokedConnections(): Record<ConnectionId, ConnectionStatus> {
  return {
    phone: "revoked",
    sms: "revoked",
    missed_calls: "revoked",
    gmail: "revoked",
    calendar: "revoked",
    drive: "revoked",
    linkedin: "revoked",
    instagram: "revoked",
    facebook: "revoked",
    x: "revoked"
  };
}

export function tokenName(id: ConnectionId): string {
  const entry = CONNECTION_CATALOG.find((item) => item.id === id);
  if (!entry) {
    throw new Error(`Unknown connection ${id}`);
  }
  return entry.tokenName;
}

export function connectionIds(): ConnectionId[] {
  return CONNECTION_CATALOG.map((item) => item.id);
}

export function connectionStatusLabel(status: ConnectionStatus): string {
  switch (status) {
    case "connected":
      return "Connected";
    case "revoked":
      return "Revoked";
    case "available":
      return "Available";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}
