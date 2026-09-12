# PROJECT CHIEF — MASTER BLUEPRINT
Founder edition · build first, name last

## 1. Company thesis

Build a premium **Private Chief of Staff** for executives, founders, senior professionals and busy households.

The product is not a chatbot. Its value loop is:

**observe → understand → detect → prioritise → prepare → authorise → execute → verify → learn**

The user should open the app and see work already organised, not an empty prompt box.

### Initial job to be done
"Keep me on top of email, meetings, commitments and follow-ups without forcing me to maintain another task system."

### Why now
Frontier models, structured outputs, tool use, local databases, cross-platform frameworks and direct provider APIs make the build feasible for a small founder-led team. The moat must therefore be **trust, personal context, reliable execution, permissioning, and distribution**, not access to an LLM.

---

# 2. Product strategy

## First wedge
Dominate four surfaces:
1. Gmail
2. Google Calendar
3. user-selected documents
4. local browser/desktop context later

Do not launch with banking, health, investments, payments, smart-home or unrestricted web purchasing.

## First five magical outcomes
1. "You promised this and it is due tomorrow."
2. "They promised you this and have not delivered."
3. "Tomorrow's meeting needs these three documents."
4. "These two calendar commitments conflict; here is the best resolution."
5. "This reply is ready. One tap to send."

## North-star metric
**Verified hours of administrative work removed per retained paying user.**

Supporting:
- proactive work items / total work items
- decision acceptance rate
- false-positive rate
- action failure rate
- action undo rate
- D7 / D30 / D90 paid retention
- direct COGS per user
- median time to first useful proactive insight

---

# 3. Product surfaces

## Desktop = Personal Chief Node
Desktop is canonical in V1 because normal mobile operating systems cannot guarantee indefinite background execution.

Navigation:
- Today
- Decisions
- Chief
- Commitments
- Activity
- People
- Routines
- Connections
- Privacy

## Mobile = companion
Five tabs:
- Today
- Decisions
- Chief
- Activity
- You

Purpose:
- morning briefing;
- push alerts;
- approve/edit/dismiss;
- voice requests;
- see receipts.

## Web = commercial/control plane
Public site:
- landing page
- product
- trust/privacy architecture
- pricing
- download
- docs
- waitlist/account/billing

The web app must not become the primary store for private context in V1.

---

# 4. Trust architecture

Core invariant:

> **Our service cloud should be useless to an attacker seeking the contents of a user's life.**

### Local-only by default
- email bodies/cache
- document content
- calendar notes
- Life Graph
- commitments
- preferences
- local embeddings
- action payloads
- model context
- action receipts
- OAuth refresh tokens

### Cloud may contain
- opaque user/account ID
- plan/entitlement
- Stripe customer/subscription IDs
- device IDs and public keys
- push routing identifiers
- app version
- feature flags
- aggregated/content-free telemetry
- ciphertext that the service cannot decrypt, if multi-device relay is enabled

### Never put in cloud logs
- subject lines
- names from source content
- email bodies
- calendar titles
- prompts/responses
- connector payloads
- OAuth tokens
- private keys
- decrypted sync blobs

---

# 5. Autonomy system

Levels:
- **A0 Observe** — inspect state
- **A1 Recommend** — surface advice
- **A2 Prepare** — drafts/plans
- **A3 Approve** — explicit approval before mutation
- **A4 Rule-bound autonomous** — user-created policy + low-risk/reversible actions only

V1 always requires A3 for:
- sends to new recipients;
- destructive calendar deletion;
- purchases/payments;
- account closure;
- financial or investment action;
- legal submission;
- medical/health action;
- high-sensitivity communications.

Never let an LLM promote its own permission level.

---

# 6. Agent architecture

Every work item must pass:

