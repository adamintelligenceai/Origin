import { createHash, randomBytes } from "node:crypto";
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
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  return {
    state: randomBytes(16).toString("hex"),
    verifier,
    challenge
  };
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
