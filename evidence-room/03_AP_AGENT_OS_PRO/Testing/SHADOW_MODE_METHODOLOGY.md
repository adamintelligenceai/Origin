# Shadow Mode Methodology

**Evidence Room — AP Agent OS Pro**  
**Document type:** Method standard  
**Intent:** Prove agent quality **without** granting write authority or supplier-facing side effects.

---

## 1. Definition

In **shadow mode**, the agent receives the same inputs as production workers (or a faithful replica), produces recommendations/scores/drafts, and logs them for comparison — while **humans continue to operate the system of record** unchanged.

Shadow ≠ silent production writes.

---

## 2. When shadow is mandatory vs optional

| Situation | Shadow |
|---|---|
| Any new write action (post, send, GR create) | **Mandatory** before pilot |
| L0 observe-only analytics | Optional (already shadow-like) |
| Prompt/model major change on writing agent | **Mandatory** re-shadow or expanded sampling |
| Read-only validation assist with low risk | Risk-based; Controller may waive with documented rationale |

---

## 3. Objectives

1. Measure agreement with human decisions (or gold labels).  
2. Estimate FP/FN without harming suppliers.  
3. Discover integration and data gaps safely.  
4. Build promotion evidence pack.  

---

## 4. Design

### 4.1 Traffic selection

- Full clone of in-scope queue **or** stratified sample (vendor tier, $ bands, entities).  
- Exclude legal-hold matters if policy requires.  

### 4.2 Isolation

| Allowed | Forbidden |
|---|---|
| Read APIs | Posting invoices |
| Write to shadow evidence store | Supplier emails from agent |
| UI “shadow suggestions” visible to testers | Changing autonomy ceilings |
| | Payment proposal mutation |

### 4.3 Latency

Shadow should run close to real-time enough that comparison is meaningful (same receipt-day facts). Document if batch-lagged.

---

## 5. Comparison protocol

For each case:

| Field | Capture |
|---|---|
| Human decision | Actual SoR outcome |
| Agent decision | Recommendation / would-do |
| Agreement | Y/N/Partial |
| Disagreement class | FP, FN, taxonomy miss, data miss, judgment |
| $ at risk if agent wrong | |
| Reviewer notes | |

**Primary metrics:** agreement rate; FP/FN by detector; critical disagreement count; evidence completeness.

---

## 6. Duration and volume

Illustrative bands (set locally):

- Minimum **2 weeks** or **N cases** (e.g., ≥200 in-scope), whichever harder.  
- Include month-end if close-related.  
- Extend if mix unstable or metrics Amber.  

---

## 7. Operating rhythm

| Cadence | Activity |
|---|---|
| Daily | Critical disagreement review |
| Twice weekly | Metric huddle |
| End | Shadow exit report + go/no-go |

---

## 8. Exit criteria (template)

- [ ] Agreement ≥ target on gold/human labels  
- [ ] 0 Critical disagreement unexplained  
- [ ] FN on duplicates / bank-change within appetite  
- [ ] Logging 100% on material shadow runs  
- [ ] Business Owner + Controller (if required) sign go-pilot or rework  

Fail ⇒ fix ⇒ re-shadow. Do not “hope into pilot.”

---

## 9. Risks of shadow itself

| Risk | Mitigation |
|---|---|
| Testers over-trust suggestions | Training; suggestions labelled SHADOW |
| Sample bias | Stratify |
| Privacy in shadow store | Same controls as prod logs |
| Cost of double running | Time-box; economics tracked |

---

## 10. Shadow exit report outline

1. Scope & version  
2. Volume/mix  
3. Metrics vs targets  
4. Top disagreement themes  
5. Defects fixed / open  
6. Recommendation: pilot / extend shadow / stop  
7. Approvals  

---

## 11. Related documents

- `PILOT_METHODOLOGY.md`  
- `UAT_TEMPLATES.md`  
- `KPI_Measurement/KPI_FRAMEWORK.md`  
- `Agent_Library/RESPONSIBILITY_MODEL.md`
