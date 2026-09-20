# Evidence Room — AP Agent OS Professional

## Testing — 04 Pilot Methodology

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Testing  
**Standard:** Proof before permission  
**Audience:** Head of AP, Controller, AP Manager, Control owner, Finance Systems, Treasury (if payment-adjacent)  
**ERP stance:** Agnostic. Allow-lists must be **enforced** in the buyer’s workflow or identity layer, not only written in a slide.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Binding method for Methodology Step 8. A pilot is a change (typically C3). It is not “turning the AI on.”

---

### Purpose

Allow a **narrow, reversible** set of agent actions under human ownership, after Shadow has earned those actions. Measure outcomes against a frozen baseline. Decide promote one increment, hold, roll back, or redesign.

Companion files: `../Governance/02_RELEASE_AND_CHANGE.md`, `../Governance/03_INCIDENT_AND_OVERRIDE.md`, `../Governance/01_AUTONOMY_POLICY.md`.

---

## 1. What to do

Write a Pilot Charter as an **allow-list**. Promote only verbs Shadow supported. Cap by user, legal entity, supplier segment, invoice type, value, recipient class, and calendar window. Run daily pilot-vs-control comparison. Exit with a signed report.

**How.** See §3–§8. Fallback and override are live **before** the first pilot transaction.

**Who.**

| RACI | Role |
|---|---|
| **A** | Head of AP / Controller (CFO / FD acknowledge if payment-adjacent or L3) |
| **R** | AP Manager (daily operation) |
| **C** | Control owner, Finance Systems, SoD owner; Treasury if proposal/payment-adjacent |
| **I** | Internal Audit, processors, affected requesters if they will receive mail |

Agents are never Accountable.

**What can go wrong.** Scope creep in week two. Override as the normal path. Success declared on activity (“emails sent”).

**Control.** Technical enforcement of allow-lists. Change record. Mid-pilot review. Activity KPIs cannot headline the exit pack.

**Measure.** Pilot volume; override rate; incidents; operational KPIs vs **same-segment** baseline; risk-control lines.

**Evidence.** `[BUYER]/Evidence/Pilot/[Pilot ID]/`.

---

## 2. Entry criteria

- [ ] Shadow exit recommends named verbs (`03_SHADOW_MODE.md`)  
- [ ] Historical pack still valid for the **same** hashes (or re-tested after any C2)  
- [ ] Rollback rehearsal completed (restore previous hashes / disable identity)  
- [ ] Incident, override, fallback runbooks understood (`03_INCIDENT_AND_OVERRIDE.md`)  
- [ ] Allow-lists implemented and tested (a case **outside** the list is rejected)  
- [ ] Baseline frozen for the pilot segment  
- [ ] Communication sent to processors (and suppliers only if they will receive agent-touched mail — human-approved template)  
- [ ] C3 change record signed  
- [ ] Payment release, bank write, policy exception, legal dispute remain human  

If the platform cannot enforce the value cap, **do not** grant L3. Stay at L2 prepare.

---

## 3. How — write the Pilot Charter

```
Pilot ID:
Agent / charter version / hashes:
Autonomy level this window (usually L2 or first L3 verbs):
Verbs allowed:   [explicit list]
Verbs denied:    [send/post/park/approve/release/bank — state each]
Legal entities:
Channels:
Invoice types:
Supplier segment / list ID:
Exception codes:
Value cap (document and/or group currency):
Recipient classes (if any outbound):
Calendar window:
Control group:   [same type, not in allow-list — or time-split, state which]
Rollback:        [who, how, minutes]
Kill-switch:     [named humans]
Cost envelope:   [max inference / case; max human minutes before manager]
Success is measured by: [dictionary IDs — not “adoption”]
Accountable / date:
```

**One increment.** Do not raise autonomy **and** add an entity **and** raise the cap in the same pilot.

**Who.** AP Manager drafts; Control + FinSys challenge; Head of AP signs.

**What can go wrong.** Deny-list thinking (“everything except intercompany”) that quietly includes employee payments.

**Control.** Allow-list only. Anything not listed is out.

**Measure.** Charter completeness checklist (all fields non-blank).

**Evidence.** Signed charter in the Pilot folder.

---

## 4. How — control group and fairness

**What to do.** Compare like with like.

**How.** Prefer:

1. **Parallel segment:** same entity and type, suppliers not on the allow-list, or a second plant.  
2. **If volume is too small:** time-split (weeks 1–2 shadow-quality baseline already frozen; weeks 3–6 pilot) — weaker; label it.

Report mix: channel, type, value band. A mix shift is not a win.

**Who.** AP Reporting owner designs the comparison; Controller rejects unsigned financial lines.

**What can go wrong.** Pilot takes all easy PO invoices; control keeps the rest.

**Control.** Mix table on the weekly report (`../KPI_and_Measurement/03_WEEKLY_AGENT_REPORT.md`).

