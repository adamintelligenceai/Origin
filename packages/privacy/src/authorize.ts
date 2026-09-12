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
  const denied = req.requested.filter((category) => !req.allowed.includes(category));
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
