# Agent Charter Template

**Product:** Evidence Room — AP Agent OS  
**Use:** One charter per agent, per legal-entity scope (or per SSC if the SSC is the control environment). Complete before the agent is allowed to produce recommendations in the system of record.  
**Related:** `00_AGENT_STACK_OVERVIEW.md`, `AUTONOMY_PROGRESSION.md`, `HUMAN_VS_AGENT_DECISION_FRAMEWORK.md`, and the agent specification.

This file contains (A) a blank charter and (B) a completed example for the Matching Agent at Northline Industrials. Copy the blank. Do not edit the example in place — it is a teaching artefact.

---

# A. Blank charter

## A1. Identification

| Field | Value |
|---|---|
| Agent ID / name | |
| Specification file | |
| Legal entities in scope | |
| ERP company codes / ledgers | |
| Document types in scope | |
| Document types out of scope | |
| Commissioning date | |
| Charter owner (human, named) | |
| Deputy | |
| Control reviewer (not the owner) | |
| Orchestrator work-queue name | |

## A2. Purpose (four sentences maximum)

State the job in operational language. Do not state a savings, ROI, fraud, compliance, or accuracy guarantee.

1.
2.
3.
4.

## A3. Autonomy

| Field | Value |
|---|---|
| Commissioning level | L0 / L1 (circle one; L2+ requires a promotion record) |
| Allowed object types at this level | |
| Hard ceiling (level this agent will never exceed without a new charter) | |
| Payment-adjacent? (Y/N) | If Y, ceiling is L2 prepare / annotate only |
| Promotion evidence pack location | |

## A4. Job description (attach or paste)

Paste the “Job description” section from the agent specification and strike any sentence that does not apply to this entity. Add entity-specific sentences below.

Entity-specific additions:

-

## A5. Inputs

| Input | Source system | Freshness required | Owner of source | Mandatory? |
|---|---|---|---|---|
| | | | | |
| | | | | |

## A6. Tools / data required

| Tool or data set | Access pattern | Privilege | Secret / key owner | Residual risk |
|---|---|---|---|---|
| | | | | |

## A7. Responsibilities (in-scope actions)

Numbered. Each line is an action the agent is allowed to attempt at the commissioning level.

1.
2.
3.

## A8. Explicit exclusions

Numbered. If an action is not listed in A7, it is excluded. Still write the dangerous ones explicitly.

1. Payment authorisation or release
2. Vendor bank-detail create or change
3.
4.

## A9. Human owner

| Field | Value |
|---|---|
| Role | |
| Named person (at commissioning) | |
| Time-to-cover if absent | |
| Backup | |
| Escalation manager | |
| Decision rights (see framework) | |

## A10. Approval requirements

| Action the agent may propose | Approver | Threshold / condition | Evidence required before approval | SLA for approval |
|---|---|---|---|---|
| | | | | |

## A11. Escalation criteria

| Condition | Escalate to | Time | Required packet |
|---|---|---|---|
| | | | |

## A12. Output standard

| Output | Format | Destination | Freshness | Naming / ID rule |
|---|---|---|---|---|
| | | | | |

Minimum fields every output must carry: object ID, agent ID, autonomy level in force, evidence URI, timestamp, human owner, recommendation (if L1+), confidence / exception code.

## A13. Control requirements

| Control | How this agent supports it | Test / sample |
|---|---|---|
| | | |

## A14. Audit evidence

| Evidence type | Retention | Location | Who can retrieve |
|---|---|---|---|
| | | | |

## A15. KPIs (operating discipline — not financial promises)

| KPI | Definition | Source | Cadence | Use |
|---|---|---|---|---|
| | | | | |

Forbidden as KPIs: guaranteed savings, ROI, “fraud caught,” “compliance rate,” “accounting accuracy.”

## A16. Performance history fields

These fields are written every operating period (weekly at L0/L1; daily if volume requires).

