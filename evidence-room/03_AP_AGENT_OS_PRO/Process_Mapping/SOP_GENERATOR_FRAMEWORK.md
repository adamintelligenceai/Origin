# SOP Generator Framework

**Product:** AP Agent OS — Evidence Room  
**Use after:** Process map, decision trees, control map, and RACI are signed  
**Produces:** Operating procedures a processor, reviewer, or agent-configurator can follow  
**Rule:** An SOP is generated from signed objects. It is not authored from memory.

This framework does not write policy. It assembles procedure. If a required object is missing, the SOP stays in draft.

---

## When to generate

| Trigger | SOP type |
|---|---|
| Path signed in Step 4 | Path SOP (human operating procedure) |
| Agentise signed in Step 5 | Agent-assisted work instruction |
| Pilot start | Pilot addendum (scope, kill-switch, daily checks) |
| Expansion approved | Version increment of the path SOP |
| Control incident | Correction SOP plus a change record |

Do not generate an SOP from a vendor demo or from an unsigned map.

---

## Source objects (mandatory)

| Object | File | What is taken |
|---|---|---|
| Process map | `PROCESS_MAP_TEMPLATE.md` | States, terminals, channels |
| Decision trees | `DECISION_TREE_TEMPLATE.md` | Tests and leaves |
| Control map | `CONTROL_MAP_TEMPLATE.md` | Checks, evidence, failure actions |
| RACI | `RACI_TEMPLATE.md` | Who acts |
| Exception taxonomy | `EXCEPTION_TAXONOMY.md` | Park codes and chases |
| Authority boundary | Methodology Step 5 artifact | Forbidden actions |

Optional: walkthrough pack, shadow findings, pilot close report.

---

## SOP types and required sections

### Type 1 — Path SOP (human)

1. Purpose and explicit non-purpose
2. Scope (entity, channel, invoice type, value band)
3. Roles
4. Definitions (local terms only)
5. Procedure by state (S0…Sn)
6. Decision pointers (tree IDs, not recopied rules)
7. Exception table (code → first action → escalate)
8. Evidence to leave behind
9. Handoffs and waits
10. Recording and time-stamp rules
11. Escalation
12. Version, owner, review date

### Type 2 — Agent-assisted work instruction

All Type 1 sections plus:

13. Agent name and allowed action
14. What the human must still do
15. How to accept, edit, or reject a proposal
16. What to do when the agent is silent or wrong
17. Logging of override

### Type 3 — Pilot addendum

18. Pilot charter reference
19. In-scope identifiers (suppliers, entities, bands)
20. Daily checks
21. Kill-switch procedure (person, action, time to effect)
22. Scorecard IDs in use

### Type 4 — Correction SOP

23. Incident reference
24. What changed in the path
25. What processors must stop doing
26. Retraining / acknowledgement list

---

## Generation method (manual or assisted)

Work in this order. Skip nothing.

### Step G1 — Header block

```
Title: <Path> SOP
ID: SOP-<org>-<path>-<nn>
Version:
Owner:
Control reviewer:
Effective date:
Review by:
Supersedes:
Related map / trees / controls:
```

### Step G2 — Purpose sentence

Write one sentence of purpose and one sentence of non-purpose.

Northline example:

- Purpose: Describe how AP processors at Northline Industrials Ltd post or park domestic PO goods invoices.
- Non-purpose: This SOP does not authorise payment release, bank-master change, or tax-master change.

### Step G3 — State-by-state procedure

For each process-map state write:

```
State: S#
Actor:
You will need:
Do:
Decision: (tree ID or “none”)
If blocked: (taxonomy code + first chase)
Leave behind:
Do not:
```

“Do not” is mandatory. It is where unofficial workarounds are retired.

### Step G4 — Exception appendix

Copy only the codes that this path can raise. Do not paste the entire taxonomy. For each code: first action, owner, ageing, escalate to.

### Step G5 — Evidence appendix

List the minimum pack for a posted invoice and for a parked invoice. Point to CM-EVD-01.

### Step G6 — Agent appendix (if Type 2)

One subsection per agent in scope:

```
Agent:
Sees:
Proposes:
Never:
Human accept rule:
Override log:
```

### Step G7 — Completeness test

The draft fails if any of these are true:

- A state from the signed map is missing
- A tree ID is recited in full (rules would diverge)
- An agent is Accountable
- Payment release appears as an AP processor action
- A tolerance is described as “reasonable”
- A named person is used where a role is required (except owner fields)

### Step G8 — Sign and issue

Process owner issues. Control owner reviews Type 1 and Type 2 when controls or authority change. Processors acknowledge the version before it becomes the operating instruction.

---

## Language rules

| Use | Avoid |
|---|---|
| “Park as EX-MRX and start 09 Internal Follow-up” | “Resolve GRN issues promptly” |
| “Apply DT-MATCH” | “Match as appropriate” |
| “Propose fields; do not post” | “The agent processes the invoice” |
| “AP lead sets hold” | “Payment is stopped automatically” |
| “Compare face tax to applied code” | “Ensure tax compliance” |

Write in imperative. One action per sentence. Name the system as the organisation names it.

---

## Northline — generated stub (PO goods, Type 2 extract)

```
Title: NIL PO Goods Invoice SOP
ID: SOP-NL-NIL-PO-GOODS-03
Version: 03
Owner: Marcus Chen
Control reviewer: Priya Shah
Effective date: 2026-05-04
Related: NL-I2P-NIL-PO-GOODS-v03, DT-CLASS…DT-HOLD, CM-INTAKE-01…CM-EVD-01

State: S5 Duplicate gate
Actor: AP processor
You will need: Supplier account, invoice number, amount, date, site/group id if present
Do: Run the standard duplicate query. Open 10 Duplicate & Anomaly flags if present.
Decision: DT-DUP
If blocked: EX-DUP → AP lead same day. EX-PDUP → AP lead before any further matching.
Leave behind: Query id or result set on the invoice record
Do not: Void, delete, or post an item the agent flagged until AP lead has cleared or confirmed it.
Agent: 10 Duplicate & Anomaly proposes EX-DUP / EX-PDUP. It does not close X4.

State: S7 Read receipt position
Actor: AP processor
You will need: PO lines, GRN enquiry
Do: Read received quantity per required line. If missing, park EX-MRX and start 09 Internal Follow-up.
Decision: DT-GRN
If blocked: EX-MRX or EX-PRX
Leave behind: GRN snapshot
Do not: Post on a buyer email that “the goods are here” without a receipt in the system of record.
Agent: 03 Matching reads receipt position. 09 Internal Follow-up may draft the receiver/buyer message from the template.
```

The full issued SOP continues this pattern through S14 and the exception appendix. The stub above is the expected density, not a complete issue.

---

## Maintenance

| Event | Action |
|---|---|
| Map version increments | Regenerate affected states; bump SOP version |
| Tolerance table changes | Update the tree, not the SOP prose; SOP still points at the tree |
| Agent allowed action changes | Update Type 2 appendix; re-acknowledge |
| Role holder changes | Update RACI names; SOP role titles stay unless the role itself changes |
| Quarterly review | Confirm SOP, map, and trees still match observation |

Retired SOPs are retained under the evidence-retention rule. They are not overwritten.
