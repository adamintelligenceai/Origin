# UAT Templates

**Product:** AP Agent OS — Evidence Room  
**Audience:** Processors, AP lead, control reviewer, test lead  
**Use after:** Scripted tests pass; before or beside shadow  
**Example:** Northline Industrials, Cleveland SSC, Dayton entity PO-goods path

UAT answers: *Can the people who will live with this queue operate it without inventing workarounds?* It is not a second gold-label study and not a vendor demo.

---

## 1. Entry criteria

- TS-ENV-01 passed; no Critical script open  
- SOP Type 2 issued in draft to the UAT cohort  
- RBAC roles provisioned for named testers (not a shared “tester” login)  
- Privacy note signed (images may contain personal data)  
- Charter: path, entity, autonomy level, forbidden actions  
- Test lead ≠ process owner for sign-off (both sign)

If entry fails, do not start UAT to “use the slot”.

---

## 2. Cohort

| Role | Minimum | Northline example |
|---|---|---|
| Experienced processor | 1 | 4+ years on PO-goods |
| Less experienced processor | 1 | < 12 months |
| AP lead | 1 | Elena Voss |
| Control observer (part-time) | 1 | Shah designate |
| Test scribe | 1 | Implementation |

Buyers and receivers join only for GR/PO packet sessions.

---

## 3. Charter header (copy per cycle)

| Field | Entry |
|---|---|
| UAT id | UAT-`<entity>`-`<path>`-`<nn>` |
| Window | |
| Environment | Test / shadow-read |
| Agents in scope | e.g. 01, 02, 03, 04, 10, 16 |
| Autonomy | L0 / L1 |
| Invoices / objects planned | |
| Out of scope | Payment release, other entities, FX, intercompany |
| Kill-switch (even in UAT) | Named person |
| Test lead / process owner | |

---

## 4. Script — tester running sheet

Each tester completes one sheet per session (max 90 minutes).

```
UAT id:
Tester role / name:
Date / session:
Agent versions / hash:

Object id:
What I was asked to do:
What the agent showed:
I accepted / edited / rejected / could not tell:
Minutes spent:
Where I left the ERP / mail:
Defect? Y/N  id:
Would I use this tomorrow on a live invoice? Y/N/unsure
One sentence why:
```

Scribe collects sheets the same day. Do not let testers “clean up” comments.

---

## 5. Scenario catalogue (minimum)

Mark each: Planned / Run / Waived (reason).

| ID | Scenario | Tester | Expected human action | Pass if |
|---|---|---|---|---|
| U-01 | Clean PO + GR invoice | Experienced | Accept fields and match leaf | Completes without a side spreadsheet |
| U-02 | Same as U-01 | Newer | Same | Completes with SOP only (no hallway help) |
| U-03 | EX-MRX | Either | Start GR packet; do not post | No email-GRN workaround |
| U-04 | EX-PRM | Either | Park; buyer packet | No chat-acceptance as final |
| U-05 | EX-DUP exact | AP lead | Confirm / X4 path | Keyer cannot self-X4 |
| U-06 | EX-PDUP other-site | AP lead | Inspect both faces | Not auto-closed |
| U-07 | EX-ILE other entity | Either | Stop; do not switch entity | NIL/Dayton not used as convenience |
| U-08 | EX-BNK IBAN differs | AP lead + observer | Park; steward procedure | No master write; masked UI |
| U-09 | Low-confidence extract | Either | Key from face | No ready-on-guess |
| U-10 | Statement in the invoice queue | Either | Reclass; no match | Type corrected |
| U-11 | Agent silent / EX-SYS | Either | Human SOP fallback | Completes without the agent |
| U-12 | Reject a wrong match leaf | Either | Reject + reason | Reason code stored |
| U-13 | Supplier draft EX-MPO | Either | Edit/send or hold send | No payment date in text |
| U-14 | Payment-proposal annotation (if 12 in scope) | Payments lead | Read annotations only | No release control visible |
| U-15 | Orchestrator owner blank (fixture) | AP lead | Assign owner | Cannot mark ready without owner |

Waiving U-07 or U-08 requires control-owner signature.

---

## 6. Defect log template

| ID | Object | Agent | Found by | Severity | Description | Expected | Actual | Status | Owner | Closed |
|---|---|---|---|---|---|---|---|---|---|---|
| | | | | C/H/M/L | | | | | | |

**Severity guide**

- Critical: could post/pay/write master, leak bank data, or succeed at injection  
- High: wrong blocking code on Critical taxonomy, or a bypass of a written SOP step  
- Medium: usable but wrong leaf on a Medium code; UI that forces a workaround  
- Low: wording, layout, extra click  

UAT does not pass with open Critical or unowned High.

---

## 7. Usability and control questions (end of cycle)

Ask each tester, written:

1. Which step did you skip because it was slower than your old habit?  
2. Which agent output did you accept without looking at the face?  
3. Where did you need a spreadsheet the SOP does not name?  
4. Could you complete U-11 (agent off)?  
5. Did anyone share a login?  
6. Did you see a full bank number you did not need?

A “yes” on 2, 5, or 6 is a finding, not colour.

---

## 8. Exit report template

```
UAT id / dates / hashes
Scenarios run / waived
Objects completed
Defects: C / H / M / L  (open)
Fallback (U-11) result
SoD (U-05) result
EX-BNK (U-08) result
Tester recommendation: proceed to shadow / remediate / stop
Process owner:
Control observer:
Test lead:
```

Attach running sheets, defect log, and the SOP version used.

---

## 9. Northline UAT-DAY-PO-01 (illustrative result)

- 14 scenarios run; U-14 waived (Agent 12 not in Wave 1).  
- 22 objects. Defects: 0 Critical, 2 High (EX-PRX labelled EX-QTM; other-site PDUP needed a second click testers missed — UI defect).  
- U-11 passed on paper SOP. U-05 passed. U-08 passed with masking.  
- Newer processor needed hallway help on U-02 — SOP S5 wording revised.  
- Recommendation: remediate Highs, re-run U-03/U-06, then shadow.

---

## 10. What UAT is not

- A training course that must produce happy scores  
- A substitute for the historical protocol  
- Authority to show live proposals to the whole SSC  
- A place to raise autonomy “because testers liked it”
