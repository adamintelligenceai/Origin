import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, randomBytes } from "@noble/hashes/utils.js";
import type { SecretStore } from "@project-chief/store";

export const CALENDAR_READONLY_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";
export const GMAIL_READONLY_SCOPE = "https://www.googleapis.com/auth/gmail.readonly";
export const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";
export const CALENDAR_EVENTS_SCOPE = "https://www.googleapis.com/auth/calendar.events";
export const DRIVE_READONLY_SCOPE = "https://www.googleapis.com/auth/drive.readonly";
export const GOOGLE_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export type GoogleWorkNetwork = "gmail" | "calendar" | "drive";

export interface PkceChallenge {
  state: string;
  verifier: string;
  challenge: string;
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

export function isGoogleWorkNetwork(id: string): id is GoogleWorkNetwork {
  return id === "gmail" || id === "calendar" || id === "drive";
}

export function scopesFor(network: GoogleWorkNetwork): string[] {
  switch (network) {
    case "gmail":
      return [GMAIL_READONLY_SCOPE];
    case "calendar":
      return [CALENDAR_READONLY_SCOPE];
    case "drive":
      return [DRIVE_READONLY_SCOPE];
    default: {
      const exhaustive: never = network;
      return exhaustive;
    }
  }
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
  clientId: string,
  redirectUri: string,
  scopes: string[],
  pkce: PkceChallenge
): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    state: pkce.state,
    code_challenge: pkce.challenge,
    code_challenge_method: "S256",
    access_type: "offline",
    prompt: "consent"
  });
  return `${GOOGLE_AUTHORIZE_URL}?${params.toString()}`;
}

export async function exchangeAuthorizationCode(
  clientId: string,
  redirectUri: string,
  code: string,
  verifier: string,
  fetchImpl: FetchLike = fetch
): Promise<OAuthTokenSet> {
  return tokenRequest(
    {
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
      code_verifier: verifier
    },
    fetchImpl,
    true
  );
}

export async function refreshAccessToken(
  clientId: string,
  refreshToken: string,
  fetchImpl: FetchLike = fetch
): Promise<OAuthTokenSet> {
  const next = await tokenRequest(
    {
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken
    },
    fetchImpl,
    false
  );
  return {
    accessToken: next.accessToken,
    refreshToken: next.refreshToken || refreshToken,
    ...(next.expiresIn === undefined ? {} : { expiresIn: next.expiresIn })
  };
}

async function tokenRequest(
  body: Record<string, string>,
  fetchImpl: FetchLike,
  refreshRequired: boolean
): Promise<OAuthTokenSet> {
  const response = await fetchImpl(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString()
  });
  if (!response.ok) {
    throw new Error("Google token endpoint refused the request");
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
    throw new Error("Google token response was missing an access token");
  }
  const refreshToken =
    typeof payload.refresh_token === "string" && payload.refresh_token.length > 0
      ? payload.refresh_token
      : undefined;
  if (refreshRequired && !refreshToken) {
    throw new Error("Google token response was missing a refresh token");
  }
  return {
    accessToken: payload.access_token,
    refreshToken: refreshToken ?? "",
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
    .replace(/ya29\.[A-Za-z0-9_-]+/g, "[redacted-access-token]")
    .replace(/1\/\/[A-Za-z0-9_-]+/g, "[redacted-refresh-token]");
}
