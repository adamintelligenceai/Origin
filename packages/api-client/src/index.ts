export interface LicenceEntitlements {
  plan: "scan" | "founding_scan" | "monitor" | "none";
  canRunScan: boolean;
  canExportReports: boolean;
  canUseAiCommentary: boolean;
  methodVersion: string;
  configVersion: string;
}

export interface LicenceResponse {
  token: string;
  expiresAt: string;
  entitlements: LicenceEntitlements;
}

export interface HeadlineConsentPayload {
  detectedLeakage: string | null;
  modelledOpportunity: string | null;
  consented: boolean;
}

export const DEFAULT_HEADLINE_CONSENT = false;
