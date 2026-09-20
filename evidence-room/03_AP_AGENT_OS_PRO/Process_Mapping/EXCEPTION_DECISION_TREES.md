# Exception Decision Trees

**Product:** AP Agent OS — Evidence Room  
**Use with:** `EXCEPTION_TAXONOMY.md`, `DECISION_TREE_TEMPLATE.md`  
**Purpose:** Choose the blocking code, the first chase, and the point at which a human must stop the agent.  
**Example:** Northline Industrials Ltd, PO-goods path unless noted.

These trees evaluate *already-parked or about-to-park* items. Intake classification remains DT-CLASS.

Agents may walk a tree and propose a leaf. They may not add a leaf.

---

## 0. Master tree — which family first?

Apply in this order. Stop at the first family that is true.

| Step | Test | Family | First codes |
|---|---|---|---|
| 0.1 | Technical error prevents a reliable read or commit | System | EX-SYS |
| 0.2 | Document fails the quality checklist on its face | Quality | EX-IQ |
| 0.3 | Extraction was used and failed floors while the face is usable | Extraction | EX-OCR |
| 0.4 | Entity is wrong | Identity | EX-ILE |
| 0.5 | Supplier account is wrong or unusable | Identity | EX-WSP, EX-MDI |
| 0.6 | Bank details on face/message differ from master | Payee data | EX-BNK |
| 0.7 | Exact duplicate | Duplicate | EX-DUP |
| 0.8 | Potential duplicate | Duplicate | EX-PDUP |
| 0.9 | PO missing / invalid / closed / exhausted | PO | EX-MPO, EX-IPO, EX-POC, EX-POE |
| 0.10 | Receipt missing or partial | Receipt | EX-MRX, EX-PRX |
| 0.11 | Qty or price outside tolerance | Match | EX-QTM, EX-PRM |
| 0.12 | Tax compare fails | Tax | EX-TAX |
| 0.13 | Coding missing or invalid | Coding | EX-CDM, EX-ICC |
| 0.14 | Approval missing or DOA unusable | Approval | EX-APM, EX-DOA |
| 0.15 | Named dispute exists | Dispute | EX-DIS |
| 0.16 | Credit is the agreed remedy | Credit | EX-CNR |
| 0.17 | Item is on hold or should be a hold candidate | Hold | EX-HLD |
| 0.18 | Item arrived from statement reconciliation | Statement | EX-STD |
| 0.19 | Original code aged past trigger | Ageing | EX-AGE (additional, not first) |

Northline uses this order on NIL PO-goods. Other paths may lift Statement or Credit earlier. Write the local order on the process map.

---

## 1. System — EX-SYS

```
Was a commit attempted (post, park, status write)?
├─ Yes → Search ERP for a document created in the same minute with same supplier+invoice
│         ├─ Found → Do not retry. Treat as possible success. Human confirms. Evidence Agent stores both ids.
│         └─ Not found → Technical owner restores; AP lead authorises one retry
└─ No (read/timeout only) → Retry read. If still failing, park EX-SYS, do not invent fields
```

**Stop the agent** if a commit is in an unknown state. Unknown commit is not a retry.

---

## 2. Quality and extraction — EX-IQ / EX-OCR

```
Is the face complete and readable by a trained processor?
├─ No → EX-IQ → Supplier Comms: request reissue or clearer copy
└─ Yes
    ├─ Extraction not used → quality pass
    └─ Extraction used
        ├─ Any required field below confidence floor or failed human spot-check → EX-OCR
        │     → Processor keys from face; log fields for extraction review
        └─ Floors met → continue master tree
```

**Stop the agent** from constructing an invoice number, bill-to, or amount that is not on the face.

---

## 3. Identity — EX-ILE / EX-WSP / EX-MDI

```
Does bill-to legal name or registered number match the record’s entity?
├─ No → EX-ILE → do not switch entity silently → recreate or return
└─ Yes
    Does face supplier identity resolve to one unblocked account?
    ├─ No account → EX-MDI (create via steward)
    ├─ Blocked account → EX-MDI (block reason to steward)
    ├─ Multiple plausible accounts → EX-WSP or EX-MDI (steward / AP lead)
    └─ One account
        Does face legal supplier match that account?
        ├─ No → EX-WSP
        └─ Yes → identity pass
```

**Stop the agent** from creating a supplier or changing entity code.

---

## 4. Banking-change concern — EX-BNK

```
Are bank details present on the invoice or in the accompanying message?
├─ No → skip
└─ Yes → compare to supplier master (masked display)
    ├─ Match → continue
    └─ Differ or “please update our bank” in the same episode
          → EX-BNK
          → Payment hold candidate (EX-HLD related)
          → Master-data procedure only
          → Agent writes nothing to the bank master
```

**Stop the agent** from sending the new details to anyone except the steward through the logged procedure. Do not confirm the new account to the address that requested the change.

---

## 5. Duplicate — EX-DUP / EX-PDUP

