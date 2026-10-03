# Risk Register

**Product:** AP Agent OS — Evidence Room  
**Owner:** Control owner (design) with process owner (operation)  
**Review:** Quarterly, and after any incident or authority expansion  
**Example values:** Northline Industrials, NIL PO-goods, propose-only first release

This register records **process, control, privacy, and operational risks** of running AP agents. It does not score residual fraud risk for the enterprise, does not assert compliance, and does not estimate ROI.

**Scoring (local, ordinal):** Impact 1–5, Likelihood 1–5, Score = I × L.  
Treat 16–25 as executive-visible. Scores are discussion aids, not precision.

**Status:** Open / Accepted / Mitigating / Closed  
**Risk id** stays stable. Do not reuse ids.

---

## Register header

| Field | Value |
|---|---|
| Organisation | Northline Industrials (fictional example) |
| Scope | AP Agent OS on NIL PO-goods; agents 1–16 propose-only |
| Version / date | v03 / 2026-04-17 |
| Control owner | Priya Shah |
| Process owner | Marcus Chen |
| Last review | 2026-04-17 |

---

## Inherent-risk themes

| Theme | Why it matters here |
|---|---|
| Wrong post | Quantity, price, entity, or supplier error becomes a book entry |
| Duplicate post | Two documents for one liability |
| Payee-data substitution | Bank master or payment input points at the wrong account |
| Authority leak | Agent or operator exceeds DOA / allowed action |
| Untrusted content | Invoice and email text attempt to steer tools |
| Silent change | Model, prompt, or tolerance changes without test |
| Evidence gap | Cannot reconstruct why an item posted |
| Continuity | Agent outage without a usable human SOP |
| Privacy | Images, names, and bank data over-shared with models or suppliers |
| Misdescription | Users or vendors treat flags as fraud detection or compliance |

---

## Register

