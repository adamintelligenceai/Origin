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

export type ConnectionAuth =
  | { kind: "companion" }
  | { kind: "local_oauth"; host: string };

export interface ConnectionDescriptor {
  id: ConnectionId;
  group: ConnectionGroup;
  label: string;
  detail: string;
  tokenName: string;
  auth: ConnectionAuth;
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
    hint: "Official local OAuth on this device. Tokens never enter the service cloud. There is no hosted aggregator."
  }
];

export const CONNECTION_CATALOG: readonly ConnectionDescriptor[] = [
  {
    id: "phone",
    group: "this_device",
    label: "Phone",
    detail: "Paired companion · call audio never leaves the handset",
    tokenName: "phone.companion",
    auth: { kind: "companion" }
  },
  {
    id: "sms",
    group: "this_device",
    label: "SMS",
    detail: "Local inbox · bodies stay on the paired phone",
    tokenName: "sms.local",
    auth: { kind: "companion" }
  },
  {
    id: "missed_calls",
    group: "this_device",
    label: "Missed calls",
    detail: "Read from the paired phone · no carrier relay through us",
    tokenName: "calls.local",
    auth: { kind: "companion" }
  },
  {
    id: "gmail",
    group: "work",
    label: "Gmail",
    detail: "Live local OAuth · gmail.readonly · token in the vault",
    tokenName: "google.gmail.refresh",
    auth: { kind: "local_oauth", host: "accounts.google.com" }
  },
  {
    id: "calendar",
    group: "work",
    label: "Google Calendar",
    detail: "Live local OAuth · calendar.readonly · token in the vault",
    tokenName: "google.calendar.refresh",
    auth: { kind: "local_oauth", host: "accounts.google.com" }
  },
  {
    id: "drive",
    group: "work",
    label: "Drive",
    detail: "Live local OAuth · files stay on this device once connected",
    tokenName: "google.drive.refresh",
    auth: { kind: "local_oauth", host: "accounts.google.com" }
  },
  {
    id: "linkedin",
    group: "social",
    label: "LinkedIn",
    detail: "Live local OAuth · linkedin.com · PKCE · read-only · no posting",
    tokenName: "linkedin.refresh",
    auth: { kind: "local_oauth", host: "www.linkedin.com" }
  },
  {
    id: "instagram",
    group: "social",
    label: "Instagram",
    detail: "Live local OAuth · Meta · Instagram inbox stays on this device",
    tokenName: "instagram.refresh",
    auth: { kind: "local_oauth", host: "www.facebook.com" }
  },
  {
    id: "facebook",
    group: "social",
    label: "Facebook",
    detail: "Live local OAuth · facebook.com · PKCE · read-only",
    tokenName: "facebook.refresh",
    auth: { kind: "local_oauth", host: "www.facebook.com" }
  },
  {
    id: "x",
    group: "social",
    label: "X",
    detail: "Live local OAuth · x.com · PKCE · public replies wait for A3",
    tokenName: "x.refresh",
    auth: { kind: "local_oauth", host: "x.com" }
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

export function connectActionLabel(auth: ConnectionAuth): string {
  switch (auth.kind) {
    case "companion":
      return "Pair";
    case "local_oauth":
      return "Connect";
    default: {
      const exhaustive: never = auth;
      return exhaustive;
    }
  }
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
