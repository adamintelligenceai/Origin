# Top 10 Agent Blueprints (Condensed)

**Evidence Room** · Starter · $79

Aligned to Pro library **A01–A10**. Expand with Pro playbooks (A01–A16) or Custom design for ERP-specific objects.


---

## 1. A01 Invoice Intake Agent

**Purpose:** Capture, classify, extract, and enrich inbound invoices into Invoice Cases.

| Element | Detail |
|---|---|
| Inputs | Email/portal/EDI/paper scan payloads; vendor directory; channel metadata. |
| Outputs | Invoice Case draft; completeness score; channel tag; missing-field list. |
| Stage path | Observe → Draft → Propose (create draft case). |
| Human responsibilities | Confirms low-confidence vendor identity; releases draft into workflow. |
| Forbidden | Changing vendor bank details; posting payments; inventing PO numbers. |
| Evidence standard | Source file hash/link; extraction fields; confidence; human edits. |
| Pilot KPIs | Capture completeness %; rework rate; time-to-queue. |
| Suggested pilot | One intake channel; domestic vendors; 2-week shadow then Draft. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 2. A02 Invoice Validation Agent

**Purpose:** Structural and master-data validation before matching.

| Element | Detail |
|---|---|
| Inputs | Invoice Case; vendor master; tax/currency rules; required-field policy. |
| Outputs | Pass/fail checklist; remediation codes; hold recommendations. |
| Stage path | Observe → Propose holds/fixes. |
| Human responsibilities | Resolves master-data conflicts; approves exceptions to field policy. |
| Forbidden | Silent master-data writes; forcing invalid tax IDs. |
| Evidence standard | Rule version; failed checks; steward decisions. |
| Pilot KPIs | First-pass validation rate; false hold rate; time-in-validation. |
| Suggested pilot | PO invoices only; Propose stage. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 3. A03 Matching Agent

**Purpose:** 2-/3-way match within published tolerances.

| Element | Detail |
|---|---|
| Inputs | PO lines; GR/IR; invoice lines; tolerance policy. |
| Outputs | Match status; variance table; suggested disposition. |
| Stage path | Propose match/exception; Bounded execute only for clean matches under threshold after earn-in. |
| Human responsibilities | Approves variances beyond tolerance; confirms partial receipts. |
| Forbidden | Silent override of price/qty failures; deleting audit lines. |
| Evidence standard | Line-level compare; tolerance rule version; decision. |
| Pilot KPIs | First-pass match rate; false auto-match rate; exception ageing. |
| Suggested pilot | Single purchasing org; goods receipts present; Propose stage. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 4. A04 Exception Triage Agent

**Purpose:** Classify, prioritize, and route exceptions.

| Element | Detail |
|---|---|
| Inputs | Exception queue; taxonomy; historical resolutions; SLA rules. |
| Outputs | Class label; owner; urgency; recommended action; linked evidence. |
| Stage path | Draft notes → Propose assignment. |
| Human responsibilities | Accepts/overrides class and owner; handles sensitive disputes. |
| Forbidden | Closing exceptions without policy; payment release. |
| Evidence standard | Features used for class; prior similar cases cited. |
| Pilot KPIs | Time-to-first-touch; reopen rate; taxonomy accuracy sample. |
| Suggested pilot | Top 5 exception types by volume. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 5. A05 Goods Receipt Agent

**Purpose:** Signal GR completeness and timing issues that block clean match.

| Element | Detail |
|---|---|
| Inputs | PO; ASN/receiving events; invoice expectations. |
| Outputs | GR status signals; missing-receipt alerts; timing flags. |
| Stage path | Observe → Propose follow-ups to receiving. |
| Human responsibilities | Receiving confirms physical receipt; AP decides match path. |
| Forbidden | Fabricating GR documents; posting inventory. |
| Evidence standard | Event timeline; signal rationale; receiver response. |
| Pilot KPIs | GR lag; invoices waiting on GR; false missing-GR rate. |
| Suggested pilot | One warehouse / plant; Propose reminders only. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 6. A06 PO Quality Agent

**Purpose:** Detect PO hygiene issues that create preventable mismatches.

