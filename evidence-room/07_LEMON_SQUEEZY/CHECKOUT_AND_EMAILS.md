# Checkout and Emails — Lemon Squeezy

Copy for hosted checkout, overlays, receipts, and post-purchase mail. Combine with Lemon Squeezy’s own required receipts and tax lines. Do not strip MoR identification.

Legal pages linked here are drafts until counsel approves.

---

## 1. Checkout header

**Logo lockup:** EVIDENCE ROOM — AP AGENT OS  
**Trust line:** Digital toolkit licence · evidenceroom.ai · hello@evidenceroom.ai

**Do not show:** “Guaranteed secure savings.” A padlock from LS is enough.

---

## 2. Checkout body — Professional (template for others)

**Product:** Professional — AP Agent OS  
**Price:** $199.00 USD  

**You are buying**

- A licence for one named practitioner to use the full AP Agent OS file set  
- Immediate download via a signed link  
- A licence key for our records and yours  

**You are not buying**

- Hosted AP software, payment processing, or an ERP connector  
- A Team sharing licence  
- A promise of savings, fraud detection, compliance, accuracy, or ROI  

**Before you pay**

- [ ] I am a professional purchaser and I have authority if buying for an organisation’s one practitioner.  
- [ ] I have read the Licence Terms, Disclaimer, Refund Policy, and Privacy notice.  
- [ ] I understand payment authorisation remains human in the method and is not a feature of this download.

*(Checkboxes: implement only if LS custom fields allow; otherwise the “I agree to terms” LS default plus visible links.)*

**Links:** Licence · Terms · Privacy · Disclaimer · Refunds · AI-use

**Tax:** Taxes may be calculated and collected by Lemon Squeezy as merchant of record. The tax line is not advice about your organisation’s input tax recovery.

**Button:** Pay $199.00  
**Secondary:** Cancel and return to evidenceroom.ai/professional

---

## 3. Checkout body — Team extras

Add a required text field: **Organisation legal name**.  
Add: This licence is for a named working group, not for publication or resale. Suggested seat practice is described in the Licence Terms.

---

## 4. Checkout body — Starter extras

Add: Starter is a partial set. Professional is the full OS. No automatic upgrade.

---

## 5. Checkout body — Blueprint invoice

**Title:** Custom Blueprint — scoped invoice  
**Line item:** Facilitation as described in acceptance note {{Date}}  
**Button:** Pay scoped invoice  
**Note:** Not an instant custom PDF. Kickoff follows payment unless the acceptance note says otherwise.

---

## 6. Abandoned checkout (if enabled)

Lemon Squeezy documents an **additional +5%** on payments recovered through abandoned-cart emails (`FEES_AND_MoR_NOTES.md`). Decide whether that is worth it.

If enabled, subject: Your Professional checkout is still open  
Body: One short reminder. No fake scarcity. No “complete now to lock savings.” Link back. One reminder, not three in a night.

---

## 7. Order confirmation (on-page)

**Headline:** The licence is issued. The layer is not.

Payment received for **{{Product}}**.

1. Check {{Email}} for the Lemon Squeezy receipt and download.  
2. Open `00_START_HERE.md` (Professional / Team).  
3. Write the payment hold before you open Matching.

Order ID: {{OrderID}}  
Support: hello@evidenceroom.ai with that ID.

If you expected a login to software, you have the wrong mental model — read the Disclaimer. If the files never arrive, write to us before opening a dispute.

---

## 8. Receipt email (supplement LS, do not replace)

LS will send a receipt. If we can add a custom email:

**Subject:** Receipt and files — {{Product}} — EVIDENCE ROOM — AP AGENT OS

{{FirstName}} —

Lemon Squeezy, as merchant of record, has processed {{Gross}} (tax shown on their receipt if applicable).

Product: {{Product}}  
Licence: {{LicenceType}}  
Key: {{LicenceKey}}  
Download: {{SignedURL}}

Professional / Team: start at `00_START_HERE.md`.  
Starter: start at the human-held list.

We do not need — and ask you not to send — invoice images or bank files.

—
Evidence Room · evidenceroom.ai · hello@evidenceroom.ai  
This email is not tax advice. Keep the LS receipt for your records.

---

## 9. Download / licence email (if separate)

**Subject:** Your licence key — {{Product}}

Key: {{LicenceKey}}  
Bind it to {{Email}}. Do not post the key. Do not share the zip outside the licence.

If your link has expired, reply with the order ID.

---

## 10. START HERE email (Professional / Team only)

Use the welcome text in `06_SALES_AND_MARKETING/FULFILMENT_AND_ONBOARDING.md`.  
Send once, same day. Do not add a coupon.

---

## 11. Refund request auto-reply

**Subject:** Refund request received — {{OrderID}}

We received your request. Lemon Squeezy is merchant of record; refunds, when granted, go through that path.

Please confirm:

- Order ID and email  
- Whether you could access the download  
- Whether this is an access failure or a change of mind  

We do not refund on the grounds that the toolkit “did not produce savings.” See the Refund Policy. Consumer-law rights that cannot be excluded still apply — this is not legal advice.

A human will answer.

---

## 12. Chargeback / dispute internal note

Gather: order ID, delivery timestamps, IP if LS provides, terms accepted, download count.  
Respond factually. Do not argue about ROI.  
Counsel if patterned disputes appear.

---

## 13. Failed payment

If a card fails: LS handles the decline. We do not send a “your AP is at risk” scare email.

---

## 14. Affiliate referral (if programme live)

Checkout may show “referred by {{Affiliate}}.”  
Affiliates may not add claims. If a referred buyer asks for a promised guarantee, we refuse the claim and keep the sale only on honest terms.

---

## 15. Tone checklist before any LS email goes live

- Lockup present  
- MoR named  
- No outcome guarantee  
- START HERE pointed to  
- Support path with order ID  
- Unsubscribe not relevant on transactional mail; marketing mail must have it  
