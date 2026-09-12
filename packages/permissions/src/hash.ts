import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import type { ActionPlan } from "@project-chief/types";

export function canonicalize(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(([left], [right]) =>
      left.localeCompare(right)
    );
    return Object.fromEntries(entries.map(([key, nested]) => [key, sortValue(nested)]));
  }
  return value;
}

export function hashActionPlanSync(plan: ActionPlan): string {
  return bytesToHex(sha256(new TextEncoder().encode(canonicalize(plan))));
}

export function hashActionPlan(plan: ActionPlan): Promise<string> {
  return Promise.resolve(hashActionPlanSync(plan));
}

export function approvalTokenId(actionPlanId: string, actionHash: string): string {
  return `${actionPlanId}:${actionHash}`;
}
