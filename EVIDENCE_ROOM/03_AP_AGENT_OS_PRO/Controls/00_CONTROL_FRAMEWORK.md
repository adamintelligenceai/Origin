# Evidence Room — AP Agent OS Professional

## Controls — 00 Control Framework

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Controls  
**Standard:** Proof before permission  
**Audience:** Control / Risk owner, Head of AP, Controller, Internal Audit, Finance Systems  
**ERP stance:** Agnostic. Controls attach to duties and evidence, not to a named module.  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Design standard for AP agent controls. Does not certify an audit opinion or regulatory compliance.

---

### Purpose

Design, operate and evidence controls around the 16-agent stack so that errors are prevented or detected **before** they become payments, master-data changes, or unsubstantiated reports.

This framework sits on `../Governance/00_GOVERNANCE_FRAMEWORK.md`. It does not replace ERP inherent controls. Agents must not be used to bypass them.

---

## 1. What to do

For every material risk in `02_RISK_REGISTER.md` and every agent in `01_CONTROL_MATRIX.md`:

1. Name the risk in operational language.  
2. Assign a control with a human owner.  
3. Mark Preventive or Detective (or both, as two rows).  
4. Define evidence and frequency.  
5. Define the escalation trigger.  
6. Map residual risk if the control is procedural-only (not technically enforced).

Do not list “training” as the only control for a money-adjacent risk.

---

## 2. How

### 2.1 Control objectives (AP agent OS)

| ID | Objective | Typical failures if absent |
|---|---|---|
| CO-ACC | A named human is Accountable for each agent and exception family | “The model paid it” |
| CO-SOD | Incompatible duties stay incompatible for people and identities | Service account releases payment |
| CO-PRV | Least privilege; allow-lists; no standing write beyond charter | Scope creep |
| CO-VAL | Outputs are schema-, cite-, and policy-validated before action | Hallucinated PO / IBAN |
| CO-INJ | Untrusted document text cannot change rules or recipients | Invoice-as-instruction |
| CO-DUP | Exact and potential duplicates are handled before payment | Double pay |
| CO-MAT | Match and tolerance follow documented policy, not a prompt | Silent tolerance widen |
| CO-MDM | Vendor, bank, entity, tax standing data change is human-controlled | Document-driven bank change |
| CO-APR | DOA remains human; agents route/remind only | Prompt auto-approve |
| CO-PAY | Payment authorisation remains human | Proposal edited by agent |
| CO-LOG | Actions are attributable and retained | No trail |
| CO-CHG | Behaviour changes are released, not hot-edited | Unhashed prompt |
| CO-OVR | Overrides are logged and trended | Force-path as process |
| CO-BCP | AP operates without the agent | Work trapped in a bot UI |
| CO-MSR | Promotion uses dictionary KPIs, not activity | Vanity go-live |
| CO-TAX | Tax and entity treatment is not invented by a model | Wrong legal entity / tax |

### 2.2 Preventive vs detective

| Type | Meaning | Agent implication |
|---|---|---|
| Preventive | Stops the action | Validators, allow-lists, denied verbs, SoD on the identity |
| Detective | Finds the error after proposal or after posting | QA sample, duplicate after-the-fact, statement rec, ageing review |

Prefer preventive for bank data, payment release, entity, and tax posting. Detective-only for those is a residual risk that must appear on the register.

### 2.3 Control design pattern (every control)

Use the seven answers:

```
What to do:  [the check]
How:         [system rule / sample method]
Who:         [human owner — never the agent]
What can go wrong: [bypass, rubber-stamp, wrong sample]
Control of the control: [who tests this control]
Measure:     [dictionary ID or count]
Evidence:    [artefact]
```

### 2.4 Mapping to exception codes

Exception taxonomy (`03_EXCEPTION_TAXONOMY.md`) is a **detection and routing** structure. It is not itself a control. A control exists when someone (or a validator) must do something reliable with that code.

Example: `EX-DUP-001` raised by an agent is a detective signal. The control is: payment preparer cannot include a line with open `EX-DUP-001` without OV-FCE.

### 2.5 Sampling

Where frequency is “sample,” the buyer records n, method (random / stratified by value / stratified by code), and who draws the sample. Drawing the sample after seeing the agent’s “good” items is forbidden.

### 2.6 Layers (defence in depth)

1. ERP / workflow inherent (DOA, park, 3-way match if configured)  
2. Agent identity entitlements  
3. Validators (schema / cite / policy)  
4. Human R at the autonomy level  
5. Payment-proposal review  
6. Statement rec and close completeness  
7. QA / Internal Audit sample  

An agent that “also checks” does not allow removal of layer 1.

---

## 3. Who

| Role | Duty |
|---|---|
| Control / Risk owner | Accountable for this framework and the matrix |
| Head of AP | Responsible for operating the controls day to day |
| Controller | Money, close, DOA, financial scorecard lines |
| Finance Systems | Technical enforcement and logs |
| Exception owners | Controls attached to their codes |
| Internal Audit | Independent test — not the control owner |
| Agents | May **perform** a detective procedure (flag). May not **own** a control |

---

## 4. What can go wrong

| Failure | Effect |
|---|---|
| Matrix copied from a vendor brochure | Controls nobody operates |
| Agent listed as control owner | Governance breach |
| Only activity KPIs monitored | Harmful STP looks “efficient” |
| Preventive control is a paragraph in a prompt | Not a control |
| Duplicate sampling of easy invoices | False assurance |
| ERP control switched off “because the agent matches” | Control regression |

---

## 5. Control (of this framework)

- Semiannual matrix recertification (`../Governance/00_GOVERNANCE_FRAMEWORK.md` §23).  
- Every matrix row has a human owner and an evidence pointer.  
- Every residual “procedural only” control has a risk-register ID.  
- Internal Audit may test a sample of rows; findings open issues, they do not silently edit the matrix.

---

## 6. Measure

| Metric | Definition |
|---|---|
| Matrix completeness | Agents with ≥1 row / 16 |
| Owner vacancies | Rows with no named incumbent |
| Overdue control operation | Frequency missed |
| Control breaches | Dictionary: control breaches |
| Escalations fired vs should have fired | Sample |
| Audit exceptions | Dictionary |

---

## 7. Evidence

- This framework (versioned)  
- `01_CONTROL_MATRIX.md` operating copy with local names  
- Control operation artefacts (QA files, access reviews, proposal checklists)  
- Certification pack  

Store under `[BUYER]/Evidence/Controls/`.

---

## How to extend the matrix

When adding a 17th agent or a new verb:

1. Add risks to `02_RISK_REGISTER.md`.  
2. Add matrix rows (never “covered by existing culture”).  
3. Map exception codes if new stops-the-line conditions exist.  
4. Issue a C2/C3 change.  
5. Do not promote autonomy in the same change.

---

## ACME — ILLUSTRATIVE

ACME keeps ERP three-way match on. Matching Agent at L1 explains variances; it cannot tick “match complete.” Payment Proposal Review Agent at L1 cannot remove a hold. Control owner refuses a request to disable ERP duplicate check “to reduce false positives.”

---

## Related documents

- `01_CONTROL_MATRIX.md`  
- `02_RISK_REGISTER.md`  
- `03_EXCEPTION_TAXONOMY.md`  
- `../Governance/`  
- `../KPI_and_Measurement/01_KPI_DICTIONARY.md`  

---

*End of 00_CONTROL_FRAMEWORK.md*
