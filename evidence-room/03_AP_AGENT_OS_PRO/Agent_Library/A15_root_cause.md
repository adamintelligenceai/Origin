# A15 — Root Cause Agent

| Field | Value |
|---|---|
| Agent ID | A15 |
| Name | Root Cause Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Evidence Room extension (process quality) |
| Starting autonomy | Level 0 |
| Human owner (role) | AP Manager / Process Excellence |
| Backup owner (role) | AP Exception Lead |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Cluster closed exceptions by taxonomy, vendor, PO type, plant, and channel, and propose process fixes — without posting journals, rewriting policy, or treating a cluster as proven cause until a human agrees.

---

## 2. Job description

A15 is the after-action reviewer. A04 keeps the pile moving. A15 asks why the pile exists. It reads *closed* objects (and only those) after a minimum history window so it does not invent stories from a quiet week.

**In population:** closed exceptions with a primary reason code; A06 defect codes; A01 not-invoice and misroute incidents; A10 confirmed duplicates (process dups, not fraud essays).  
**Out of population:** open items (still A04), individual invoice matching, payment release, and HR performance management.

**Done at Level 0:** a monthly cluster pack Priya can recognise as true on a sample of 25 underlying objects. **Done at Level 1:** recommended causes and *owners of fixes* (procurement, master data, supplier comms) — still proposals.

Clusters without a quarter of coded exceptions are fiction. That is why this agent starts at Observe and why Wave 6 in the overview is last.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Closed exception extract (≥ window) | Yes | A04 | Do not run |
| Taxonomy version history | Yes | A16 | Codes drift = stop |
| Vendor / PO type / plant / channel dimensions | Yes | Objects | Cluster only what exists |
| A06 / A01 / A10 closed feeds | Optional | Those agents | Section omitted |
| Minimum-n rules | Yes | Policy (illustrative: 30 objects per cluster) | Suppress small clusters |
| Prior packs (to see persistence) | Optional | A15 store | First pack labelled immature |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Dimensions | Company, plant, PO type | Same | Same | Subsidiary, location | Company | |
| Analysis | — | — | — | — | — | A15 store |

**Read:** closed objects, dimensions.  
**Write at Level 0:** pack.  
**Write at Level 1:** `cause_hypothesis` objects.  
**Write-never:** ERP, policy tables (may *request* a change), payment, vendor block, buyer scorecards published as control packs.

---

## 5. Responsibilities

1. Enforce the window (Evidence Room framework: do not issue a cause pack until 60 operating days of coded exceptions, or the first quarter — whichever the register says).
2. Cluster by primary code × one dimension at a time (vendor, then PO type, then plant, then channel). Multi-dimension only if n still clears minimum-n.
3. Rank by count, $, and persistence (appeared in prior packs).
4. Propose a *hypothesis* and a *test* (“if we fix receipt-required flag on service POs, `PO-RCPT-FLG` should fall — measure in 30 days”).
5. Sample 25 objects per top cluster for the human to confirm “this really is the same defect”.
6. Hand accepted fixes to the owning agent/role (A06 checklist, A01 channel, A08 template). A15 does not implement.
7. At Level 0, stop at the pack. No tasks to buyers.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud or name individual employees in the control pack.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never post a journal “to correct root cause”.
- Never change the taxonomy to make clusters prettier.
- Never publish a buyer shame board.
- Never treat correlation as implemented cause.
- Never run on open exceptions to “predict” a person will fail.

---

## 7. Human owner

**AP Manager** (or Process Excellence if that role exists) owns which hypotheses become projects. Backup: **AP Exception Lead**.

Greta (A06) and Owen (A05) own their fixes when accepted.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Cluster pack + samples | Priya signs “seen”; samples scored | `A15_cluster_pack` |
| 1 Recommend | Hypotheses + fix owners | Accept / reject each | `cause_decision` |
| 2 Prepare | Draft project briefs / A06 checklist edits | Human publishes | Change request + user |
| 3 Execute within guardrails | Auto-open briefs for recurring clusters inside envelope | Sample | Envelope |
| 4 Managed autonomy | Named defect codes | Recertify | Register + IA ack |

Policy edits remain human.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| Cluster $ ≥ materiality and persistent 3 packs | AP Manager + process owner | process |
| Taxonomy drift detected | A16 | `CTRL-BRK` |
| Confirmed duplicate cluster growing | A10 + A01 | risk |
| Sample true-rate below band | Do not escalate — *demote use* of the pack | quality |
| Request to name employees | Refuse | policy |

**Do not escalate:** a one-week spike under minimum-n. Do not escalate every `PRC-VAR` as “procurement is broken”.

---

## 10. Output standard

### 10.1 `A15_cluster_pack`

```
window
taxonomy_version
clusters[].key
clusters[].n
clusters[].amount
clusters[].persistence
clusters[].sample_ids[]
clusters[].hypothesis      # Level 1+
clusters[].test
immature                   # bool if window short
```

### 10.2 Sample sheet

25 object IDs, human true/false, comments.

**Done at Level 0:** pack issued and sample scored. **Done at Level 1:** decisions on hypotheses.

---

## 11. Control requirements