| Field | Description |
|---|---|
| Period | |
| Volume presented | |
| Volume acted (by type) | |
| Human accept / edit / reject counts | |
| Material error count (definition attached) | |
| Escalations | |
| SLA breaches | |
| Cost (licence + model + exception minutes) | |
| Autonomy level in force | |
| Incidents | |
| Demotion / pause events | |

## A17. Failure handling

| Failure mode | Detect | Immediate action | Human notification | Resume rule |
|---|---|---|---|---|
| Source unavailable | | | | |
| Extract / model timeout | | | | |
| Confidence below floor | | | | |
| Conflicting recommendations | | | | |
| Suspected duplicate of agent output | | | | |
| Privilege / access error | | | | |

## A18. Cost monitoring

| Cost element | Meter | Owner who sees it | Pause threshold | Notes |
|---|---|---|---|---|
| Capture / IDR | | | | |
| Model / inference | | | | |
| Connector / iPaaS | | | | |
| Exception minutes (human) | | | | |
| Rework after reject | | | | |

Pause threshold is an operating brake, not a savings target.

## A19. Handoffs

| From | To | Trigger | Artefact |
|---|---|---|---|
| | | | |

## A20. Sign-off

| Role | Name | Date | Statement |
|---|---|---|---|
| Charter owner | | | I own this agent’s outcomes and exclusions. |
| Control reviewer | | | I have read exclusions, payment ceiling, and evidence plan. |
| AP Process Owner | | | This agent is on the stack register at the stated level. |
| IT / ERP owner | | | Access listed in A6 is provisioned as least privilege. |
| Internal Audit (optional observer) | | | Noted. Observation is not approval of design sufficiency. |

Promotion, demotion, or scope change requires a new signed charter version. Informal prompt edits that change behaviour are a change-control breach.

---

# B. Completed example — Matching Agent, Northline Industrials

Teaching artefact. Fictional company. Not a client file. Not a performance promise.

## B1. Identification

| Field | Value |
|---|---|
| Agent ID / name | AGENT_03 Matching Agent |
| Specification file | `AGENT_03_MATCHING.md` |
| Legal entities in scope | Northline Industrials US-OH (Dayton), US-AL (Birmingham). CA and MX remain L0-observe only under a separate charter. |
| ERP company codes / ledgers | US-OH 1000, US-AL 1100; Dynamics 365 Finance, ledger USMF |
| Document types in scope | PO invoices (3-way inventory / direct; 2-way contracted services ≤ $10,000) |
| Document types out of scope | Non-PO, utilities, rent, intercompany, employee expenses, customs entries, consignment until Wave 3 |
| Commissioning date | 7 April 2026 |
| Charter owner (human, named) | Priya Shah, AP Match Lead, Cleveland SSC |
| Deputy | Marcus Bell, AP Operations Lead |
| Control reviewer (not the owner) | Elena Ruiz, AP Controls Lead |
| Orchestrator work-queue name | `NL.MATCH.US.PO` |

## B2. Purpose

1. Apply Northline’s written 2-way and 3-way match rules to in-scope PO invoices after Validation has passed.
2. Produce a match worksheet that a specialist can accept, edit, or reject in one sitting.
3. Hand breaks to Exception Triage with a coded reason; do not invent receipts or change POs.
4. Remain at L1 until the promotion record in the autonomy register says otherwise.

## B3. Autonomy

| Field | Value |
|---|---|
| Commissioning level | L1 |
| Allowed object types at this level | PO invoices, companies 1000 and 1100, header amount ≤ $50,000, single PO, single receipt or open-receipt set already in D365 |
| Hard ceiling | L3 for *clean in-tolerance match recommend-to-post only*, after gates; never payment; never tolerance edit |
| Payment-adjacent? | N for match itself; downstream payment remains human |
| Promotion evidence pack location | `//northline/evidence-room/agents/03/autonomy/` |

## B4. Job description (entity-specific)

The Matching Agent compares invoice header and lines to PO and goods-receipt (or service-entry) data in Dynamics 365 Finance using Northline procedure AP-MAT-004. It writes a worksheet: matched / quantity-price-tax break / missing GR / PO defect / routed-out-of-scope. It does not post. It does not create GR. It does not change PO price, quantity, tax, or vendor.

