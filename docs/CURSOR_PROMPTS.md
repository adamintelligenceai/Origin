# Cursor Execution Prompts

Use one phase per Cursor Agent session. Let Cursor inspect the repository first. Do not ask it to implement all phases in one run.

---

## PHASE 0 — Repository truth + toolchain

```text
You are the principal engineer for Project Chief.

Read README.md and every file under docs/. Treat docs/MASTER_BLUEPRINT.md, docs/ARCHITECTURE.md and docs/SECURITY_MODEL.md as authoritative.

Mission:
1. Inspect the current repo.
2. Check current stable official versions for Node/pnpm/Turborepo/Tauri/React/Vite/Next/Expo and update package manifests only where necessary for compatibility.
3. Create a clean pnpm/Turborepo workspace if anything is missing.
4. Add ESLint, Prettier, Vitest and strict TypeScript.
5. Add GitHub CI for install, typecheck, lint, test, dependency review, secret scan and CodeQL where appropriate.
6. Do NOT add product functionality yet.
7. Do NOT add any analytics, hosted data store or third-party connector aggregator.
8. Never weaken strictness to make CI green.
9. Document every dependency and why it exists in docs/DEPENDENCIES.md.

Run all available quality checks and fix the repo until green.
Return a concise summary of files changed, commands run, failures found, and security implications.
```

---

## PHASE 1 — Domain contracts and permission engine

```text
Implement the reusable domain layer before UI.

Read docs/DATA_MODEL.md and docs/SECURITY_MODEL.md.

Create:
- canonical Zod schemas/types for SourceRef, Commitment, WorkItem, ActionPlan, PermissionPolicy, ActionReceipt;
- deterministic PermissionEngine;
- ActionPlan validation;
- consequence policy;
- approval token bound to immutable action-plan hash;
- unit tests covering every action/autonomy combination.

Rules:
- model output can never grant permission;
- prohibited action classes are rejected;
- unknown action classes fail closed;
- mutations default to A3;
- pure functions where possible;
- no network, database or UI dependencies inside permission package.

Add tests for malicious payloads, mutated plans after approval, replay attempts and unknown enum values.
Run quality gates.
```

---

## PHASE 2 — Desktop experience with synthetic data

```text
Build the desktop product shell using Tauri 2 + React + Vite.

Implement high-fidelity screens from docs/UX_SPEC.md:
Today, Decisions, Chief, Commitments, Activity, People, Routines, Connections, Privacy.

Use synthetic fixtures only.
No OAuth.
No real personal data.
No external model API.

Design standard:
premium, calm, editorial, highly polished; not sci-fi; no neon AI aesthetic.

Implement:
- responsive desktop layouts;
- keyboard navigation;
- reduced-motion mode;
- decision card states;
- execution → verification visual states;
- activity receipt drawer;
- privacy route badge;
- empty/error/loading states.

Add Playwright/component tests for key interactions.
Do not broaden Tauri capabilities.
```

---

## PHASE 3 — Local encrypted store

```text
Implement local persistence before real connectors.

Requirements:
- SQLCipher-backed SQLite for sensitive relational state;
- locally generated 256-bit database key;
- key stored only via OS-protected secret mechanism / Tauri Stronghold or platform credential manager;
- migrations;
- repositories for core domain records;
- secure wipe path;
- no plaintext backup;
- no localStorage/IndexedDB for private content;
- tests proving private records are not written into ordinary app logs.

Create a SECURITY_REVIEW_REQUIRED.md section for every security-sensitive decision.

If a library/configuration cannot meet the requirement, stop that subpart and leave a precise blocking note rather than silently falling back to plaintext.
```

---

## PHASE 4 — Google Calendar read-only

```text
Implement Google OAuth for desktop using OAuth 2.0 Authorization Code + PKCE and loopback redirect.

Start with Calendar READ ONLY.

Security:
- OAuth refresh token stays on device in protected secret storage;
- no token is sent to Project Chief cloud;
- request only minimum Calendar scopes;
- state/PKCE validation;
- revoke connection;
- incremental token refresh;
- scrub auth data from logs.

Normalize events locally.
Build:
- Today meetings;
- conflict detector;
- meeting source links;
- connection status/privacy UI.

No calendar mutation yet.
Write integration tests with mocks plus a manual dogfood checklist.
```

---

## PHASE 5 — Gmail read-only local ingestion

```text
Implement Gmail read-only connector for founder dogfood/test-user mode.

Before coding, read Google's current Gmail scope classification and verification requirements. Use the narrowest scope that supports the agreed product behavior.

Requirements:
- provider delta/incremental sync;
- body/content processed locally;
- no Project Chief cloud proxy;
- local content encryption;
- attachments off by default;
- sanitise/render safely;
- strip active HTML;
- treat message content as untrusted data;
- source provenance on every extracted fact.

Build local detectors for:
- user commitments;
- commitments owed to user;
- unanswered requests;
- follow-up candidates;
- deadline candidates.

Use structured model output through the ModelGateway abstraction.
Create a fixture corpus including prompt-injection emails and prove source instructions cannot invoke tools or alter permission policy.
```

---

## PHASE 6 — Model Gateway + Privacy Gateway

