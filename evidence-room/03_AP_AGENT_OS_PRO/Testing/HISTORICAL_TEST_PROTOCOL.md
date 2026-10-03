# Historical Test Protocol

**Product:** AP Agent OS — Evidence Room  
**Method step:** 6  
**Audience:** Test lead, control owner, process owner  
**Purpose:** Score agents against **closed** objects with gold-labels, including a **sealed hold-out**, before shadow.

This protocol measures labelled accuracy, FPR, and FNR. It does not measure STP in production, hours released, or financial savings.

---

## 1. Principles

1. **Messy months over clean ones.** Prefer periods with GR backlogs, price changes, and dual-channel intake.  
2. **Tuner ≠ scorer.** The person who edits prompts or rules does not score the sealed pack.  
3. **Seal is a control.** After seal, the hold-out is read-only except by the scorer.  
4. **Leaf, not vibe.** Score the tree leaf (pass or EX-code), not “the agent was helpful”.  
5. **Critical detectors stand alone.** EX-DUP, EX-ILE, EX-BNK, EX-DOA are never blended into a single accuracy.  
6. **No production writes.** Historical replay uses a test harness or a write-blocked clone.

---

## 2. Roles

| Role | Duty |
|---|---|
| Test lead | Pack design, seal, score sheet, SC-T |
| Labeller | Creates gold-labels from closed evidence (not from agent output) |
| Adjudicator | Breaks label disagreements (AP lead / Controls / Controller by code) |
| Tuner | May use the **dev** pack only |
| Control owner | Accepts floors and waivers |
| Systems | Access to the seal, harness write-block |

Northline: labellers are processors who did **not** handle that invoice originally, where staffing allows.

---

## 3. Pack types

| Pack | Use | Typical n (Northline Dayton PO-goods) |
|---|---|---|
| Dev | Tuning, script fixtures | 80–120 |
| Gold (train/eval open) | Reported internally; may be seen by tuner | 250–350 |
| Hold-out (sealed) | SC-T pass/fail | ≥ 80, stratified |
| Adversarial | Injection, EX-BNK, EX-ILE, unknown-commit | 20–40 (may be synthetic) |

An object may not sit in both gold-open and hold-out.

---

## 4. Sampling

### 4.1 Frame

Closed invoices (and credits/statements if those agents are in scope) for the entity/path, last 6–12 months, excluding objects under legal hold.

### 4.2 Stratification (hold-out)

Draw to cover, not to flatter:

| Stratum | Minimum share or count |
|---|---|
| Clean match | ≤ 40% of the pack |
| EX-MRX / EX-PRX | ≥ 15% |
| EX-PRM / EX-QTM / EX-POE | ≥ 10% |
| EX-DUP / EX-PDUP pairs | ≥ 8 pairs |
| Identity (EX-ILE / EX-WSP) | ≥ 5 |
| EX-BNK or remittance-present | ≥ 8 |
| Dual-channel same PDF | ≥ 3 |
| Credits | If Agent 03/11 in scope, ≥ 5 |
| Month-end / high volume week | ≥ 15% of pack dates |

If the frame cannot fill a stratum, record the gap; do not backfill with clean invoices.

### 4.3 Leakage control

Remove objects used in demos, UAT fixtures, or vendor workshops from the hold-out.

---

## 5. Gold-label method

Label **before** replay, from the closed evidence pack (face, PO snapshot, GR, posting, exception history).

| Task | Label |
|---|---|
| Document type | Invoice / credit / statement / other |
| Required fields | Normalised values |
| Identity | Entity code, supplier account, or fail code |
| Duplicate | None / EX-DUP / EX-PDUP + pair id |
| Match leaf | Pass or EX-code per signed trees |
| Tax / coding | Pass or EX-TAX / EX-CDM / EX-ICC |
| Approval | N/A / instance present / EX-APM / EX-DOA |
| Bank compare | N/A / match / EX-BNK |
| Blocking code | First code per master tree |

