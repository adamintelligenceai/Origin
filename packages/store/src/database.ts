import type { ActionReceipt, Commitment, WorkItem } from "@project-chief/types";
import { decodeKey, decryptJson, encodeKey, encryptJson, generateDatabaseKey } from "./crypto.js";
import { MemorySnapshotStore, type SnapshotStore } from "./persist.js";
import { DATABASE_KEY_NAME, type SecretStore } from "./secrets.js";

export interface EncryptedSnapshot {
  version: number;
  workItems: string;
  commitments: string;
  receipts: string;
}

export interface StoreLog {
  lines: string[];
  write(line: string): void;
}

export function createMemoryLog(): StoreLog {
  const lines: string[] = [];
  return {
    lines,
    write(line: string) {
      lines.push(line);
    }
  };
}

const SENSITIVE_MARKERS = [
  "email body",
  "calendar title",
  "oauth",
  "refresh token",
  "private key",
  "prompt",
  "model response"
];

export class EncryptedDatabase {
  private key: Uint8Array | undefined;
  private workItems = new Map<string, WorkItem>();
  private commitments = new Map<string, Commitment>();
  private receipts = new Map<string, ActionReceipt>();

  constructor(
    private readonly secrets: SecretStore,
    private readonly log: StoreLog = createMemoryLog(),
    private readonly snapshots: SnapshotStore = new MemorySnapshotStore()
  ) {}

  async open(): Promise<void> {
    const existing = await this.secrets.get(DATABASE_KEY_NAME);
    if (existing) {
      this.key = decodeKey(existing);
      this.log.write("opened encrypted store");
      await this.restore();
      return;
    }
    this.key = generateDatabaseKey();
    await this.secrets.set(DATABASE_KEY_NAME, encodeKey(this.key));
    this.log.write("generated local database key");
    await this.restore();
  }

  private async restore(): Promise<void> {
    const snapshot = await this.snapshots.load();
    if (!snapshot) {
      return;
    }
    try {
      this.importSnapshot(snapshot);
      this.log.write("restored encrypted snapshot");
    } catch {
      throw new Error("Encrypted store could not be opened");
    }
  }

  persist(): Promise<void> {
    if (!this.key) {
      return Promise.resolve();
    }
    return this.snapshots.save(this.exportSnapshot());
  }

  private requireKey(): Uint8Array {
    if (!this.key) {
      throw new Error("Encrypted store is closed");
    }
    return this.key;
  }

  async putWorkItem(item: WorkItem): Promise<void> {
    this.workItems.set(item.id, item);
    this.log.write(`stored work item ${item.id}`);
    await this.persist();
  }

  listWorkItems(): Promise<WorkItem[]> {
    return Promise.resolve([...this.workItems.values()]);
  }

  async putCommitment(item: Commitment): Promise<void> {
    this.commitments.set(item.id, item);
    this.log.write(`stored commitment ${item.id}`);
    await this.persist();
  }

  listCommitments(): Promise<Commitment[]> {
    return Promise.resolve([...this.commitments.values()]);
  }

  async putReceipt(item: ActionReceipt): Promise<void> {
    this.receipts.set(item.id, item);
    this.log.write(`stored receipt ${item.id}`);
    await this.persist();
  }

  listReceipts(): Promise<ActionReceipt[]> {
    return Promise.resolve([...this.receipts.values()]);
  }

  exportSnapshot(): EncryptedSnapshot {
    const key = this.requireKey();
    return {
      version: 1,
      workItems: encryptJson(key, [...this.workItems.values()]),
      commitments: encryptJson(key, [...this.commitments.values()]),
      receipts: encryptJson(key, [...this.receipts.values()])
    };
  }

  importSnapshot(snapshot: EncryptedSnapshot): void {
    const key = this.requireKey();
    this.workItems = new Map(
      (decryptJson(key, snapshot.workItems) as WorkItem[]).map((item) => [item.id, item])
    );
    this.commitments = new Map(
      (decryptJson(key, snapshot.commitments) as Commitment[]).map((item) => [item.id, item])
    );
    this.receipts = new Map(
      (decryptJson(key, snapshot.receipts) as ActionReceipt[]).map((item) => [item.id, item])
    );
  }

  async wipe(): Promise<void> {
    this.workItems.clear();
    this.commitments.clear();
    this.receipts.clear();
    this.key = undefined;
    await this.secrets.delete(DATABASE_KEY_NAME);
    await this.snapshots.clear();
    this.log.write("secure wipe completed");
  }

  assertLogsAreContentFree(): void {
    for (const line of this.log.lines) {
      const lowered = line.toLowerCase();
      for (const marker of SENSITIVE_MARKERS) {
        if (lowered.includes(marker)) {
          throw new Error(`Sensitive content leaked into store logs: ${marker}`);
        }
      }
    }
  }
}
