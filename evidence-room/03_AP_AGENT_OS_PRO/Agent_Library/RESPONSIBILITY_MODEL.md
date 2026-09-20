# Responsibility Model

**Evidence Room · AP Agent OS · Pro**  
**Document ID:** ER-APOS-LIB-RM  
**Version:** 1.0 · September 2026  
**Classification:** Licensed material  
**Companion:** `00_AGENT_STACK_OVERVIEW.md` · `AGENT_CHARTER_STANDARD.md`

---

## 1. The rule

**Responsibility is earned. Full autonomy is never the default.**

An AP agent is not “live” because the model is connected. It is live at a **named autonomy level**, for a **named document population**, in a **named company code or subsidiary**, with a **named human owner**, a **review date**, and an **evidence pack**.

If any of those are missing, the agent operates at Level 0 (Observe) regardless of what the configuration screen says. A16 — the AP Manager / Orchestrator — is required to refuse a dispatch that exceeds the register.

This is a control document. It is the answer to: *What should the agent be allowed to do? Who decided that? What can go wrong? How do we take the privilege back?*

---

## 2. The five levels

| Level | Name | The agent may | The agent may not | Human role |
|---|---|---|---|---|
| **0** | Observe | Read allowed systems. Write logs and private drafts. Produce a read-only pack. | Recommend a posting, a payment, a vendor change, or a supplier email that looks official. | Watch the pack. Confirm the agent sees the same population the ledger does. |
| **1** | Recommend | Propose a coded action on a work object. Show evidence and confidence. | Create or change a ledger document. Send external mail. Change master data. | Accept, edit, or reject every recommendation in scope. |
| **2** | Prepare | Draft the parked invoice, journal, email, chase, or payment-proposal challenge. Stage it for a named human. | Post, send, or release. Override tolerance. Change the approval matrix. | Review the draft. Post or send. Own the document. |
| **3** | Execute within guardrails | Post or send inside a written envelope: company code, vendor class, amount, document type, reason codes. | Exceed the envelope. Release cash. Create vendors. Conclude fraud. Sign the close. | Sample review. Handle everything outside the envelope. Remain the process owner. |
| **4** | Managed autonomy | Operate the named population with exception-only human review, still inside an envelope, still with a kill switch. | Expand its own envelope. Authorise payment. Grant itself a higher level. | Exception handling, sampling, and periodic recertification. Not “set and forget”. |

Level 4 is still managed. It is not unsupervised AI. The word “autonomy” here means *the human is not in the path of every document*. It does not mean *the human is not accountable*.

---

## 3. What each level looks like on a real invoice

Illustrative path for Northline Industrial Group (fictional), SAP company code NL10, vendor Helion Fasteners NA, PO 4500218831, invoice HF-88421, $14,260.00 USD.

| Level | What happens to HF-88421 |
|---|---|
| 0 | A01 logs that a PDF arrived from `ap@helion.example` and that a parked document does not yet exist. No extract is offered as “ready”. |
| 1 | A01 proposes header and line extract. Processor Maya Chen accepts lines 1–3, corrects UoM on line 4, and parks MIR7 herself. |
| 2 | A01 writes a parked MIR7 draft. Maya opens the parked document, checks tax and PO, and posts. |
| 3 | A01 parks and A03 matches within tolerance ($50 or 2%, Evidence Room illustrative policy). Document posts under the system user with Maya as recorded authoriser for the batch. Amount is below the Level-3 envelope. |
| 4 | Same as 3 for the named population “NL10 / PO invoices / domestic / ≤ $25,000 / existing vendor / no anomaly flag”. HF-88421 never appears in Maya’s queue. It appears on the daily sample list. If A10 raises `DUP-SUS`, the envelope breaks and the invoice returns to Level 1. |

Payment of HF-88421 is **never** at Level 3 or 4 of A01–A03. A12 may challenge the proposal at Level 0–2. A human releases F110 / the bank file.

---

## 4. Starting levels (product default)

These defaults are part of the product. A customer may be stricter. A customer may not be looser at go-live without a written exception in the autonomy register signed by the Controller.

