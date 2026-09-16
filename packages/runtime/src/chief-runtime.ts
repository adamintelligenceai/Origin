import {
  authorizationUrl as googleAuthorizationUrl,
  createPkceChallenge as createGooglePkce,
  exchangeAuthorizationCode as exchangeGoogleCode,
  isGoogleWorkNetwork,
  persistRefreshToken as persistGoogleRefresh,
  refreshAccessToken as refreshGoogleToken,
  scopesFor,
  type PkceChallenge as GooglePkce
} from "@project-chief/connectors-google";
import {
  authorizationUrl as socialAuthorizationUrl,
  createPkceChallenge as createSocialPkce,
  exchangeAuthorizationCode as exchangeSocialCode,
  isSocialNetwork,
  persistRefreshToken as persistSocialRefresh,
  refreshAccessToken as refreshSocialToken,
  type PkceChallenge as SocialPkce
} from "@project-chief/connectors-social";
import { runObservedPipeline, type NormalizedObservation } from "@project-chief/core";
import { MemoryLedger, classifyVerification } from "@project-chief/ledger";
import { hashActionPlan, issueApproval, PermissionEngine } from "@project-chief/permissions";
import {
  EncryptedDatabase,
  INITIALIZED_KEY_NAME,
  MemorySecretStore,
  MemorySnapshotStore,
  ONBOARDING_KEY_NAME,
  createMemoryLog,
  type SecretStore,
  type SnapshotStore
} from "@project-chief/store";
import type { ActionPlan, ActionReceipt, Commitment, Person, WorkItem } from "@project-chief/types";
import {
  connectionIds,
  fixtureConnections,
  revokedConnections,
  tokenName,
  type ConnectionId,
  type ConnectionStatus
} from "./connections.js";
import {
  DEFAULT_FLAGS,
  assertDiagnosticsAreContentFree,
  type DiagnosticBundle,
  type RuntimeFlags
} from "./flags.js";
import { FIXTURE_OBSERVATIONS, FIXTURE_PEOPLE, FIXTURE_ROUTINES } from "./fixtures.js";
import { MockGoogleClient } from "./mock-google.js";
import {
  defaultOAuthConfig,
  isOAuthConnection,
  requireClientId,
  type OAuthConfig
} from "./oauth.js";
import { observationAllowed } from "./sources.js";

export type FetchLike = (
  input: string,
  init: { method: string; headers: Record<string, string>; body: string }
) => Promise<Response>;

export interface ChiefRuntimeOptions {
  secrets?: SecretStore;
  snapshots?: SnapshotStore;
  oauth?: OAuthConfig;
  flags?: RuntimeFlags;
  fetchImpl?: FetchLike;
  onboardingComplete?: boolean;
}

type OAuthPkce = GooglePkce | SocialPkce;

export interface MeetingView {
  id: string;
  title: string;
  when: string;
  conflict?: string;
}

export interface MeetingPrepView {
  eventTitle: string;
  when: string;
  attendees: string[];
  documents: string[];
}

export interface WrittenRoutine {
  id: string;
  title: string;
  trigger: string;
  writtenBy: "You";
  status: "active" | "paused";
}

export interface ChiefSnapshot {
  workItems: WorkItem[];
  commitments: Commitment[];
  plans: ActionPlan[];
  receipts: ActionReceipt[];
  people: Person[];
  meetings: MeetingView[];
  meetingPrep: MeetingPrepView[];
  routines: WrittenRoutine[];
  briefing: string;
  timeSavedMinutes: number;
  connections: Record<ConnectionId, ConnectionStatus>;
  wiped: boolean;
  exportNote?: string;
  oauthMode: OAuthConfig["mode"];
  flags: RuntimeFlags;
  onboardingComplete: boolean;
  companionCode?: string;
  online: boolean;
  storeCorrupt: boolean;
}

export class ChiefRuntime {
  private readonly secrets: SecretStore;
  private readonly store: EncryptedDatabase;
  private readonly ledger = new MemoryLedger();
  private readonly engine = new PermissionEngine();
  private readonly google = new MockGoogleClient();
  private readonly oauth: OAuthConfig;
  private readonly fetchImpl: FetchLike;
  private flags: RuntimeFlags;
  private workItems: WorkItem[] = [];
  private commitments: Commitment[] = [];
  private plans: ActionPlan[] = [];
  private people: Person[] = FIXTURE_PEOPLE;
  private receipts: ActionReceipt[] = [];
  private routines: WrittenRoutine[] = FIXTURE_ROUTINES;
  private briefing = "";
  private connections: Record<ConnectionId, ConnectionStatus> = fixtureConnections();
  private wiped = false;
  private exportNote: string | undefined;
  private readonly oauthChallenges = new Map<ConnectionId, OAuthPkce>();
  private onboardingComplete: boolean;
  private companionCode: string | undefined;
  private online = true;
  private storeCorrupt = false;