1. **Minimum-n and window** enforced.
2. **No employee league tables** in the control pack.
3. **Taxonomy lock** shared with A04/A16.
4. **Sample** every top cluster.
5. **Fixes through change control**, not silent prompt edits.
6. **Immature flag** if someone insists on an early pack.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Packs + samples + decisions | A15 store | Local financial-record policy |
| Resulting change requests | Change control | Same |
| Window/minimum-n policy | Policy | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Window compliance | Packs issued only when window met (Y/N) | Register | Monthly | AP Manager | |
| Operational | Sample true-rate | True / sampled | Sample | Monthly | AP Manager | 0→1 |
| Operational | Hypothesis accept rate | Accepted / offered (L1+) | Decision | Quarterly | AP Manager | Not vanity — pair with test outcomes |
| Operational | Test outcome hit | Tests that moved the cluster / tests due | Follow-up | Quarterly | Process | |
| Financial | $ in persistent top-5 clusters | Sum | Pack | Monthly | AP Manager | Local |
| Risk | Packs on open items | Count (0) | Audit | Monthly | Controls | |
| Risk | Employee-named packs | Count (0) | Sample | Monthly | Controls | |
| Risk | Taxonomy edits by A15 | Count (0) | A16 | Monthly | Controls | Auto Level 0 |

Ardent’s 59% lower exceptions is context for *whether* a cluster matters to leadership — not a promised reduction from A15.

---

## 14. Performance history fields

Common fields, plus:

```
window_days
clusters_emitted
sample_true_rate
hypotheses_accepted
tests_due
tests_hit
immature_packs
```

---

## 15. Starting autonomy level

**Level 0 — Observe.** Do not start at Level 1 in Wave 1. Earn Level 1 after two mature packs with sample true-rate inside band.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Window too short | Count | `immature` or refuse | Priya | Wait |
| Taxonomy version mix | Versions | Stop | A16 | Rebuild |
| n < minimum | Rule | Suppress cluster | — | — |
| Model writes “buyer X is the problem” | Guardrail | Strip | Controls | Role-level only |
| Fix implemented without test | Review | Flag in next pack | Process | Add test |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Cluster jobs | Compute | Systems |
| Sample review minutes | Time | AP Manager |
| Projects opened on false clusters | Process time | Process Excellence |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. After 70 operating days of A04 codes, Priya asks for the first mature pack.

**Level 0 pack.** Top cluster: `GR-MISS` × plant NL10-P01, n=420, $2.1m invoiced-not-received in the window (illustrative local counts). Sample 25: 18 true `received_not_posted` (QC hold), 5 true not-received, 2 miscodes that were `PO-RCPT-FLG`. Persistence: second pack in a row. Hypothesis is *not* printed at Level 0; the sample sheet is enough for Owen to see QC posting delay.

**Level 1 later.** Hypothesis: “SES-required service lines are flagged receipt-required — fix A06 checklist + master data; test = `PO-RCPT-FLG` and false GR chases down in 30 days.” Greta accepts the A06 part. A15 does not change EKPO.

**Illegal.** Posting a $2.1m accrual from the cluster pack (that is A13 + Elena). Publishing “Jordan Hale causes price variance”. Running the pack in week two of go-live.

**Control.** `immature=false`. Taxonomy `2026-09`. Sample sheet signed. No journal IDs originated by A15.

---

## 19. Cluster method (implementation)

Use this order. Do not jump to a 4-way cube.

| Step | Dimension | Keep cluster if |
|---|---|---|
| 1 | `primary_reason_code` only | n ≥ minimum-n |
| 2 | Code × plant | n ≥ minimum-n |
| 3 | Code × PO type / item category | n ≥ minimum-n |
| 4 | Code × vendor | n ≥ minimum-n **and** vendor is not a proxy for one plant |
| 5 | Code × channel (A01) | n ≥ minimum-n |

Persistence score (illustrative): 1 if the same key appeared last pack; 2 if last two. Rank = `amount × (1 + 0.5 × persistence)` — a local ranking aid, not a scientific claim.

### Hypothesis template (Level 1+)

```
Because [sample-confirmed mechanism]
on [population],
if [owner] does [fix]
then [metric] should [direction]
within [days],
measured by [A14 kpi_id].
```

Reject hypotheses that name a person, invent a %, or require a journal.

### Northline second cluster (illustrative)

`PRC-VAR` × vendor Helion, n=55, mostly fastener index increases billed before the PO info-record update. Sample 25: 22 true commercial, 3 A01 UoM errors miscoded. A15 sends the 3 back to A01 quality — it does not tell Greta to “negotiate harder” as a control finding. Commercial price is a buyer topic outside this pack’s *structural* list.

---

## Charter conformance

- [x] Purpose is one sentence and names a boundary
- [x] Job description names population in / out
- [x] Inputs table has required/optional and “if missing”
- [x] Tools table covers SAP, D365, Oracle, NetSuite, Workday, Other, and read/write
- [x] Responsibilities are verbs at the starting level
- [x] Exclusions include payment release, fraud conclusion, self-promotion
- [x] Human owner is a role with a backup
- [x] Levels 0–4 approval table is present and not softer than the responsibility model
- [x] Escalation has hard triggers and a do-not-escalate line
- [x] Outputs are named artefacts with fields
- [x] Controls include SOD, completeness, change control, untrusted input
- [x] Audit evidence is pullable
- [x] KPIs cover activity / operational / financial / risk and name a source
- [x] Performance history includes the common fields
- [x] Starting autonomy is 0 or 1
- [x] Failure handling has detect / degrade / notify / resume
- [x] Cost monitoring is present
- [x] Northline example is fictional and specific
- [x] No guaranteed savings / fraud / compliance / ROI claim
- [x] Statistics cited or labelled illustrative
