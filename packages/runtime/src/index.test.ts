import { describe, expect, it } from "vitest";
import { canModelGrantAutonomy } from "@project-chief/permissions";
import { ChiefRuntime, type FetchLike } from "./chief-runtime.js";
import { oauthConfigFromEnv } from "./oauth.js";

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

  it("runs live local OAuth for Gmail and exchanges a loopback code", async () => {
    const runtime = new ChiefRuntime();
    await runtime.boot();
    const session = runtime.beginOAuth("gmail");
    expect(session.url.startsWith("https://accounts.google.com/o/oauth2/v2/auth")).toBe(true);
    expect(session.url).toContain("code_challenge_method=S256");
    expect(session.url).not.toContain("gmail.send");
    const completed = await runtime.completeOAuth("gmail", {
      code: "fixture-loopback",
      state: session.state
    });
    expect(completed.connections.gmail).toBe("connected");
  });

  it("exchanges live Google tokens on the official host and never stores them in the snapshot", async () => {
    const fetchImpl: FetchLike = () =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            access_token: "ya29.access",
            refresh_token: "1//refresh",
            expires_in: 3600
          }),
          { status: 200 }
        )
      );
    const runtime = new ChiefRuntime({
      oauth: {
        mode: "live",
        redirectUri: "http://127.0.0.1:53682/oauth/callback",
        googleClientId: "live-google-client"
      },
      fetchImpl
    });
    await runtime.boot();
    await runtime.revoke("gmail");
    const session = runtime.beginOAuth("gmail");
    const connected = await runtime.completeOAuth("gmail", {
      code: "auth-code",
      state: session.state
    });
    expect(connected.connections.gmail).toBe("connected");
    expect(JSON.stringify(connected).includes("1//refresh")).toBe(false);
    expect(JSON.stringify(runtime.diagnostics()).includes("1//refresh")).toBe(false);
  });

  it("fails closed when live OAuth has no client ID", async () => {
    const runtime = new ChiefRuntime({
      oauth: { mode: "live", redirectUri: "http://127.0.0.1:53682/oauth/callback" }
    });
    await runtime.boot();
    expect(() => {
      runtime.beginOAuth("linkedin");
    }).toThrow(/client ID/);
  });

  it("blocks mutations when the kill switch is on", async () => {
    const runtime = new ChiefRuntime();
    const boot = await runtime.boot();
    runtime.applyFlags({
      mutationsEnabled: true,
      billingEnabled: true,
      socialOAuthEnabled: true,
      modelRouteEnabled: true,
      killSwitch: true
    });
    const followUp = boot.workItems.find((item) => item.title.includes("Follow up"));
    if (!followUp) {
      throw new Error("expected follow-up work item");
    }
    await expect(runtime.approve(followUp.id)).rejects.toThrow(/paused/);
  });

  it("exports diagnostics without content or secrets", async () => {
    const runtime = new ChiefRuntime();
    await runtime.boot();
    const bundle = runtime.diagnostics();
    expect(bundle.workItemCount).toBeGreaterThan(0);
    expect(bundle.connections.gmail).toBe("connected");
    expect(JSON.stringify(bundle)).not.toMatch(/Ask Jordan|ya29|1\/\//);
  });

  it("reads live OAuth client IDs from env and stays fixture otherwise", () => {
    expect(oauthConfigFromEnv({}).mode).toBe("fixture");
    expect(
      oauthConfigFromEnv({
        OAUTH_MODE: "live",
        GOOGLE_CLIENT_ID: "google-live",
        LINKEDIN_CLIENT_ID: "linkedin-live"
      }).googleClientId
    ).toBe("google-live");
  });
});
