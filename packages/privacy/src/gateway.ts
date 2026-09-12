import type { PrivacyReceipt } from "@project-chief/types";
import { authorizeExternalContext, type DataCategory, type PrivacyRequest } from "./authorize.js";

export interface PrivacyGatewayInput {
  purpose: string;
  text: string;
  requested: DataCategory[];
  allowed: DataCategory[];
  sensitivity: "low" | "medium" | "high";
  maxChars: number;
  provider?: string;
  identities?: Record<string, string>;
}

export interface PrivacyGatewayResult {
  text: string;
  receipt: PrivacyReceipt;
}

const IDENTITY_PATTERN = /[A-Z][a-z]+ [A-Z][a-z]+/g;

export function minimiseContext(text: string, maxChars: number): string {
  return text.replace(/\s+/g, " ").trim().slice(0, maxChars);
}

export function pseudonymise(text: string, identities: Record<string, string> = {}): string {
  let next = text;
  for (const [name, alias] of Object.entries(identities)) {
    next = next.split(name).join(alias);
  }
  let counter = 1;
  return next.replace(IDENTITY_PATTERN, (match) => {
    if (identities[match]) {
      return identities[match];
    }
    const alias = `Person-${counter}`;
    counter += 1;
    return alias;
  });
}

export function prepareExternalContext(input: PrivacyGatewayInput): PrivacyGatewayResult {
  const request: PrivacyRequest = {
    purpose: input.purpose,
    requested: input.requested,
    allowed: input.allowed,
    ...(input.provider ? { provider: input.provider } : {})
  };
  const receipt = authorizeExternalContext(request);
  const reduced = minimiseContext(pseudonymise(input.text, input.identities), input.maxChars);
  return { text: reduced, receipt };
}
