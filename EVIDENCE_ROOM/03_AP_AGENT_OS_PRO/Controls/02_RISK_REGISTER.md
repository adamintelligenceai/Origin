# Evidence Room — AP Agent OS Professional

## Controls — 02 Risk Register

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Controls  
**Standard:** Proof before permission  
**Audience:** Control owner, Controller, Head of AP, Internal Audit, Finance Systems  
**Version:** 1.0  
**Examples:** ACME rows labelled **ILLUSTRATIVE**. Scores are buyer-set. This register does not quantify expected loss.

---

### Purpose

Hold the material risks of running AP with agents — including the risk of **not** controlling them, and the risk of **false assurance**. Exception codes are symptoms; this file is the risk view.

### How to use

1. Copy to a workbook.  
2. Score likelihood and impact with the buyer’s existing risk scale (do not import a fake 1–5 “industry” scale here).  
3. Link each risk to matrix rows and taxonomy codes.  
4. Residual rating after controls, with owner and next review.  
5. Close only when the scenario is retired (e.g. agent decommissioned), not when a meeting was held.

---

## Scoring method (buyer completes)

| Field | Buyer definition |
|---|---|
| Likelihood scale | `[BUYER]` |
| Impact scale | `[BUYER]` — include financial, operational, legal/privacy, reporting |
| Residual acceptable | `[BUYER]` risk appetite note |
| Review cycle | Default quarterly, or at every C3 change |

Do not multiply invented numbers to produce a “risk score” that looks scientific.

---

## Register (standard catalogue)

Add local IDs if the enterprise GRC already has a sequence. Keep `RR-AP-…` as the Evidence Room cross-reference.

