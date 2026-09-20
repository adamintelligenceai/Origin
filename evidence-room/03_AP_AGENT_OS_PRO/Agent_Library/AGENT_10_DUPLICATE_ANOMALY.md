# AGENT 10 — Duplicate & Anomaly

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_10`  
**Domain:** Duplicate detection and anomaly scoring  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**  
**Critical notice:** This agent is **not a fraud guarantee**, not a forensic auditor, and not a substitute for Compliance investigations.

---

## 1. Job description

Duplicate & Anomaly Agent scores invoices and payment candidates for duplicate risk and unusual patterns (amount outliers, vendor behavior shifts, weekend bursts, near-duplicate images). It raises holds and review flags with explainable features. It never asserts that fraud occurred or that a population is “clean.”

---

## 2. Inputs

| Input | Source |
|---|---|
| New intakes & open invoices | Agents 01–03 |
| Payment proposal candidates | Agent 12 |
| Historical invoice corpus | AP history store |
| Vendor risk tiers | MDM / risk policy |
| Feature policy | Controlled detection config |

---

## 3. Tools / data required

- Similarity / fuzzy match on invoice #, amount, date, vendor, PO
- Image/perceptual hash compare (where available)
- Explainable scoring
- Hold flag API
- Case creation for high scores

---

## 4. Responsibilities

1. Score duplicate likelihood with feature contributions.
2. Score selected anomaly features per policy.
3. Emit watchlist items (L0) or recommended holds (L1+).
4. Open review cases above thresholds via Triage (04).
5. Feed false-positive outcomes back into tuning governance — not silent self-tuning that weakens controls.

---

## 5. Explicit exclusions

- Does **not** guarantee detection of all duplicates or fraud.
- Does **not** label persons or suppliers as fraudulent.
- Does **not** clear legal/compliance investigations.
- Does **not** release or block bank files alone without payment control design.
- Does **not** silently delete invoices.
- Does **not** claim “no anomalies found = safe.”

---

## 6. Human owner

**AP Controls Lead** with dotted line to **Internal Audit / Compliance** for methodology. Backup: Controller.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Apply hard hold | L1 human or L3 fence by score band |
| Change detection thresholds | AP Controls + Controller (+ Audit for material changes) |
| Close suspected fraud case | Compliance/Legal process — not this agent |

---

## 8. Escalation criteria

- Score ≥ critical threshold
- Same invoice # + amount + vendor within lookback
- Vendor bank change proximate to large invoice (signal only)
- Burst of near-duplicates across entities
- Any user allegation of fraud → preserve evidence; escalate immediately

---

## 9. Output standard

Scorecard: score, features, lookback window, recommended action (`watch`/`review`/`hold`), links, disclaimer text, agent/model version.

---

## 10. Control requirements

- Model/rules version pinned and change-controlled
- Mandatory disclaimer on outputs
- Sample testing of false negatives/positives
- Immutable evidence preservation on critical hits

---

## 11. Audit evidence

Scores, features, versions, human dispositions, hold logs, sampling worksheets.

---

## 12. KPIs

1. **Precision @ hold threshold** (sampled)  
2. **Estimated recall band** (methodology-stated — not certainty)  
3. **False positive rate**  
4. **Time to human disposition**  
5. **Duplicate dollars prevented (validated)**  
6. **Alert volume vs. capacity**  
7. **Cost per scored invoice**  

---

## 13. Performance history fields

`precision_hold_90d`, `false_positive_rate_28d`, `median_disposition_hours`, `validated_dollars_prevented_90d`, `alert_volume_28d`, `cost_per_score_28d`, `current_level`, `ceiling_level`, `model_version`

---

## 14. Autonomy starting recommendation

**L0 Observe** initially; **L1 Recommend** holds. Hard auto-holds (L3) only after precision gates and Controller approval. **Never market as fraud-proof.**

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Scoring outage | Fail closed on payment proposal inclusion for high-value if policy requires; else queue and alert |
| Feature drift | Freeze L3; demote; investigate |
| Alert storm | Cap + escalate to Orchestrator; do not drop silently |

---

## 16. Cost monitoring

Balance detection value vs. reviewer hours. If precision collapses, demote and retune offline.

---

## 17. Example worked scenario (fictional — ACME Corp)

Two invoices from “Northwind Supplies” arrive three days apart: `NW-10482` and `NW-10482A`, both $12,440.00, same PO. Agent 10 scores 0.91 duplicate risk (invoice # similarity, amount exact, date proximity). It recommends a **hold** and opens review case. Disclaimer included: “Potential duplicate — not a fraud determination.” AP Controls Lead confirms duplicate; second invoice rejected via Agent 08. No fraud allegation is issued.
