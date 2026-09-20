# Evidence Room — Fulfilment & Onboarding

**Document ID:** `07_LEMON_SQUEEZY/03_FULFILMENT_AND_ONBOARDING`  
**Version:** 1.0  
**Applies to:** Starter, Professional, Team (digital). Blueprint per SOW.

---

## 1. Fulfilment principles

1. **Instant** — digital SKUs available within minutes of confirmed payment.  
2. **Versioned** — every ZIP carries `VERSION.txt` and changelog pointer.  
3. **Licensed** — `LICENCE.txt` inside each package; tier matched to SKU.  
4. **Bounded** — README states what the product is / is not.  
5. **Supportable** — reply path clear within 1–2 business days.

---

## 2. Package ZIP standards

### Naming
`EvidenceRoom_{SKU}_{Tier}_v{MAJOR.MINOR}.zip`  
Examples:
- `EvidenceRoom_ER-START-79_Starter_v1.0.zip`  
- `EvidenceRoom_ER-PRO-199_Professional_v1.0.zip`  
- `EvidenceRoom_ER-TEAM-499_Team_v1.0.zip`

### Required root files
```
00_README.pdf (or .md + PDF)
LICENCE.txt
VERSION.txt
CHECKSUMS.sha256 (optional but preferred)
```

### Professional example tree
```
03_AP_AGENT_OS_PRO/
  Agent_Library/
  Process_Mapping/
  Governance/
  Controls/
  KPI_Measurement/
  Testing/
  Business_Case/
  Templates/
```

### Team additions
Include `04_AP_AGENT_OS_TEAM/` workshop, training, executive, implementation, change packs per product map — plus clear note: **no live facilitation included**.

---

## 3. Lemon Squeezy configuration checklist

- [ ] File uploaded per product variant  
- [ ] Max download count set thoughtfully (allow re-download for device change; prevent farm abuse)  
- [ ] Thank-you redirect → owned `/thanks` page with onboarding links  
- [ ] Receipt logo / brand colours approximate Brand System  
- [ ] Tax settings reviewed with advisor (MoR collects where applicable — **not advice**)  
- [ ] Refund policy text matches published policy  

---

## 4. Owned thank-you page (wire copy)

**H1:** You’re in.  
**Deck:** Download is in your receipt email. Start with the README — especially non-negotiables.  
**Buttons:** Open Start Here · Responsibility Model · Book office hours (optional)  
**Note:** Payment authorisation in your AP environment stays human. This toolkit does not move money.

---

## 5. Onboarding email sequence (digital SKUs)

### Email F1 — Immediate (owned, if ESP known)

**Subject:** Evidence Room — start here ({Tier})  

Body outline:
1. Thanks + SKU confirmation  
2. Download reminder (LS receipt)  
3. Link to Start Here / Friday→Monday (Pro)  
4. Three non-negotiables  
5. Support address  

### Email F2 — Day 3

**Subject:** Charter exclusions before clever prompts  

Body outline:
1. Ask: have you named owners?  
2. Point to one starter agent  
3. Soft link to Method page  
4. No hard sell  

### Email F3 — Day 10

**Subject:** When to mobilise Team vs stay on Professional  

Body outline:
1. Decision rule (solo design vs multi-owner)  
2. Link Team / Blueprint intake  
3. Invite questions  

**Unsubscribe** respected; keep cadence low.

---

## 6. Blueprint fulfilment

| Milestone | Deliverable | Gate |
|---|---|---|
| M0 | Intake + fit call | Paid deposit / SOW signed |
| M1 | Current-state operating sketch | Customer workshop #1 |
| M2 | Fitted agent + responsibility design | Customer review |
| M3 | Exception + control narrative | Customer review |
| M4 | Final blueprint pack + readout | Acceptance |

Store files in client folder; retain Evidence Room background IP per SOW.  
Do not upload full client confidential exports into public LS downloads.

---

## 7. Access & security

- No customer ERP credentials required for digital SKUs.  
- Warn customers not to paste regulated personal data into public AI tools while applying methods.  
- Rotate download assets if significant content update (v1.1+); optional courtesy re-email to buyers within 90 days of launch offer.

---

## 8. Support playbook (short)

| Request | Response |
|---|---|
| Missing download | Resend LS receipt / regenerating link |
| Which SKU do I need? | Job-based: corridor vs OS vs mobilise vs fit |
| Refund | Policy link + LS process |
| “Will this auto-pay vendors?” | No. Hard no. |
| Consulting ask | Route to Blueprint intake |

---

## 9. QA before each publish

- [ ] ZIP opens clean on macOS + Windows  
- [ ] Broken-link crawl on internal relative links  
- [ ] Licence tier correct  
- [ ] Version bumped  
- [ ] Checksums match  
- [ ] Listing copy matches ZIP contents  
- [ ] IP cleanliness checklist signed for release  

---

*End of Fulfilment & Onboarding v1.0.*
