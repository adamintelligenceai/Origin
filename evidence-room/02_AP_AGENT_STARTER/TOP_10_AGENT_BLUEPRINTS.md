# Top 10 Agent Blueprints — AP Agent Starter

**Evidence Room — AP Agent Starter**  
**Purpose:** Abbreviated, implementation-ready blueprints for the ten highest-leverage agents.  
**Full charters:** See `03_AP_AGENT_OS_PRO/Agent_Library/`  
**Doctrine:** ERP-agnostic. Agents earn responsibility. Payment authorization stays human. **Never default to L4.**

---

## How to use this pack

1. Pick 3–5 agents for a 60–90 day pilot (recommended starter set below).  
2. Register them at **L0–L1** in your Agent Registry.  
3. Instrument evidence logs before expanding scope.  
4. Promote only with acceptance and sample-QA gates (`RESPONSIBILITY_MODEL.md`).

**Recommended first wave:** 01, 02, 03, 04, 16  
**Second wave:** 07, 08, 10, 12, 05

---

## Shared blueprint fields

Each blueprint below includes: job · start level · human owner · must-have inputs · first wins · hard stops · sample KPI trio · ACME vignette.

---

## 01 — Invoice Intake

| | |
|---|---|
| **Job** | Capture invoices from allow-listed channels; extract fields; register canonical draft with evidence hash. |
| **Start level** | L0 → L1 |
| **Human owner** | AP Intake Lead |
| **Must-have inputs** | Mailbox/portal connector, OCR/IDR, vendor read, evidence store |
| **First wins** | Faster registration; fewer lost emails; complete source archive |
| **Hard stops** | No posting as final entry; no new channels without approval; no master-data edits |
| **KPI trio** | Time-to-register · field accuracy (sample) · evidence completeness |
| **ACME vignette** | PDF from Northwind lands in AP inbox; Agent 01 hashes file, extracts PO + amount at high confidence, opens draft `INV-ACME-88421` for Validation. |

---

## 02 — Invoice Validation

| | |
|---|---|
| **Job** | Completeness, vendor status, tax math, entity fit — pass clean work to Matching. |
| **Start level** | L1 |
| **Human owner** | Senior AP Specialist |
| **Must-have inputs** | Validation rules, vendor status, tax matrix/engine |
| **First wins** | Matcher and approver time protected from dirty invoices |
| **Hard stops** | No silent amount “fixes”; no payment auth; no bank changes |
| **KPI trio** | First-pass rate · false-pass rate (sample) · override rate |
| **ACME vignette** | `INV-ACME-88421` passes tax and vendor checks; a facilities non-PO without cost center fails to Triage with `MISSING_COST_OBJECT`. |

---

## 03 — Matching

| | |
|---|---|
| **Job** | 2-/3-way match vs PO/GR within tolerances; structured exceptions out. |
| **Start level** | L1 |
| **Human owner** | AP Match Lead |
| **Must-have inputs** | PO/GR reads, tolerance policy, explainable line association |
| **First wins** | Higher straight-through match; clearer variance reasons |
| **Hard stops** | No inventing GRs; no hiding variance; no payment release |
| **KPI trio** | Auto-match rate · false-match (sample) · time-to-decision |
| **ACME vignette** | Northwind price +1.8% exceeds ACME tolerance; Agent 03 emits `PRICE_VARIANCE_ABOVE_TOLERANCE` — no auto short-pay. |

---

## 04 — Exception Triage

| | |
|---|---|
| **Job** | Classify, prioritize, route exceptions to the right specialist queue. |
| **Start level** | L1 |
| **Human owner** | AP Supervisor |
| **Must-have inputs** | Reason taxonomy, priority policy, routing matrix, SLA clocks |
| **First wins** | No anonymous aging; faster first touch |
| **Hard stops** | No closing without resolution evidence; no payment overrides |
| **KPI trio** | Time-to-route · misroute/bounce rate · SLA breach rate |
| **ACME vignette** | Price-variance case `EX-99211` routes to Supplier Resolution with 3-day SLA. |

---

## 05 — Goods Receipt

| | |
|---|---|
| **Job** | Find missing/partial receipts; prompt receivers; unblock Matching. |
| **Start level** | L1 (draft prompts at L2 when earned) |
| **Human owner** | AP-GR Coordinator + Warehouse Lead |
| **Must-have inputs** | Open PO qty, WMS/inbound views, receiver directory |
| **First wins** | Shorter GR-blocked aging |
| **Hard stops** | Agent does not post GRs in Starter; no fake receipts |
| **KPI trio** | GR-clear SLA rate · median block hours · false-missing rate |
| **ACME vignette** | Packaging line missing GR; Agent 05 prompts Plant 1200 receiver; human posts GR; Matching retries. |