```
Same supplier account (or confirmed group) + same invoice number already posted or in process?
├─ Yes → EX-DUP → AP lead → X4 or correction of the original
└─ No
    Same number on another site of the same group?
    ├─ Yes → EX-PDUP
    └─ No
        Same supplier + same date + same amount + invoice number within one-character or OCR-likely distance?
        ├─ Yes → EX-PDUP → AP lead inspects both faces
        └─ No → duplicate gate pass
```

**Stop the agent** from voiding, deleting, or posting either item in the pair.

Northline note: Helion Fasteners invoices under site 10 and site 40 have collided on invoice number. Those cases stay EX-PDUP until Elena Voss inspects.

---

## 6. PO family — EX-MPO / EX-IPO / EX-POC / EX-POE

```
Is this path a PO path?
├─ No → leave this tree (non-PO coding/approval trees apply)
└─ Yes
    Is there a PO number on the face or a buyer-confirmed reference on the record?
    ├─ No → EX-MPO → supplier then buyer
    └─ Yes
        Does that PO exist on this entity?
        ├─ No → EX-IPO → do not search other entities to “fix” it
        └─ Yes
            Is the PO open for invoicing?
            ├─ No → EX-POC → buyer only may request re-open
            └─ Yes
                Does residual qty/value cover this invoice under DT-MATCH?
                ├─ No → EX-POE → buyer amend or supplier revise
                └─ Yes → PO usable
```

**Stop the agent** from re-opening a PO or borrowing a residual from another PO.

---

## 7. Receipt family — EX-MRX / EX-PRX / EX-QTM

```
Is receipt required on this path?
├─ No → skip
└─ Yes
    Received qty vs invoice qty, per required line
    ├─ Received = 0 → EX-MRX → receiver then buyer
    ├─ 0 < received < invoice → EX-PRX
    │     ├─ Local SOP allows line-level partial post, and control owner has authorised it
    │     │     → propose partial post; park remainder as EX-PRX or EX-CNR
    │     └─ Else → park full invoice EX-PRX
    ├─ Received ≥ invoice but other lines fail → EX-QTM on the failing line
    └─ All lines received ≥ invoice → receipt pass (price still tested)
```

**Stop the agent** from creating a GRN.

Northline NIL goods path does **not** allow line-level partial post in v03. EX-PRX parks the invoice.

---

## 8. Match family — EX-PRM / EX-QTM

```
Receipt pass complete?
├─ No → do not evaluate price yet (receipt code remains blocking)
└─ Yes
    Invoice qty ≤ received qty on every required line?
    ├─ No → EX-QTM
    └─ Yes
        Unit price within the signed tolerance table?
        ├─ No → EX-PRM → buyer (commercial) then supplier if buyer instructs
        └─ Yes
            Header payable = accepted lines + tax (DT-TAX)?
            ├─ No → EX-IQ or EX-TAX (do not force-balance)
            └─ Yes → match pass
```

**Stop the agent** from widening tolerance or treating a chat message as acceptance.

---

## 9. Tax — EX-TAX

```
Face tax present?
├─ No → EX-TAX → request complete invoice (may also be EX-IQ)
└─ Yes
    Tax code populated from PO or standing table?
    ├─ No → EX-TAX → tax specialist if no standing instruction
    └─ Yes
        Calculated tax agrees to face within the signed rounding (NIL: 1.00)
        ├─ Yes → tax pass
        └─ No → EX-TAX → standing instruction or tax specialist
```

**Stop the agent** from writing the tax master or picking a “closer” code.

---

## 10. Coding — EX-CDM / EX-ICC

```
Required segments present?
├─ No → EX-CDM → inherit from PO; else chase budget holder
└─ Yes
    Cost centre (and combination) valid for entity and GL?
    ├─ No → EX-ICC → budget holder; do not pick a neighbour code
    └─ Yes → coding pass
```

**Stop the agent** from creating a cost centre.

---

## 11. Approval — EX-APM / EX-DOA

```
Does DT-POST require an approval beyond PO release?
├─ No → skip
└─ Yes
    Is the DOA table current and applicable (currency, entity, document type)?
    ├─ No → EX-DOA → control owner
    └─ Yes
        Is there a valid approver with limit ≥ amount?
        ├─ No → EX-DOA
        └─ Yes
            Is an approval instance in the system of record?
            ├─ No → EX-APM → route and chase
            └─ Yes → approval pass
```

If the invoice appears split to stay under a limit → EX-DOA, escalate immediately.

**Stop the agent** from approving, from raising a limit, and from accepting email-only approval unless a signed compensating control exists.

---

## 12. Dispute, credit, hold — EX-DIS / EX-CNR / EX-HLD

