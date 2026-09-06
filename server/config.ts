/**
 * Runtime configuration for the Origin server.
 *
 * Credentials are read from the environment only. When neither a Bearer token
 * nor an API-key pair is present, the server falls back to demo mode so the
 * app remains fully runnable end-to-end without secrets.
 */

export type EtoroEnvironment = "demo" | "real";

export interface BearerAuth {
  kind: "bearer";
  accessToken: string;
}

export interface ApiKeyAuth {
  kind: "apiKey";
  apiKey: string;
  userKey: string;
}

export type EtoroAuth = BearerAuth | ApiKeyAuth;

export interface OriginConfig {
  port: number;
  /** eToro trading environment used for path segments (`/demo/` vs `/real/`). */
  etoroEnv: EtoroEnvironment;
  apiBaseUrl: string;
  /** When true, the server serves deterministic mock data and makes no network calls. */
  demoMode: boolean;
  /** Present only when real credentials are supplied. */
  auth: EtoroAuth | null;
}

function parseEnvironment(value: string | undefined): EtoroEnvironment {
  return value === "real" ? "real" : "demo";
}

function resolveAuth(env: NodeJS.ProcessEnv): EtoroAuth | null {
  const accessToken = env.ETORO_ACCESS_TOKEN?.trim();
  const apiKey = env.ETORO_API_KEY?.trim();
  const userKey = env.ETORO_USER_KEY?.trim();

  // Bearer OR API key, never both (per eToro API conventions). Bearer wins if
  // both families are somehow present, and we never send both on a request.
  if (accessToken) {
    return { kind: "bearer", accessToken };
  }
  if (apiKey && userKey) {
    return { kind: "apiKey", apiKey, userKey };
  }
  return null;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): OriginConfig {
  const auth = resolveAuth(env);
  const explicitDemo = env.ETORO_DEMO_MODE?.trim().toLowerCase();
  const demoMode =
    explicitDemo === "true" || explicitDemo === "1" || auth === null;

  return {
    port: Number(env.ORIGIN_PORT ?? 8787),
    etoroEnv: parseEnvironment(env.ETORO_ENV),
    apiBaseUrl: (
      env.ETORO_API_BASE ?? "https://public-api.etoro.com/api/v1"
    ).replace(/\/$/, ""),
    demoMode,
    auth,
  };
}
