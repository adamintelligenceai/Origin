import type { PrivacyReceipt } from "@project-chief/types";

export type DataCategory =
  "email_excerpt" | "calendar_availability" | "document_excerpt" | "user_preference" | "public_web";

export interface PrivacyRequest {
  purpose: string;
  requested: DataCategory[];
  allowed: DataCategory[];
  provider?: string;
}

export function authorizeExternalContext(req: PrivacyRequest): PrivacyReceipt {
  const denied = req.requested.filter((x) => !req.allowed.includes(x));
  if (denied.length) {
    throw new Error(`Privacy policy denied categories: ${denied.join(", ")}`);
  }

  return {
    externalModelUsed: Boolean(req.provider),
    ...(req.provider ? { provider: req.provider } : {}),
    purpose: req.purpose,
    categoriesSent: [...req.requested]
  };
}

export function minimiseText(text: string, maxChars = 6000): string {
  // Placeholder only. Cursor Phase 6 must replace this with task-bounded
  // context selection + explicit redaction/pseudonymisation rules.
  return text.slice(0, maxChars);
}
