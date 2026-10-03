# Lead Magnet Funnel

**Lockup:** EVIDENCE ROOM — AP AGENT OS  
**Primary magnet:** AP Agent Readiness Diagnostic ($0)  
**Primary CTA:** Assess Your AP Agent Readiness  
**Secondary CTA:** Explore the AP Agent OS  
**Merchant of record (paid rungs):** Lemon Squeezy  
**Principle:** The magnet diagnoses the layer. It does not bribe with a savings calculator or a “fraud checklist.”

This is a working funnel specification. Email law, cookies, and MoR tax treatment require professional confirmation.

---

## 1. Funnel map

```
Awareness (LinkedIn, articles, charts)
        │
        ▼
Home (5-second contract)
        │
        ├─────────────► /ap-agent-os  (secondary)
        │
        ▼
/diagnostic  ($0 magnet)
        │
        ├─ result on screen
        ├─ worksheet email
        └─ opt-in checkbox → 7-email sequence
                │
                ├─ Starter $79
                ├─ Professional $199   ← default
                ├─ Team $499
                └─ Custom Blueprint application
```

No tripwire that withholds the diagnostic result behind a card. The result *is* the magnet.

---

## 2. Magnet specification

### Name

**AP Agent Readiness Diagnostic**

### Promise (allowed)

A structured picture of whether your organisation has a designed AP agent layer, a pile of prompts, or neither — plus a suggested first wave at L0/L1.

### Promise (forbidden)

- “Find your savings”  
- “See how much fraud you’re missing”  
- “Get your compliance score”  
- “ROI in 10 questions”

### Inputs

Work email, role, optional organisation, volume band, optional ERP band, confirmation that they will not paste production personal data, bank details, or live invoice images.

### Outputs

- Band: Undesigned / Informal / Gated / Designed  
- One-sentence reading  
- Suggested Wave 1 list  
- Worksheet PDF  
- Link to Method and Professional  

### Time

Twenty minutes. If a version grows past that, cut questions, do not add a progress-bar theatre.

---

## 3. Scoring (internal — do not display raw points as a grade)

Eight dimensions, 0–2 each (0 absent, 1 informal, 2 written and used):

1. Named agents (not one blob)  
2. Reopenable packets  
3. Autonomy register  
4. Written payment hold  
5. Flag hygiene (clear / confirm / escalate)  
6. Named Process Owner and Controls Lead  
7. Coded exceptions  
8. Change control + cost visibility  

| Total | Band |
|---|---|
| 0–5 | Undesigned |
| 6–9 | Informal |
| 10–13 | Gated |
| 14–16 | Designed |

Display the **band and sentences**, not the arithmetic, unless the buyer asks. Arithmetic invites fake precision.

---

## 4. Conversion copy (on the result screen)

**Headline:** Your layer reads as {{Band}}.

**Body:** This is a reading aid, not a certificate and not an investment recommendation.

**Primary button:** Get the Wave 1 charter sheets in Professional ($199)  
**Secondary button:** Read the method  
**Tertiary:** Share the diagnostic with a Controller (pre-filled mailto, no tracking pixel required)

**If band = Designed:** Do not hard-sell. Offer Team (shared register) or Blueprint (entities). Congratulate restraint.

---

## 5. Nurture

The seven emails in `EMAIL_SEQUENCE.md` are the only automatic nurture.

| If they… | Then |
|---|---|
| Buy Professional or Team | Stop sequence; start fulfilment |
| Apply for Blueprint | Stop sequence; human reply in 5 business days |
| Unsubscribe | Stop. Do not add to a “last chance” list |
| Reply with invoice files | Do not process. Reply with the privacy refusal and delete if policy says so |

---

## 6. Secondary magnets (do not cannibalise Professional)

These may be given as PDF after diagnostic, not instead of it:

| Magnet | Contents | Risk |
|---|---|---|
| Human-held list (one page) | The twelve non-negotiables | Low — drives OS, does not replace it |
| Blank autonomy register (3 rows) | Teaches the object | Low |
| Exception atlas starter codes | Codes only, no full triage spec | Low |
| Full sixteen specifications | **Do not give away** | Cannibalises Professional |
| Completed Matching charter example | **Do not give away** | Cannibalises Professional |
| 90-day plan full narrative | **Do not give away** | Cannibalises Professional |

Marketplace derivatives (posters, notepads) are traffic, not magnets. See `MARKETPLACE_DERIVATIVES.md`.

---

## 7. Paid acquisition (optional, after legal pages are live)

| Allowed destination | Forbidden destination |
|---|---|
| /diagnostic | A landing page that promises savings |
| Article 1 | A “detect fraud in AP” quiz |
| /method | A lookalike of Evidence Room LLC courtroom work |

UTM naming: `src / med / cmp` only. Do not name campaigns `roi_guarantee`.

---

## 8. Sales conversation after the magnet

If someone books a call (Blueprint or Team):

1. Ask which band they received.  
2. Ask who will be Process Owner and Controls Lead.  
3. Ask how payment runs work today.  
4. Do not ask for a savings target as a qualification criterion.  
5. If they need unsupervised release, decline.  
6. If they need a rip-and-replace of ERP, decline.

Qualification is seriousness about the hold, not invoice volume.

---

## 9. Metrics (funnel hygiene)

| Stage | Watch |
|---|---|
| Home → Diagnostic start | If low, five-second contract is unclear |
| Start → finish | If low, questions are too nosy or too long |
| Finish → sequence opt-in | Checkbox wording |
| Sequence → Professional | Content of Email 6, not a new discount |
| Refunds / chargebacks | Fulfilment clarity, not “didn’t save money” |
| Support tickets with invoice attachments | Privacy copy is too weak |

No public dashboard of “conversion.” Internal only.

---

## 10. Copy blocks

**Ad (120 characters):** Assess your AP agent layer. Free diagnostic. No invoice upload. No savings claim.

**Result email subject:** Your AP agent layer — a reading, not a certificate

**Checkbox:** Send me the seven-note sequence on designing the layer. I can unsubscribe at any time. This is not a purchase.

**Refusal footer:** The diagnostic does not detect fraud, certify compliance, or estimate ROI.
