import { runObservedPipeline } from "@project-chief/core";
import { MemoryLedger, classifyVerification } from "@project-chief/ledger";
import { hashActionPlan, issueApproval, PermissionEngine } from "@project-chief/permissions";
import { EncryptedDatabase, MemorySecretStore } from "@project-chief/store";
import type { ActionPlan, ActionReceipt, Commitment, Person, WorkItem } from "@project-chief/types";
import { FIXTURE_OBSERVATIONS, FIXTURE_PEOPLE } from "./fixtures.js";
import { MockGoogleClient } from "./mock-google.js";

export type ConnectionId = "calendar" | "gmail";
export type ConnectionStatus = "connected" | "revoked";

export interface ChiefSnapshot {
  workItems: WorkItem[];
  commitments: Commitment[];
  plans: ActionPlan[];
  receipts: ActionReceipt[];
  people: Person[];
  briefing: string;
  connections: Record<ConnectionId, ConnectionStatus>;
  wiped: boolean;
  exportNote?: string;
}

const TOKEN_CALENDAR = "google.calendar.refresh";
const TOKEN_GMAIL = "google.gmail.refresh";

export class ChiefRuntime {
  private readonly secrets = new MemorySecretStore();
  private readonly store = new EncryptedDatabase(this.secrets);
  private readonly ledger = new MemoryLedger();
  private readonly engine = new PermissionEngine();
  private readonly google = new MockGoogleClient();
  private workItems: WorkItem[] = [];
  private commitments: Commitment[] = [];
  private plans: ActionPlan[] = [];
  private people: Person[] = FIXTURE_PEOPLE;
  private receipts: ActionReceipt[] = [];
  private briefing = "";
  private connections: Record<ConnectionId, ConnectionStatus> = {
    calendar: "connected",
    gmail: "connected"
  };
  private wiped = false;
  private exportNote: string | undefined;

  async boot(): Promise<ChiefSnapshot> {
    await this.store.open();
    await this.secrets.set(TOKEN_CALENDAR, "fixture-local-only");
    await this.secrets.set(TOKEN_GMAIL, "fixture-local-only");
    const pipeline = runObservedPipeline(FIXTURE_OBSERVATIONS);
    this.workItems = pipeline.workItems.map((item) =>
      item.status === "detected" ? { ...item, status: "needs_approval" } : item
    );
    this.commitments = pipeline.commitments;
    this.plans = pipeline.plans.map((plan) => ({
      ...plan,
      payload: { action: defaultAction(plan) }
    }));
    this.briefing = pipeline.briefing;
    this.wiped = false;
    this.exportNote = undefined;
    for (const item of this.workItems) {
      await this.store.putWorkItem(item);
    }
    for (const item of this.commitments) {
      await this.store.putCommitment(item);
    }
    return this.snapshot();
  }

  snapshot(): ChiefSnapshot {
    return {
      workItems: this.workItems,
      commitments: this.commitments,
      plans: this.plans,
      receipts: this.receipts,
      people: this.people,
      briefing: this.briefing,
      connections: this.connections,
      wiped: this.wiped,
      ...(this.exportNote ? { exportNote: this.exportNote } : {})
    };
  }

  async current(): Promise<ChiefSnapshot> {
    this.receipts = await this.ledger.list(50);
    return this.snapshot();
  }

  editAction(workItemId: string, action: string): ChiefSnapshot {
    this.plans = this.plans.map((plan) =>
      plan.workItemId === workItemId ? { ...plan, payload: { action } } : plan
    );
    return this.snapshot();
  }

  async approve(workItemId: string): Promise<ChiefSnapshot> {
    const plan = this.plans.find((item) => item.workItemId === workItemId);
    const workItem = this.workItems.find((item) => item.id === workItemId);
    if (!plan || !workItem) {
      throw new Error("Unknown work item");
    }
    this.workItems = this.workItems.map((item) =>
      item.id === workItemId ? { ...item, status: "running" } : item
    );
    const hash = await hashActionPlan(plan);
    const mutating = plan.actionType !== "email.draft";
    const approval = mutating
      ? issueApproval(plan, hash, "desktop-node", new Date().toISOString())
      : undefined;
    const decision = this.engine.authorize(plan, undefined, approval, hash);
    if (!decision.allowed) {
      const receipt = this.receipt(plan, hash, "failed", decision.reason);
      await this.ledger.append(receipt);
      await this.store.putReceipt(receipt);
      this.workItems = this.workItems.map((item) =>
        item.id === workItemId ? { ...item, status: "failed" } : item
      );
      return this.current();
    }
    if (approval) {
      this.engine.consume(approval);
    }
    const executed = await this.mutate(plan);
    const verified = await this.verify(plan, executed.id);
    const outcome = classifyVerification(verified.found, verified.matches);
    const receipt = this.receipt(plan, hash, outcome, executed.id);
    await this.ledger.append(receipt);
    await this.store.putReceipt(receipt);
    this.workItems = this.workItems.map((item) =>
      item.id === workItemId
        ? { ...item, status: outcome === "verified" ? "verified" : "failed" }
        : item
    );
    return this.current();
  }