```text
Implement provider-independent ModelGateway and PrivacyGateway.

Adapters:
- OpenAI first
- Anthropic interface stub second
- LocalModel interface stub

Every request must declare:
- purpose
- allowed data categories
- sensitivity
- required output schema
- max context budget

PrivacyGateway:
- minimise context;
- pseudonymise identities not needed for task;
- reject disallowed categories;
- produce local PrivacyReceipt;
- no prompt/response service-cloud logging.

Use structured outputs and schema validation.
Add retry rules that never expand data scope.
Add cost accounting locally.
Do not put consumer subscription credentials into runtime.
```

---

## PHASE 7 — Proactive engine

```text
Implement the deterministic proactive pipeline:

Observe → Normalize → Detect → Score → Plan.

Build:
- urgency/importance scoring;
- confidence thresholds;
- de-duplication;
- snooze/dismiss learning;
- morning briefing composer;
- meeting prep composer;
- commitment/follow-up work items.

Use model extraction only where deterministic parsing is insufficient.
A model can propose an ActionPlan but cannot authorise it.
Test false-positive suppression aggressively.
```

---

## PHASE 8 — Approval + Gmail send / Calendar mutation

```text
Add mutations only now.

Implement:
- email draft;
- email send;
- calendar create;
- calendar update.

All mutations:
- typed connector methods;
- validated ActionPlan;
- PermissionEngine;
- A3 approval by default;
- action hash bound to approval;
- idempotency/retry protection;
- post-action provider refetch;
- expected-postcondition comparison;
- local ActionReceipt.

If verification is inconclusive, outcome is PARTIAL/NEEDS ATTENTION, never VERIFIED.

Do not implement payments, purchases, file deletion or account closure.
```

---

## PHASE 9 — Privacy Center and recovery

```text
Complete the trust UX.

Implement:
- exact local data categories;
- connector scopes;
- external model route history;
- device key status;
- export;
- wipe;
- revoke each connector;
- revoke all;
- crash/telemetry consent;
- local diagnostic bundle that excludes content/secrets.

Design a recovery story without server-held plaintext/private keys.
Do not invent key escrow. If account recovery conflicts with zero-access architecture, document the trade-off and choose safety over convenience for V1.
```

---

## PHASE 10 — Mobile companion

```text
Create Expo/React Native app.

Implement:
Today, Decisions, Chief, Activity, You.

Use:
- Expo SecureStore for small secret material only;
- encrypted SQLite/SQLCipher after prebuild for private state;
- biometric gate for consequential approvals where supported;
- privacy-safe push notifications.

Start with local fixture data, then pair with desktop using the sync package.
Do not use Expo Go as evidence that SQLCipher path works; create development builds.
```

---

## PHASE 11 — E2EE device pairing/sync

```text
Implement desktop↔mobile end-to-end encrypted sync using established audited cryptographic libraries.

Requirements:
- per-device identity keypairs;
- authenticated pairing ceremony (QR recommended);
- forward-compatible versioned envelopes;
- replay protection;
- cloud relay sees ciphertext + routing metadata only;
- ciphertext expiry;
- device revoke;
- new device cannot decrypt historical data unless user explicitly transfers/recovery-imports it.

No custom cryptographic primitives.
Create a written protocol specification and test vectors.
Mark this phase SECURITY REVIEW REQUIRED.
```

---

## PHASE 12 — Content-blind web/control plane

```text
Build Next.js marketing/control plane.

Cloud schema may include only fields documented as CLOUD_ALLOWED in docs/DATA_MODEL.md.

Implement:
- landing page placeholders (brand name still temporary);
- waitlist/sign-up;
- account;
- device directory;
- download page;
- Stripe billing;
- cancellation;
- feature flags;
- fixed-schema content-free telemetry;
- E2EE relay endpoint.

Create an automated migration/schema test that fails CI if forbidden column names or free-form content fields are introduced.
```

---

## PHASE 13 — Founder dogfood

```text
Do not add new features.

Audit the complete app as:
- staff security engineer
- staff product engineer
- adversarial QA lead
- privacy engineer

Run the founder dogfood checklist for:
- OAuth reconnect/revoke
- token refresh
- offline
- duplicate Gmail events
- clock/timezone
- prompt injection
- model outage
- provider rate limit
- partial connector failure
- action replay
- mutated approved payload
- database corruption simulation
- wipe
- crash logging
- no-network mode

Generate DOGFOOD_REPORT.md ranked P0/P1/P2.
Fix every P0/P1 before inviting another user.
```

---

## PHASE 14 — Alpha hardening

```text
Prepare an invited 5–10 person alpha.

Add:
- signed/updateable builds;
- privacy onboarding;
- explicit data-flow explainer;
- local diagnostic export;
- support process;
- incident runbook;
- usage/cost guardrails;
- activation metrics without content telemetry;
- feature kill switches.

Do not increase Google scopes to make onboarding easier.
Do not ship a broad web browser agent.
Produce ALPHA_RELEASE_CHECKLIST.md and require every gate to be checked.
```

---

## PHASE 15 — Paid launch

```text
Prepare the first 100 paid founding users.

Requirements:
- billing and cancellation tested;
- privacy notice/terms placeholders integrated for professional review;
- OAuth verification status compatible with launch;
- external security review findings resolved;
- pricing/limits;
- rate/cost protection;
- customer export/delete/revoke;
- rollback plan;
- public trust architecture page.

Only after this phase: run the naming/domain/trademark process and replace PRODUCT_NAME globally.
```