| Agent | Default start | Why not higher |
|---|---|---|
| A01 Invoice Intake | 1 | Extract quality is unknown until measured against a human-corrected set. |
| A02 Invoice Validation | 1 | Tax and vendor judgement are easy to get confidently wrong. |
| A03 Matching | 1 | Tolerance posts are the first place silent error becomes money. |
| A04 Exception Triage | 1 | Mis-routes burn other teams; observe-only is too weak for a queue. |
| A05 Goods Receipt | 0 | Receiving is operationally sensitive; false chases destroy trust. |
| A06 PO Quality | 0 | Procurement will reject a noisy critic. Earn the right to recommend. |
| A07 Approval | 0 | Delegation of authority is a human control. Start by watching bottlenecks. |
| A08 Supplier Resolution | 1 | Drafts only. Sending as the company is a Level-2 privilege. |
| A09 Internal Follow-Up | 1 | Internal noise has a political cost. Recommend, then prepare. |
| A10 Duplicate & Anomaly | 1 | A hold recommendation is useful. An auto-block of a live vendor is not a day-one act. |
| A11 Vendor Statement Reconciliation | 0 | Statement formats vary; observe completeness first. |
| A12 Payment Proposal Review | 0 | Cash. Watch one cycle before you let it speak. |
| A13 AP Close | 0 | Close sign-off is human. The agent starts as a checklist observer. |
| A14 AP Reporting | 1 | Numbers must reconcile to the ledger before anyone forwards the pack. |
| A15 Root Cause | 0 | Clusters without a quarter of coded exceptions are fiction. |
| A16 Orchestrator | 1 | It may recommend reassignment and escalation. It may not promote agents. |

Almost every agent starts at 0 or 1. That is intentional.

---

## 5. The envelope (required at Level 3 and Level 4)

An envelope is a written box. If the document does not fit, the agent drops to Level 1 for that object and A16 records an `envelope_break`.

Minimum envelope fields:

| Field | Example (Northline, illustrative) |
|---|---|
| `agent_id` | A03 |
| `source_system` | SAP_S4_NL |
| `company_codes[]` | NL10 |
| `document_types[]` | PO invoice (RE) |
| `vendor_classes[]` | Domestic, existing, not one-time, not employee |
| `max_gross_amount` | 25000 |
| `currencies[]` | USD, CAD |
| `reason_codes_allowed[]` | (empty for match-success path) |
| `reason_codes_forbidden[]` | `DUP-SUS`, `ANOM-SUS`, `CTRL-BRK`, `VND-BLK` |
| `tolerance_table_version` | NL-TOL-2026-04 |
| `approval_matrix_version` | NL-DOA-2026-02 |
| `can_send_external_mail` | false |
| `can_post` | true |
| `can_release_payment` | false (always false for every agent) |
| `can_change_vendor_bank` | false |
| `sample_rate` | 0.10 of posted documents, plus 100% of envelope breaks |
| `kill_switch_owner` | Priya Menon, AP Manager |
| `review_date` | 2026-12-15 |
| `internal_audit_ack` | required for Level 4 |

`can_release_payment` is always false. There is no envelope that makes A12 a payer.

---

## 6. How responsibility is earned

### 6.1 Clock and volume (minimums)

Evidence Room framework — illustrative gates, not industry law. Raise them if the population is high-value or high-fraud-risk.

| From → To | Minimum calendar | Minimum objects in population | Additional gate |
|---|---|---|---|
| 0 → 1 | 20 operating days | 500 objects observed, or 30 days if volume is lower | Completeness test passed (inbound vs created) |
| 1 → 2 | 40 operating days at Level 1 | 1,000 recommendations scored | Accept rate and override-for-error rate inside charter thresholds |
| 2 → 3 | 60 operating days at Level 2 | 1,000 prepared documents posted by humans without material correction | Envelope written; SOD tested; sample plan agreed |
| 3 → 4 | 90 operating days at Level 3 | 2,000 executed documents; two period closes survived | Internal Audit acknowledgement; Controller signature; kill switch tested |

“Material correction” means the human changed amount, vendor, tax, PO, bank, or company code — not a cosmetic text edit.

Calendar and volume are both required. A weekend burst of 2,000 invoices does not earn Level 3.

### 6.2 Quality gates (must all pass)

Each agent charter sets numeric thresholds in its KPI block. The stack-level rule is:

1. **False-negative on duplicates (A10):** any confirmed duplicate that reached posted + paid is a demotion event for A10 and a review event for A12.
2. **Unauthorised-level attempt:** any write the register did not permit is a demotion event for that agent and a controls incident.
3. **Override-for-error rate:** human rejects because the agent was wrong — not because policy changed — must be inside the charter band.
4. **Completeness:** inbound channels reconcile to work objects. Missing population = no promotion.
5. **Ledger recon:** A14 pack ties to trial balance / open items. Untied reports cannot support a Level-2 reporting privilege.
6. **Sampling:** the sample plan was actually executed. An unsampled Level 3 is a Level 1 in disguise.

### 6.3 The promotion pack (what you put on the table)

A16 assembles. The human owner presents. The Controller (or delegate) approves. Internal Audit acknowledges Level 4.

Contents:

