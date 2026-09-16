import { invoke } from "@tauri-apps/api/core";
import {
  BridgeSecretStore,
  type EncryptedSnapshot,
  type SecretStore,
  type SnapshotStore
} from "@project-chief/store";

export function isTauriRuntime(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

export function createTauriSecretStore(): SecretStore {
  return new BridgeSecretStore({
    async get(name: string) {
      const value = await invoke<string | null>("vault_get", { name });
      return value ?? undefined;
    },
    async set(name: string, value: string) {
      await invoke("vault_set", { name, value });
    },
    async delete(name: string) {
      await invoke("vault_delete", { name });
    }
  });
}

export function createTauriSnapshotStore(): SnapshotStore {
  return {
    async load() {
      const raw = await invoke<string | null>("snapshot_load");
      if (!raw) {
        return undefined;
      }
      return parseSnapshot(raw);
    },
    async save(snapshot: EncryptedSnapshot) {
      await invoke("snapshot_save", { snapshot: JSON.stringify(snapshot) });
    },
    async clear() {
      await invoke("snapshot_clear");
    }
  };
}

export async function completeLoopback(
  expectedState: string,
  port: number
): Promise<{ code: string; state: string }> {
  return invoke("oauth_loopback", { expectedState, port });
}

function parseSnapshot(raw: string): EncryptedSnapshot {
  const parsed: unknown = JSON.parse(raw);
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("version" in parsed) ||
    !("workItems" in parsed) ||
    !("commitments" in parsed) ||
    !("receipts" in parsed)
  ) {
    throw new Error("Encrypted snapshot was unreadable");
  }
  if (
    typeof parsed.version !== "number" ||
    typeof parsed.workItems !== "string" ||
    typeof parsed.commitments !== "string" ||
    typeof parsed.receipts !== "string"
  ) {
    throw new Error("Encrypted snapshot was unreadable");
  }
  return {
    version: parsed.version,
    workItems: parsed.workItems,
    commitments: parsed.commitments,
    receipts: parsed.receipts
  };
}
