import { describe, expect, it } from "vitest";
import {
  applyBillingWebhook,
  getFlags,
  recordTelemetry,
  setFlag,
  storeEnvelope,
  upsertDevice
} from "./control-plane.js";
import { parseCheckoutRequest } from "./stripe.js";

describe("content-blind control plane", () => {
  it("rejects telemetry that tries to carry a prompt", () => {
    expect(() =>
      recordTelemetry({
        event: "app_open",
        deviceIdHash: "abc",
        numeric: {},
        flags: {},
        prompt: "secret inbox"
      })
    ).toThrow();
  });

  it("stores device public keys only", () => {
    const device = upsertDevice({
      deviceId: "dev-1",
      accountId: "acc-1",
      publicKey: "pk-1",
      platform: "desktop",
      appVersion: "0.0.0"
    });
    expect(device.publicKey).toBe("pk-1");
    expect("email_body" in device).toBe(false);
  });

  it("relays opaque ciphertext", () => {
    const envelope = storeEnvelope({
      envelopeId: "env-1",
      recipientDeviceId: "dev-2",
      expiresAt: "2026-09-13T00:00:00.000Z",
      ciphertext: "opaque"
    });
    expect(envelope.ciphertext).toBe("opaque");
  });

  it("roundtrips feature flags without source content", () => {
    const initial = getFlags();
    expect(initial.mutations_enabled).toBe(true);
    expect(initial.billing_enabled).toBe(true);
    expect(initial.social_oauth_enabled).toBe(true);
    expect(initial.model_route_enabled).toBe(true);
    expect(initial.kill_switch).toBe(false);
    const enabled = setFlag("kill_switch", true);
    expect(enabled.kill_switch).toBe(true);
    expect(getFlags().kill_switch).toBe(true);
    const restored = setFlag("kill_switch", false);
    expect(restored.kill_switch).toBe(false);
    expect("prompt" in restored).toBe(false);
  });

  it("rejects checkout bodies with subject or prompt fields", () => {
    expect(() =>
      parseCheckoutRequest({
        email: "founder@example.com",
        subject: "Q3 planning"
      })
    ).toThrow();
    expect(() =>
      parseCheckoutRequest({
        email: "founder@example.com",
        prompt: "summarize inbox"
      })
    ).toThrow();
  });

  it("updates billing status from webhook types only", () => {
    const active = applyBillingWebhook("checkout.session.completed", "cus_founding");
    expect(active?.stripeCustomerId).toBe("cus_founding");
    expect(active?.subscriptionStatus).toBe("active");
    const canceled = applyBillingWebhook("customer.subscription.deleted", "cus_founding");
    expect(canceled?.subscriptionStatus).toBe("canceled");
    expect(canceled && "email_body" in canceled).toBe(false);
  });
});
