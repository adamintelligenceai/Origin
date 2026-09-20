# IP cleanliness checklist — Evidence Room / AP Agent OS

**Purpose:** Keep the corpus ours to license. Catch contamination before a zip ships or a page goes live.  
**Use:** Complete once per release (v1.0, v1.1, …) and whenever a new pack is added.  
**Not legal advice.** Counsel should review the first release against this list.

---

## 1. Ownership of what we ship

- [ ] Every file in the fulfilment zips was created for Evidence Room or is under a written licence that allows commercial relicensing to customers.
- [ ] No pages copied from a former employer, a client, or a Big Four/AP vendor playbook.
- [ ] No “slightly rewritten” internal control matrices that someone remembers from a bank or a previous job.
- [ ] Contributor list (humans and tools) is recorded for the release.
- [ ] AI-assisted passages have been read by a human against this checklist (see `AI_USE_DISCLOSURE.md`).
- [ ] We do not claim registered trademark status we do not have.

---

## 2. Third-party text and research

- [ ] Ardent Partners figures appear only with a citation and a year, and only if we can point to a source we actually opened (their page or a reputable secondary that quotes them).
- [ ] Forrester figures or use-case lists appear only with a citation. We do not paste Forrester report prose.
- [ ] No other analyst houses are quoted as if we had a reprint licence.
- [ ] Quotes longer than a short phrase from any third party are removed or replaced with our own words plus a cite.
- [ ] We never imply Ardent, Forrester, Lemon Squeezy, Stripe, or an ERP vendor endorses Evidence Room.

---

## 3. Third-party marks and products

- [ ] ERP/AP names (SAP, Oracle, NetSuite, Coupa, Tipalti, Medius, etc.) are used only as generic identifiers (“across Coupa or SAP”), not as logo lockups.
- [ ] No vendor logos in thumbnails, PDFs, or the website.
- [ ] Lemon Squeezy / Stripe / Vercel named accurately; footer uses **Link, LLC f/k/a Lemon Squeezy LLC** where we discuss checkout.
- [ ] No competitor “attack” pages that reprint their UI.

---

## 4. Examples and people

- [ ] **Northline Industrial Group** is the only worked company example, and it is labelled fictional everywhere it appears.
- [ ] No other company is described in a way that could be a thinly veiled real client.
- [ ] No real person’s name, email, or photograph is used without a written release.
- [ ] No fake testimonials.

---

## 5. Data and confidentiality

- [ ] No real invoice numbers, IBANs, vendor ABNs/VAT IDs, or employee data in examples.
- [ ] Sample figures for Northline are round and obviously illustrative.
- [ ] Diagnostic does not ask for personal data of third parties.
- [ ] Blueprint application form warns: do not attach invoice files.

---

## 6. Claims

- [ ] Non-promise list present in the zip (`DISCLAIMER.txt`) and on product pages: no guaranteed savings, fraud detection, compliance, accounting accuracy, autonomous payments, or ROI.
- [ ] No “we replace your ERP” sentence survived editing.
- [ ] KPI templates measure operating quantities, not invented cash savings.
- [ ] Charts that are not Ardent/Forrester sourced are labelled illustrative or fictional.

---

## 7. Licence and notice hygiene

- [ ] Every zip has `LICENCE.txt` matching the SKU family.
- [ ] Every zip has `DISCLAIMER.txt`.
- [ ] Headers/footers on PDFs: Evidence Room · AP Agent OS · Licensed material · not advice.
- [ ] No Creative Commons mark on paid files (unless counsel later chooses a specific page).
- [ ] No GPL / copyleft code copied into the product (this product should not need it).
- [ ] Fonts on the **website** are licensed (IBM Plex, Source Serif 4 via Google Fonts or self-host per their OFL). PDFs that embed fonts: confirm embed permissions.
- [ ] Design-system CSS is ours.

---

## 8. Images and diagrams

- [ ] Diagrams drawn by us (workforce diagram, fence, stack).
- [ ] No stock-photo people, no robot illustrations, no “AI brain” packs from marketplaces unless we bought an extended licence — default: **do not use them**.
- [ ] Chart PNGs we publish were generated from our own notes, not screenshots of a copyrighted report.

---

## 9. Marketplace derivatives

If we later sell Etsy-style small products (`MARKETPLACE_DERIVATIVES.md`):

- [ ] They do not contain Professional/Team chapters.
- [ ] They do not reuse a unique sequence of examples that makes the core zip redundant.
- [ ] They still carry the non-promise list.
- [ ] They do not use a different licence that accidentally CC-BYs the core method.

---

## 10. Release sign-off

| Role | Name | Date | Notes |
|---|---|---|---|
| Product owner | | | |
| Copy check (non-promise list) | | | |
| Research citations check | | | |
| Counsel (first release) | | | |

**v1.0 must not ship this table empty.**
