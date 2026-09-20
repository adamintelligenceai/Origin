# Evidence Room — Fulfilment and Onboarding

**Product:** AP Agent OS and related digital SKUs  
**Date:** 20 September 2026  
**Owner:** Operations (founder at launch)

This is the runbook from payment to a buyer who knows what to do on Monday. It is not a customer-facing SOP. Customers see `START_HERE.md` inside the zip.

---

## 1. What the buyer receives

| SKU | Objects | When |
|---|---|---|
| Diagnostic | Score PDF + Controller one-pager | Immediate after form |
| Starter | Zip + `LICENCE.txt` + checksum + key | Immediate after paid |
| Professional | Full OS zip + licence + checksum + key | Immediate |
| Team | Same OS zip + seat register + key | Immediate; seats may follow in 48 h |
| Extra seat | Confirmation only | After name recorded |
| Derivatives | PDF zip + Individual notice | Immediate |
| Blueprint | Kickoff mail, not a zip | After SOW + deposit |

---

## 2. Download structure (Professional / Team)

Build this exact tree in the zip. Folder numbers match the house. If a folder is not yet written, include a `README.txt` that says “reserved — see PRODUCT_INDEX” rather than shipping an empty mystery.

```
EvidenceRoom_AP-Agent-OS_Professional_v1.0/
├── LICENCE.txt
├── checksums.sha256
├── 00_READ_ME/
│   ├── START_HERE.md          ← first open
│   ├── README.md
│   ├── QUICK_START.md
│   ├── PRODUCT_INDEX.md
│   └── VERSION_HISTORY.md
├── 03_AP_AGENT_OS_PRO/
│   ├── Agent_Library/
│   ├── Governance/
│   ├── Controls/
│   ├── KPI_and_Measurement/
│   └── Process_Mapping/
├── 10_LEGAL_AND_LICENSING/    ← buyer-safe copies of licence, disclaimers, privacy, refund, AI disclosure
└── NOTICE.md                  ← research-use + banned promises
```

**Starter zip** is a subset:

```
EvidenceRoom_AP-Agent-OS_Starter_v1.0/
├── LICENCE.txt
├── checksums.sha256
├── 00_READ_ME/                (Starter-scoped START_HERE)
├── 03_AP_AGENT_OS_PRO/
│   └── Agent_Library/
│       ├── 00_AGENT_STACK_OVERVIEW.md
│       ├── AGENT_01 … AGENT_03, AGENT_10, AGENT_16
│       ├── 17_AUTONOMY_PROGRESSION.md
│       ├── 18_HUMAN_VS_AGENT_DECISION.md
│       └── 19_AGENT_CHARTER_STANDARD.md
├── 03_AP_AGENT_OS_PRO/Process_Mapping/00_METHODOLOGY.md
└── 10_LEGAL_AND_LICENSING/    (licence Individual + disclaimers)
```

Do **not** put `06_SALES_AND_MARKETING` or `09_RESEARCH` competitor files in the customer zip. Research citations that appear *inside* product files may stay. The commercial pack is internal.

**NOTICE.md** (include):

```
Evidence Room / AP Agent OS
Proof before permission. Agents earn responsibility. Evidence decides.

This archive is licensed, not sold as copyright.
Examples are ILLUSTRATIVE. Measure your ledger.
We do not guarantee savings, fraud detection, compliance,
accounting accuracy, payment safety, or ROI.
Third-party research cited on evidenceroom.ai is not your target
and not our customer result.
```

---

## 3. LICENCE.txt template

```
Evidence Room — AP Agent OS
Licence class: {{Individual | Professional | Team}}
Key: {{key}}
Named person(s): {{names}}
Legal entity: {{entity}}
Order: {{id}}
Date: {{ISO date}}

You may use these files as stated in 10_LEGAL_AND_LICENSING/00_LICENCE_TERMS.md
and evidenceroom.ai/terms. You may not republish or resell them.
Professional is not a multi-client consultancy licence.
Team seats are named people in one legal entity.

Flag: terms are drafts until counsel accepts them.
```

---

## 4. Checksums

```
sha256sum EvidenceRoom_AP-Agent-OS_Professional_v1.0.zip > checksums.sha256
```

Include the checksum file *inside* the zip for the inner files, and publish the zip hash on the fulfilment email.

Version bump = new zip name. Do not overwrite v1.0 silently.

---

## 5. Lemon Squeezy setup

1. Upload the zip as the product file.  
2. Generate licence keys with prefixes `ER-ST-` / `ER-PR-` / `ER-TM-` / `ER-SE-`.  
3. Custom fields: licensee, entity, seats.  
4. Thank-you redirect: `https://evidenceroom.ai/welcome` (short page: START_HERE summary + support address).  
5. Test: buy, download, refund, seat mail.

If the zip exceeds LS size limits, split: `..._A_Readme_Legal.zip` and `..._B_OS.zip` with one START_HERE that lists both.

---

## 6. Onboarding path (what we tell them)

Every paid OS mail points here — in this order:

1. Open `00_READ_ME/START_HERE.md`  
2. Read the licence class that matches the key  
3. Do not skip to Agent 12  
4. Run or re-read the diagnostic if they have not  
5. Appoint owners  
6. Choose the slice  
7. Freeze baseline  
8. L0 on 01, 02, 03, 10, 16  

That is the same 01–12 path, compressed. The file itself is the customer instrument.

**We do not:** book a mandatory “onboarding call” for $79. Offer office hours later if Blueprint demand appears.

**We do answer:** licence@ for seats; hello@ for “where is the matching charter?”; we do not debug their ERP.

---

## 7. First-week support snippets

**“Which file first?”**  
START_HERE.md, then `03_AP_AGENT_OS_PRO/Agent_Library/00_AGENT_STACK_OVERVIEW.md`.

**“Can we start at L3? Our OCR is 98%.”**  
No. Capture accuracy is not a promotion pack. L0.

**“Can I share with Audit?”**  
Professional: the named practitioner may show pages internally; Audit as a *seat* needs Team. Do not forward the zip to a vendor.

**“We need AR next.”**  
Not in this product. AP only.

**“Is this compliant?”**  
No. We do not certify compliance. See Disclaimer.

---

## 8. Versioning and updates

| Event | Action |
|---|---|
| Typo / legal fix | v1.0.1 — email existing buyers a new zip, same key |
| Material OS change | v1.1 — note in VERSION_HISTORY; Professional buyers get the update for 12 months (policy — **flag for lawyer** as a contractual promise) |
| Team seat add | No new zip unless files changed |

Do not auto-push files into a shared Dropbox they did not ask for.

---

## 9. Welcome page copy (`/welcome`)

# You have the files.

Open `START_HERE.md` in the zip. That is the 01–12 path.

Default level is L0. Payment release stays human.

Licence questions: licence@evidenceroom.ai  
Everything else: hello@evidenceroom.ai

Proof before permission.

---

## 10. Failure modes

| Failure | What we do |
|---|---|
| LS file missing | Email 12 (fulfilment failure) + manual link |
| Wrong SKU delivered | Send correct zip; refund difference if they downgrade |
| Key not generated | Issue manually; log |
| Buyer uploads invoices to support | Do not download. Ask them to delete. Point to privacy. |
| Chargeback | Provide LS with licence + download logs. Do not argue AP theory. |

---

## 11. Internal SLA (launch)

| Request | Target |
|---|---|
| Download broken | Same business day |
| Seat change | Two business days |
| Refund decision | Five business days |
| Blueprint application | Ten business days to accept/refuse |

Proof before permission.