Entity-specific additions:

- Dayton plant uses warehouse-managed receipts; Birmingham uses finance-posted GR. The agent must read both receipt tables.
- Tolerance: quantity ±2% or 1 unit (greater); price ±1% or $25 (greater); tax variance referred to Tax, not auto-cleared.
- Multi-PO invoices are out of scope at commissioning and route to Triage code `MULTI_PO`.

## B5. Inputs

| Input | Source system | Freshness required | Owner of source | Mandatory? |
|---|---|---|---|---|
| Validated invoice extract | Agent 01/02 work object | Same day as validation pass | AP Quality Lead | Y |
| PO header and lines | D365 PurchTable / PurchLine | Near-real-time | Procurement Ops | Y |
| Product receipt / GR | D365 VendPackingSlip / WMS | Near-real-time | Plant warehouse | Y for 3-way |
| Service entry / timesheet accept | D365 / project | T+0 business day | Project / plant | Y for 2-way services |
| Tolerance table AP-MAT-004 | SharePoint controlled doc + ERP matching setup | Version-pinned | Controller | Y |
| Duplicate/anomaly flag | Agent 10 | Same object | AP Controls Lead | N (if present, hold match recommend) |
| Vendor master (tax, currency, block) | D365 VendTable | Daily | Vendor Master | Y |

## B6. Tools / data required

| Tool or data set | Access pattern | Privilege | Secret / key owner | Residual risk |
|---|---|---|---|---|
| D365 OData / custom inquiry | Read PO, GR, invoice pending | Read-only service account `svc-ap-match` | IT Security | Over-privilege if write is added later |
| Orchestrator queue API | Read/write work object | Queue write | AP Process Owner | Status spoofing — signed events required |
| Invoice image store | Read | Read | AP Ops | PII / pricing on image |
| Tolerance table | Read, version hash | Read | Controller | Stale version — pin hash in every worksheet |
| IDR confidence payload | Read | Read | AP Quality | Over-trust of extract — Validation must have passed |

No write to D365 vendor, PO, or payment tables.

## B7. Responsibilities (L1)

1. Retrieve the validated extract and the related PO / GR set.
2. Determine match path: 3-way inventory/direct, 2-way services ≤ $10,000 with contract reference, or out-of-scope.
3. Apply AP-MAT-004 tolerances. Record the version hash.
4. Produce a worksheet with line-level compare, break codes, and a single recommendation: `RECOMMEND_MATCH`, `RECOMMEND_HOLD_MISSING_GR`, `RECOMMEND_ROUTE_PO_QUALITY`, `RECOMMEND_ROUTE_TRIAGE`, `RECOMMEND_NO_ACTION_ANOMALY_HOLD`.
5. If Agent 10 has an open flag on the object, force `RECOMMEND_NO_ACTION_ANOMALY_HOLD`.
6. Hand the worksheet to the human match specialist via queue `NL.MATCH.US.PO`.
7. Write audit evidence (B14).
8. Update Orchestrator status and SLA clock.

## B8. Explicit exclusions

1. Payment authorisation or release.
2. Vendor bank-detail create or change.
3. Posting the vendor invoice in D365.
4. Creating or editing a product receipt.
5. Changing PO price, quantity, tax group, vendor, or account assignment.
6. Editing the tolerance table.
7. Clearing an Agent 10 flag.
8. Contacting the supplier.
9. Approving a non-PO invoice.
10. Applying a quantity or price override, even if “the buyer said so” in email — that is a human worksheet edit.
11. Mexican IVA or Canadian GST determination.
12. Intercompany or customs invoices.

## B9. Human owner

| Field | Value |
|---|---|
| Role | AP Match Lead |
| Named person | Priya Shah |
| Time-to-cover if absent | Next business day |
| Backup | Marcus Bell |
| Escalation manager | AP Manager, Cleveland SSC |
| Decision rights | Accept / edit / reject every L1 worksheet; request promotion evidence; pause the agent |