---

## 07 — Approval

| | |
|---|---|
| **Job** | Build approval packs; route by DOA; track SLA — **never self-approve**. |
| **Start level** | L1–L2 (packs/reminders) |
| **Human owner** | AP Workflow Lead; DOA owner = Controller |
| **Must-have inputs** | DOA matrix, workflow engine, evidence bundler |
| **First wins** | Complete packs; fewer approver bounce-backs |
| **Hard stops** | Agent identity cannot be the approver; no emergency bypass without policy |
| **KPI trio** | Approval cycle time · pack completeness · SOD exceptions (target 0) |
| **ACME vignette** | $48.9k facilities invoice pack routes to Director; reminder at T-24h; human approves in workflow. |

---

## 08 — Supplier Resolution

| | |
|---|---|
| **Job** | Draft and track supplier exception correspondence with evidence. |
| **Start level** | L1–L2 (draft; human send) |
| **Human owner** | AP Supplier Relations Lead |
| **Must-have inputs** | Templates, vendor contacts, case tracker |
| **First wins** | Faster credit/revised invoices; auditable threads |
| **Hard stops** | No legal threats; no bank-detail changes; no unapproved payment promises |
| **KPI trio** | Time-to-first-contact · resolve-within-SLA · draft accept rate |
| **ACME vignette** | Agent 08 drafts $200 credit request on Northwind variance; lead releases email; credit note returns. |

---

## 10 — Duplicate & Anomaly

| | |
|---|---|
| **Job** | Score duplicate/anomaly risk; recommend holds. **Not a fraud guarantee.** |
| **Start level** | L0 → L1 |
| **Human owner** | AP Controls Lead |
| **Must-have inputs** | History corpus, scoring features, hold flag API |
| **First wins** | Caught double-bills before payment proposal |
| **Hard stops** | No fraud verdicts; no “all clear” assurance; threshold changes need Control approval |
| **KPI trio** | Precision @ hold · false-positive rate · validated $ prevented |
| **ACME vignette** | `NW-10482` vs `NW-10482A` same amount scores 0.91; hold recommended; duplicate confirmed; disclaimer preserved. |

---

## 12 — Payment Proposal Review

| | |
|---|---|
| **Job** | Build/review proposals; exclude holds; flag discounts. **Humans authorize payment.** |
| **Start level** | L1–L2 (prepare only) |
| **Human owner** | AP Payment Lead + Treasury (release) |
| **Must-have inputs** | Payable list, hold registry, terms/discount rules |
| **First wins** | Cleaner runs; fewer held items leaking into pay batches |
| **Hard stops** | No bank release; no vendor bank edits; no L4 payment autonomy in Starter |
| **KPI trio** | Lines accepted without edit · hold leakage (0) · discount capture |
| **ACME vignette** | Weekly proposal excludes anomaly hold, highlights discount expiry; Treasurer authorizes in bank workflow — not the agent. |

---

## 16 — AP Manager / Orchestrator

| | |
|---|---|
| **Job** | Prioritize queues; enforce autonomy ceilings; escalate; prepare promotion dossiers. |
| **Start level** | L1 |
| **Human owner** | Human AP Manager (accountable) |
| **Must-have inputs** | Agent Registry, queue SLAs, incident feed |
| **First wins** | No agent exceeds approved level; clearer daily ops brief |
| **Hard stops** | No self-promotion; no payment auth; no bypassing domain charters for speed |
| **KPI trio** | Owner clarity within SLA · autonomy blocks · queue age p90 |
| **ACME vignette** | Orchestrator blocks Agent 03 from acting at L3 while registry shows L1; notifies AP Manager; prepares separate L2 dossier for Agent 08. |

---

## Starter governance minimum

| Control | Starter expectation |
|---|---|
| Registry | Excel OK — follow Pro `AGENT_REGISTRY_GUIDE.md` schema |
| Levels | All start L0–L1; ceilings ≤ 2 unless Controller signs |
| Payment | Human authorization mandatory |
| Duplicate agent | Outputs carry “not a fraud guarantee” language |
| Evidence | Keep originals + decision logs ≥ pilot duration and statutory minimum |
| Promotion | No L3 without sample QA + kill-switch test |

---

## What Starter deliberately omits (upgrade to Pro)

Full deep-dive charters for Agents 06, 09, 11, 13, 14, 15; formal autonomy boards; close binders; advanced CAPA analytics. Add them when pilot KPIs prove value and ownership capacity exists.

---

## Doctrine line

**Starter succeeds when humans feel more in control — with better evidence — not when agents act unsupervised.**
