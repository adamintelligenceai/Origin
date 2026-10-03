# AGENT 06 — PO Quality

**Stack position:** Observes POs that generate AP exceptions and, where chartered, inspects new POs for defect patterns *before* invoice. Feeds Root Cause and Procurement Operations. Does not rewrite POs.  
**Default autonomy:** L0 Observe (promotion to L1 recommend-only).  
**Human owner (typical):** Procurement Operations Lead  
**Payment authority:** None.  
**Northline instance:** Wave 3 in the stack overview; UOM and missing-tax-on-PO are the first study objects.

---

## 1. Position in the stack

AP cannot match what Procurement did not specify. This agent exists so Finance Transformation and Procurement look at the **same defect list**, not at each other. It is not a purchasing cop and not a second buyer.

Default L0 is intentional. A recommend-level PO agent without buyer trust becomes ignored mail.

---

## 2. Job description

The PO Quality Agent identifies purchase orders (and change orders) whose attributes are known to cause AP breaks: missing or conflicting UOM, price unit vs order unit, missing tax/jurisdiction fields, vendor on PO ≠ intended payee, incomplete lines, missing account assignment on non-stock, outline agreement not referenced, receipt-required flag wrong for the item type, and service POs without a contract reference when policy requires one.

It produces defect records and, at L1, recommended buyer actions. Buyers decide. The agent does not change the PO.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Retrospective | Daily | POs linked to new Agent 03/04 breaks |
| Prospective (optional, later) | Near-real-time on PO approve | Defect hints *after* buyer submit, before invoice |
| Weekly | Friday | Top defects by buyer group / plant / vendor |
| Monthly | With Agent 15 | Proposed template / catalogue fixes |

Northline Wave 1: retrospective only, L0. Prospective L1 is a separate charter.

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Exception objects with `PO_DEFECT`, `UOM`, `PRICE`, `TAX` on PO | 03/04 | Y for retrospective |
| PO header/lines / change history | ERP | Y |
| Item master UOM and order unit | ERP / PIM | Y for UOM class |
| Vendor master payee vs PO vendor | ERP | Y |
| Contract / outline agreement | CLM / ERP | For services policy |
| PO template catalogue | Procurement | N |
| Policy `AP-POQ-001` defect list | Controlled | Y |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| PO and change log | Read |
| Item / UOM | Read |
| Contract header | Read |
| Exception store | Read |
| Orchestrator | Write defect records (L1); shadow folder at L0 |
| Buyer directory | Read |

No PO change privilege. No invoice privilege.

---

## 6. Responsibilities

1. On each tagged exception, pull the PO version *at invoice date*, not only current (changes after invoice are a different story).
2. Test defect list. Code each hit. A PO may have multiple defects.
3. Distinguish `DEFECT_ON_PO` vs `INVOICE_DISAGREES_WITH_GOOD_PO` — the latter is not PO quality.
4. Attribute to buyer group / plant / vendor / item category for clustering.
5. At L0, publish a weekly shadow register. At L1, open a defect record for the buyer with a recommended action (`CONFIRM_UOM`, `ADD_CONTRACT_REF`, `CORRECT_TAX_JURISDICTION`, `SPLIT_FREIGHT_LINE`, etc.).
6. Never recommend “change the PO to match the invoice” as a default. That is a commercial decision. The recommendation is “resolve the specification.”
7. Feed Agent 15 with defect frequencies. Feed Agent 08 only when the defect requires a supplier master or supplier process change — still as a draft path.
8. Track whether a defect was fixed on a *change order* by a human, and whether subsequent invoices on that PO still broke.

---

## 7. Explicit exclusions

1. Payment authorisation or release.
2. Creating or changing POs, contracts, or item masters.
3. Directing a buyer to raise price to match an invoice.
4. Vendor selection or sourcing.
5. Approving spend.
6. Blocking PO release in the ERP at L0/L1 (a future hard-stop is a Procurement system control, separately chartered, not this agent “taking over release”).
7. Scoring buyers for performance management without HR/Procurement design (the weekly pack is diagnostic, not a bonus metric unless Procurement says so — AP does not).
8. Tax determination.
9. Claiming catalogue “compliance.”

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | Procurement Operations Lead / Hannah Cho |
| AP counterpart | Priya Shah (match codes must stay aligned) |
| Escalation | CPO + AP Process Owner (James Okoye) |
| Owns | Defect list with Controller/AP; buyer communication standard |
| Does not own | AP posting, cash, tax position |

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Defect list change | Procurement Ops + AP Match Lead + Controller if match policy affected |
| L1 defect record to buyer | Buyer accept/reject/defer |
| PO change | Buyer / authorised change process |
| Prospective scan on | Process Owner + Procurement |
| Any block of PO release | Out of this agent unless a separate control project |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Defect class ≥ 15% of a plant’s AP exceptions for 4 weeks | Plant Controller + Buyer manager | Monthly pack ad hoc |
| Same buyer group, same defect, ≥ 20 POs | Buyer manager | Weekly |
| Vendor systematically invoices different UOM | Vendor Master + Agent 08 path | Weekly |
| Price-on-PO systematically blank | Procurement Ops | Immediate (policy) |
| Agent attributes defect to invoice when PO was good | Match Lead (recode) | On complaint |