## B10. Approval requirements

| Action the agent may propose | Approver | Threshold / condition | Evidence required | SLA |
|---|---|---|---|---|
| `RECOMMEND_MATCH` | Match specialist (human) | All in-scope; header ≤ $50,000 | Worksheet + image + PO/GR + tolerance hash | Same business day if received by 14:00 ET |
| `RECOMMEND_MATCH` | Plant Controller + Match Lead | Header > $50,000 | Same, plus buyer confirmation if price break was manually edited | 2 business days |
| Route to GR / PO Quality / Triage | Exception Desk Lead (auto-route OK at L1) | Any coded break | Break code + facts | Immediate |
| Any posting (not in force) | n/a | Not authorised at L1 | — | — |

## B11. Escalation criteria

| Condition | Escalate to | Time | Required packet |
|---|---|---|---|
| Same invoice fails match 3 times with changing extracts | AP Quality Lead | On third fail | Extract versions |
| PO and GR exist but tax variance > $100 | Tax desk | Same day | Tax worksheet |
| Header > $50,000 with quantity *and* price break | Plant Controller | Same day | Full worksheet |
| Agent 10 flag + match would otherwise be clean | AP Controls Lead | Before any human match accept | Flag + worksheet |
| Service account cannot read GR for > 2 hours | IT + Match Lead | 2 hours | Job log |
| Specialist reject rate > 15% over 200 invoices | AP Process Owner | Weekly review | Reject codes |

## B12. Output standard

| Output | Format | Destination | Freshness | Naming |
|---|---|---|---|---|
| Match worksheet | JSON + PDF snapshot | Orchestrator + evidence store | On completion | `NL-M3-{company}-{invoice}-{yyyyMMddHHmm}` |
| Break handoff | Work object update | Agents 04/05/06 | Immediate | Same object ID |
| Daily shadow register | CSV | Controls Lead | 18:00 ET | `NL-M3-shadow-yyyyMMdd` |

Minimum fields: object ID, agent `03`, level `L1`, evidence URI, timestamp, owner `Priya Shah` or on-duty specialist, recommendation, confidence, tolerance hash, company, invoice, PO, GR IDs, line compares, Agent 10 flag state.

## B13. Control requirements

| Control | How this agent supports it | Test / sample |
|---|---|---|
| 3-way match policy | Applies AP-MAT-004; cannot post | Weekly sample 25 worksheets vs ERP |
| SoD: match vs pay | No payment privilege | Quarterly access review |
| Tolerance integrity | Version hash on every worksheet | Monthly hash reconcile to controlled doc |
| Duplicate hold | Cannot recommend match over open flag | 100% test of flagged objects |
| Audit trail | Worksheet + image + user accept log | Retrievable by invoice in < 15 minutes |

## B14. Audit evidence

| Evidence type | Retention | Location | Who can retrieve |
|---|---|---|---|
| Worksheet JSON/PDF | 7 years | Evidence store `agents/03` | Match Lead, Controls, IA |
| Tolerance hash + policy PDF | 7 years | Controlled docs | Controller |
| Human accept/edit/reject log | 7 years | Orchestrator | AP Process Owner |
| Service-account access log | 1 year | SIEM | IT Security |
| Promotion / pause records | Life of programme | Autonomy register | Process Owner |

## B15. KPIs

| KPI | Definition | Source | Cadence | Use |
|---|---|---|---|---|
| Worksheet completeness | % of in-scope invoices with a worksheet same day as validation pass | Orchestrator | Daily | Coverage |
| Human accept rate | Accepts / (accept + edit + reject), by break code | Orchestrator | Weekly | Quality of recommendation |
| Material error | Human-accepted worksheet later reversed for match error | ERP + desk log | Monthly | Demotion input |
| Misroute rate | Breaks sent to wrong agent, confirmed by Triage | Orchestrator | Weekly | Handoff quality |
| SLA on $50k+ packets | % escalated packets complete on time | Orchestrator | Weekly | Control timeliness |
| Cost per 1,000 in-scope invoices | Model + connector + specialist minutes | Cost ledger | Monthly | Pause threshold |

