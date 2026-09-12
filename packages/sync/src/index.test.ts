import { describe, expect, it } from "vitest";
import { cloudVisibleFields, createDeviceIdentity, openEnvelope, sealEnvelope } from "./index.js";

describe("e2ee sync envelopes", () => {
  it("lets paired devices read sealed payloads and keeps the cloud content-blind", () => {
    const desktop = createDeviceIdentity("desktop");
    const mobile = createDeviceIdentity("mobile");
    const envelope = sealEnvelope(
      desktop,
      mobile,
      1,
      { briefing: "3 decisions" },
      "2099-01-01T00:00:00.000Z"
    );
    expect(JSON.stringify(cloudVisibleFields(envelope))).not.toContain("decisions");
    const opened = openEnvelope(mobile, desktop, envelope, new Set(), 0);
    expect(opened).toEqual({ briefing: "3 decisions" });
  });

  it("rejects replayed envelopes", () => {
    const desktop = createDeviceIdentity("desktop");
    const mobile = createDeviceIdentity("mobile");
    const envelope = sealEnvelope(desktop, mobile, 1, { ok: true }, "2099-01-01T00:00:00.000Z");
    const seen = new Set<string>();
    openEnvelope(mobile, desktop, envelope, seen, 0);
    expect(() => openEnvelope(mobile, desktop, envelope, seen, 0)).toThrow(/Replay/);
  });
});
