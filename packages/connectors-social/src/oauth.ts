import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, randomBytes } from "@noble/hashes/utils.js";
import type { SecretStore } from "@project-chief/store";

export type SocialNetwork = "linkedin" | "instagram" | "facebook" | "x";

export interface PkceChallenge {
  state: string;
  verifier: string;
  challenge: string;
}

export interface SocialOAuthApp {
  authorize: string;
  token: string;
  host: string;
  scopes: readonly string[];
  tokenName: string;
}

export const SOCIAL_OAUTH: Record<SocialNetwork, SocialOAuthApp> = {
  linkedin: {
    authorize: "https://www.linkedin.com/oauth/v2/authorization",
    token: "https://www.linkedin.com/oauth/v2/accessToken",
    host: "www.linkedin.com",
    scopes: ["openid", "profile", "email"],
    tokenName: "linkedin.refresh"
  },
  instagram: {
    authorize: "https://www.facebook.com/v21.0/dialog/oauth",
    token: "https://graph.facebook.com/v21.0/oauth/access_token",
    host: "www.facebook.com",
    scopes: ["instagram_business_basic"],
    tokenName: "instagram.refresh"
  },
  facebook: {
    authorize: "https://www.facebook.com/v21.0/dialog/oauth",
    token: "https://graph.facebook.com/v21.0/oauth/access_token",
    host: "www.facebook.com",
    scopes: ["public_profile", "pages_read_engagement"],
    tokenName: "facebook.refresh"
  },
  x: {
    authorize: "https://x.com/i/oauth2/authorize",
    token: "https://api.x.com/2/oauth2/token",
    host: "x.com",
    scopes: ["tweet.read", "users.read", "dm.read", "offline.access"],
    tokenName: "x.refresh"
  }
};

export function isSocialNetwork(id: string): id is SocialNetwork {
  return id === "linkedin" || id === "instagram" || id === "facebook" || id === "x";
}

export function createPkceChallenge(): PkceChallenge {
  const verifier = bytesToBase64Url(randomBytes(32));
  const challenge = bytesToBase64Url(sha256(new TextEncoder().encode(verifier)));
  return {
    state: bytesToHex(randomBytes(16)),
    verifier,
    challenge
  };
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

export function authorizationUrl(
  network: SocialNetwork,
  clientId: string,
  redirectUri: string,
  pkce: PkceChallenge
): string {
  const app = SOCIAL_OAUTH[network];
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: app.scopes.join(" "),
    state: pkce.state,
    code_challenge: pkce.challenge,
    code_challenge_method: "S256"
  });
  return `${app.authorize}?${params.toString()}`;
}

export interface OAuthTokenSet {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

export type FetchLike = (
  input: string,
  init: { method: string; headers: Record<string, string>; body: string }
) => Promise<Response>;

export async function exchangeAuthorizationCode(
  network: SocialNetwork,
  clientId: string,
  redirectUri: string,
  code: string,
  verifier: string,
  fetchImpl: FetchLike = fetch
): Promise<OAuthTokenSet> {
  const app = SOCIAL_OAUTH[network];
  return tokenRequest(
    app.token,
    {
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
      code_verifier: verifier
    },
    fetchImpl
  );
}

export async function refreshAccessToken(
  network: SocialNetwork,
  clientId: string,
  refreshToken: string,
  fetchImpl: FetchLike = fetch
): Promise<OAuthTokenSet> {
  const app = SOCIAL_OAUTH[network];
  const next = await tokenRequest(
    app.token,
    {
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken
    },
    fetchImpl
  );
  return {
    accessToken: next.accessToken,
    refreshToken: next.refreshToken || refreshToken,
    ...(next.expiresIn === undefined ? {} : { expiresIn: next.expiresIn })
  };
}

async function tokenRequest(
  url: string,
  body: Record<string, string>,
  fetchImpl: FetchLike
): Promise<OAuthTokenSet> {
  const response = await fetchImpl(url, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString()
  });
  if (!response.ok) {
    throw new Error("Social token endpoint refused the request");
  }
  const payload = (await response.json()) as {
    access_token?: unknown;
    refresh_token?: unknown;
    expires_in?: unknown;
    error?: unknown;
  };
  if (payload.error === "invalid_grant") {
    throw new Error("invalid_grant");
  }
  if (typeof payload.access_token !== "string" || payload.access_token.length === 0) {
    throw new Error("Social token response was missing an access token");
  }
  const refresh =
    typeof payload.refresh_token === "string" && payload.refresh_token.length > 0
      ? payload.refresh_token
      : payload.access_token;
  return {
    accessToken: payload.access_token,
    refreshToken: refresh,
    ...(typeof payload.expires_in === "number" ? { expiresIn: payload.expires_in } : {})
  };
}

export async function persistRefreshToken(
  secrets: SecretStore,
  name: string,
  token: string
): Promise<void> {
  await secrets.set(name, token);
}

export async function revokeConnection(secrets: SecretStore, name: string): Promise<void> {
  await secrets.delete(name);
}

export function scrubAuth(value: string): string {
  return value
    .replace(/Bearer\s+[A-Za-z0-9._~+/-]+=*/gi, "Bearer [redacted-access-token]")
    .replace(/[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[redacted-jwt]");
}
