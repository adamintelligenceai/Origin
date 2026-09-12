import { createHash, randomBytes } from "node:crypto";
import type { SecretStore } from "@project-chief/store";

export const CALENDAR_READONLY_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";
export const GMAIL_READONLY_SCOPE = "https://www.googleapis.com/auth/gmail.readonly";
export const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";
export const CALENDAR_EVENTS_SCOPE = "https://www.googleapis.com/auth/calendar.events";

export interface PkceChallenge {
  state: string;
  verifier: string;
  challenge: string;
}

export function createPkceChallenge(): PkceChallenge {
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  return {
    state: randomBytes(16).toString("hex"),
    verifier,
    challenge
  };
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
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
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