| ID | Risk | Theme | Inherent I/L/S | Current controls | Residual I/L/S | Status | Owner | Next action / due |
|---|---|---|---|---|---|---|---|---|
| R-01 | Invoice posts to the wrong legal entity | Wrong post | 5 / 3 / 15 | DT-ID, 02 Invoice Validation, EX-ILE, processor accept | 5 / 2 / 10 | Mitigating | Shah | Shadow EX-ILE misses; expand only if none posted — 2026-06-01 |
| R-02 | Invoice posts against the wrong supplier account | Wrong post | 5 / 3 / 15 | DT-ID, EX-WSP, master lookup | 5 / 2 / 10 | Mitigating | Chen | Site-vs-head-office cases in gold-label — 2026-05-15 |
| R-03 | Duplicate invoice posts | Duplicate post | 5 / 3 / 15 | CM-DUP-01, 10 Duplicate & Anomaly, SoD on X4 | 5 / 2 / 10 | Mitigating | Shah | Include other-site pairs in hold-out — 2026-05-15 |
| R-04 | Near-duplicate missed (site split / OCR collision) | Duplicate post | 4 / 4 / 16 | DT-DUP secondary tests, EX-PDUP to AP lead | 4 / 3 / 12 | Open | Voss | Group-id quality review with master data — 2026-05-30 |
| R-05 | Goods invoice posts above received quantity | Wrong post | 4 / 4 / 16 | DT-GRN, EX-MRX/PRX/QTM, no email-GRN | 4 / 2 / 8 | Mitigating | Chen | Daily posted-without-GRN query in pilot |
| R-06 | Price variance posts outside tolerance | Wrong post | 4 / 3 / 12 | Signed table, EX-PRM, no chat-acceptance | 4 / 2 / 8 | Accepted | Shah | Accept residual on informal buyer habit; sample weekly |
| R-07 | Closed or exhausted PO used | Wrong post | 4 / 3 / 12 | DT-PO, 03 Matching snapshots | 4 / 2 / 8 | Mitigating | Chen | Residual arithmetic in historical pack |
| R-08 | Bank details on an invoice overwrite or silently update master | Payee-data | 5 / 3 / 15 | EX-BNK, no agent write, independent steward procedure, hold candidate | 5 / 1 / 5 | Mitigating | Shah | Kill-switch drill including EX-BNK — 2026-05-20 |
| R-09 | Both legs of a duplicate listed into the payment pack | Payee-data / Duplicate | 5 / 2 / 10 | 12 Payment Proposal Review × Duplicate cross-check | 5 / 1 / 5 | Mitigating | Voss | Each-run control from pilot day 1 |
| R-10 | Agent or integration principal releases payment | Authority leak | 5 / 2 / 10 | No release tool; treasurer A; log vs agent id | 5 / 1 / 5 | Accepted | Reid | Recertify tools quarterly |
| R-11 | Agent approves spend or raises DOA | Authority leak | 5 / 2 / 10 | No approve tool; EX-DOA on splits | 5 / 1 / 5 | Mitigating | Shah | Split-heuristic cases in test pack |
| R-12 | Prompt injection via PDF or supplier email causes a tool call | Untrusted content | 4 / 3 / 12 | Content/instruction split, allow-list, injection tests | 4 / 2 / 8 | Mitigating | Test lead | Injection pack every model change |
| R-13 | Extraction invents amounts or PO numbers | Wrong post | 4 / 4 / 16 | Grounding, floors, EX-OCR, processor keying | 4 / 2 / 8 | Mitigating | Chen | Field accuracy floors in scorecard |
| R-14 | Production model swapped by vendor without re-test | Silent change | 4 / 3 / 12 | Pinned model id, vendor-risk, incident fallback | 4 / 2 / 8 | Open | Park | Written pin + deprecation notice in contract — 2026-06-15 |
| R-15 | Tolerance or prompt changed without release | Silent change | 4 / 3 / 12 | Version control, dual A on authority, config hash in logs | 4 / 1 / 4 | Mitigating | Shah | Hash monitor weekly |
| R-16 | Posted invoice cannot produce an evidence pack | Evidence gap | 3 / 4 / 12 | CM-EVD-01, 16 Orchestrator, monthly sample | 3 / 2 / 6 | Mitigating | Shah | Close email-chase gap on register — 2026-07-01 |
| R-17 | Chat/email approvals used as the record | Authority leak | 4 / 4 / 16 | System-of-record rule; compensating control or EX-APM | 4 / 3 / 12 | Open | Shah | Decision on compensating email rule — 2026-05-31 |
| R-18 | Agent outage with no practiced human SOP | Continuity | 3 / 3 / 9 | Fallback SOP, BCP note | 3 / 2 / 6 | Mitigating | Chen | One desktop exercise in pilot window |
| R-19 | Full mailbox or unmasked IBAN sent to a model | Privacy | 4 / 3 / 12 | Item-scope prompts, masking, vendor training-use off | 4 / 2 / 8 | Mitigating | Privacy | Prompt-size monitor |
| R-20 | Statement line posted as an invoice | Wrong post | 4 / 2 / 8 | DT-CLASS, 11 Vendor Statement forbid | 4 / 1 / 4 | Accepted | Chen | Daily created-from-statement query |
| R-21 | Wrong taxonomy code delays a Critical path (EX-BNK treated as EX-IQ) | Authority / payee | 5 / 3 / 15 | Master tree order, risk-level routing | 5 / 2 / 10 | Mitigating | Voss | Critical-code accuracy in weekly report |
| R-22 | Override culture: processors accept all proposals | Wrong post | 3 / 4 / 12 | Override logging, sample of accepts, shadow disagreement | 3 / 3 / 9 | Open | Chen | Accept-rate commentary in weekly pack |
| R-23 | Override culture: processors ignore a correct tree | Control | 3 / 3 / 9 | Override reasons, training vs tree-change | 3 / 2 / 6 | Mitigating | Chen | Reason codes mandatory from pilot |
| R-24 | Users describe Duplicate/Quality flags as “fraud detection” | Misdescription | 3 / 4 / 12 | Language rules in SOP, UI, scorecard | 3 / 2 / 6 | Mitigating | Shah | Copy review each release |
| R-25 | Hours-released reported as validated financial savings | Misdescription | 2 / 4 / 8 | KPI definitions; validation method required | 2 / 2 / 4 | Mitigating | Shah | Finance commentary rights on the dashboard |
| R-26 | Intercompany / FX / non-PO volume handled on the PO-goods path | Wrong post | 4 / 3 / 12 | Path filters; out-of-scope marked | 4 / 2 / 8 | Open | Chen | Separate maps before any expansion |
| R-27 | Freight split standing cost centre remains undocumented | Wrong post | 3 / 4 / 12 | Gap register; do not agentise freight until ruled | 3 / 3 / 9 | Open | Chen / Okonkwo | Write the freight rule or return freight as EX-IQ — 2026-05-31 |
| R-28 | EX-SYS retry doubles a post | Duplicate post | 5 / 2 / 10 | Unknown-commit protocol; no auto-retry of commit | 5 / 1 / 5 | Mitigating | Park / Voss | Include in test scripts |
| R-29 | Leaver retains mailbox or config access | Authority leak | 4 / 2 / 8 | Same-day RBAC termination, orphan review | 4 / 1 / 4 | Accepted | Park | Quarterly cert |
| R-30 | Vendor uses customer invoices to train a shared model | Privacy | 4 / 2 / 8 | Contract + config | 4 / 1 / 4 | Mitigating | Privacy | Annual attestation |
| R-31 | Credit allocated to the wrong original | Wrong post | 3 / 3 / 9 | Pairing keys, human accept | 3 / 2 / 6 | Mitigating | Chen | Credit cases in hold-out |
| R-32 | High EX-MRX ageing without warehouse engagement | Operational | 3 / 4 / 12 | Chase caps, EX-AGE to AP lead | 3 / 3 / 9 | Open | Chen | Warehouse SLA discussion — 2026-05-20 |
| R-33 | Kill-switch owner unavailable | Continuity | 4 / 2 / 8 | Named deputy; 15-minute target in hours | 4 / 1 / 4 | Mitigating | Chen | Deputy test in pilot |
| R-34 | Gold-label pack contaminated by tuning | Silent change | 3 / 3 / 9 | Sealed hold-out; tuner ≠ scorer | 3 / 1 / 3 | Accepted | Test lead | Access list on the seal |
| R-35 | Expansion to post without fresh shadow after an ERP change | Silent change | 4 / 3 / 12 | Stale-evidence rule in Step 10 | 4 / 1 / 4 | Accepted | Shah | ERP-change notification to test lead |

