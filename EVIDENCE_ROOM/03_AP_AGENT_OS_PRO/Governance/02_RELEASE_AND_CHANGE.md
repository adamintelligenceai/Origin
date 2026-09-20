# Evidence Room — AP Agent OS Professional

## Governance — 02 Release and Change

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Governance  
**Standard:** Proof before permission  
**Audience:** Finance Systems, Head of AP, Control owner, AP Manager, Change / CAB (or Finance Systems equivalent)  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Binding path for any change that can alter agent behaviour or evidence.

---

### Purpose

Make agent behaviour as change-controlled as an ERP configuration that parks invoices. If it can change a recommendation, a send, a match, or a log, it is a change.

---

## 1. What to do

Run a single change process for:

- New agent to Shadow or Pilot  
- Autonomy or scope change (`01_AUTONOMY_POLICY.md`)  
- Prompt, tool list, validator, workflow, allow-list, value cap, taxonomy mapping  
- Model ID, vendor, or material model settings  
- Identity entitlements  
- Evidence-store schema that affects retrieval or retention  
- SOP / RACI versions that the runtime cites  

Emergency fixes still create a ticket, contain first, document within 24 hours.

---

## 2. How

### 2.1 Change classes

| Class | Examples | Test expectation | Approval |
|---|---|---|---|
| **C0 Standard** | Text-only SOP clarification that runtime does not cite | None beyond peer review | Process owner |
| **C1 Minor** | Report layout; additional **read** field already in privacy inventory | Smoke + one regression pack subset | AP Manager + FinSys |
| **C2 Material** | Prompt, validator, workflow, allow-list, cap, taxonomy map, new exception code in scope | Full labelled pack for touched codes + injection cases if inbound text is consumed | Head of AP + Control owner + FinSys |
| **C3 Major** | New agent to Pilot; L2→L3; new entity/channel; model swap | Test + sized Shadow or Pilot plan + rollback test | Head of AP + Control + FinSys; Controller if financial reporting affected; CFO/FD if L4 or payment-adjacent |
| **C4 Emergency** | Disable, pin rollback, leak containment | Contain immediately; retrospective test | Head of AP or Control owner can order disable; ticket same day |

If unsure, classify higher.

### 2.2 What is in a change record

```
Change ID:
Class:
Requester / Accountable:
Systems / agents:
Charter version current → proposed:
Hashes current → proposed (model, prompt, workflow, validators):
Scope delta (one increment if promotion):
SoD / DOA / privacy impact:
Test pack ID and result:
Rollback method and last successful rollback test:
Pilot / window / value cap:
Communication plan (processors, Treasury, suppliers if they will see mail):
Go / no-go signatures:
Post-implementation review date:
```

### 2.3 Release sequence (C2/C3)

1. Change record drafted.  
2. Code / config in non-production or read-only.  
3. Test pack (labels already exist; do not relabel to match the new model).  
4. Hash freeze of the candidate.  
5. Access review.  
6. Rollback rehearsal (restore previous hashes; agent still logs).  
7. Window: avoid payment-run start unless the change is a disable.  
8. Production pin to frozen hashes.  
9. Hypercare: daily hash check + override/incident watch for `[BUYER: n days]`.  
10. Post-implementation review. Residual issues → risk register or incident.

### 2.4 Model-change extra rules

- Pin model IDs. A vendor “default” is not a pin.  
- Silent vendor ID change = unplanned C3/C4: freeze execution verbs, investigate.  
- Do not combine model change with autonomy promotion.  
- Re-score FPR/FNR; if the buyer’s gates fail, stay on the previous pin.

### 2.5 Workflow-change extra rules

- Export the workflow before and after; store the diff.  
- Tolerance or cap edits require the policy owner, not only FinSys.  
- “Clear the queue” is not a reason to widen match tolerance.

### 2.6 Testing content (minimum for C2/C3)

| Case type | Required |
|---|---|
| Stratified historical invoices for touched taxonomy codes | Yes |
| High-value items (buyer definition) | Yes if value cap or DOA touched |
| Injection / hostile document text | Yes if the agent reads document or email body |
| Hallucination / uncited amount | Yes if the agent generates language or IDs |
| Validator fail-closed | Yes |
| Out-of-scope item (wrong entity) | Yes |
| Fallback: agent disabled mid-case | Yes for C3 |

Environments: no production write for Test. Shadow uses production **read** plus evidence write only.

### 2.7 Rollback

Rollback restores previous hashes and entitlements. It does not delete evidence written by the new version. If rollback itself needs a data fix (e.g. wrong emails sent), that is an incident, not a quiet rollback.

### 2.8 Forbidden combinations

- Promotion + model change  
- Promotion + tolerance widen  
- New write verb + new entity  
- Production prompt edit without a change ID  

---

## 3. Who

| Role | Duty |
|---|---|
| Requester (usually AP Manager) | Writes the record, owns hypercare operations |
| Head of AP | Accountable for C2/C3 go-live (unless CFO required) |
| Control owner | Policy, SoD, residual risk |
| Finance Systems | Implements pins, entitlements, rollback |
| Controller | Financial-reporting and close-calendar collisions |
| Treasury | Informed / consulted when payment-adjacent |
| Processors | Informed of behaviour changes before the window |
| Internal Audit | Informed of C3 catalogue; may sample records |

There is no “vendor Accountable.” Vendors may perform the technical step under FinSys supervision.

---

## 4. What can go wrong

| Failure | Effect |
|---|---|
| Hot-edit in vendor UI | Unhashed production; unrepeatable errors |
| Test pack owned by the vendor | Buyer cannot defend the go-live |
| Window during payment file creation | Confused proposal + agent noise |
| Rollback never rehearsed | Containment fails |
| Classed C1 to avoid approval | Control bypass — treat as incident if found |
| Hypercare skipped | Silent FNR increase |

---

## 5. Control

- Production runtime starts only if hashes match the approved record.  
- Config write limited to FinSys roles.  
- Periodic diff: live workflow export vs last approved export.  
- Emergency changes appear on the next weekly agent report.  
- Change ID cited on the weekly report and on Measure packs that overlap the window.

---

## 6. Measure

| Metric | Definition |
|---|---|
| Planned vs emergency changes | Count by class |
| Changes without test pack (C2/C3) | Count — should be zero except documented C4 |
| Rollback rehearsals overdue | Count |
| Hash mismatches in production | Count (incident) |
| Post-implementation defects | Count attributed to the change ID |
| Calendar collisions | Changes in a payment-run lockout without disable-class reason |

---

## 7. Evidence

`[BUYER]/Evidence/Release/<Change ID>/`:

- Record and signatures  
- Test results  
- Hash list  
- Workflow diff  
- Access review  
- Rollback rehearsal  
- PIR  
- Communication sent  

---

## ACME — ILLUSTRATIVE

ACME Change C3-014 swaps the extraction model used by Invoice Intake Agent. Matching Agent hashes are untouched. Autonomy stays L1. Test pack 86 invoices (buyer-selected) is re-run; two new uncited-VAT defects appear; go-live is refused. Previous model remains pinned. No payment-run impact.

---

## Related documents

- `00_GOVERNANCE_FRAMEWORK.md` §§12–16  
- `01_AUTONOMY_POLICY.md`  
- `03_INCIDENT_AND_OVERRIDE.md`  
- `../Process_Mapping/00_METHODOLOGY.md` Steps 6–10  
- `../Testing/` (where present)  

---

*End of 02_RELEASE_AND_CHANGE.md*
