import { describe, expect, it } from "vitest";
import { canModelGrantAutonomy } from "@project-chief/permissions";
import { ChiefRuntime } from "./chief-runtime.js";

describe("ChiefRuntime", () => {
  it("runs observe → plan → approve → mock verify → receipt", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(boot.workItems.length).toBeGreaterThan(0);
    expect(boot.plans.every((plan) => plan.requiredAutonomy >= 2)).toBe(true);
    const followUp = boot.workItems.find((item) => item.title.includes("Follow up"));
    if (!followUp) {
      throw new Error("expected follow-up work item");
    }
    const next = await runtime.approve(followUp.id);
    expect(next.workItems.find((item) => item.id === followUp.id)?.status).toBe("verified");
    expect(next.receipts[0]?.outcome).toBe("verified");
    expect(canModelGrantAutonomy(4)).toBe(false);
  });

  it("does not let injection email grant a send", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(
      boot.plans.some(
        (plan) => plan.intent.toLowerCase().includes("password") && plan.actionType === "email.send"
      )
    ).toBe(false);
  });

  it("wipes the encrypted store and connector tokens", async () => {
    const runtime = new ChiefRuntime();
    await runtime.boot();
    const wiped = await runtime.wipe();
    expect(wiped.wiped).toBe(true);
    expect(wiped.workItems).toEqual([]);
    expect(wiped.meetings).toEqual([]);
    expect(wiped.connections.gmail).toBe("revoked");
    expect(wiped.connections.phone).toBe("revoked");
    expect(wiped.connections.sms).toBe("revoked");
    expect(wiped.connections.linkedin).toBe("revoked");
    expect(wiped.connections.x).toBe("revoked");
  });

  it("surfaces a missed call and refuses to send a public X reply", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(boot.connections.phone).toBe("connected");
    expect(boot.connections.sms).toBe("connected");
    expect(boot.connections.linkedin).toBe("connected");
    expect(boot.workItems.some((item) => item.kind === "missed_call")).toBe(true);
    const socialHold = boot.workItems.find((item) => item.id === "hold-x-hold");
    const socialPlan = boot.plans.find((plan) => plan.workItemId === socialHold?.id);
    expect(socialHold?.kind).toBe("follow_up");
    expect(socialPlan?.actionType).not.toBe("email.send");
    expect(
      boot.plans.some(
        (plan) => plan.intent.toLowerCase().includes("password") && plan.actionType === "email.send"
      )
    ).toBe(false);
  });

  it("can pair a revoked local connection without sending tokens off device", async () => {
    const runtime = new ChiefRuntime();
    await runtime.boot();
    const revoked = await runtime.revoke("sms");
    expect(revoked.connections.sms).toBe("revoked");
    expect(revoked.workItems.some((item) => item.sourceRefs[0]?.provider === "sms")).toBe(false);
    const paired = await runtime.pair("sms");
    expect(paired.connections.sms).toBe("connected");
    expect(paired.workItems.some((item) => item.sourceRefs[0]?.provider === "sms")).toBe(true);
  });

  it("runs live local OAuth for LinkedIn and drops its inbox when revoked", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(boot.workItems.some((item) => item.title.includes("Chris messaged on LinkedIn"))).toBe(
      true
    );
    const session = runtime.beginOAuth("linkedin");
    expect(session.url.startsWith("https://www.linkedin.com/oauth/v2/authorization")).toBe(true);
    expect(session.host).toContain("linkedin.com");
    const revoked = await runtime.revoke("linkedin");
    expect(revoked.connections.linkedin).toBe("revoked");
    expect(revoked.workItems.some((item) => item.title.includes("Chris messaged on LinkedIn"))).toBe(
      false
    );
    const connected = await runtime.pair("linkedin");
    expect(connected.connections.linkedin).toBe("connected");
    expect(
      connected.workItems.some((item) => item.title.includes("Chris messaged on LinkedIn"))
    ).toBe(true);
  });

  it("exposes overlapping fixture meetings and clears the conflict after approve", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(boot.meetings.some((item) => item.conflict)).toBe(true);
    const conflict = boot.workItems.find((item) => item.kind === "calendar_conflict");
    if (!conflict) {
      throw new Error("expected calendar conflict work item");
    }
    const next = await runtime.approve(conflict.id);
    expect(next.workItems.find((item) => item.id === conflict.id)?.status).toBe("verified");
    expect(next.meetings.every((item) => !item.conflict)).toBe(true);
  });

  it("prepares tomorrow's meeting and reverses a verified draft", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    expect(boot.meetingPrep[0]?.eventTitle).toContain("Board prep");
    expect(boot.routines).toHaveLength(1);
    const followUp = boot.workItems.find((item) => item.title.includes("Follow up"));
    if (!followUp) {
      throw new Error("expected follow-up work item");
    }
    const approved = await runtime.approve(followUp.id);
    expect(approved.timeSavedMinutes).toBeGreaterThan(0);
    const receipt = approved.receipts[0];
    if (!receipt) {
      throw new Error("expected a receipt");
    }
    const reversed = await runtime.reverse(receipt.id);
    expect(reversed.receipts.some((item) => item.outcome === "reversed")).toBe(true);
    expect(reversed.workItems.find((item) => item.id === followUp.id)?.status).toBe(
      "needs_approval"
    );
  });
});