  dismiss(workItemId: string): ChiefSnapshot {
    this.workItems = this.workItems.map((item) =>
      item.id === workItemId ? { ...item, status: "dismissed" } : item
    );
    return this.snapshot();
  }

  exportEncrypted(): ChiefSnapshot {
    const snapshot = this.store.exportSnapshot();
    this.exportNote = `Encrypted bundle v${snapshot.version} written locally. Ciphertext length ${snapshot.workItems.length}.`;
    return this.snapshot();
  }

  async revoke(id: ConnectionId): Promise<ChiefSnapshot> {
    await this.secrets.delete(id === "calendar" ? TOKEN_CALENDAR : TOKEN_GMAIL);
    this.connections = { ...this.connections, [id]: "revoked" };
    return this.snapshot();
  }

  async revokeAll(): Promise<ChiefSnapshot> {
    await this.revoke("calendar");
    return this.revoke("gmail");
  }

  async wipe(): Promise<ChiefSnapshot> {
    await this.store.wipe();
    this.workItems = [];
    this.commitments = [];
    this.plans = [];
    this.people = [];
    this.receipts = [];
    this.briefing = "";
    this.connections = { calendar: "revoked", gmail: "revoked" };
    this.wiped = true;
    this.exportNote = undefined;
    return this.current();
  }

  private receipt(
    plan: ActionPlan,
    hash: string,
    outcome: ActionReceipt["outcome"],
    detail: string
  ): ActionReceipt {
    return {
      id: `receipt-${plan.id}-${Date.now()}`,
      actionPlanId: plan.id,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      connector: plan.actionType.split(".")[0] ?? "unknown",
      outcome,
      verification: { outcome, detail },
      inputHash: hash,
      privacy: {
        externalModelUsed: false,
        purpose: plan.intent,
        categoriesSent: []
      }
    };
  }

  private mutate(plan: ActionPlan): Promise<{ id: string }> {
    const action =
      typeof plan.payload === "object" &&
      plan.payload !== null &&
      "action" in plan.payload &&
      typeof plan.payload.action === "string"
        ? plan.payload.action
        : plan.intent;
    switch (plan.actionType) {
      case "email.draft":
        return this.google.createDraft(action);
      case "email.send":
        return this.google.sendMail(action);
      case "calendar.update":
        return this.google.patchEvent("evt-1842", "2026-09-13T09:30:00.000Z");
      case "calendar.create":
      case "calendar.delete":
        return Promise.reject(new Error("Action class is not enabled in the fixture runtime"));
      default: {
        const exhaustive: never = plan.actionType;
        return Promise.reject(new Error(String(exhaustive)));
      }
    }
  }

  private async verify(
    plan: ActionPlan,
    id: string
  ): Promise<{ found: boolean; matches: boolean }> {
    switch (plan.actionType) {
      case "email.draft":
        return { found: this.google.drafts.some((item) => item.id === id), matches: true };
      case "email.send":
        return { found: this.google.sent.some((item) => item.id === id), matches: true };
      case "calendar.update": {
        const events = await this.google.listEvents();
        const hold = events.find((item) => item.id === "evt-1842");
        return { found: Boolean(hold), matches: hold?.end === "2026-09-13T09:30:00.000Z" };
      }
      case "calendar.create":
      case "calendar.delete":
        return { found: false, matches: false };
      default: {
        const exhaustive: never = plan.actionType;
        return exhaustive;
      }
    }
  }
}

function defaultAction(plan: ActionPlan): string {
  switch (plan.actionType) {
    case "email.draft":
      return "Prepare a follow-up draft to Jordan";
    case "email.send":
      return "Send the prepared reply";
    case "calendar.update":
      return "Shorten the 09:30 hold by 30 minutes";
    case "calendar.create":
      return "Create the hold";
    case "calendar.delete":
      return "Remove the hold";
    default: {
      const exhaustive: never = plan.actionType;
      return exhaustive;
    }
  }
}
