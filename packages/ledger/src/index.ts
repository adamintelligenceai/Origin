import type { ActionReceipt } from "@project-chief/types";

export interface LedgerStore {
  append(receipt: ActionReceipt): Promise<void>;
  list(limit?: number): Promise<ActionReceipt[]>;
}

export class MemoryLedger implements LedgerStore {
  private readonly receipts: ActionReceipt[] = [];

  append(receipt: ActionReceipt): Promise<void> {
    this.receipts.unshift(receipt);
    return Promise.resolve();
  }

  list(limit = 50): Promise<ActionReceipt[]> {
    return Promise.resolve(this.receipts.slice(0, limit));
  }
}

export function assertVerified(receipt: ActionReceipt): void {
  if (receipt.outcome !== "verified") {
    throw new Error("Action is not verified");
  }
}

export function classifyVerification(
  found: boolean,
  expectedMatched: boolean
): ActionReceipt["outcome"] {
  if (found && expectedMatched) {
    return "verified";
  }
  if (!found) {
    return "failed";
  }
  return "partial";
}