---

## 11. Output standard

Defect record: PO, version/date, object IDs of related invoices, defect codes, `ON_PO` vs `INVOICE_SIDE`, recommended action (L1), buyer group, hashes of policy, evidence (PO snapshot + exception codes), agent `06`, level.

Weekly register: top 10 codes, counts, example POs, whether a template fix is proposed (pointer to Agent 15).

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| Snapshot at invoice date | Versioned PO read | Sample 15 |
| No silent PO change | Access | Quarterly |
| Diagnostic vs punitive | Pack labelled diagnostic | Language review |
| Alignment with match codes | Joint taxonomy | Monthly with Agent 03 |

---

## 13. Audit evidence

Defect records 7 years; weekly registers 7 years; policy versions life-of-programme; PO snapshots stored with defects 7 years.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Attribution precision | % defects confirmed `ON_PO` by buyer/AP | Quality |
| Repeat-break after change order | | Whether fixes work |
| Coverage | % of PO-tagged exceptions reviewed | L0/L1 |
| Buyer response rate (L1) | | Engagement, not obedience |
| Cost | | Brake |

No “PO compliance %” as a guaranteed control outcome.

---

## 15. Performance history fields

Period; exceptions reviewed; defects by code; attribution flips; buyer accept/reject; repeat-breaks; plants; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow register | **Default** |
| L1 | Defect records to buyers |
| L2 | Prepare change-order packet (fields suggested, not submitted) |
| L3 | Not expected for PO write. Do not plan L3 PO change |
| L4 | n/a for writes |

Hard ceiling: L2 prepare. PO change remains human.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| Cannot read historical PO version | Mark `VERSION_UNAVAILABLE`; do not use current only without a flag |
| Item master UOM missing | Code `MASTER_UOM_MISSING` to Master Data, not the buyer alone |
| CLM down | Skip contract tests; do not PASS them |

---

## 18. Cost monitoring

Model + analyst minutes. Pause L1 if attribution precision < 70% for 3 weeks — you are training buyers to ignore the pack.

---

## 19. Handoffs

03/04→06; 06→buyers; 06→15; 06→08 (supplier process); 06→Master Data; 06→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Mode | Retrospective L0 |
| First defect list | UOM, blank price, missing contract ref on services, receipt flag vs item type |
| Cluster for escalate | 20 POs or 15% of plant exceptions |

---

## 21. First 90 days

Only UOM and blank price. Prove attribution precision. Hannah and Priya meet weekly for 30 minutes on 10 examples. If they cannot agree, do not go L1.

---

## 22. Worked example — Northline Industrials

Agent 15 notes 22% of Dayton exceptions are `UOM` EA vs BOX. Agent 06 L0 review of 40 POs: 31 have order unit BOX and price unit EA with no conversion on the PO; item master has conversion 50 EA/BOX. Invoices from two fastener vendors bill EA.

Attribution: `DEFECT_ON_PO` (conversion not carried) **and** a supplier billing-practice issue. Not “warehouse error.”

L0 weekly register lists the 31 POs, the two vendors, and a proposed template: always explode conversion on fastener category. Hannah rejects auto-changing 31 live POs. She accepts a catalogue change *going forward* and a buyer aid. Agent 06 does not submit the catalogue change.

A bad recommendation would have been: “raise PO qty to EA to match invoices.” That hides the conversion problem.

---

## 23. Sample output artefact (abridged)

```
po: 45007821
po_version_date: 2026-03-12
defect_codes: [UOM_CONVERSION_ABSENT]
attribution: ON_PO
related_objects: [WO-1048821]
recommend_L1: CONFIRM_CONVERSION_ON_TEMPLATE (not live)
buyer_group: Dayton MRO
agent_id: 06
autonomy_level: L0
```

---

## 24. What this agent does not replace

Catalogue management, buying policy, or supplier contracting. It makes PO-caused AP breaks visible in procurement language.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_06 PO Quality |
| Default autonomy | L0 |
