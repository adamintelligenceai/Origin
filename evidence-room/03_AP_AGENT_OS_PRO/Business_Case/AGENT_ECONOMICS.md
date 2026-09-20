# Agent Economics

**Evidence Room — AP Agent OS Pro**  
**Document type:** Operating economics guide  
**Audience:** AP Manager, Controller, FP&A, Prompt Steward  

---

## 1. Idea

Each agent is an economic unit: it consumes inference, platform, and human supervision, and it produces correct outcomes (and occasionally costly errors). Manage agents like a workforce with unit economics — not like a single “AI project.”

---

## 2. Unit cost stack (per agent)

| Cost layer | Examples | Cadence |
|---|---|---|
| Build | Design, integration, UAT | One-time / major change |
| Run — inference | LLM/API calls, OCR add-ons | Continuous |
| Run — platform | Orchestration, storage, licences | Monthly |
| Run — human | Reviewers, QA sampling, owners | Continuous |
| Risk — expected loss | Duplicate FN, mis-post residual | Probabilistic |
| Governance overhead | Scorecards, attestations | Monthly/quarterly |

```text
Fully_Loaded_Agent_Cost ≈ Build_Amortized + Inference + Platform + Human_Supervision + Governance + Expected_Risk_Loss
```

---

## 3. Unit value stack

| Value | Measure |
|---|---|
| Correct automated outcomes | Count × avoided minutes |
| Faster cycle | Only if valued by finance policy |
| Prevented loss | Confirmed duplicates blocked ($) |
| Better evidence | Audit hours avoided (validated) |

```text
Cost_Per_Correct_Outcome = Fully_Loaded_Agent_Cost / Correct_Outcomes
```

Track trend. Rising CPCO + flat quality ⇒ inefficient prompts, wasteful retries, or wrong scope.

---

## 4. Supervision ratio

| Level | Illustrative supervision posture |
|---|---|
| L0–L1 | High human minutes per case |
| L2 | Review drafts in batches |
| L3 | Sample-based; exceptions full review |
| L4 | Continuous monitoring + attestation |

If supervision hours do not fall as level rises, promotion failed economically — investigate.

---

## 5. Portfolio allocation

Fund agents by **marginal return on constrained specialist time** and **risk reduction**, not by novelty.

| Priority logic | Example |
|---|---|
| High volume × clear rules × medium $ | Match-in-tolerance assist |
| High risk × detection | Duplicate & bank-change holds |
| Low volume × high judgment | Keep human; light L0 analytics |

---

## 6. Inference hygiene

- Cache deterministic extractions fields; do not re-prompt identical pages.  
- Prefer rules before LLM where stable.  
- Cap retries.  
- Separate eval spend from production spend in reporting.  
- Alert on cost per run spikes (prompt regression).  

---

## 7. Error economics

| Error type | Economic framing |
|---|---|
| FP exception | Extra human minutes + supplier friction |
| FN duplicate | Direct $ loss + recovery cost + trust |
| Wrong tax | Regulatory + rework |
| Wrong entity | Reversal cost + compliance |

Optimize for **asymmetric** costs: reducing FN on Critical risks often justifies more FPs — within supplier-SLA sanity.

---

## 8. Licence context (Evidence Room)

List prices for planning: Free Diagnostic **$0**; Starter **$79**; Professional **$199**; Team **$499**; Custom Blueprint **$1,500–$3,000**.

These buy methodology and artefacts. Runtime inference and ERP remain separate.

---

## 9. Monthly agent P&L (template)

| Line | Amount |
|---|---|
| Inference | |
| Platform alloc | |
| Human supervision | |
| Governance alloc | |
| **Total cost** | |
| Validated labour benefit | |
| Prevented duplicate $ (confirmed) | |
| **Total benefit (validated)** | |
| **Contribution** | |
| CPCO | |
| Gate status (G/A/R) | |

Red gate ⇒ contribution not used for promotion.

---

## 10. Related documents

- `AP_BUSINESS_CASE_MODEL.md`  
- `ROI_CALCULATOR_GUIDE.md`  
- `KPI_Measurement/KPI_FRAMEWORK.md`
