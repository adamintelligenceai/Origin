import { describe, expect, it } from "vitest";
import type { WorkItem } from "@project-chief/types";
import { decryptJson, encryptJson, generateDatabaseKey } from "./crypto.js";
import { EncryptedDatabase, createMemoryLog } from "./database.js";
import { MemorySecretStore } from "./secrets.js";

const item: WorkItem = {
  id: "work-1",
  kind: "follow_up",
  title: "Ask Jordan for the proposal",
  urgency: 0.8,
  importance: 0.7,
  confidence: 0.86,
  status: "needs_approval",
  sourceRefs: [
    {
      sourceId: "src-1",
      provider: "gmail",
      providerId: "msg-1",
      contentHash: "abc"
    }
  ]
};

describe("encrypted store", () => {
  it("keeps snapshots unreadable without the key", async () => {
    const db = new EncryptedDatabase(new MemorySecretStore());
    await db.open();
    await db.putWorkItem(item);
    const snapshot = db.exportSnapshot();
    expect(snapshot.workItems.includes("Ask Jordan")).toBe(false);
    expect(() => decryptJson(generateDatabaseKey(), snapshot.workItems)).toThrow();
  });

  it("round-trips records through the envelope", () => {
    const key = generateDatabaseKey();
    const encoded = encryptJson(key, item);
    expect((decryptJson(key, encoded) as WorkItem).title).toBe(item.title);
  });

  it("never writes private content into ordinary logs", async () => {
    const log = createMemoryLog();
    const db = new EncryptedDatabase(new MemorySecretStore(), log);
    await db.open();
    await db.putWorkItem(item);
    db.assertLogsAreContentFree();
    expect(log.lines.join(" ")).not.toContain("Ask Jordan");
  });

  it("wipes records and the database key", async () => {
    const secrets = new MemorySecretStore();
    const db = new EncryptedDatabase(secrets);
    await db.open();
    await db.putWorkItem(item);
    await db.wipe();
    expect(await db.listWorkItems()).toEqual([]);
    expect(await secrets.get("project-chief.db-key")).toBeUndefined();
  });
});
