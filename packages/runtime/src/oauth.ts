import { isGoogleWorkNetwork } from "@project-chief/connectors-google";
import { isSocialNetwork } from "@project-chief/connectors-social";
import type { ConnectionId } from "./connections.js";

export const LOOPBACK_REDIRECT = "http://127.0.0.1:53682/oauth/callback";

export type OAuthMode = "fixture" | "live";

export interface OAuthConfig {
  mode: OAuthMode;
  redirectUri: string;
  googleClientId?: string;
  linkedinClientId?: string;
  metaClientId?: string;
  xClientId?: string;
}

export function defaultOAuthConfig(): OAuthConfig {
  return {
    mode: "fixture",
    redirectUri: LOOPBACK_REDIRECT
  };
}

export function oauthConfigFromEnv(env: Record<string, string | undefined>): OAuthConfig {
  const mode = env.OAUTH_MODE === "live" || env.VITE_OAUTH_MODE === "live" ? "live" : "fixture";
  const googleClientId = firstEnv(env, ["GOOGLE_CLIENT_ID", "VITE_GOOGLE_CLIENT_ID"]);
  const linkedinClientId = firstEnv(env, ["LINKEDIN_CLIENT_ID", "VITE_LINKEDIN_CLIENT_ID"]);
  const metaClientId = firstEnv(env, ["META_CLIENT_ID", "VITE_META_CLIENT_ID"]);
  const xClientId = firstEnv(env, ["X_CLIENT_ID", "VITE_X_CLIENT_ID"]);
  return {
    mode,
    redirectUri:
      env.OAUTH_REDIRECT_URI ??
      env.VITE_OAUTH_REDIRECT_URI ??
      env.GOOGLE_DESKTOP_REDIRECT_URI ??
      LOOPBACK_REDIRECT,
    ...(googleClientId ? { googleClientId } : {}),
    ...(linkedinClientId ? { linkedinClientId } : {}),
    ...(metaClientId ? { metaClientId } : {}),
    ...(xClientId ? { xClientId } : {})
  };
}

function firstEnv(
  env: Record<string, string | undefined>,
  keys: readonly string[]
): string | undefined {
  for (const key of keys) {
    const value = env[key];
    if (value && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

export function clientIdFor(id: ConnectionId, config: OAuthConfig): string | undefined {
  switch (id) {
    case "gmail":
    case "calendar":
    case "drive":
      return config.googleClientId;
    case "linkedin":
      return config.linkedinClientId;
    case "instagram":
    case "facebook":
      return config.metaClientId;
    case "x":
      return config.xClientId;
    case "phone":
    case "sms":
    case "missed_calls":
      return undefined;
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

export function requireClientId(id: ConnectionId, config: OAuthConfig): string {
  if (config.mode === "fixture") {
    return clientIdFor(id, config) ?? "project-chief-desktop";
  }
  const clientId = clientIdFor(id, config);
  if (!clientId) {
    throw new Error(`Live OAuth client ID is not configured for ${id}`);
  }
  return clientId;
}

export function isOAuthConnection(id: ConnectionId): boolean {
  return isGoogleWorkNetwork(id) || isSocialNetwork(id);
}