  constructor(options: ChiefRuntimeOptions = {}) {
    this.secrets = options.secrets ?? new MemorySecretStore();
    this.store = new EncryptedDatabase(
      this.secrets,
      createMemoryLog(),
      options.snapshots ?? new MemorySnapshotStore()
    );
    this.oauth = options.oauth ?? defaultOAuthConfig();
    this.flags = options.flags ?? { ...DEFAULT_FLAGS };
    this.fetchImpl =
      options.fetchImpl ?? ((input, init) => fetch(input, init));
    this.onboardingComplete = options.onboardingComplete ?? true;
  }

  async boot(): Promise<ChiefSnapshot> {
    try {
      await this.store.open();
    } catch {
      this.storeCorrupt = true;
      this.exportNote = "Local store could not be opened. The key never left this device.";
      return this.snapshot();
    }
    const accepted = await this.secrets.get(ONBOARDING_KEY_NAME);
    if (accepted === "accepted") {
      this.onboardingComplete = true;
    }
    const initialized = await this.secrets.get(INITIALIZED_KEY_NAME);
    if (initialized) {
      this.connections = await this.connectionsFromVault();
    } else {
      this.connections = fixtureConnections();
      await this.writeConnectedTokens();
      await this.secrets.set(INITIALIZED_KEY_NAME, "1");
    }
    this.people = FIXTURE_PEOPLE;
    this.routines = FIXTURE_ROUTINES;
    this.wiped = false;
    this.storeCorrupt = false;
    if (!this.exportNote?.startsWith("Local store could not")) {
      this.exportNote = undefined;
    }
    this.ingest();
    const storedItems = await this.store.listWorkItems();
    if (storedItems.length > 0) {
      const previous = new Map(storedItems.map((item) => [item.id, item]));
      this.workItems = this.workItems.map((item) => {
        const prior = previous.get(item.id);
        return prior ? { ...item, status: prior.status } : item;
      });
    }
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
      meetings: this.meetingsFromEvents(),
      meetingPrep: this.meetingPrepFromEvents(),
      routines: this.routines,
      briefing: this.briefing,
      timeSavedMinutes: minutesSaved(this.receipts, this.plans),
      connections: this.connections,
      wiped: this.wiped,
      oauthMode: this.oauth.mode,
      flags: this.flags,
      onboardingComplete: this.onboardingComplete,
      online: this.online,
      storeCorrupt: this.storeCorrupt,
      ...(this.companionCode ? { companionCode: this.companionCode } : {}),
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
    if (this.flags.killSwitch || !this.flags.mutationsEnabled) {
      throw new Error("Mutations are paused by the control plane.");
    }
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
    await this.secrets.delete(tokenName(id));
    await this.secrets.delete(accessTokenName(id));
    this.oauthChallenges.delete(id);
    this.connections = { ...this.connections, [id]: "revoked" };
    this.ingest();
    return this.snapshot();
  }

  beginOAuth(id: ConnectionId): { url: string; host: string; state: string } {
    if (!isOAuthConnection(id)) {
      throw new Error(`Local OAuth is not defined for ${id}`);
    }
    if (isSocialNetwork(id) && !this.flags.socialOAuthEnabled) {
      throw new Error("Social OAuth is paused by the control plane.");
    }
    const clientId = requireClientId(id, this.oauth);
    if (isGoogleWorkNetwork(id)) {
      const pkce = createGooglePkce();
      this.oauthChallenges.set(id, pkce);
      const url = googleAuthorizationUrl(
        clientId,
        this.oauth.redirectUri,
        scopesFor(id),
        pkce
      );
      return { url, host: new URL(url).host, state: pkce.state };
    }
    if (!isSocialNetwork(id)) {
      throw new Error(`Local OAuth is not defined for ${id}`);
    }
    const pkce = createSocialPkce();
    this.oauthChallenges.set(id, pkce);
    const url = socialAuthorizationUrl(id, clientId, this.oauth.redirectUri, pkce);
    return { url, host: new URL(url).host, state: pkce.state };
  }

