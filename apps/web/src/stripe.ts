import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import {
  cloudCheckoutRequestSchema,
  cloudPortalRequestSchema,
  type CloudCheckoutRequest,
  type CloudPortalRequest
} from "@project-chief/types";

export const STRIPE_NOT_CONFIGURED = "Stripe is not configured";

const STRIPE_API_BASE = "https://api.stripe.com/v1";

export interface CheckoutSessionResult {
  id: string;
  url: string;
  customerId: string;
}

export interface PortalSessionResult {
  url: string;
}

export interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}

export function parseCheckoutRequest(body: unknown): CloudCheckoutRequest {
  return cloudCheckoutRequestSchema.parse(body);
}

export function parsePortalRequest(body: unknown): CloudPortalRequest {
  return cloudPortalRequestSchema.parse(body);
}

export async function stripeFormPost(
  path: string,
  params: Record<string, string>
): Promise<Record<string, unknown>> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error(STRIPE_NOT_CONFIGURED);
  }
  for (const key of Object.keys(params)) {
    if (key === "payment_method_types" || key.startsWith("payment_method_types[")) {
      throw new Error("payment_method_types must not be sent");
    }
  }
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    body.append(key, value);
  }
  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error("Stripe request failed");
  }
  if (!response.ok || !isRecord(json)) {
    throw new Error("Stripe request failed");
  }
  return json;
}

export async function createCheckoutSession(input: {
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<CheckoutSessionResult> {
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    throw new Error(STRIPE_NOT_CONFIGURED);
  }
  const customer = await stripeFormPost("/customers", {
    email: input.customerEmail
  });
  const customerId = readStringField(customer, "id");
  if (!customerId) {
    throw new Error("Stripe request failed");
  }
  const session = await stripeFormPost("/checkout/sessions", {
    mode: "subscription",
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    customer: customerId,
    client_reference_id: hashClientReferenceId(input.customerEmail),
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1"
  });
  const url = readStringField(session, "url");
  const id = readStringField(session, "id");
  if (!url || !id) {
    throw new Error("Stripe request failed");
  }
  return { id, url, customerId };
}

export async function createPortalSession(input: {
  customerId: string;
  returnUrl: string;
}): Promise<PortalSessionResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(STRIPE_NOT_CONFIGURED);
  }
  const session = await stripeFormPost("/billing_portal/sessions", {
    customer: input.customerId,
    return_url: input.returnUrl
  });
  const url = readStringField(session, "url");
  if (!url) {
    throw new Error("Stripe request failed");
  }
  return { url };
}

export function verifyWebhook(payload: string, header: string): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error(STRIPE_NOT_CONFIGURED);
  }
  return verifyStripeSignature(payload, header, secret);
}

export function constructEvent(payload: string, header: string): StripeEvent {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error(STRIPE_NOT_CONFIGURED);
  }
  if (!verifyWebhook(payload, header)) {
    throw new Error("Invalid Stripe signature");
  }
  const parsed: unknown = JSON.parse(payload);
  if (!isStripeEvent(parsed)) {
    throw new Error("Invalid Stripe event");
  }
  return parsed;
}

export function customerIdFromStripeObject(object: Record<string, unknown>): string | undefined {
  const customer = object.customer;
  if (typeof customer === "string" && customer.length > 0) {
    return customer;
  }
  if (isRecord(customer)) {
    const nestedId = readStringField(customer, "id");
    if (nestedId) {
      return nestedId;
    }
  }
  return undefined;
}

function hashClientReferenceId(accountIdOrEmail: string): string {
  return createHash("sha256").update(accountIdOrEmail, "utf8").digest("hex");
}

function verifyStripeSignature(payload: string, header: string, secret: string): boolean {
  const timestamp = signatureValue(header, "t");
  const signatures = signatureValues(header, "v1");
  if (!timestamp || signatures.length === 0) {
    return false;
  }
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`, "utf8").digest("hex");
  const expectedBytes = Buffer.from(expected, "utf8");
  return signatures.some((signature) => {
    const actualBytes = Buffer.from(signature, "utf8");
    return actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes);
  });
}

function signatureValue(header: string, key: string): string | undefined {
  return signatureValues(header, key)[0];
}

function signatureValues(header: string, key: string): string[] {
  const values: string[] = [];
  for (const part of header.split(",")) {
    const separator = part.indexOf("=");
    if (separator === -1) {
      continue;
    }
    const name = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (name === key && value) {
      values.push(value);
    }
  }
  return values;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStringField(object: Record<string, unknown>, key: string): string | undefined {
  const value = object[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function isStripeEvent(value: unknown): value is StripeEvent {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.id !== "string" || typeof value.type !== "string" || !isRecord(value.data)) {
    return false;
  }
  return isRecord(value.data.object);
}
