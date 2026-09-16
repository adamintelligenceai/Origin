import type { EncryptedSnapshot } from "./database.js";

export interface SnapshotStore {
  load(): Promise<EncryptedSnapshot | undefined>;
  save(snapshot: EncryptedSnapshot): Promise<void>;
  clear(): Promise<void>;
}

export class MemorySnapshotStore implements SnapshotStore {
  private snapshot: EncryptedSnapshot | undefined;

  load(): Promise<EncryptedSnapshot | undefined> {
    return Promise.resolve(this.snapshot);
  }

  save(snapshot: EncryptedSnapshot): Promise<void> {
    this.snapshot = snapshot;
    return Promise.resolve();
  }

  clear(): Promise<void> {
    this.snapshot = undefined;
    return Promise.resolve();
  }
}

export class BridgeSnapshotStore implements SnapshotStore {
  constructor(private readonly bridge: SnapshotStore) {}

  load(): Promise<EncryptedSnapshot | undefined> {
    return this.bridge.load();
  }

  save(snapshot: EncryptedSnapshot): Promise<void> {
    return this.bridge.save(snapshot);
  }

  clear(): Promise<void> {
    return this.bridge.clear();
  }
}