  async completeOAuth(
    id: ConnectionId,
    callback: { code: string; state: string }
  ): Promise<ChiefSnapshot> {
    if (!isOAuthConnection(id)) {
      throw new Error(`Local OAuth is not defined for ${id}`);
    }
    const pkce = this.oauthChallenges.get(id);
    if (pkce?.state !== callback.state) {
      throw new Error("OAuth state did not match the local challenge");
    }
    this.oauthChallenges.delete(id);
    if (this.oauth.mode === "fixture" || callback.code.startsWith("fixture")) {
      await this.persistFixtureToken(id, pkce.state);
      this.connections = { ...this.connections, [id]: "connected" };
      this.ingest();
      return this.snapshot();
    }
    const clientId = requireClientId(id, this.oauth);
    const tokens = isGoogleWorkNetwork(id)
      ? await exchangeGoogleCode(
          clientId,
          this.oauth.redirectUri,
          callback.code,
          pkce.verifier,
          this.fetchImpl
        )
      : isSocialNetwork(id)
        ? await exchangeSocialCode(
            id,
            clientId,
            this.oauth.redirectUri,
            callback.code,
            pkce.verifier,
            this.fetchImpl
          )
        : undefined;
    if (!tokens) {
      throw new Error(`Local OAuth is not defined for ${id}`);
    }
    await this.persistLiveTokens(id, tokens.refreshToken, tokens.accessToken);
    this.connections = { ...this.connections, [id]: "connected" };
    this.ingest();
    return this.snapshot();
  }

  async refresh(id: ConnectionId): Promise<ChiefSnapshot> {
    if (!isOAuthConnection(id)) {
      throw new Error(`Token refresh is not defined for ${id}`);
    }
    if (this.oauth.mode === "fixture") {
      return this.snapshot();
    }
    const stored = await this.secrets.get(tokenName(id));
    if (!stored) {
      throw new Error("No refresh token in the local vault");
    }
    const clientId = requireClientId(id, this.oauth);
    try {
      const tokens = isGoogleWorkNetwork(id)
        ? await refreshGoogleToken(clientId, stored, this.fetchImpl)
        : isSocialNetwork(id)
          ? await refreshSocialToken(id, clientId, stored, this.fetchImpl)
          : undefined;
      if (!tokens) {
        throw new Error(`Token refresh is not defined for ${id}`);
      }
      await this.persistLiveTokens(id, tokens.refreshToken, tokens.accessToken);
      return this.snapshot();
    } catch (caught) {
      if (caught instanceof Error && caught.message === "invalid_grant") {
        await this.secrets.delete(tokenName(id));
        await this.secrets.delete(accessTokenName(id));
        this.connections = { ...this.connections, [id]: "revoked" };
        this.ingest();
        return this.snapshot();
      }
      throw caught;
    }
  }

  async pair(id: ConnectionId): Promise<ChiefSnapshot> {
    if (isOAuthConnection(id) && this.oauth.mode === "live") {
      throw new Error("Live OAuth must complete the loopback code exchange");
    }
    if (isOAuthConnection(id)) {
      const session = this.oauthChallenges.get(id) ?? createSocialPkce();
      this.oauthChallenges.delete(id);
      await this.persistFixtureToken(id, session.state);
    } else {
      this.companionCode = this.companionCode ?? createCompanionCode();
      await this.secrets.set(tokenName(id), `companion-${this.companionCode}`);
    }
    this.connections = { ...this.connections, [id]: "connected" };
    this.ingest();
    return this.snapshot();
  }

  async acceptOnboarding(): Promise<ChiefSnapshot> {
    await this.secrets.set(ONBOARDING_KEY_NAME, "accepted");
    this.onboardingComplete = true;
    return this.snapshot();
  }

  applyFlags(flags: RuntimeFlags): ChiefSnapshot {
    this.flags = flags;
    return this.snapshot();
  }

  setOnline(online: boolean): ChiefSnapshot {
    this.online = online;
    return this.snapshot();
  }

  diagnostics(): DiagnosticBundle {
    const bundle: DiagnosticBundle = {
      version: "0.0.1",
      oauthMode: this.oauth.mode,
      flags: this.flags,
      connections: { ...this.connections },
      workItemCount: this.workItems.length,
      receiptCount: this.receipts.length,
      wiped: this.wiped,
      storeCorrupt: this.storeCorrupt,
      online: this.online,
      onboardingComplete: this.onboardingComplete
    };
    assertDiagnosticsAreContentFree(bundle);
    return bundle;
  }