1. **Observe** provider delta.
2. **Normalize** into canonical source object.
3. **Detect** commitments/risk/opportunity.
4. **Score** urgency, importance, confidence, consequence.
5. **Plan** as structured `ActionPlan`.
6. **Authorize** deterministically against user policy.
7. **Execute** one typed connector method.
8. **Verify** by refetching expected external state.
9. **Receipt** locally.
10. **Learn** only from confirmed user preferences/behavior.

No free-form model output calls connectors directly.

---

# 7. Internal platform

Architect the application as the reference client for reusable infrastructure:

- `@project-chief/types`
- `@project-chief/core`
- `@project-chief/privacy`
- `@project-chief/permissions`
- `@project-chief/ledger`
- `@project-chief/model-router`
- `@project-chief/connectors-*` later
- `@project-chief/sync` later

This preserves the option to commercialise the underlying trust layer later without building a separate product from scratch.

---

# 8. V1 feature list

### Must
- local encrypted identity/profile
- Google Calendar read
- Gmail read in private dogfood
- local incremental source index
- commitment extraction
- follow-up extraction
- morning briefing
- meeting briefing
- conflict detection
- draft email
- approval queue
- send approved email
- approved calendar create/update
- deterministic permission engine
- verification
- local action receipts
- privacy dashboard
- local wipe and connector revoke
- content-free analytics

### Should
- user-created routines
- voice input
- People graph
- lightweight preference learning
- encrypted desktop-to-mobile sync

### Later
- Microsoft Graph
- user-selected Drive files
- local Playwright browser actions
- family sharing
- confidential always-on cloud
- external SDK

---

# 9. Design language

Tone: calm, private, competent, understated.

Avoid:
- neon "AI" gradients everywhere;
- robots;
- sci-fi dashboards;
- excessive chat bubbles;
- fake autonomous activity.

Use:
- editorial typography;
- restrained motion;
- clear consequence/risk indicators;
- rich whitespace;
- evidence/receipt views;
- a visually distinct "On device" privacy state.

User-facing vocabulary:
- "Needs you"
- "Ready to approve"
- "Chief is preparing"
- "Verified"
- "On device"
- "Used external AI"
- "Undo"

Do not expose:
- chain-of-thought
- raw model confidence without calibration
- internal agent names
- token counts unless under developer diagnostics

---

# 10. Pricing thesis

Dogfood: founder only.

Private alpha: free for 5–10 invited users.

Founding paid cohort:
- 14-day trial
- one Executive plan around A$69/month for first 100 users

After retention:
- Personal ~A$69/month
- Executive ~A$119/month
- Household later ~A$179/month

No permanent free tier initially. A demo/trial is sufficient.

Guardrails:
- direct variable cost < 20% revenue
- target < 15%
- paid churn target < 3% monthly once mature
- support time < 15 minutes/user/month
- action failures < 1% for supported mutation classes
- false proactive alerts low enough that users do not mute Chief

---

# 11. Bootstrap capital plan

Pre-revenue founder cash target:
- domain: defer until naming stage
- infrastructure: near zero / free tiers
- API: usage only
- Apple/Google developer fees when needed
- no employees
- no agency
- no paid acquisition

Do not spend > A$1,000 on a discretionary item before A$5k MRR unless it directly removes a blocking security/legal/revenue issue.

Professional security review becomes mandatory before broad public release, but its scope and timing should be funded from early revenue where possible.

---

# 12. Build order

1. Repo/quality/security foundations.
2. Desktop shell + fake local data.
3. Domain types + deterministic permissions.
4. Local encrypted persistence.
5. Google OAuth + Calendar read.
6. Gmail read + local index.
7. Detector pipeline.
8. Today + Decisions.
9. Drafts.
10. Mutating actions with A3.
11. Verification + Ledger.
12. Privacy center + wipe/revoke.
13. Mobile companion.
14. E2EE sync.
15. Web marketing/control plane.
16. Billing.
17. Private alpha.
18. Security/legal gate.
19. Paid founding launch.
20. Naming/domain/trademark finalisation immediately before public brand assets are locked.
