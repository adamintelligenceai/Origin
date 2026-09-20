# Exception Decision Trees

**Evidence Room — AP Agent OS Pro**  
**Document type:** Decision support  
**Companion:** `EXCEPTION_TAXONOMY.md`  
**Use:** Train specialists; configure Agent 04 routing; UAT scenarios  

Trees are **logic sketches**. Encode thresholds from local policy (amounts, tolerances, SLAs).

---

## Universal entry tree (Agent 04)

```text
START: Exception detected
├─ Is document on Payment Hold or Legal Hold?
│  ├─ YES → Stop auto-resolve; route Hold queue; notify authority → END
│  └─ NO ↓
├─ Banking-change concern signal?
│  ├─ YES → Critical hold; Treasury dual control path → END
│  └─ NO ↓
├─ Potential/Confirmed duplicate score ≥ High?
│  ├─ Confirmed → Duplicate path (Tree D)
│  └─ Potential → Duplicate review queue (human) → END
├─ Assign primary taxonomy code
└─ Route by code family → Trees below
```

---

## Tree A — PO identity family (Missing / Invalid / Closed / Exhausted)

```text
PO problem?
├─ Missing PO
│  ├─ Policy allows non-PO for this category/amount?
│  │  ├─ YES → Non-PO coding/approval path (Tree G)
│  │  └─ NO → Chase buyer for PO (Agent 09) → timeout? → reject to supplier (08)
├─ Invalid PO
│  ├─ Candidate POs found with high confidence?
│  │  ├─ YES → Recommend match (L1); human confirm → Matching
│  │  └─ NO → Supplier clarify (08) + buyer (09)
├─ PO closed
│  └─ Buyer decision: reopen / new PO / reject → Procurement rules
└─ PO exhausted
   ├─ Overage within tolerance AND DOA auto-band?
   │  ├─ YES → Variance approve path (07) / fenced L3 if chartered
   │  └─ NO → Change order / reject overage
```

---

## Tree B — Match variance (Price / Quantity)

```text
Variance type?
├─ Price mismatch
│  ├─ Within price tolerance?
│  │  ├─ YES → Auto-clear or L1 recommend accept
│  │  └─ NO → Buyer approval (07) → if refused → supplier CN (08)
└─ Quantity mismatch
   ├─ GR covers invoice?
   │  ├─ Partial → Partial post + hold remainder
   │  ├─ None → Tree C (receipt)
   │  └─ Over vs GR → overship review (fraud check if extreme)
```

---

## Tree C — Receipt family (Missing / Partial)

```text
Receipt status?
├─ Missing receipt
│  ├─ Delivery evidence exists offline?
│  │  ├─ YES → Prompt authorized GR (05/09); no unauthorized auto-GR
│  │  └─ NO → Confirm with receiver; if not received → dispute / reject
└─ Partial receipt
   ├─ More deliveries expected?
   │  ├─ YES → Schedule wait + SLA clock
   │  └─ NO → Partial match + supplier revise or CN
```

---

## Tree D — Duplicate family

```text
Duplicate class?
├─ Confirmed duplicate
│  ├─ Already paid?
│  │  ├─ YES → Recovery protocol; incident; block vendor channel if pattern
│  │  └─ NO → Reject/void duplicate; notify supplier
└─ Potential duplicate
   ├─ High $ or high score?
   │  ├─ YES → Dual human review before any release
   │  └─ NO → Single specialist review with evidence pack
```

---

## Tree E — Party / entity / tax

```text
Issue?
├─ Wrong supplier → Stop payee assumptions; MD/factor path; dual control if payee changes
├─ Incorrect legal entity → Reassign or rebill; Tax consult if cross-border
└─ Tax issue → Abstain if low confidence; Tax queue; no silent tax invent
```

---

## Tree F — Approval / DOA

```text
Approval state?
├─ Approval missing → Build pack (07) → route DOA → remind (09) → escalate SLA
└─ DOA issue → Block; reroute correct authority; if breach already occurred → incident
```

---

## Tree G — Coding / cost centre / quality / OCR

```text
Issue?
├─ Coding missing → Requestor chase; suggest from history; micro-default only if chartered
├─ Invalid cost centre → Validate master; owner correct
├─ Invoice quality → Reject checklist to supplier (08)
└─ OCR/extraction → Human correct critical fields; re-enter validation
```

---

## Tree H — Master data / banking

```text
Master-data related?
├─ Banking-change concern → ALWAYS hold + out-of-band verify + dual approve
└─ Other MD defect → MD ticket; block dependent payments if risk-tagged
```

---

## Tree I — Statement / credit / dispute / ageing

```text
Issue?
├─ Statement discrepancy → Recon lines (11); spawn child exceptions; no forced clear
├─ Credit note required → Request + track CN; match when arrives
├─ Disputed invoice → Dispute owner workflow; payment hold as needed
└─ Aged unresolved → Re-triage; swarm if material; root cause (15)
```

---

## Tree J — System / interface

```text
System/interface error?
├─ Payment instruction possibly sent? → DO NOT blind retry; reconcile first
├─ Safe replay (idempotent read/write)? → Tech replay + AP verify
└─ Unsafe → Manual SOP; defect ticket; communicate supplier if SLA risk
```

---

## Encoding tips for Agent 04

| Tip | Practice |
|---|---|
| Deterministic first | Rules before generative judgment |
| Explainability | Store path node IDs on the case |
| Timeouts | Every chase node has SLA + next node |
| Collision | One owner agent at a time per invoice |
| Versioning | Tree version = taxonomy version |

---

## Related documents

- `EXCEPTION_TAXONOMY.md`  
- `HUMAN_VS_AGENT_FRAMEWORK.md`  
- `Testing/TESTING_SCRIPTS.md`
