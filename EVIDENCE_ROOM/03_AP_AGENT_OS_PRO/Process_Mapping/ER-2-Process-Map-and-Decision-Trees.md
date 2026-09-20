# Process map, decision trees, and agentise marks

## One-page process map (example — PO three-way, fictional)

| Step | Actor today | System | Decision | Exception if fail | Agentise mark |
|---|---|---|---|---|---|
| 1 Receive invoice | Intake | Mail / portal | Is file readable and complete? | EX-IQ-001 / EX-IQ-002 | Det + A01 Recommend |
| 2 Extract fields | Intake / IDP | IDP | Confidence ≥ gate? | EX-IQ-002 | Det |
| 3 Validate header | AP clerk | ERP | Vendor, number, entity, tax, duplicate key | EX-MD / EX-DU / EX-TX | Det + A02 |
| 4 Match lines | AP clerk | ERP | 3-way within tolerance? | EX-MT / EX-GR / EX-PO | Det + A03 |
| 5 Code residual | Requester | Workflow | Valid CC / GL? | EX-CD-001/002 | A09 Prepare |
| 6 Approve | DoA chain | Workflow | Limit sufficient, not stalled? | EX-AP-001/002 | A07 Recommend |
| 7 Park / post | AP clerk | ERP | All controls green? | Hold | Human |
| 8 Pay proposal | Payments | ERP / bank | SoD, holds, bank-change lookback | EX-BK / EX-PH / EX-DU | A12 Recommend only |
| 9 Release | Authoriser | Bank | Human sign | — | **Human only** |

## Decision tree — match path

```
Invoice validated?
  no → A04 triage (do not match)
  yes → PO required by policy?
          no → coding + approval path (non-PO)
          yes → PO valid and open?
                  no → EX-PO-002/003/004
                  yes → GR required?
                          no → two-way price/qty vs PO
                          yes → GR exists for qty?
                                  no → EX-GR-001 → A05
                                  partial → EX-GR-002 → match received only
                                  yes → price within % AND absolute tolerance?
                                          yes → match
                                          no → EX-MT-001
```

## Decision tree — payment proposal (A12)

```
For each proposal line:
  hold? → remove
  approval incomplete? → remove
  exact duplicate open/paid? → remove + A10 case
  vendor bank change in lookback? → remove until out-of-band verify
  first-time vendor or ≥ high-value gate? → human line review (never auto-clear)
  else → "no indicator found" (still human file sign)
Agent never releases.
```

## Blank map (copy)

| Step | Actor | System | Decision | Exception | Agentise (H/Rec/Prep/Exec/Det) |
|---|---|---|---|---|---|
| | | | | | |
