import { describe, expect, it } from "vitest";
import { MemorySecretStore } from "@project-chief/store";
import {
  authorizationUrl,
  createPkceChallenge,
  exchangeAuthorizationCode,
  isSocialNetwork,
  persistRefreshToken,
  revokeConnection,
  scrubAuth,
  SOCIAL_OAUTH,
  type FetchLike
} from "./index.js";

describe("social connectors", () => {
  it("builds local PKCE authorize URLs for LinkedIn, Instagram, Facebook and X", () => {
    const pkce = createPkceChallenge();
    const redirect = "http://127.0.0.1:1420/oauth/callback";
    const linkedin = authorizationUrl("linkedin", "desktop-client", redirect, pkce);
    const instagram = authorizationUrl("instagram", "desktop-client", redirect, pkce);
    const facebook = authorizationUrl("facebook", "desktop-client", redirect, pkce);
    const x = authorizationUrl("x", "desktop-client", redirect, pkce);
    expect(linkedin.startsWith("https://www.linkedin.com/oauth/v2/authorization")).toBe(true);
    expect(instagram.startsWith("https://www.facebook.com/v21.0/dialog/oauth")).toBe(true);
    expect(facebook.startsWith("https://www.facebook.com/v21.0/dialog/oauth")).toBe(true);
    expect(x.startsWith("https://x.com/i/oauth2/authorize")).toBe(true);
    expect(linkedin).toContain("code_challenge_method=S256");
    expect(linkedin).not.toContain("aggregator");
    expect(instagram).not.toContain("nylas");
    expect(isSocialNetwork("linkedin")).toBe(true);
    expect(isSocialNetwork("gmail")).toBe(false);
    expect(SOCIAL_OAUTH.x.scopes).toContain("offline.access");
  });

  it("keeps social refresh tokens in the local vault", async () => {
    const secrets = new MemorySecretStore();
    await persistRefreshToken(secrets, SOCIAL_OAUTH.linkedin.tokenName, "local-linkedin");
    expect(await secrets.get("linkedin.refresh")).toBe("local-linkedin");
    await revokeConnection(secrets, SOCIAL_OAUTH.linkedin.tokenName);
    expect(await secrets.get("linkedin.refresh")).toBeUndefined();
  });

  it("scrubs bearer tokens from logs", () => {
    expect(scrubAuth("Authorization Bearer abcdefghijklmnopqrstuvwxyz0123")).toContain(
      "[redacted-access-token]"
    );
  });

  it("exchanges an authorization code on the official token host", async () => {
    const fetchImpl: FetchLike = (url, init) => {
      expect(url).toBe("https://www.linkedin.com/oauth/v2/accessToken");
      expect(init.body).toContain("code_verifier=");
      return Promise.resolve(
        new Response(
          JSON.stringify({
            access_token: "linkedin-access",
            refresh_token: "linkedin-refresh",
            expires_in: 3600
          }),
          { status: 200 }
        )
      );
    };
    const tokens = await exchangeAuthorizationCode(
      "linkedin",
      "desktop-client",
      "http://127.0.0.1:53682/oauth/callback",
      "auth-code",
      "verifier",
      fetchImpl
    );
    expect(tokens.refreshToken).toBe("linkedin-refresh");
  });

  it("fails closed when the social token host refuses the grant", async () => {
    const fetchImpl: FetchLike = () => Promise.resolve(new Response("{}", { status: 401 }));
    await expect(
      exchangeAuthorizationCode(
        "x",
        "desktop-client",
        "http://127.0.0.1:53682/oauth/callback",
        "auth-code",
        "verifier",
        fetchImpl
      )
    ).rejects.toThrow(/refused/);
  });
});
