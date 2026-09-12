import type { ActionReceipt } from "@project-chief/types";

export interface LedgerStore {
  append(receipt: ActionReceipt): Promise<void>;
  list(limit?: number): Promise<ActionReceipt[]>;
}

export function assertVerified(receipt: ActionReceipt): void {
  if (receipt.outcome !== "verified") {
    throw new Error("Action is not verified");
  }
}