| Element | Detail |
|---|---|
| Inputs | PO headers/lines; contract refs; historical mismatch causes. |
| Outputs | PO defect findings; preventative tickets (draft). |
| Stage path | Observe → Draft tickets to procurement. |
| Human responsibilities | Procurement owns PO corrections. |
| Forbidden | Unilateral PO changes; price overrides without policy. |
| Evidence standard | Defect codes; PO snapshot refs; buyer decision. |
| Pilot KPIs | Preventable mismatch share; time-to-PO-fix. |
| Suggested pilot | Read-only scan weekly; top defect codes. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 7. A07 Approval Agent

**Purpose:** Policy-compliant approval routing without breaking SoD.

| Element | Detail |
|---|---|
| Inputs | Invoice packet; approval matrix; delegations; calendar. |
| Outputs | Routed task; packet summary; escalation timer. |
| Stage path | Propose route → Bounded execute for matrix-clear cases after earn-in. |
| Human responsibilities | Approvers decide; AP resolves matrix conflicts. |
| Forbidden | Self-approval loops; skipping required approvers. |
| Evidence standard | Matrix version; route path; escalations. |
| Pilot KPIs | Approval cycle time; escalation rate; SoD violations (target zero). |
| Suggested pilot | Two cost centres; amounts under defined cap. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 8. A08 Supplier Resolution Agent

**Purpose:** Prepare external clarification packs for supplier-owned issues.

| Element | Detail |
|---|---|
| Inputs | Exception case; PO/invoice excerpts; policy templates. |
| Outputs | Draft supplier pack; cite fields; escalate flag. |
| Stage path | Draft only until quality earn-in; then Propose send. |
| Human responsibilities | Vendor desk edits and sends; owns disputes. |
| Forbidden | Promising payment dates not in system; sharing other vendors' data. |
| Evidence standard | Citations; final sent text; editor ID. |
| Pilot KPIs | First-response time; edit distance; reopen rate. |
| Suggested pilot | Price/qty clarification only; exclude legal disputes. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 9. A09 Internal Follow-Up Agent

**Purpose:** Chase internal owners against SLAs with evidence-linked reminders.

| Element | Detail |
|---|---|
| Inputs | Open exceptions; owner map; SLA timers; calendar. |
| Outputs | Reminder drafts; escalation proposals; ageing digest. |
| Stage path | Draft → Propose reminders; Bounded execute for approved reminder templates after earn-in. |
| Human responsibilities | Owners act; AP Lead tunes SLA policy. |
| Forbidden | Harassing channels outside policy; changing approvals. |
| Evidence standard | Reminder log; template version; response. |
| Pilot KPIs | SLA breach rate; reminder-to-action time; mute/complaint rate. |
| Suggested pilot | Internal approvers only; email/Teams templates approved. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## 10. A10 Duplicate / Anomaly Agent

**Purpose:** Emit duplicate and anomaly signals for investigation — never a fraud guarantee.

| Element | Detail |
|---|---|
| Inputs | Open invoices; recent payments; vendor+amount+date+ref signals. |
| Outputs | Suspect list with score; recommended hold (propose). |
| Stage path | Propose holds; human investigates. |
| Human responsibilities | Investigates; decides void/hold/false positive. |
| Forbidden | Auto-voiding payments; asserting fraud certainty in any output copy. |
| Evidence standard | Signal set; score; investigator notes. |
| Pilot KPIs | Suspect precision (sample); missed duplicate incidents; hold cycle time. |
| Suggested pilot | Flag-only 30 days; marketing language ban on 'fraud prevention' claims. |

**Charter stub:** Copy into operating-model charter template; fill invoice classes and kill-switch before any production use.


---

## Cross-cutting rules for all ten

1. No agent writes bank details.
2. No Starter deployment authorizes/releases payments (see Pro A12 for proposal-only patterns).
3. Every production run writes evidence.
4. Stage promotion requires sampled performance review — not enthusiasm.
5. A10 emits signals only — never market as guaranteed fraud detection.
6. Do not claim guaranteed cost/invoice reduction; industry context only via Ardent Partners 2025 (**$9.84**, **18.4%** exceptions, **35.4%** STP).

## Next agents (Pro)

A11 Vendor Statement Reconciliation · A12 Payment Proposal Review · A13 AP Close · A14 AP Reporting · A15 Root Cause · A16 AP Manager Orchestrator

---

*Evidence Room — Agents that earn responsibility.*