| ID | Risk | Cause (probable) | Effect | Linked codes | Linked matrix / controls | Inherent (buyer) | Residual (buyer) | Owner | Review | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| RR-AP-001 | Incomplete or wrong extraction treated as a valid invoice | OCR/model error; schema not enforced | Wrong match, wrong pay, rework | EX-QLT-001, EX-QLT-002 | Intake completeness; cite-check | `[ ]` | `[ ]` | AP Manager | | Open |
| RR-AP-002 | Invoice posted to the wrong legal entity | Routing error; lookalike vendor | Tax, statutory books, intercompany mess | EX-MDM-002 | Entity allow-list | `[ ]` | `[ ]` | Controller | | Open |
| RR-AP-003 | Wrong supplier | Lookalike name; master-data quality | Pay away; statement noise | EX-MDM-001 | Supplier validation | `[ ]` | `[ ]` | MD steward | | Open |
| RR-AP-004 | Duplicate payment | Exact or near duplicate missed; hold not enforced | Cash out, recovery cost | EX-DUP-001, EX-DUP-002, EX-PAY-002 | DUP block on proposal | `[ ]` | `[ ]` | Head of AP | | Open |
| RR-AP-005 | Price / quantity paid off-PO without policy | Model “approx” match; silent tolerance | Overpay; policy breach | EX-MAT-001, EX-MAT-002, EX-PO-004 | Deterministic match; config lock | `[ ]` | `[ ]` | Head of AP | | Open |
| RR-AP-006 | Paid with no receipt where policy requires | GR created by agent; chase abandoned | Inventory / GRNI / fraud-adjacent leakage (no guarantee of detection) | EX-GR-001, EX-GR-002 | GR-create deny; ageing | `[ ]` | `[ ]` | GR owner + AP Mgr | | Open |
| RR-AP-007 | PO closed / exhausted / invalid still used | After-the-fact behaviour; agent “helps” | Unauthorised spend | EX-PO-001–004 | PO quality + match stops | `[ ]` | `[ ]` | Procurement lead | | Open |
| RR-AP-008 | Tax treatment invented | Model overrides tax engine | Incorrect tax books | EX-TAX-001 | Engine supremacy | `[ ]` | `[ ]` | Tax owner | | Open |
| RR-AP-009 | Approval / DOA bypassed | Prompt auto-approve; OOO delegation | Unauthorised spend | EX-APR-001, EX-APR-002 | Approve-verb deny | `[ ]` | `[ ]` | Controller | | Open |
| RR-AP-010 | Coding to wrong / invalid cost object | Agent fills gaps to STP | Misstated P&L / budget | EX-COD-001, EX-COD-002 | Coding write rules | `[ ]` | `[ ]` | Controller | | Open |
| RR-AP-011 | Vendor bank details changed from document text | Injection or “helpful” extraction | Misdirected payment | EX-PAY-001 | Bank-change path; hold | `[ ]` | `[ ]` | Treasury | | Open |
| RR-AP-012 | Payment released by or through an agent identity | Over-privileged token | Direct cash harm | — | Proposal edit/release deny | `[ ]` | `[ ]` | Payment authoriser + FinSys | | Open |
| RR-AP-013 | Credit note not obtained or duplicated | Weak CN control | Overpay remains | EX-CN-001 | Human accept before send | `[ ]` | `[ ]` | Exception owner | | Open |
| RR-AP-014 | Statement differences ignored | Rec is cosmetic | Hidden unrecorded invoices / overpay | EX-STM-001 | Rec cycle detective | `[ ]` | `[ ]` | AP Manager | | Open |
| RR-AP-015 | Disputed invoice paid | Dispute flag dropped by orchestrator | Cash + supplier conflict | EX-DSP-001 | Priority floor | `[ ]` | `[ ]` | Head of AP | | Open |
| RR-AP-016 | Aged items unmanaged | Queue cosmetics; agent hides | Close surprise; supplier damage | EX-AGE-001 | Ageing reports | `[ ]` | `[ ]` | AP Manager | | Open |
| RR-AP-017 | Interface / identity failure not failed-closed | Job fails; agent continues on stale data | Wrong match on old PO/GR | EX-SYS-001 | Heartbeat; fail-closed | `[ ]` | `[ ]` | FinSys | | Open |
| RR-AP-018 | Prompt injection succeeds | Untrusted PDF/email as instructions | Verb/recipient/bank change | EX-QLT-001, EX-PAY-001, EX-SYS-001 | Injection tests; policy engine | `[ ]` | `[ ]` | Control owner | | Open |
| RR-AP-019 | Hallucinated IDs/amounts in drafts or reports | Uncited generation | Wrong chase, wrong board pack | — | Cite-check; pack extract IDs | `[ ]` | `[ ]` | AP Manager | | Open |
| RR-AP-020 | Privacy / confidential leak via prompt, log, or vendor | Over-collection; consumer tools | Personal/commercial data exposure | — | Inventory; deny-list; approved tools | `[ ]` | `[ ]` | Privacy | | Open |
| RR-AP-021 | Autonomy / model change without evidence | Sponsor pressure; vendor silent update | Uncontrolled behaviour | — | Hash pin; one-increment | `[ ]` | `[ ]` | Head of AP + FinSys | | Open |
| RR-AP-022 | Override / force-path becomes the process | Validators noisy; deadline | Controls on paper only | — | OV log; dual FCE | `[ ]` | `[ ]` | Control owner | | Open |
| RR-AP-023 | False assurance / vanity STP | Activity KPIs only | Promotion of a harmful agent | — | Dictionary; risk-control block | `[ ]` | `[ ]` | Controller (financial lines) + Head of AP | | Open |
| RR-AP-024 | SoD broken by a shared agent identity | Template role with write+release | Classic AP fraud path (no detection claim) | — | SoD on identities | `[ ]` | `[ ]` | Control owner | | Open |
| RR-AP-025 | No fallback / BCP for vendor loss | Agent as system of record | Cannot pay or cannot evidence | EX-SYS-001 | Fallback drills | `[ ]` | `[ ]` | Controller (BCP) | | Open |
| RR-AP-026 | Orchestrator privilege escalation | Orchestrator can edit charters | Unauthorised L3+ | — | Orchestrator exclusions | `[ ]` | `[ ]` | FinSys + Control | | Open |
| RR-AP-027 | Unvalidated “savings” published | Reporting Agent or slideware | Misleading governance decisions | — | Controller sign-off | `[ ]` | `[ ]` | Controller | | Open |
| RR-AP-028 | Residual procedural-only control on a money-adjacent risk | Platform cannot enforce cap | Control exists only as a memo | varies | Risk accepted with expiry **or** autonomy ≤ L1 | `[ ]` | `[ ]` | Control owner | | Open |

---

## How to add a risk

**What to do.** If a pilot reveals a scenario not listed, add a row before the next promotion.

**How.** Write cause, effect, codes, matrix rows. Do not add “AI risk” as a single line.

**Who.** Control owner accepts new IDs. Accountable of the related agent is Informed.

**What can go wrong.** Register becomes a graveyard of unread red rows. Or every row is “medium” forever.

**Control.** Quarterly review: each Open risk has a next action or an explicit accept-with-expiry.

**Measure.** Overdue reviews; risks with no matrix link; Sev-1/2 incidents that had no register row (gap).

**Evidence.** Workbook version; review minutes; incident cross-refs.

---

## ACME — ILLUSTRATIVE

ACME adds RR-AP-029 (local): “Plant East still receipts in a warehouse system that is not interfaced; Matching Agent reads ERP GR only.” Linked to EX-GR-001 FNR. Residual accepted until the interface project date; Matching Agent for Plant East stays L1. No group-wide L3 GR chase until that row closes.

---

## Related documents

- `00_CONTROL_FRAMEWORK.md`  
- `01_CONTROL_MATRIX.md`  
- `03_EXCEPTION_TAXONOMY.md`  
- `../Governance/03_INCIDENT_AND_OVERRIDE.md`  

---

*End of 02_RISK_REGISTER.md*