Two labellers on Critical strata. Disagreement → adjudicator; do not average.

**Do not** label from “what we would do now” if policy changed. Either relabel the pack to the current tree and mark the pack date, or exclude the object.

Privacy: mask bank numbers in label notes; store images under the evidence-retention rule.

---

## 6. Replay

1. Freeze agent versions and hashes.  
2. Run TS-ENV-01.  
3. Replay objects in id order; do not peek at labels.  
4. Capture: proposal, citations, validation result, leaf, flags, tool calls.  
5. Score with the locked KPI formulas.  
6. Produce confusion matrices per detector.  
7. File SC-T.

If replay cannot see a historical GR that existed at posting time, restore that snapshot. Scoring against *today’s* GR is a different study (useful, but not this protocol).

---

## 7. Scoring rules

- Required field: exact after normalisation (dates ISO, decimals, trimmed invoice numbers).  
- Match leaf: exact code. Related codes do not rescue a wrong **blocking** code.  
- EX-PDUP vs EX-DUP: score per tree; a PDUP on an exact key is a miss on EX-DUP.  
- Unsupported ready field (no citation): field error even if the number is right.  
- Tool call to a forbidden action: Critical defect, pack fail.

Floors: use the locked SC-T table (Northline example in `KPI_FRAMEWORK.md` §9).

---

## 8. Seal procedure

1. Hold-out ids listed; hash of the id file stored with the control owner.  
2. Access list: scorer + control owner. Tuner access = incident.  
3. After scoring, results published; ids may be opened for case review.  
4. Re-use of the same hold-out for a later model is allowed **once** if no tuner saw the cases. After a second use, retire and draw a new seal.

---

## 9. SC-T header (copy)

| Field | Entry |
|---|---|
| Protocol version | This file + date |
| Pack ids | Dev / gold / hold-out / adversarial |
| Seal hash | |
| Scorer / tuner | Must differ |
| Agent hashes | |
| Tree / SOP / taxonomy versions | |
| Floors | |
| Acc_class / Acc_ext / Acc_match | |
| Acc_crit | |
| FPR/FNR tables | Attached |
| Defects C/H/M/L | |
| Pass / fail | |
| Waiver (if any) | Risk ids + expiry |
| Signatures | Test lead, control owner |

---

## 10. Adversarial add-on

Run the injection and payee-data scripts in `TESTING_SCRIPTS.md` against fixtures, not against live suppliers. A fail here fails the cycle even if hold-out accuracy is green.

Minimum: TS-INJ-01, TS-BNK-01, TS-QL-02, TS-SYS-01, TS-AUTH-01, TS-DP-01.

---

## 11. Northline HT-DAY-PO-03 (illustrative)

- Frame: Dayton PO-goods, Oct 2025–Mar 2026, 4,180 closed invoices.  
- Gold-open 320; hold-out 88 stratified; adversarial 24 synthetic.  
- Scorer: test lead. Tuner: implementer. Seal hash filed with Shah.  
- Hold-out: Acc_class 0.99; Acc_ext field 0.96; Acc_match 0.94; FNR EX-DUP 0/9; FNR EX-ILE 0/5; FNR EX-BNK 1/8 (remittance in a footer the extract missed) — High defect, not Critical (no ready-to-post).  
- Result: **fail pending** EX-BNK footer rule; re-score hold-out **once** after the rule change; if tuner needs more iteration, draw a new seal.  
- No waiver for EX-BNK FNR above 0.02.

---

## 12. After the protocol

Pass → UAT and/or shadow.  
Fail → defects, then a new cycle. Do not “shadow to make up for” a failed hold-out.  
Waiver → residual risk on the register, expiry, and a re-test date. Waivers cannot cover Governance Standard 2.1–2.6.

Retired packs stay under retention. They are not a playground for demos without redaction.
