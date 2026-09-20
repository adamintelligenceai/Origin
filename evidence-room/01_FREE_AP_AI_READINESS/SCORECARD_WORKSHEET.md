# AP Agent Readiness — scorecard worksheet

**Evidence Room · Diagnostic companion**  
**Version:** 1.0 · September 2026  
**Licence:** Evaluation — complete locally. Do not email invoice or vendor data to Evidence Room.  
**Source of questions:** `DIAGNOSTIC.md`  
**Scoring:** 0 = absent · 1 = partial · 2 = operable

Complete this sheet. Then compute the footer. Then write the paragraph. Then stop — or open the recommended next product.

---

## Cover

| Field | Your answer |
|---|---|
| Organisation (internal name only) | |
| Entity / company code in scope | |
| Primary ledger (SAP / D365 / Oracle / NetSuite / Workday / other) | |
| Second ledger (if any) | |
| Named owner completing this | |
| Date | |
| Other people who answered (optional) | |
| Vendor already in trial? (name the tool, not a pitch) | |

Northline Industrial Group is **fictional**. Do not copy its figures into this sheet as if they were yours.

---

## Process (max 12)

| ID | Question (short) | 0 | 1 | 2 | Artefact you could show this week | Notes |
|---|---|---|---|---|---|---|
| P01 | Live path recognised by exception staff | | | | | |
| P02 | Invoice classes named with mix | | | | | |
| P03 | Shared exception codes | | | | | |
| P04 | Top waits known (median or p90) | | | | | |
| P05 | Inbound channels complete and reconcilable | | | | | |
| P06 | Pay and close on the same map | | | | | |
| **P total** | | | | | **/12** | |

---

## Data (max 12)

| ID | Question (short) | 0 | 1 | 2 | Artefact | Notes |
|---|---|---|---|---|---|---|
| D01 | Invoice natural key defined | | | | | |
| D02 | Vendor cross-walk if multi-ledger | | | | | |
| D03 | Required fields before match | | | | | |
| D04 | Lineage from posted invoice | | | | | |
| D05 | Labelled sample / golden set | | | | | |
| D06 | Untrusted input handled | | | | | |
| **D total** | | | | | **/12** | |

---

## Controls (max 12)

| ID | Question (short) | 0 | 1 | 2 | Artefact | Notes |
|---|---|---|---|---|---|---|
| C01 | Payment release is human and written | | | | | |
| C02 | Vendor bank / tax-ID dual control | | | | | |
| C03 | DOA version matches workflow | | | | | |
| C04 | SOD posting vs paying (incl. system users) | | | | | |
| C05 | Overrides coded and retained | | | | | |
| C06 | Kill switch named | | | | | |
| **C total** | | | | | **/12** | |

---

## People (max 12)

| ID | Question (short) | 0 | 1 | 2 | Artefact | Notes |
|---|---|---|---|---|---|---|
| H01 | Named process owner | | | | | |
| H02 | Named control owner with veto | | | | | |
| H03 | Exception roster + backup | | | | | |
| H04 | Incentives not speed-only | | | | | |
| H05 | Steward who can write a fence | | | | | |
| H06 | Executive reader who can say no | | | | | |
| **H total** | | | | | **/12** | |

---

## Systems (max 12)

| ID | Question (short) | 0 | 1 | 2 | Artefact | Notes |
|---|---|---|---|---|---|---|
| S01 | Book of record unambiguous | | | | | |
| S02 | Capture / workflow inventory | | | | | |
| S03 | Read path for one company code | | | | | |
| S04 | Named write identity standard | | | | | |
| S05 | Dual-ledger posting rule | | | | | |
| S06 | Change control for rules / prompts | | | | | |
| **S total** | | | | | **/12** | |

---

## Economics (max 12)

| ID | Question (short) | 0 | 1 | 2 | Your figure (if any) | Source |
|---|---|---|---|---|---|---|
| E01 | Slice volume / month | | | | | |
| E02 | Exception rate, defined | | | | | |
| E03 | Time-to-post median / p90 | | | | | |
| E04 | Loaded cost definition | | | | | |
| E05 | Hours ≠ cash until cost base moves | | | | | |
| E06 | Industry figures labelled context | | | | | |
| **E total** | | | | | **/12** | |

Do not write $10–$15 or $2–$3 as *your* cost. Those dollars are vendor-recycled and unverified.

---

## Hard gates

| Gate | Trip if | Tripped? (Y/N) | Effect |
|---|---|---|---|
| Payment | C01 = 0 | | Cap level at 1. No payment-adjacent execute. |
| Map | P01 = 0 and P05 = 0 | | Diagnostic says **wait**. Map only. |
| Unsafe case | E05 = 0 and E06 = 0 | | Business-case starter **unsafe**. Rewrite the deck. |
| Domain collapse | Any domain total ≤ 2 | | Override overall level **down** (see Diagnostic §7.2). |

---

## Totals and level

| Domain | /12 |
|---|---|
| Process | |
| Data | |
| Controls | |
| People | |
| Systems | |
| Economics | |
| **Grand total** | **/72** |

| Raw level from total | 0: 0–17 · 1: 18–35 · 2: 36–49 · 3: 50–61 · 4: 62–72 |
|---|---|
| Raw level | |
| After hard gates / domain collapse | |
| **Declared level** | |
| Two weakest domains | |
| Diagnostic says wait? | Yes / No |

---

## Ten-agent fit (optional, 0–2 each — does not raise level)

| ID | Agent | 0 | 1 | 2 | Why this score | First fence if 2 |
|---|---|---|---|---|---|---|
| A01 | Invoice Intake | | | | | |
| A02 | Invoice Validation | | | | |
| A03 | Matching | | | | |
| A04 | Exception Triage | | | | |
| A05 | Goods Receipt | | | | |
| A07 | Approval | | | | |
| A08 | Supplier Resolution | | | | |
| A10 | Duplicate & Anomaly | | | | |
| A12 | Payment Proposal Review | | | | |
| A16 | Orchestrator | | | | |
| **Fit total** | | | | | **/20** | |

A12 cannot be 2 if C01 is 0. Correct it.

---

## Heatmap (tick one cell per domain)

| | 0–3 pale | 4–7 mid | 8–12 dark |
|---|---|---|---|
| Process | | | |
| Data | | | |
| Controls | | | |
| People | | | |
| Systems | | | |
| Economics | | | |

Read with Diagnostic §8.1. Do not colour this into a “readiness dashboard” for a steering pack without the hard gates.

---

## Next step (circle one)

- Wait — map one live class only  
- Starter — fence a trial already in the building  
- Professional — I will own the method  
- Team — several people must implement  
- Custom application — toolkit will not fit  
- Rewrite sponsor deck (unsafe case) before any of the above  

---

## Paste-ready paragraph

> We completed the Evidence Room AP Agent Readiness Diagnostic for ________. We are at **Level ____**. Weakest domains: ________ and ________. We will not use industry cost-per-invoice figures as our baseline. Our slice is ________. We will ________ before any production agent. We are not claiming savings, fraud detection, compliance, or ROI. Payment release remains human.

---

## Sign-off (optional, internal)

| Role | Name | Date | I have not added a savings claim |
|---|---|---|---|
| Completing owner | | | |
| Process owner (if different) | | | |
| Control owner (if read) | | | |

Independently authored. Not legal, tax, accounting, or audit advice. Completing this sheet does not certify a person, a system, or a control environment.
