export interface RuntimeFlags {
  mutationsEnabled: boolean;
  billingEnabled: boolean;
  socialOAuthEnabled: boolean;
  modelRouteEnabled: boolean;
  killSwitch: boolean;
}

export const DEFAULT_FLAGS: RuntimeFlags = {
  mutationsEnabled: true,
  billingEnabled: true,
  socialOAuthEnabled: true,
  modelRouteEnabled: true,
  killSwitch: false
};

export interface ControlPlaneFlagPayload {
  mutations_enabled?: unknown;
  billing_enabled?: unknown;
  social_oauth_enabled?: unknown;
  model_route_enabled?: unknown;
  kill_switch?: unknown;
}

export function flagsFromControlPlane(payload: ControlPlaneFlagPayload): RuntimeFlags {
  return {
    mutationsEnabled: payload.mutations_enabled !== false,
    billingEnabled: payload.billing_enabled !== false,
    socialOAuthEnabled: payload.social_oauth_enabled !== false,
    modelRouteEnabled: payload.model_route_enabled !== false,
    killSwitch: payload.kill_switch === true
  };
}

export interface DiagnosticBundle {
  version: string;
  oauthMode: "fixture" | "live";
  flags: RuntimeFlags;
  connections: Record<string, string>;
  workItemCount: number;
  receiptCount: number;
  wiped: boolean;
  storeCorrupt: boolean;
  online: boolean;
  onboardingComplete: boolean;
}

export function assertDiagnosticsAreContentFree(bundle: DiagnosticBundle): void {
  const serialized = JSON.stringify(bundle).toLowerCase();
  const markers = [
    "refresh token",
    "access token",
    "ya29.",
    "1//",
    "bearer ",
    "email body",
    "prompt"
  ];
  for (const marker of markers) {
    if (serialized.includes(marker)) {
      throw new Error(`Diagnostic bundle leaked ${marker}`);
    }
  }
}