  async revokeAll(): Promise<ChiefSnapshot> {
    for (const id of connectionIds()) {
      await this.secrets.delete(tokenName(id));
      await this.secrets.delete(accessTokenName(id));
      this.oauthChallenges.delete(id);
    }
    this.connections = revokedConnections();
    this.ingest();
    return this.snapshot();
  }

  async wipe(): Promise<ChiefSnapshot> {
    await this.store.wipe();
    this.workItems = [];
    this.commitments = [];
    this.plans = [];
    this.people = [];
    this.receipts = [];
    this.routines = [];
    this.briefing = "";
    this.google.reset();
    await this.revokeAll();
    await this.secrets.delete(ONBOARDING_KEY_NAME);
    this.companionCode = undefined;
    this.wiped = true;
    this.exportNote = undefined;
    return this.current();
  }

  async reverse(receiptId: string): Promise<ChiefSnapshot> {
    const existing = this.receipts.find((item) => item.id === receiptId);
    const plan = this.plans.find((item) => item.id === existing?.actionPlanId);
    if (!existing || !plan || existing.outcome !== "verified") {
      throw new Error("Nothing reversible");
    }
    const detail =
      typeof existing.verification.detail === "string" ? existing.verification.detail : "";
    await this.undoMutation(plan, detail);
    const receipt = this.receipt(plan, existing.inputHash, "reversed", detail);
    await this.ledger.append(receipt);
    await this.store.putReceipt(receipt);
    this.workItems = this.workItems.map((item) =>
      item.id === plan.workItemId ? { ...item, status: "needs_approval" } : item
    );
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

  private meetingPrepFromEvents(): MeetingPrepView[] {
    return this.google.events
      .filter((event) => !event.title.toLowerCase().includes("hold"))
      .map((event) => ({
        eventTitle: event.title,
        when: formatMeetingWhen(event.start),
        attendees: attendeesFor(event.title, this.people),
        documents: ["Board pack", "Last proposal draft", "Amina's notes"]
      }));
  }

  private meetingsFromEvents(): MeetingView[] {
    return this.google.events.map((event) => {
      const overlap = this.google.events.find(
        (other) =>
          other.id !== event.id && rangesOverlap(event.start, event.end, other.start, other.end)
      );
      return {
        id: event.id,
        title: event.title,
        when: formatMeetingWhen(event.start),
        ...(overlap ? { conflict: `Overlaps ${overlap.title}` } : {})
      };
    });
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

  private ingest(): void {
    const observations = FIXTURE_OBSERVATIONS.filter((item) =>
      observationAllowed(item, this.connections)
    );
    const pipeline = runObservedPipeline(observations);
    const previous = new Map(this.workItems.map((item) => [item.id, item]));
    this.workItems = pipeline.workItems.map((item) => {
      const prior = previous.get(item.id);
      if (
        prior &&
        (prior.status === "verified" ||
          prior.status === "dismissed" ||
          prior.status === "failed" ||
          prior.status === "running")
      ) {
        return { ...item, status: prior.status };
      }
      return item.status === "detected" ? { ...item, status: "needs_approval" } : item;
    });
    this.commitments = attachCounterparties(
      pipeline.commitments,
      this.people,
      pipeline.observations
    );
    this.plans = pipeline.plans.map((plan) => ({
      ...plan,
      payload: {
        action: defaultAction(
          plan,
          this.workItems.find((item) => item.id === plan.workItemId)
        )
      }
    }));
    this.briefing = pipeline.briefing;
  }

  private async writeConnectedTokens(): Promise<void> {
    for (const id of connectionIds()) {
      if (this.connections[id] === "connected") {
        await this.secrets.set(tokenName(id), "fixture-local-only");
      }
    }
  }

  private async persistFixtureToken(id: ConnectionId, state: string): Promise<void> {
    const token = `local-${id}-${state}`;
    if (isGoogleWorkNetwork(id)) {
      await persistGoogleRefresh(this.secrets, tokenName(id), token);
      return;
    }
    if (isSocialNetwork(id)) {
      await persistSocialRefresh(this.secrets, tokenName(id), token);
      return;
    }
    await this.secrets.set(tokenName(id), token);
  }

  private async persistLiveTokens(
    id: ConnectionId,
    refreshToken: string,
    accessToken: string
  ): Promise<void> {
    if (isGoogleWorkNetwork(id)) {
      await persistGoogleRefresh(this.secrets, tokenName(id), refreshToken);
    } else if (isSocialNetwork(id)) {
      await persistSocialRefresh(this.secrets, tokenName(id), refreshToken);
    } else {
      await this.secrets.set(tokenName(id), refreshToken);
    }
    await this.secrets.set(accessTokenName(id), accessToken);
  }

  private async connectionsFromVault(): Promise<Record<ConnectionId, ConnectionStatus>> {
    const next = { ...revokedConnections() };
    for (const id of connectionIds()) {
      const token = await this.secrets.get(tokenName(id));
      if (token) {
        next[id] = "connected";
      } else if (id === "drive") {
        next[id] = "available";
      }
    }
    return next;
  }

  private undoMutation(plan: ActionPlan, id: string): Promise<void> {
    switch (plan.actionType) {
      case "email.draft":
        this.google.removeDraft(id);
        return Promise.resolve();
      case "email.send":
        this.google.removeSent(id);
        return Promise.resolve();
      case "calendar.update":
        return this.google.restoreEvent("evt-1842").then(() => undefined);
      case "calendar.create":
      case "calendar.delete":
        return Promise.reject(new Error("Action class is not enabled in the fixture runtime"));
      default: {
        const exhaustive: never = plan.actionType;
        return Promise.reject(new Error(String(exhaustive)));
      }
    }
  }
}

function rangesOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
  return startA < endA && startB < endB && startA < endB && startB < endA;
}

function formatMeetingWhen(iso: string): string {
  const date = new Date(iso);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `Tomorrow ${hours}:${minutes}`;
}

function defaultAction(plan: ActionPlan, item: WorkItem | undefined): string {
  const provider = item?.sourceRefs[0]?.provider;
  if (item?.kind === "missed_call") {
    return "Prepare a callback to Amina";
  }
  if (item?.kind === "meeting_prep") {
    return "Assemble the board pack, last proposal, and Amina's notes";
  }
  if (item?.kind === "commitment") {
    return "Prepare the promised board pack";
  }
  if (provider === "sms") {
    return "Prepare a text reply to Jordan";
  }
  if (provider === "linkedin") {
    return "Prepare a LinkedIn reply to Chris";
  }
  if (provider === "x" || provider === "instagram" || provider === "facebook") {
    return "Hold the public reply. Do not post.";
  }
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

function attachCounterparties(
  commitments: Commitment[],
  people: Person[],
  observations: readonly NormalizedObservation[]
): Commitment[] {
  return commitments.map((item) => {
    if (item.counterpartyId) {
      return item;
    }
    const observation = observations.find((entry) => entry.id === item.sourceRefs[0]?.sourceId);
    const haystack =
      `${item.statement} ${observation?.title ?? ""} ${observation?.participants.join(" ") ?? ""}`.toLowerCase();
    const match = people.find(
      (person) =>
        haystack.includes(person.displayName.toLowerCase()) ||
        person.aliases.some((alias) => haystack.includes(alias.toLowerCase()))
    );
    return match ? { ...item, counterpartyId: match.id } : item;
  });
}

function attendeesFor(title: string, people: Person[]): string[] {
  return people
    .filter(
      (person) =>
        title.toLowerCase().includes(person.displayName.toLowerCase()) ||
        person.aliases.some((alias) => title.toLowerCase().includes(alias.toLowerCase()))
    )
    .map((person) => person.displayName);
}

function minutesSaved(receipts: ActionReceipt[], plans: ActionPlan[]): number {
  return receipts
    .filter((item) => item.outcome === "verified")
    .reduce((total, receipt) => {
      const plan = plans.find((item) => item.id === receipt.actionPlanId);
      return total + minutesFor(plan?.actionType);
    }, 0);
}

function accessTokenName(id: ConnectionId): string {
  return `${tokenName(id)}.access`;
}

function createCompanionCode(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function minutesFor(actionType: ActionPlan["actionType"] | undefined): number {
  switch (actionType) {
    case "email.draft":
      return 12;
    case "email.send":
      return 8;
    case "calendar.update":
      return 18;
    case "calendar.create":
      return 10;
    case "calendar.delete":
      return 8;
    case undefined:
      return 0;
    default: {
      const exhaustive: never = actionType;
      return exhaustive;
    }
  }
}