```
Has a named party recorded a dispute?
├─ Yes → EX-DIS → dispute owner leads
│         └─ Agreed remedy is a credit → related EX-CNR
└─ No
    Is a credit the already-agreed remedy for a variance?
    ├─ Yes → EX-CNR → Supplier Comms request; Credit Note Agent later matches
    └─ No
        DT-HOLD true (dispute, EX-BNK, legal, named request)?
        ├─ Yes → EX-HLD candidate → AP lead / controller sets
        └─ No → continue
```

**Stop the agent** from lifting a hold or from promising the supplier a payment date.

---

## 13. Statement — EX-STD

```
Is the working object a statement line (not an invoice face)?
├─ No → skip
└─ Yes
    Pair to an open item (supplier + entity + amount + reference)?
    ├─ Paired and already posted → tick off; no new invoice
    ├─ Paired to a parked invoice → do not create a second record; attach statement ref
    ├─ Unpaired invoice claimed by supplier → search intake; if absent, request the invoice (do not post from the statement)
    └─ Unpaired credit claimed → EX-CNR / request the credit
```

**Stop the agent** from creating an invoice from a statement line.

---

## 14. Ageing — EX-AGE

```
Has the original code passed its signed ageing trigger?
├─ No → keep original code only
└─ Yes → add EX-AGE (related). Do not replace the original code.
          AP lead re-validates the original tree from the top.
          If the original code is now wrong, change it and reset ageing with a reason.
```

**Stop the agent** from closing EX-AGE without a terminal state (posted, X4, returned, or a new dated plan accepted by the AP lead).

---

## Chase matrix (first action)

| Code | First message goes to | Template owner | Do not say |
|---|---|---|---|
| EX-MPO | Supplier, copy buyer | Supplier Comms | “We can post without a PO this time” |
| EX-IPO | Supplier | Supplier Comms | “We used a similar PO” |
| EX-POC | Buyer | Internal Chase | “We re-opened it” |
| EX-POE | Buyer | Internal Chase | “We will exceed the PO” |
| EX-PRM | Buyer | Internal Chase | “Please approve the higher price in this email” as the final control |
| EX-QTM | Receiver or buyer | Internal Chase | “We will take the invoice qty” |
| EX-MRX | Receiver | Internal Chase | “Confirm in this email and we will post” |
| EX-PRX | Receiver | Internal Chase | “We will post the unreceived remainder” |
| EX-DUP / EX-PDUP | AP lead (internal) | Exception | “Deleted the extra” |
| EX-WSP / EX-MDI | Steward / supplier as directed | Exception | “We created the account” |
| EX-ILE | AP lead | Exception | “Posted to the usual company” |
| EX-TAX | Tax (or standing instruction) | Exception | “We picked the nearest rate” |
| EX-APM | Approver | Approval | “Approved on your behalf” |
| EX-DOA | Control owner | Approval | “Limit increased” |
| EX-CDM / EX-ICC | Budget holder | Coding / Internal Chase | “Used last month’s code” |
| EX-IQ | Supplier | Supplier Comms | “We completed the missing number” |
| EX-OCR | Processor (internal) | Extraction | “Posted on low-confidence fields” |
| EX-BNK | Steward + AP lead | Exception | “We updated the bank” |
| EX-CNR | Supplier | Supplier Comms | “We reduced the invoice ourselves” (unless a signed adjustment type exists) |
| EX-STD | Supplier (after internal pair) | Statement | “We posted from your statement” |
| EX-HLD | Setter / AP lead | Payment Pack | “Hold lifted for this run” |
| EX-DIS | Dispute owner | Exception | “Dispute closed” |
| EX-AGE | AP lead | Exception | “Written off” |
| EX-SYS | Systems owner | Exception | “Retried the post” |

Templates live with the SOP, not in this file. This matrix only binds destination and forbidden claims.

---

## Worked cases — Northline Industrials

### Case N-17 — Partial GRN, Helion Fasteners PO 451187

Invoice qty line 2 = 400. Received = 240. Master tree hits 0.10. Receipt tree → EX-PRX. Internal Chase drafts the warehouse message. Match Agent does not propose a price check yet. No partial post (v03). Risk: Medium.

### Case N-22 — Same invoice via mailbox and portal forward

Supplier+number match to an in-process stub. EX-DUP. Duplicate Agent flags. Elena Voss closes X4 on the second file. First file continues. Risk at park: High.

### Case N-29 — Bill-to “Northline Components”

Face registered number is the Components entity, not NIL. EX-ILE. Processor does not post to NIL because the PO was easier to find there. Quality Agent flags the number mismatch. Risk: Critical.

### Case N-31 — Remittance box shows a new IBAN

Master IBAN differs. EX-BNK + hold candidate. Steward starts the independent verification procedure. Payment Pack Agent lists the item. No agent writes the master. Risk: Critical.

### Case N-40 — Aged missing PO

EX-MPO at day 12, no supplier reply. EX-AGE added. AP lead re-runs the PO tree: buyer now says the spend was never authorised. Code does not become EX-MPO forever; related EX-DIS is set, supplier return considered. Risk: High.
