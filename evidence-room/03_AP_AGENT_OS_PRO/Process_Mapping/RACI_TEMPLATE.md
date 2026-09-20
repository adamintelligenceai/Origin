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
| A-IN | Intake Agent | — | N |
| A-CL | Classification Agent | — | N |
| A-EX | Extraction Agent | — | N |
| A-QL | Quality Agent | — | N |
| A-DP | Duplicate Agent | — | N |
| A-MT | Match Agent | — | N |
| A-CD | Coding Agent | — | N |
| A-TX | Tax Agent | — | N |
| A-AP | Approval Agent | — | N |
| A-EXC | Exception Agent | — | N |
| A-SC | Supplier Comms Agent | — | N |
| A-IC | Internal Chase Agent | — | N |
| A-CN | Credit Note Agent | — | N |
| A-ST | Statement Agent | — | N |
| A-PP | Payment Pack Agent | — | N |
| A-EV | Evidence Agent | — | N |

## Matrix — process activities

| Activity | PO | CO | PR | AL | BY | RC | MD | TX | TR | A-IN | A-CL | A-EX | A-QL | A-DP | A-MT | A-CD | A-TX | A-AP | A-EXC | A-SC | A-IC | A-PP | A-EV |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Accept process map and authority boundary | A | C | I | C | I | | | | | | | | | | | | | | | | | | |
| File intake to invoice stub | A | I | R | C | | | | | | R | | | | | | | | | | | | | I |
| Classify document type | A | I | R | C | | | | | | | R | | | | | | | | | | | | |
| Identify entity and supplier | A | C | R | C | | | C | | | | | R | R | | | | | | | | | | |
| Capture / extract fields | A | I | R | C | | | | | | | | R | | | | | | | | | | | |
| Quality gate | A | C | R | C | | | | | | | | | R | | | | | | | | | | |
| Duplicate search and flag | A | C | R | C | | | | | | | | | | R | | | | | | | | | |
| Confirm duplicate close (X4) | C | A | I | R | | | | | | | | | | I | | | | | | | | | I |
| Locate PO / test open and residual | A | I | R | C | C | | | | | | | | | | R | | | | | | | | |
| Read receipt position | A | I | R | C | C | C | | | | | | | | | R | | | | | | | | |
| Match qty / price / amount | A | C | R | C | C | | | | | | | | | | R | | | | | | | | |
| Commercial price variance decision | C | I | I | C | A/R | | | | | | | | | | I | | | | | | | | |
| Propose / complete coding | A | C | R | C | C | | | | | | | | | | | R | | | | | | | |
| Tax compare | C | A | R | C | | | | C | | | | | | | | | R | | | | | | |
| Tax-code change | I | C | I | I | | | | A/R | | | | | | | | | I | | | | | | |
| Route / chase approval | A | C | R | C | C | | | | | | | | | | | | | R | | | | | |
| Approve (human) | I | C | I | I | R* | | | | I | | | | | | | | | I | | | | | |
| Park with taxonomy code | A | I | R | C | I | I | I | I | | | | | | | | | | | R | | | | I |
| Draft supplier chase | A | I | R | C | I | | | | | | | | | | | | | | I | R | | | I |
| Draft internal chase | A | I | R | C | C | C | | | | | | | | | | | | | I | | R | | I |
| Set or lift payment hold | C | A | I | R | I | | | | I | | | | | | | | | | | | | I | I |
| Input hold list to payment pack | C | A | C | R | | | | | C | | | | | | | | | | | | | R | I |
| Release payment | I | C | I | I | | | | | A/R | | | | | | | | | | | | | I | I |
| Bank-master change | I | A | I | I | | | R | | C | | | | | | | | | | | | | | I |
| Assemble evidence pack | C | A | R | C | | | | | | | | | | | | | | | | | | | R |
| Expand agent authority | A | A** | I | C | I | | I | I | I | I | I | I | I | I | I | I | I | I | I | I | I | I | I |
| Kill-switch / incident stop | A | A | I | R | I | | | | I | | | | | | | | | | | | | | I |

\* Approver is the DOA incumbent, often the buyer or a budget holder, not always the buyer on the PO.  
\** Expansion requires both process owner and control owner (dual A).

Credit Note Agent and Statement Agent are R on their own paths (not shown). They remain I on PO-goods posting.

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
