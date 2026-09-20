# RACI Template

**Product:** AP Agent OS — Evidence Room  
**Rule:** Every activity has exactly one **Accountable** name. Agents may be **Responsible** for propose / draft / route / chase / assemble. Agents are never Accountable.

**Codes:** R = Responsible, A = Accountable, C = Consulted, I = Informed

---

# Part A — Blank template

## Header

| Field | Value |
|---|---|
| Organisation | |
| Scope / path | |
| Version / date | |
| Process owner (A for the matrix itself) | |

## Role catalogue

| Role key | Human title / agent name | Named person (if known) | May be Accountable? |
|---|---|---|---|
| | | | Y/N |

## Matrix

| Activity | | | | | | | |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

Add role-key columns. Mark R/A/C/I. Leave cell blank if none.

## SoD notes

| Pair of activities | Must not be the same person | Compensating check if staffing forces overlap |
|---|---|---|
| | | |

## Sign-off

| Role | Name | Date |
|---|---|---|
| Process owner | | |
| Control owner | | |

---

# Part B — Northline Industrials, NIL PO-goods operating model

**Version:** v03 / 2026-04-17  
**Process owner:** Marcus Chen

## Role catalogue

| Role key | Human title / agent name | Named person | May be Accountable? |
|---|---|---|---|
| PO | AP Manager (process owner) | Marcus Chen | Y |
| CO | Financial Controller (control owner) | Priya Shah | Y |
| PR | AP processor | Roster | N (activity-level R only) |
| AL | AP lead | Elena Voss | Y for duplicate-close and hold-set |
| BY | Buyer | Named per PO | Y for commercial variance |
| RC | Receiver | Warehouse / site | N |
| MD | Master-data steward | Finance ops | Y for master changes |
| TX | Tax specialist | Group tax | Y for tax-code design |
| TR | Treasurer | Hannah Reid | Y for payment execution (out of this path’s commit) |
| IA | Internal audit | Optional reviewer | N |
| A01 | Invoice Intake | — | N |
| A02 | Invoice Validation | — | N |
| A03 | Matching | — | N |
| A04 | Exception Triage | — | N |
| A05 | Goods Receipt | — | N |
| A06 | PO Quality | — | N |
| A07 | Approval | — | N |
| A08 | Supplier Resolution | — | N |
| A09 | Internal Follow-up | — | N |
| A10 | Duplicate & Anomaly | — | N |
| A11 | Vendor Statement | — | N |
| A12 | Payment Proposal Review | — | N |
| A13 | AP Close | — | N |
| A14 | AP Reporting | — | N |
| A15 | Root Cause | — | N |
| A16 | Orchestrator | — | N |

## Matrix — process activities (human columns + selected agents)

Use the stack RACI in `../Agent_Library/00_AGENT_STACK_OVERVIEW.md` for the full 16-agent view. This path matrix shows humans plus the agents that touch NIL PO-goods daily. Agents 11–15 are I on this path unless a periodic object is in scope. Agent 16 (Orchestrator) is R for routing/SLA on every object and never A.

| Activity | PO | CO | PR | AL | BY | RC | MD | TX | TR | A01 | A02 | A03 | A04 | A05 | A06 | A07 | A08 | A09 | A10 | A12 | A16 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Accept process map and authority boundary | A | C | I | C | I | | | | | | | | | | | | | | | | I |
| File intake / extract / classify | A | I | R | C | | | | | | R | C | I | I | | | | | | I | | R |
| Identity, quality, tax-field check | A | C | R | C | | | C | C | | C | R | I | I | | | | | | C | | I |
| Duplicate / anomaly flag | A | C | R | C | | | | | | I | C | C | I | | | | | | R | I | I |
| Confirm duplicate close (X4) | C | A | I | R | | | | | | | | | | | | | | | I | I | I |
| Locate PO / residual / match | A | C | R | C | C | C | | | | I | C | R | I | C | C | | | | C | | I |
| Commercial price variance decision | C | I | I | C | A/R | | | | | | | I | I | | C | | | | | | I |
| Missing GR packet | A | I | R | C | C | C | | | | | | C | C | R | I | | | C | | | I |
| PO defect diagnosis | A | I | I | C | C | | | | | | | C | C | I | R | | | C | | | I |
| Route / chase approval | A | C | R | C | C | | | | | | | | C | | | R | | C | | | I |
| Approve (human) | I | C | I | I | R* | | | | I | | | | | | | I | | | | | I |
| Park with taxonomy code / owner / clock | A | I | R | C | I | I | I | I | | I | C | C | R | C | C | C | C | C | C | | R |
| Draft supplier chase | A | I | R | C | I | | | | | | | | I | | C | | R | I | | | I |
| Draft internal chase | A | I | R | C | C | C | | | | | | | I | C | C | C | I | R | | | I |
| Annotate payment proposal / holds | C | A | C | R | | | | | C | | | | | | | | | | C | R | I |
| Release payment | I | C | I | I | | | | | A/R | | | | | | | | | | | — | — |
| Bank-master change | I | A | I | I | | | R | | C | | I | | | | | | — | | I | I | I |
| Expand agent authority | A | A** | I | C | I | | I | I | I | I | I | I | I | I | I | I | I | I | I | I | I |
| Kill-switch / incident stop | A | A | I | R | I | | | | I | | | | | | | | | | | | I |

\* Approver is the DOA incumbent, often the buyer or a budget holder, not always the buyer on the PO.  
\** Expansion requires both process owner and control owner (dual A). Dash (—) means the agent shall not participate.

## SoD notes (Northline)

| Pair of activities | Must not be the same person | Compensating check if overlap is unavoidable |
|---|---|---|
| Create supplier + change bank + post first invoice | Same person must not do all three in one episode | CM-SOD-01 review by AP lead / controller |
| Confirm duplicate close + original capture | AP lead ≠ keyer | Controller sample if lead covered capture that day |
| Approve + post the same non-PO invoice | Approver ≠ processor | Not used on this PO path; listed for the non-PO map |
| Set hold + release payment | AP / controller ≠ treasury release | Payment execution remains with Treasurer |
| Change tolerance table + post invoices the same day | Controller or procurement owner ≠ processor | Change is a logged workflow change |
| Agent prompt/config change + production release | Implementer ≠ control owner | See governance release path |

## Sign-off (example)

| Role | Name | Date |
|---|---|---|
| Process owner | Marcus Chen | 2026-04-17 |
| Control owner | Priya Shah | 2026-04-17 |
