# Agent Charter Template

**Evidence Room — AP Agent OS Pro**  
**Document type:** Template (blank + filled illustrative example)  
**Instruction:** Complete blank form for each agent. Keep filled example for training only.

---

# Part A — Blank charter

## 0. Document control

| Field | Value |
|---|---|
| Agent name | |
| Agent ID | |
| Version | |
| Effective date | |
| Business Owner | |
| Technical Owner | |
| Controller sponsor | |
| Current level / Ceiling | / |
| Taxonomy version | |
| Status | Draft / Approved / Retired |

---

## 1. Purpose (job in one paragraph)



---

## 2. Scope

| | |
|---|---|
| In scope document types | |
| Entities / ledgers | |
| Channels | |
| Amount / risk fences | |
| Explicit exclusions | |

---

## 3. Seven product questions

### Q1 — What work is permitted?



### Q2 — What evidence on every run?



### Q3 — Who owns exceptions; which codes?



### Q4 — Which KPIs prove earned responsibility?



### Q5 — Promotion / demotion rules?



### Q6 — Failure, ambiguity, policy conflict?



### Q7 — Audit trail six months later?



---

## 4. Inputs / outputs / tools



---

## 5. Human vs agent split (summary table)

| Step | Actor | Level |
|---|---|---|
| | | |

---

## 6. Controls & stop conditions



---

## 7. RACI (names)



---

## 8. Success criteria for next review window



---

## 9. Approvals

| Role | Name | Date | Signature |
|---|---|---|---|
| Business Owner | | | |
| Technical Owner | | | |
| Controller (if required) | | | |

---

# Part B — Filled illustrative example

> **ILLUSTRATIVE EXAMPLE ONLY** — fictional company “Northline Industrial.” Not a customer case study.

## 0. Document control

| Field | Value |
|---|---|
| Agent name | Matching Assist |
| Agent ID | AGENT_03 |
| Version | 1.2.0 |
| Effective date | 2026-04-01 |
| Business Owner | A. Reyes, AP Manager |
| Technical Owner | J. Cho, Finance Systems |
| Controller sponsor | M. Okonkwo, Controller |
| Current level / Ceiling | L1 / L2 |
| Taxonomy version | 2026.03 |
| Status | Approved |

---

## 1. Purpose

Matching Assist recommends 2-/3-way match outcomes for domestic PO invoices in the US operating ledger, citing PO and receipt evidence, and routes variances to the exception taxonomy. It does not post, approve, or pay.

---

## 2. Scope

| | |
|---|---|
| In scope | Domestic PO invoices, USD, US ledger |
| Entities | Northline US Inc. only |
| Channels | ERP AP inbox + approved capture system |
| Fences | Recommend only ≤ $50,000 line value (illustrative); above = observe + human |
| Exclusions | Services without GR policy exceptions; intercompany; non-USD; payment proposal changes |

---

## 3. Seven product questions (summary answers)

**Q1** — Recommend match accept / exception code within tolerances; prepare evidence pack. No writes.  

**Q2** — `run_id`, input invoice/PO/GR IDs, tolerance evaluation, rationale, confidence, citations.  

**Q3** — AP Specialist owns; codes: price_mismatch, quantity_mismatch, missing_receipt, partial_receipt, po_exhausted.  

**Q4** — Matching accuracy; FP/FN exception; contribution to STP; median time-to-match decision; override rate.  

**Q5** — Promote to L2 after 6 consecutive Green weeks, 0 Critical breaches, Controller sign-off; demote on fabricated citation or Critical breach.  

**Q6** — Ambiguity → exception; policy conflict → stop + AP Manager; model outage → fallback SOP.  

**Q7** — Logs in evidence store retained per finance retention; pack export tested quarterly.  

---

## 4. Inputs / outputs / tools

**In:** Invoice header/lines, PO, GR, tolerance table, vendor tier.  
**Out:** Recommendation object; exception draft case.  
**Tools:** Read ERP match APIs; write shadow/evidence DB only at L1.

---

## 5. Human vs agent

| Step | Actor | Level |
|---|---|---|
| Evaluate match | Agent recommend | L1 |
| Accept/reject | AP Specialist | Human |
| Post | ERP via human/system workflow | Human |

---

## 6. Controls & stop conditions

Stop if: citation IDs do not resolve; bank-change flag present; duplicate high score; amount &gt; fence; confidence &lt; threshold. Kill-switch: AP Manager or Tech on-call.

---

## 7. RACI

Business Owner **A**; Specialists **R** for decisions; Tech **R** for platform; Agent **R** for recommendation compute only.

---

## 8. Success criteria (illustrative window)

Matching accuracy ≥ 97% on sample; override rate 10–25% band; 0 Critical; evidence completeness 100%.

---

## 9. Approvals

Signed (illustrative): Reyes / Cho / Okonkwo — 2026-03-28.