1. Agent charter (current version) and envelope draft.
2. Autonomy register extract.
3. KPI table for the qualifying window (activity, operational, financial, risk).
4. Override log classified: *agent error / policy change / data missing / human preference*.
5. Exception sample: 25 objects the agent got wrong, with root cause.
6. SOD and posting-user evidence.
7. Kill-switch test result (date, who pulled it, what stopped).
8. Known limitations (document types it still fails).
9. Review date and demotion triggers copied from this document.
10. Signatures: owner, AP Manager, Controller (Level 3+), Internal Audit (Level 4).

No pack, no promotion. A vendor slide is not a pack.

---

## 7. How responsibility is taken back

Demotion is faster than promotion. A16 may **recommend** demotion. The AP Manager **executes** it. The kill-switch owner may drop any agent to Level 0 immediately.

### 7.1 Automatic drop to Level 0 (same day)

| Trigger | Why |
|---|---|
| Unauthorised write to ledger or bank file | Control break |
| Payment release attempted by any agent | Cash control |
| Vendor bank-detail change executed without the configured human approval | Classic fraud path |
| Kill switch pulled | Any reason the owner names |
| Adapter mapping defect that affected posted amounts or tax | Books may be wrong |
| Completeness break > 1 operating day on a live inbound channel | Invisible invoices |

### 7.2 Drop by one level (within 5 operating days)

| Trigger | Why |
|---|---|
| Override-for-error rate above charter threshold for 10 operating days | Quality |
| Confirmed duplicate posted (A10 / A03 / A12 joint review) | Financial |
| Sample plan missed two consecutive cycles | Control not operating |
| Envelope break rate above charter threshold | Agent working outside its box |
| Supplier or receiving complaints that chases are wrong, confirmed on sample | Trust and noise |
| Close task signed as complete that was not (A13) | Period integrity |

### 7.3 Freeze (Level 0, no recommendations)

Use when the facts are unclear: a suspected prompt-injection via invoice PDF, a compromised mailbox, a parallel ERP cutover, or an investigation. Freeze is not punishment. It is a control. A16 records `CTRL-BRK` and the reason.

After freeze, restart at Level 0 and re-earn. Do not restore the previous level because “it was probably fine”.

---

## 8. Who may change a level

| Action | May initiate | May approve | Must be informed |
|---|---|---|---|
| Set Level 0 or 1 at go-live | Project + AP Manager | AP Manager | Controls Lead |
| Promote to Level 2 | Human owner | AP Manager | Controls Lead |
| Promote to Level 3 | Human owner + AP Manager | Controller or delegate | Internal Audit, Systems Owner |
| Promote to Level 4 | AP Manager + Controller | Controller + Internal Audit acknowledgement | CISO / IT security if mail or bank adapters are in scope |
| Demote one level | Owner, AP Manager, Controls | AP Manager | Owner |
| Emergency Level 0 | Kill-switch owner, AP Manager, Controller, CISO | None (execute first) | All of the above same day |
| Expand envelope | Owner | Same approver as the current level | Audit if Level 4 |

A16 cannot approve its own promotion. A16 cannot approve another agent’s Level 3+.

---

## 9. Human-in-the-loop patterns

| Pattern | Used at | What the human sees | Risk if skipped |
|---|---|---|---|
| **Review every object** | Level 1 | Recommendation + evidence + accept/edit/reject | Silent posting of bad extract |
| **Review every draft** | Level 2 | Parked document or outbound draft | Official email or parked doc with wrong vendor |
| **Review the envelope breaks + sample** | Level 3 | Break queue + sample list | Drift inside the envelope |
| **Review exceptions + recertify** | Level 4 | Exception queue + monthly recertification pack | Unattended population after a policy change |
| **Always review cash** | All levels of A12 | Payment proposal + challenges | Duplicate pay, wrong payee, early/late pay |
| **Always review vendor bank / tax-ID** | All levels of A08 | Change request | Redirected payments |

“Human-in-the-loop” is not a checkbox on a slide. It is one of the patterns above, named in the register.

---

## 10. SOD and identity

- Each agent that writes uses a **named system user** per ledger (`ER_A01_S4`, `ER_A03_NS`, …). Shared “robot” users are a finding.
- The system user that **posts invoices** is not the user that **releases payments**.
- The human recorded as authoriser cannot be the same human who created a one-time vendor on the same document (classic SOD). A16 blocks the path.
- Prompts and rule tables are production configuration. Access to change them is equivalent to `SPRO` / system-admin, not to “the AP intern who writes prompts”.
- Invoice PDFs and supplier email are untrusted input. An extract that contains instructions (“ignore previous matching rules”) is logged and sent to A10 / Controls — it is not executed.

---

## 11. What this model does not do

