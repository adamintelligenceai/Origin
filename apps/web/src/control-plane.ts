import {
  cloudDeviceSchema,
  cloudFlagSchema,
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

export interface ControlPlaneFlags {
  mutations_enabled: boolean;
  billing_enabled: boolean;
  social_oauth_enabled: boolean;
  model_route_enabled: boolean;
  kill_switch: boolean;
}

export type FlagId = keyof ControlPlaneFlags;

export type SubscriptionStatus = "none" | "trialing" | "active" | "canceled";

export interface BillingRecord {
  stripeCustomerId: string;
  subscriptionStatus: SubscriptionStatus;
}

const devices = new Map<string, CloudDevice>();
const telemetry: CloudTelemetry[] = [];
const waitlist: WaitlistRecord[] = [];
const envelopes = new Map<string, RelayEnvelope>();

const flags: ControlPlaneFlags = {
  mutations_enabled: true,
  billing_enabled: true,
  social_oauth_enabled: true,
  model_route_enabled: true,
  kill_switch: false
};

let billing: BillingRecord | undefined;

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

export function getFlags(): ControlPlaneFlags {
  return { ...flags };
}

export function setFlag(id: string, enabled: boolean): ControlPlaneFlags {
  const parsed = cloudFlagSchema.parse({ id, enabled });
  const flagId = parseFlagId(parsed.id);
  switch (flagId) {
    case "mutations_enabled":
      flags.mutations_enabled = parsed.enabled;
      break;
    case "billing_enabled":
      flags.billing_enabled = parsed.enabled;
      break;
    case "social_oauth_enabled":
      flags.social_oauth_enabled = parsed.enabled;
      break;
    case "model_route_enabled":
      flags.model_route_enabled = parsed.enabled;
      break;
    case "kill_switch":
      flags.kill_switch = parsed.enabled;
      break;
    default: {
      const exhaustive: never = flagId;
      return exhaustive;
    }
  }
  return getFlags();
}

export function recordBillingCustomer(input: {
  stripeCustomerId: string;
  status: SubscriptionStatus;
}): BillingRecord {
  const subscriptionStatus = parseSubscriptionStatus(input.status);
  if (!input.stripeCustomerId) {
    throw new Error("stripeCustomerId required");
  }
  billing = {
    stripeCustomerId: input.stripeCustomerId,
    subscriptionStatus
  };
  return { ...billing };
}

export function getBillingCustomer(): BillingRecord | undefined {
  return billing ? { ...billing } : undefined;
}

export function applyBillingWebhook(eventType: string, customerId: string): BillingRecord | undefined {
  const handled = parseHandledStripeEvent(eventType);
  if (!handled || !customerId) {
    return getBillingCustomer();
  }
  switch (handled) {
    case "checkout.session.completed":
      return recordBillingCustomer({ stripeCustomerId: customerId, status: "active" });
    case "customer.subscription.deleted":
      return recordBillingCustomer({ stripeCustomerId: customerId, status: "canceled" });
    default: {
      const exhaustive: never = handled;
      return exhaustive;
    }
  }
}

function parseFlagId(id: string): FlagId {
  switch (id) {
    case "mutations_enabled":
    case "billing_enabled":
    case "social_oauth_enabled":
    case "model_route_enabled":
    case "kill_switch":
      return id;
    default:
      throw new Error("unknown flag");
  }
}

function parseSubscriptionStatus(status: string): SubscriptionStatus {
  switch (status) {
    case "none":
    case "trialing":
    case "active":
    case "canceled":
      return status;
    default:
      throw new Error("unknown subscription status");
  }
}

type HandledStripeEvent = "checkout.session.completed" | "customer.subscription.deleted";

function parseHandledStripeEvent(eventType: string): HandledStripeEvent | undefined {
  switch (eventType) {
    case "checkout.session.completed":
    case "customer.subscription.deleted":
      return eventType;
    default:
      return undefined;
  }
}