---

## Accepted risks (summary)

| ID | Why accepted | Review |
|---|---|---|
| R-06 | Buyer informality is a people issue; weekly sample is the compensating check | Quarterly |
| R-10 | Tooling and treasury SoD judged sufficient at propose-only | Quarterly |
| R-20 | Classification + daily query sufficient until statement path is agentised more deeply | At statement-path expansion |
| R-29 | Standard joiner-mover-leaver | Quarterly cert |
| R-34 | Seal process in place | Each test cycle |
| R-35 | Written into expansion method | Each ERP change |

Acceptance is not transferable to a new entity or to a post-authority expansion.

---

## Closed risks

None at v03. Use this section when a risk is eliminated by a design change (not merely accepted). Record date, evidence, and the person who closed it.

---

## Heat commentary (Northline v03)

Executive-visible residual scores sit on **R-04** (near-duplicates), **R-17** (email approvals), **R-27** (freight rule), and **R-32** (receipt ageing). None of these is solved by adding another agent. They are master-data, policy, and warehouse-operating issues. Agent work on NIL PO-goods should not be expanded to posting while R-01/R-03/R-05 still show posted misses in shadow or pilot.

---

## How to add a risk

1. Write the event as “X happens, leading to Y”.
2. Map a theme and an existing control id if one exists.
3. Score inherent first, then residual after named controls.
4. Assign one owner. “Team” is not an owner.
5. If residual ≥ 16 after controls, it is Open until a treatment exists — do not Accept on the same day you raise it.
