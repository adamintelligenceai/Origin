import {
  ChiefRuntime,
  flagsFromControlPlane,
  oauthConfigFromEnv,
  type ControlPlaneFlagPayload
} from "@project-chief/runtime";
import {
  completeLoopback,
  createTauriSecretStore,
  createTauriSnapshotStore,
  isTauriRuntime
} from "./vault.js";

let instance: ChiefRuntime | undefined;

export function getRuntime(): ChiefRuntime {
  instance ??= new ChiefRuntime();
  return instance;
}

export function resetRuntime(): ChiefRuntime {
  instance = new ChiefRuntime();
  return instance;
}

export function startSession(): ChiefRuntime {
  instance = isTauriRuntime()
    ? new ChiefRuntime({
        secrets: createTauriSecretStore(),
        snapshots: createTauriSnapshotStore(),
        oauth: oauthConfigFromEnv(readDesktopEnv()),
        onboardingComplete: false
      })
    : new ChiefRuntime({
        oauth: oauthConfigFromEnv(readDesktopEnv())
      });
  return instance;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchControlPlaneFlags(
  baseUrl: string,
  fetchImpl: typeof fetch = fetch
): Promise<ControlPlaneFlagPayload> {
  const response = await fetchImpl(`${baseUrl.replace(/\/$/, "")}/api/v1/flags`);
  if (!response.ok) {
    throw new Error("Control plane flags were unavailable");
  }
  return (await response.json()) as ControlPlaneFlagPayload;
}

export { completeLoopback, flagsFromControlPlane, isTauriRuntime };

function readDesktopEnv(): Record<string, string | undefined> {
  const meta = import.meta.env;
  return {
    OAUTH_MODE: meta.VITE_OAUTH_MODE,
    VITE_OAUTH_MODE: meta.VITE_OAUTH_MODE,
    GOOGLE_CLIENT_ID: meta.VITE_GOOGLE_CLIENT_ID,
    VITE_GOOGLE_CLIENT_ID: meta.VITE_GOOGLE_CLIENT_ID,
    LINKEDIN_CLIENT_ID: meta.VITE_LINKEDIN_CLIENT_ID,
    VITE_LINKEDIN_CLIENT_ID: meta.VITE_LINKEDIN_CLIENT_ID,
    META_CLIENT_ID: meta.VITE_META_CLIENT_ID,
    VITE_META_CLIENT_ID: meta.VITE_META_CLIENT_ID,
    X_CLIENT_ID: meta.VITE_X_CLIENT_ID,
    VITE_X_CLIENT_ID: meta.VITE_X_CLIENT_ID,
    OAUTH_REDIRECT_URI: meta.VITE_OAUTH_REDIRECT_URI,
    VITE_OAUTH_REDIRECT_URI: meta.VITE_OAUTH_REDIRECT_URI,
    GOOGLE_DESKTOP_REDIRECT_URI: meta.VITE_GOOGLE_DESKTOP_REDIRECT_URI
  };
}