**Measure.** Mix delta vs baseline.

**Evidence.** Comparison design note.

---

## 5. How — daily and mid-pilot

### Daily (AP Manager)

- Pilot vs non-pilot counts  
- Overrides (AGR / REJ / COR / FCE)  
- Incidents  
- Cost envelope breaches  
- Hash match  
- Any verb outside the list = **contain** (disable) then incident  

### Mid-pilot (mandatory)

Do **not** expand scope because “it looks fine.”

Mid-pilot may only: continue, tighten (lower cap, fewer verbs), or stop.

**Who.** Same as entry signatories, shorter pack.

**What can go wrong.** Adding all suppliers “to get a better sample.”

**Control.** Mid-pilot form has no “expand” box.

**Measure.** Open Sev-1/2; override as operating model (flag if FCE is common).

**Evidence.** Mid-pilot signed page.

---

## 6. How — failure and writes (Pilot-specific)

Any ERP or mail write in the verb list:

| Outcome | Action |
|---|---|
| 2xx with ID | Do not resend. Verify. |
| 4xx except rate-limit | Do not retry same payload |
| Rate-limit | Backoff only |
| 5xx with body / timeout / reset | **Do not retry.** Mark ambiguous. Reconcile by read |
| 401 | Stop the workflow. Credential incident |

Missing items are recoverable. Duplicates are not an acceptable recovery strategy.

**Who.** FinSys implements; AP Manager handles ambiguous queue.

**Control.** At-most-once in the charter.  
**Measure.** Ambiguous count; duplicate-create incidents (target: zero).  
**Evidence.** Write log + reconcile sheet.

---

## 7. How — exit report (Measure starts here)

Score **four families separately** (`00_KPI_FRAMEWORK.md`). Do not net a control breach against cycle time.

| Family | Pilot questions |
|---|---|
| Activity | How many items in allow-list? (descriptive) |
| Operational | STP, cycle, resolution, accuracy vs same-segment baseline |
| Financial | Inference cost; hours released **labelled ESTIMATE**; cash only if Controller validates |
| Risk-control | Breaches, FNR high-risk, force-path, hash mismatch — **veto** |

Recommendation (one increment or refuse):

- Autonomy +1, same scope  
- Same autonomy, one added entity/channel/code **or** higher cap  
- Hold  
- Roll back  
- Redesign  

Never combine higher autonomy + broader scope + higher value in one change.

**Who.** AP Reporting compiles; AP Manager explains; Head of AP decides; Controller signs any money line.

**Measure.** Scorecard completeness; unsigned financials on the pack (must be zero).

**Evidence.** `[BUYER]/Evidence/Measure/` plus Pilot exit.

---

## 8. Rollback drill (before first transaction)

**What to do.** Practise disable and hash restore.

**How.**

1. Disable `agt.[charter].pilot` send/post verbs (or the whole identity).  
2. Confirm in-flight items visible in ERP/workflow.  
3. Restore previous hashes if a model change was part of the release.  
4. Time the drill.  
5. Record who can order it without a meeting.

**Who.** FinSys + AP Manager.  
**What can go wrong.** Work only exists in the agent UI.  
**Control.** Agent UI is not the system of record.  
**Measure.** Minutes to disable.  
**Evidence.** Drill record attached to the change ticket.

---

## 9. What can go wrong (pilot-level)

| Failure | Control |
|---|---|
| Scope creep | Allow-list; mid-pilot has no expand |
| Override-as-process | Override rate on weekly pack; freeze L3+ |
| Activity theatre | Framework: activity cannot headline |
| Unvalidated ROI | Controller `validated_by` |
| Duplicate send/post | At-most-once |
| Payment-adjacent creep | Agent 12 remains recommend/prepare; human release |
| Model tweak mid-pilot | Forbidden unless C4 contain |

---

## 10. ACME Manufacturing — ILLUSTRATIVE

Fictional ACME. Goods Receipt Agent. **L2 only:** draft missing-GR chasers for domestic inventory POs, value ≤ a buyer-set cap, one plant, requester role allow-list. No chasers to directors. No ERP GR create. Window: six weeks. Control: second plant, same SKU class. Mid-pilot: two Sev-3 SOP gaps, no expand. Exit: cycle-time on EX-GR-001 improved vs control; hours released labelled ESTIMATE; no KPI-FIN-SAV. Decision: **same autonomy, add one plant** — not L3 send.

---

## 11. Pilot evidence checklist

- [ ] Pilot Charter  
- [ ] C3 change record  
- [ ] Access extract matching verbs  
- [ ] Rollback drill  
- [ ] Team (and if needed, recipient) communication  
- [ ] Daily sheets  
- [ ] Mid-pilot decision  
- [ ] Incident/override extracts  
- [ ] Exit + Measure pack  
- [ ] Next-increment proposal **or** explicit stop  

Proof before permission.

---

*End of 04_PILOT_METHODOLOGY.md*