No savings, ROI, or “accuracy guarantee” KPI.

## B16. Performance history fields

Period; volume presented; worksheets produced; accept / edit / reject; material errors; escalations; SLA breaches; cost; level in force (`L1`); incidents; demotion/pause; Agent 10 holds encountered; multi-PO routed-out count; companies 1000/1100 split.

## B17. Failure handling

| Failure mode | Detect | Immediate action | Notify | Resume |
|---|---|---|---|---|
| D365 read fail | Connector health | Queue freeze; no stale match | IT + Match Lead | After successful probe + one sample worksheet |
| Timeout | Job SLA 120s | Retry once; then fail object to human | On-duty specialist | Object-level only |
| Confidence / incomplete extract | Validation not `pass` | Refuse to match; return to 02 | Quality Lead if repeat | When 02 passes |
| Conflicting GR set | >1 plausible GR set | `RECOMMEND_ROUTE_TRIAGE` code `GR_AMBIGUOUS` | Exception Desk | n/a |
| Open Agent 10 flag | Flag state | Force anomaly hold | Controls Lead | After human clear |
| Access error | 401/403 | Stop all jobs | IT Security | After recertified privilege |

## B18. Cost monitoring

| Cost element | Meter | Owner who sees it | Pause threshold | Notes |
|---|---|---|---|---|
| Model / inference | Tokens / invoice | Match Lead + Process Owner | > 2× first-month baseline for 3 weeks *and* accept rate falling | Pause is a brake |
| D365 connector | Calls | IT | Sustained error rate > 5% | |
| Specialist minutes | Time on reject/edit | AP Manager | Edit+reject > 40% for 2 weeks | Agent is costing more than it saves in attention — demote to L0 |
| Rework | Reversals | Controller | Any material error cluster ≥ 5 in a week | Immediate L0 |

## B19. Handoffs

| From | To | Trigger | Artefact |
|---|---|---|---|
| Agent 02 | Agent 03 | Validation pass | Validated extract |
| Agent 10 | Agent 03 | Open flag | Flag record (blocks recommend-match) |
| Agent 03 | Human specialist | Worksheet ready | Worksheet |
| Agent 03 | Agent 04 | Coded break | Break object |
| Agent 03 | Agent 05 | Missing GR | GR chase pack seed |
| Agent 03 | Agent 06 | PO defect code | PO defect seed |
| Human specialist | ERP (human) | Accepted match | Human posts |

## B20. Sign-off (illustrative)

| Role | Name | Date | Statement |
|---|---|---|---|
| Charter owner | Priya Shah | 7 Apr 2026 | I own this agent’s outcomes and exclusions. |
| Control reviewer | Elena Ruiz | 7 Apr 2026 | Exclusions, payment ceiling, and evidence plan read. |
| AP Process Owner | James Okoye | 7 Apr 2026 | On the stack register at L1. |
| IT / ERP owner | Chris Nguyen | 7 Apr 2026 | `svc-ap-match` is read-only as listed. |
| Internal Audit (observer) | Samira Haddad | 8 Apr 2026 | Noted. |

---

## C. How to fill this in 90 minutes

1. Open the agent specification. Copy Job description, Exclusions, KPIs, Failure handling.
2. Strike anything not true for this entity (country, document type, ERP table).
3. Name the owner and the control reviewer. They cannot be the same person.
4. Set commissioning level to L0 unless you already have two weeks of shadow evidence.
5. Write the payment sentence even if the agent is not payment-adjacent: “This agent does not authorise payment.”
6. Pin the policy document versions (match, DOA, duplicate).
7. List every system access. If write access is requested, stop and get the Process Owner.
8. Sign. File under the autonomy register. Tell Orchestrator the queue name.

A charter that says “the agent will reduce exceptions and catch fraud” is rejected. Rewrite in operating language.
