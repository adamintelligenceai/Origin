import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  STRIPE_NOT_CONFIGURED,
  constructEvent,
  createCheckoutSession,
  parseCheckoutRequest,
  stripeFormPost,
  verifyWebhook
} from "./stripe.js";

const originalEnv = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
};

afterEach(() => {
  restoreEnv("STRIPE_SECRET_KEY", originalEnv.STRIPE_SECRET_KEY);
  restoreEnv("STRIPE_PRICE_ID", originalEnv.STRIPE_PRICE_ID);
  restoreEnv("STRIPE_WEBHOOK_SECRET", originalEnv.STRIPE_WEBHOOK_SECRET);
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("stripe control-plane helpers", () => {
  it("throws Stripe is not configured when the secret is missing", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_PRICE_ID;
    await expect(stripeFormPost("/checkout/sessions", { mode: "subscription" })).rejects.toThrow(
      STRIPE_NOT_CONFIGURED
    );
    await expect(
      createCheckoutSession({
        customerEmail: "founder@example.com",
        successUrl: "https://example.com/billing?checkout=success",
        cancelUrl: "https://example.com/billing?checkout=cancel"
      })
    ).rejects.toThrow(STRIPE_NOT_CONFIGURED);
  });

  it("rejects checkout bodies with subject or prompt fields", () => {
    expect(() =>
      parseCheckoutRequest({
        email: "founder@example.com",
        subject: "vendor invoice"
      })
    ).toThrow();
    expect(() =>
      parseCheckoutRequest({
        email: "founder@example.com",
        prompt: "draft a reply"
      })
    ).toThrow();
    expect(parseCheckoutRequest({ email: "founder@example.com" })).toEqual({
      email: "founder@example.com"
    });
  });

  it("omits payment_method_types and hashes client_reference_id", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_123";
    process.env.STRIPE_PRICE_ID = "price_123";
    const bodies: string[] = [];
    vi.stubGlobal("fetch", (_url: string, init?: RequestInit) => {
      bodies.push(readFetchBody(init));
      if (bodies.length === 1) {
        return Promise.resolve(new Response(JSON.stringify({ id: "cus_123" }), { status: 200 }));
      }
      return Promise.resolve(
        new Response(
          JSON.stringify({
            id: "cs_123",
            url: "https://checkout.stripe.com/c/pay/cs_123",
            customer: "cus_123"
          }),
          { status: 200 }
        )
      );
    });
    const session = await createCheckoutSession({
      customerEmail: "founder@example.com",
      successUrl: "https://example.com/ok",
      cancelUrl: "https://example.com/cancel"
    });
    expect(session.url).toBe("https://checkout.stripe.com/c/pay/cs_123");
    expect(session.customerId).toBe("cus_123");
    expect(bodies.some((body) => body.includes("payment_method_types"))).toBe(false);
    expect(bodies[1]?.includes("founder@example.com")).toBe(false);
    expect(bodies[1]?.includes("client_reference_id")).toBe(true);
  });

  it("verifies webhook signatures with HMAC-SHA256", () => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    const payload = JSON.stringify({
      id: "evt_1",
      type: "checkout.session.completed",
      data: { object: { customer: "cus_1" } }
    });
    const timestamp = "1700000000";
    const signature = createHmac("sha256", "whsec_test")
      .update(`${timestamp}.${payload}`, "utf8")
      .digest("hex");
    expect(verifyWebhook(payload, `t=${timestamp},v1=${signature}`)).toBe(true);
    const event = constructEvent(payload, `t=${timestamp},v1=${signature}`);
    expect(event.type).toBe("checkout.session.completed");
    expect(event.id).toBe("evt_1");
  });

  it("throws Stripe is not configured when the webhook secret is missing", () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    expect(() => verifyWebhook("{}", "t=1,v1=abc")).toThrow(STRIPE_NOT_CONFIGURED);
  });
});

function restoreEnv(
  name: "STRIPE_SECRET_KEY" | "STRIPE_PRICE_ID" | "STRIPE_WEBHOOK_SECRET",
  value: string | undefined
): void {
  switch (name) {
    case "STRIPE_SECRET_KEY":
      if (value === undefined) {
        delete process.env.STRIPE_SECRET_KEY;
        return;
      }
      process.env.STRIPE_SECRET_KEY = value;
      return;
    case "STRIPE_PRICE_ID":
      if (value === undefined) {
        delete process.env.STRIPE_PRICE_ID;
        return;
      }
      process.env.STRIPE_PRICE_ID = value;
      return;
    case "STRIPE_WEBHOOK_SECRET":
      if (value === undefined) {
        delete process.env.STRIPE_WEBHOOK_SECRET;
        return;
      }
      process.env.STRIPE_WEBHOOK_SECRET = value;
      return;
    default: {
      const exhaustive: never = name;
      return exhaustive;
    }
  }
}

function readFetchBody(init?: RequestInit): string {
  const body = init?.body;
  if (typeof body === "string") {
    return body;
  }
  if (body instanceof URLSearchParams) {
    return body.toString();
  }
  return "";
}
