import {
  cloudDeviceSchema,
  cloudTelemetrySchema,
  type CloudDevice,
  type CloudTelemetry
} from "@project-chief/types";

export interface WaitlistRecord {
  email: string;
  createdAt: string;
}

export interface RelayEnvelope {
  envelopeId: string;
  recipientDeviceId: string;
  expiresAt: string;
  ciphertext: string;
}

const devices = new Map<string, CloudDevice>();
const telemetry: CloudTelemetry[] = [];
const waitlist: WaitlistRecord[] = [];
const envelopes = new Map<string, RelayEnvelope>();

export function recordWaitlist(email: string): WaitlistRecord {
  const record = { email, createdAt: new Date().toISOString() };
  waitlist.push(record);
  return record;
}

export function recordTelemetry(input: unknown): CloudTelemetry {
  const parsed = cloudTelemetrySchema.parse(input);
  telemetry.push(parsed);
  return parsed;
}

export function upsertDevice(input: unknown): CloudDevice {
  const parsed = cloudDeviceSchema.parse(input);
  devices.set(parsed.deviceId, parsed);
  return parsed;
}

export function listDevices(): CloudDevice[] {
  return [...devices.values()];
}

export function storeEnvelope(input: RelayEnvelope): RelayEnvelope {
  if (!input.envelopeId || !input.recipientDeviceId || !input.ciphertext || !input.expiresAt) {
    throw new Error("Relay envelope is incomplete");
  }
  envelopes.set(input.envelopeId, input);
  return input;
}

export function getEnvelope(envelopeId: string): RelayEnvelope | undefined {
  return envelopes.get(envelopeId);
}