- It does not certify SOX / ICFR. It produces evidence a control owner can test.
- It does not replace delegation-of-authority policy.
- It does not make a Level-4 agent a lawful approver under a bank mandate.
- It does not guarantee a 9% exception rate. Ardent Partners (2024) reports 9% exceptions and 59% lower exceptions for Best-in-Class organisations. Use those figures as external context when you present *your* rates.
- It does not treat Forrester’s March 2025 AI AP use cases (capture, matching, reporting, fraud management, payment management, e-invoicing/tax) as permission to skip a level. Use-case popularity is not a control.

---

## 12. Register data model (minimum fields)

Maintain one row per `(agent_id, source_system, company_code, document_population)`.

| Field | Type | Notes |
|---|---|---|
| `register_id` | string | Stable |
| `agent_id` | A01–A16 | |
| `source_system` | enum | SAP_S4, D365, ORACLE, NS, WORKDAY, OTHER |
| `company_code` | string | Or subsidiary |
| `population` | string | e.g. `PO_DOMESTIC_LE_25K` |
| `level` | 0–4 | |
| `envelope_ref` | versioned ID | Required if level ≥ 3 |
| `owner_role` | string | |
| `owner_named` | string | A person, not a team inbox |
| `backup_named` | string | |
| `kill_switch_owner` | string | |
| `effective_from` | date | |
| `review_date` | date | |
| `last_promotion_pack` | link | |
| `ia_acknowledged` | bool | Required if level = 4 |
| `status` | active / frozen / retired | |

A14 publishes a register extract in the monthly pack. A16 refuses dispatch when `status != active` or `review_date` is more than 30 days stale at Level 3+.

---

## 13. Worked example — Northline earns A03 Level 2

Northline Industrial Group (fictional): 4,200 employees, about 18,000 invoices/month, SAP S/4HANA + NetSuite (Northline Pacific Components), 14-person AP team. AP Manager: Priya Menon. Matching lead: Diego Alvarez.

**What they did**

1. Went live with A03 at Level 1 on SAP company code NL10 only. NetSuite left at Level 0.
2. For 45 operating days, A03 recommended match / exception on PO invoices. Diego’s team accepted, edited, or rejected.
3. A14 reported: 11,400 match recommendations; override-for-error 6.8%; first-pass match on the human-accepted set improved versus the pre-period baseline *as measured locally* (no industry claim).
4. Twenty-five wrong recommendations were sampled: twelve GR timing, eight UoM, five price-condition misreads.
5. Envelope drafted: NL10, PO invoices, existing domestic vendors, ≤ $25,000, no `DUP-SUS`.
6. Promotion pack presented. Priya approved Level 2 — **Prepare parked match, human posts** — not Level 3.
7. NetSuite still Level 0. Cross-ledger invoices remain a human path.

**What they refused**

- Level 3 after 45 days (calendar gate is 60 days at Level 2, which they do not yet have).
- Including non-PO invoices in the envelope.
- Letting A03 post because “the demo posted cleanly”.

**What can still go wrong**

- Diego’s team stops classifying overrides (“too busy”), and the next pack is unusable. Stay at Level 2.
- A10 is still Level 1 and misses a duplicate; A03 at Level 2 would park a second invoice. A10 miss is a joint review, not an A03 promotion argument.

---

## 14. Recertification

| Level | Recertify | By whom | If missed |
|---|---|---|---|
| 0–1 | Quarterly, light | Owner + AP Manager | Stay; do not promote |
| 2 | Quarterly | Owner + AP Manager + Controls | Drop to 1 if > 30 days late |
| 3 | Monthly sample + quarterly pack | Owner + Controller delegate | Drop to 2 if sample missed twice |
| 4 | Monthly sample + quarterly IA sighting | Controller + Internal Audit | Drop to 3 immediately if stale |

Recertification reuses the promotion-pack outline. It is shorter. It still includes the 25-error sample if volume allows.

---

## 15. Cost of responsibility (why this is not bureaucracy)

Every level above 0 consumes:

- Human review minutes (Level 1–2 heavy, Level 3–4 lighter but specialised).
- Compute and API cost.
- Sample and audit time.

A16 and A14 must show **unit review cost** and **error cost** together. A cheap Level 4 that posts duplicates is more expensive than a Level 1 that does not.

Do not justify a promotion with an unsourced savings percentage. If you cite the market, cite it as market: Ardent Partners (2024) Best-in-Class — 78% lower cost, 82% faster cycle, 59% lower exceptions, 9% exception rate — and then show Northline’s own numbers beside it.

---

## 16. Document control

| Item | Value |
|---|---|
| Owner | AP Manager (operating); Controller (Level 3+ policy) |
| Related | Autonomy register; kill-switch procedure; SOD matrix |
| Advice status | Not legal, tax, accounting, or investment advice |
