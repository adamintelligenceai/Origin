import { describe, expect, it } from "vitest";
import { recordTelemetry, storeEnvelope, upsertDevice } from "./control-plane.js";

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
});
