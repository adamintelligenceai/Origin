# A10 — Duplicate & Anomaly Agent

**Stack ID:** A10  
**Human owner (default):** AP Controls Lead / Internal Control partner  
**Typical autonomy start:** L0 → L1  
**Depends on:** Invoice history, payment history, vendor patterns  
**Hands off to:** A04 Exception Triage, A08 (supplier clarify), A12 (hold recommendations), human investigations

---

## Purpose

Surface **candidate** duplicates and anomalous invoice patterns early enough to prevent erroneous payment preparation — with explicit humility: **this agent is not a fraud-detection guarantee**, not an assurance opinion, and not a substitute for Internal Audit or forensic investigation.

---

## Job description

The Duplicate & Anomaly Agent scores invoices for duplicate risk (same/similar invoice number, amount, date, vendor, file hash) and for anomaly signals (unusual amount vs history, odd timing, conflicting tax, sudden new remit hints). It produces investigation packs and recommended holds for human decision. It does not assert that an invoice is fraudulent, does not guarantee all duplicates are caught, and does not clear legal/compliance responsibility.

---

## Inputs

| Input | Source |
|-------|--------|
| New intake / validated invoices | A01 / A02 |
| Historical invoices and payments | ERP |
| File hashes and OCR text fingerprints | Document store |
| Vendor baseline statistics | Analytics |
| Hold / block policies | Config |
| Known credit-note patterns | History |

---

## Tools / data required

- Deterministic duplicate rules engine (primary)  
- Optional similarity / anomaly models (secondary, capped)  
- Payment history read  
- Case pack generator  
- Payment hold recommendation API (not auto-release)  

---

## Responsibilities

1. Run deterministic duplicate checks on every candidate.  
2. Apply similarity matching for near-duplicates (OCR errors, prefixes).  
3. Generate anomaly scores with explainable features.  
4. Classify: `duplicate_invoice`, `potential_duplicate`, or anomaly reason codes.  
5. Build investigation packs for humans.  
6. Recommend payment hold / exclude from proposal — **human confirms**.  
7. Record false positive feedback for tuning.  
8. Publish limitation statement on all outputs.  

---

## Explicit exclusions

- Guaranteeing fraud prevention or detection  
- Auto-accusing suppliers  
- Autonomous payment blocks without policy + human for high impact (configurable; default human)  
- Replacing sanctions screening or KYC products  
- Silent deletion of invoices  

---

## Human owner

**Primary:** AP Controls Lead  
**Partners:** Internal Control / Internal Audit (oversight), Fraud Risk if exists  
**Accountable executive:** Controller  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Model / rule threshold changes | Controls Lead + Controller |
| Auto-hold at L2+ | Written policy |
| Clear potential duplicate as false positive | AP processor + sample QA |
| Escalate to investigation function | Controls Lead |

---

## Escalation criteria

- Exact duplicate against already-paid invoice  
- Near-duplicate with different bank instructions mentioned  
- Cluster of anomalies on one vendor in short window  
- Employee-initiated invoice pattern anomalies (refer to appropriate policy — do not freelance HR action)  
- Score above critical threshold and amount material  

---

## Output standard

Every alert must include:

- Finding type + confidence  
- Matched prior document IDs  
- Feature explanation (why flagged)  
- Recommended action  
- **Limitation notice:** *Candidate signal only — not a fraud determination or completeness guarantee*  
- Analyst disposition field  

---

## Control requirements

- Rules versioned; model cards documented if ML used  
- Dual control on threshold loosening  
- Mandatory human disposition on critical alerts  
- Periodic false-negative review (paid then found duplicate)  
- No marketing claims of “fraud proof AP”  

---

## Audit evidence

Alert log, dispositions, holds applied, rule versions, sampled false positive/negative reviews, limitation notice acknowledgement in procedures.

---

## KPIs

1. **Precision @ critical threshold** (confirmed duplicates / alerts)  
2. **Known duplicate escape rate** (paid duplicates found later) — drive toward zero, never claim zero  
3. **Median time alert → disposition**  
4. **False positive rate**  
5. **Value of stopped duplicate candidates** (informational, not ROI promise)  
6. **% alerts with complete explanation**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Shadow scores |
| **L1** | Create investigation packs; recommend holds |
| **L2** | Auto soft-hold low-risk potential duplicates pending human review |
| **L3** | Auto-exclude clear exact duplicates from payment proposals; humans still disposition |
| **L4** | Managed detection ops with continuous validation — **still not a fraud guarantee** |

---

## Failure handling

Model outage: fall back to deterministic rules only. Data gap in payment history: raise confidence discount; fail toward hold recommendation on exact invoice-number clash. Never auto-release a hold when systems disagree.

---

## Cost monitoring notes

Run expensive similarity models only on deterministic near-misses. Cache vendor baselines daily, not per invoice from scratch.

---

## Example scenario *(illustrative example)*

New invoice INV-1001 for £12,000 matches a paid INV-1001 for the same vendor two weeks earlier (OCR had read INV-100l previously as different). Deterministic invoice-number+vendor+amount hit fires `potential_duplicate`. Pack shows both PDFs and payment doc. Human confirms duplicate; invoice blocked from A12. The agent does **not** label the supplier “fraudulent.”

---

## Suggested first pilot scope

Exact and normalised invoice-number duplicates only, one entity, L1, no ML, weekly Controls review of all alerts and all paid-invoice collision searches.
