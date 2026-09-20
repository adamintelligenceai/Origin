# Licence Keys and Fulfilment

**Lockup:** EVIDENCE ROOM — AP AGENT OS  
**Products with keys:** Starter, Professional, Team (and Blueprint only if the scope includes the toolkit).  
**Diagnostic:** no key.  
**System:** Lemon Squeezy built-in licence keys + signed downloads.

This is an operations brief. Licence legal meaning lives in `10_LEGAL_AND_LICENSING/LICENCE_TERMS.md`.

---

## 1. What a key is for

- Proves a specific order occurred  
- Lets us re-issue a download without arguing about a screenshot of a receipt  
- Lets us identify Individual vs Team if a zip appears on a public drive  
- Is **not** a DRM lock on Markdown files (those can be copied). Enforcement is contractual plus ordinary honesty.

Do not imply the key “activates software.” There is no executable to activate.

---

## 2. LS configuration (proposed)

| Setting | Value |
|---|---|
| Generate licence key | On for ER-START, ER-PRO, ER-TEAM |
| Activation limit | Professional / Starter: 1 recorded activation (email bind). Team: up to the seat practice in the legal draft (e.g. 10) — if LS cannot express seats, record seats in our sheet |
| Length / format | LS default; prefix keys in our sheet `ER-PRO-`, `ER-TEAM-` if we can |
| Disable on refund | Yes |
| Disable on chargeback | Yes |
| Re-issue | Manual, fulfilment role |

If Lemon Squeezy’s “activation” assumes a software ping we do not have, use keys as **serials** only: issue, store, revoke. Do not build a fake activation server.

---

## 3. Bindings we record (internal sheet)

| Field | Source |
|---|---|
| Order ID | LS |
| Key | LS |
| Product code | ER-START / ER-PRO / ER-TEAM |
| Email | Checkout |
| Organisation (Team) | Checkout field |
| Issued at | LS |
| Download count / last download | LS if available |
| Status | active / refunded / revoked / chargeback |
| Notes | e.g. “re-issued 2026-10-03” |

Do not store invoice images buyers send. Delete them.

---

## 4. Fulfilment path

```
LS payment.success
  → key created
  → signed zip URL emailed by LS
  → our optional welcome email (START HERE)
  → webhook (optional) appends the internal sheet
```

Zip contents: see `STORE_STRUCTURE.md`. Professional’s first file is `00_START_HERE.md`.

**Link expiry:** Signed LS links expire / throttle (LS marketing: securely signed, throttled). Tell buyers in the welcome mail to download once and archive **their licensed copy**. Re-issue on request with order ID match.

---

## 5. Re-issue rules

| Situation | Action |
|---|---|
| Link expired, order active | Re-issue. Same key. |
| Lost zip, same person | Re-issue. Remind them to archive. |
| New email, same person | Update after a check (old email confirms). |
| “Please send to my client” | **No.** That is redistribution. |
| Team member 4 of a Team licence | Re-issue within seat practice; log the name. |
| Professional buyer wants 8 copies | Sell Team. Do not stretch Individual. |
| Refunded | Revoke key. Do not re-issue. |
| Public GitHub / marketplace leak | Revoke; counsel; ask host to take down. |

---

## 6. Version updates (12-month window — confirm in Terms)

If we publish `ER-PRO-v1.1.zip`:

- Active Professional and Team keys issued in the last 12 months get the new zip (LS file replace and/or email).  
- Starter does not automatically become Professional.  
- We do not owe a hosted changelog SLA.  
- Material method changes that *remove* the payment hold are not permitted by brand; if they ever happened, that would be a product crisis, not an “update.”

---

## 7. Blueprint fulfilment

Not a key-gated zip by default.

1. Application accepted  
2. Scope note signed  
3. Quoted LS payment link  
4. Private working folder (not the public store file)  
5. If the scope includes Professional/Team rights, issue that SKU’s key explicitly  

Do not send the full OS to an applicant who has not paid and not been scoped.

---

## 8. Buyer-facing licence-key copy

**On checkout:** “A licence key will be emailed. It identifies your Individual or Team licence. It does not install software.”

**In the zip:** `LICENCE.txt` — short form + link to full terms they accepted.

**In support macros:** “Please paste the key and order ID. Do not paste invoice PDFs from your AP system.”

---

## 9. Abuse patterns

| Pattern | Response |
|---|---|
| One key, many public downloads | Revoke; investigate |
| Listing our zip on Etsy / Gumroad | Takedown; do not start a public fight thread |
| Affiliate giving the zip away | End affiliate; revoke gifted keys if identifiable |
| Buyer used Team files in a client deliverable as *their* product | Licence breach. Counsel. |

Marketplace derivatives are separate SKUs we authored. They are not a licence to republish the OS.

---

## 10. Test before live

1. Test-mode purchase of ER-PRO  
2. Confirm key in LS admin  
3. Confirm zip opens with START HERE first  
4. Expire/re-issue path  
5. Refund → key disabled  
6. Webhook row appears if we built one  

Only then live.

---

## 11. What we will not build at launch

- Hardware-locked DRM  
- Online “activation” that phones home from a Markdown file  
- Seat-enforcement software  
- A customer portal beyond LS’s  
- Automatic Slack for every sale (nice later; not required)
