# Refined operating spec — the master prompt that was executed

**Evidence Room · AP Agent OS · v1.0**  
**Status:** Production brief. This is the specification the suite was built against.  
**Date:** September 2026  
**Worked example:** Northline Industrial Group (fictional). Never a real employer or client.

This file is not a customer deliverable. It is the room’s own standard. If a later file contradicts this spec, the file is wrong until this spec is versioned.

---

## 1. Product idea (locked)

Evidence Room publishes an **operating system** for building, governing, and scaling AI agents across Accounts Payable. It is method, designs, controls, measurement, and templates applied across the ERP / AP / bank / shared-services stack the buyer already has.

It is not software hosting. It is not a replacement ERP. It is not a prompt pack.

**Master line:** Responsibility is earned.  
**Supporting line:** Governed agents. Measurable outcomes.

---

## 2. Brand decision (locked)

Evaluated and recorded in `brand/BRAND_SYSTEM.md` and `08_WEBSITE/COPY_ABOUT.md`.

| Candidate | Decision |
|---|---|
| **Responsibility is earned.** | **Selected.** A standard, not a mood. Matches Levels 0–4. Survive contact with a controller. |
| Evidence over hype | Rejected as master. True, but it leads with contempt. |
| From workflow to workforce | Rejected. Implies replacement. |
| Governed agents. Measurable outcomes. | **Supporting only.** Accurate. Less of a standard. |

Do not rotate slogans by campaign. Do not add a third line.

Aesthetic: institutional investment research. Paper / ink / forest / rule-gold. No robots, no neon brains, no purple gradients, no “AI-powered” badge.

---

## 3. Audience

Primary: Controller, AP lead, shared-services director, internal audit / SOX lead, CFO or transformation lead who will be asked to “add AI” to a stack that already exists.

Secondary: systems owner, payments lead, procurement operations (as owners of A05/A06), FP&A (as owner of any F-family number).

Not the audience: prompt-marketplace shoppers, “10x AP” newsletter buyers, anyone who needs a savings guarantee to convert.

---

## 4. Tighter non-goals

The original brief said “no guaranteed savings / fraud / compliance / ROI / autonomous payments.” That stands. This build tightens it.

**We will not:**

1. Promise, imply, or layout-imply **savings, headcount reduction, cash recovery, fraud detection, compliance, accounting accuracy, autonomous payments, or ROI**.
2. Use **vendor-recycled absolute dollars** ($10–$15 vs $2–$3 per invoice, or cousins) as inputs, targets, or chart anchors. Mark them vendor/unverified if they appear at all.
3. Apply **Ardent Best-in-Class relative gaps** (78% lower cost, 82% faster, 59% lower exceptions, 9% exception rate) as a forecast, a multiplier on the customer’s baseline, or a “what our agents deliver” line. Cite as independent research context only.
4. Invent **Forrester Wave scores**, quadrant placements, or “Leader” language for Evidence Room. The Wave (RES181078, Q3 2024) exists. We are not in it. We do not impersonate it.
5. Claim **NIST**, **ISO/IEC 42001**, or SOX certification by using those frameworks. Map practices. Do not issue badges.
6. Let any agent **authorise, release, or transmit payment**. `can_release_payment` is always false. A12 challenges; a human releases.
7. Default any agent to **Level 3 or Level 4**. Start 0 or 1. Full autonomy is never the default.
8. Build **other finance verticals** (AR, FP&A agents, close-the-books-as-a-product) in this suite. Scale stays AP → services → subscription → Finance Agent *platform*, later. See `09_RESEARCH/SCALE_ROADMAP.md`.
9. Clone **proprietary vendor materials**, screenshots, or playbooks (Tipalti, Coupa, Basware, Esker, Yooz, Medius, Stampli, AvidXchange, HighRadius, Ramp, BILL, SAP, Oracle, Microsoft, UiPath, Automation Anywhere, Vic.ai, prompt-pack marketplaces).
10. Treat **Northline** as a customer, a result, or a template company the buyer should copy into their books.
11. Sell **implementation hours** inside Team. Team is a toolkit the buyer runs. Attendance is Custom or a separate agreement.
12. Put an **open $3,000 buy button** on the storefront. Custom is application-then-hidden-checkout.
13. Turn on **affiliates** or **abandoned-cart +5%** at launch.
14. Add a **subscription SKU** at launch.
15. Upload the blank toolkit to a **public model** as training data. Counsel writes the final AI-upload clause.

---

## 5. Quality gates — 9/10 ship bar

Nine dimensions. Each file, and the suite as a whole, must score **at least 9/10** or be revised before it is called done. A 10 is rare and must be earned. A 7 dressed as a 9 is a fail.

| # | Dimension | 9 looks like | Fail looks like |
|---|---|---|---|
| Q1 | **Operating completeness** | The file answers: What should I do? How? Who owns it? What can go wrong? How do I control it? How do I measure it? What evidence proves it? | An outline. A vibe. A list of benefits. |
| Q2 | **Evidence discipline** | Every number has a ledger row: independent / vendor / ER-framework / illustrative. URLs where they exist. | Invented statistics. Unsourced “industry average”. |
| Q3 | **Non-promise integrity** | A CFO can forward the file without adding a savings claim, and without us needing to retract. | Implied ROI in a chart title, a “typical 3–5×”, a fraud badge. |
| Q4 | **Voice** | Intelligent, concise, executive, finance-native. Specific nouns (invoice, fence, steward, GR/IR). | Hype, “unlock”, “10x”, robots, contempt for the buyer. |
| Q5 | **Implementation readiness** | A project team can name the owner, map inputs, produce day-one artefacts at Level 0/1, and refuse the exclusions list. | “Configure as appropriate.” Missing owners. Missing stop conditions. |
| Q6 | **Governance coherence** | Earned autonomy, exception taxonomy, and controls are one system. A16 cannot promote. Payment stays human. | Autonomy as a product toggle. Taxonomy forked from the library. |
| Q7 | **ERP-agnostic honesty** | Charter stays; adapter translates. SAP, D365, Oracle, NetSuite, Workday, other named. Ledger wins disagreements. | A single-ERP SOP pretending to be generic. A posting API shared across ledgers. |
| Q8 | **Commercial honesty** | Price, licence, what is *not* in the zip, MoR line, refund draft. Team is not consulting. | Seat-count fog. Fake scarcity. Bundling Custom at a discount. |
| Q9 | **Cross-suite consistency** | Same Northline facts, same sixteen IDs, same reason codes, same prices, same non-promises, same brand line. | A file that invents a seventeenth agent or a different employee count. |

**Ship rule:** if any dimension is below 9, revise the file or record the miss and the fix in `09_RESEARCH/QUALITY_SCORECARD.md`. Do not ship a known 6 with a note that “marketing will punch it up.”

---

## 6. Evidence protocol

Every claim in the suite is one of four kinds. Label it. If you cannot label it, delete it.

| Label | Meaning | Allowed use |
|---|---|---|
| **Independent** | Third-party research we have opened, with date and URL. | Context footnote. Never a customer target. |
| **Vendor** | A vendor blog, recycled dollar, or self-score. | Caution only. Mark unverified. |
| **ER-framework** | Our method (levels, envelopes, promotion clocks, taxonomies). | Operating design. Not industry law. |
| **Illustrative** | Northline or a worked number we made up for teaching. | Teaching. Always say fictional / illustrative. |

**Required independent rows in this build** (must appear in `09_RESEARCH/RESEARCH_LEDGER.md`):

1. Ardent Partners Best-in-Class 2024 via Payables Place, Andrew Bartolini, 21 January 2025 — 78% lower cost, 82% faster, 59% lower exceptions, 9% BIC exception rate, 2.1× STP, 69% BIC have STP in place, 77% eInvoicing, 74% ePayments, 26.9% of All Other time on supplier inquiries.  
   URL: https://payablesplace.ardentpartners.com/2025/01/best-of-2024-ap-performance-advantages-of-best-in-class/
2. Forrester, Meng Liu, 17 March 2025 — six AI AP use cases: capture, matching, reporting, fraud management, payment management, e-invoicing/tax.  
   URL: https://www.forrester.com/blogs/top-ai-use-cases-for-accounts-payable-automation-in-2025/
3. Forrester Wave™: Accounts Payable Invoice Automation, Q3 2024, RES181078 — **exists**. Do not invent scores, Leaders, or a placement for Evidence Room.
4. NIST AI RMF 1.0 (26 January 2023) and NIST AI 600-1 Generative AI Profile (26 July 2024).  
   URL: https://www.nist.gov/itl/ai-risk-management-framework
5. Lemon Squeezy fees as documented on official pricing/fees pages (5% + 50¢; +1.5% international; +1.5% PayPal; +0.5% subscriptions; marketing and payout extras). Confirm on the day of launch.
6. evidenceroom.ai **available** on Vercel registrar check for this build.
7. Vendor-recycled **$10–$15 vs $2–$3** cost-per-invoice: vendor / unverified absolute dollars.

**Human is not automatically ground truth.** Accuracy metrics need a labelled sample.

---

## 7. Friday–Monday journey (product path)

The suite is organised so a serious owner can travel this path. Files must serve a step, not float.

| Session | Steps | Files that must make the step possible |
|---|---|---|
| Friday | 01 Open the room · 02 Take a level · 03 Draw the live path | README, Quick Start, Diagnostic, scorecard, process-mapping templates |
| Saturday | 04 One class · 05 Purpose sentence · 06 Fence + escalation | Starter guide, Responsibility Model, exception taxonomy |
| Sunday | 07 Controls + evidence · 08 Three measures · 09 Historical sample | Control matrix, KPI framework, testing/UAT/shadow |
| Monday | 10 Limited fence · 11 Executive brief · 12 Scale / hold / stop | Roadmap, CFO brief, steering templates, change log |

Team compresses Friday–Sunday into a 1-day or 2-day workshop. Custom writes the same objects against a named environment.

If Friday says wait, the later files must still be *allowed* to remain closed.

---

## 8. File conventions

| Rule | Requirement |
|---|---|
| Voice | Intelligent, concise, executive, finance-native. No hype. |
| Header | Product line, version, month, licence or internal mark, audience. |
| Length | Complete and usable. Not an outline. If a section answers none of the seven operating questions, delete it or rewrite it. |
| Claims | No guaranteed savings, cycle-time, exception, fraud, compliance, or ROI. |
| Statistics | Invent none. Cite the locked research set or label ER-framework / illustrative. |
| Worked example | Always **Northline Industrial Group** — 4,200 employees; about 18,000 invoices/month; SAP S/4HANA + one NetSuite entity (Northline Pacific Components); 14-person shared-services AP team. Named humans may recur (Priya Menon, Diego Alvarez, Maya Chen). Never a real employer. |
| ERP | Agnostic. Name SAP, D365, Oracle, NetSuite, Workday, and “other”. One adapter per ledger. |
| Agent IDs | A01–A16 only. Do not invent a seventeenth processor. A16 is dispatcher and conscience. |
| Reason codes | Shared library codes (`GR-MISS`, `DUP-SUS`, …) and operating taxonomy E01–E27. Map local ERP reasons *to* these. Do not fork. |
| Autonomy | Starting level 0 or 1. Envelope required at 3 and 4. Payment never in the envelope. |
| Cross-refs | Use agent IDs and paths, not “see the other doc”. |
| Imports | Not applicable to markdown. In any code, imports stay at top of file. |
| Northline label | First use on a page: fictional / illustrative / not a client. |

---

## 9. Anti-patterns (do not write these)

1. **Demo promotion.** “The extract looked good, so Level 3.”
2. **Chat instead of objects.** Work that lives only in email has no audit trail.
3. **Vendor SOC as AP control.** A vendor’s report is not fence integrity.
4. **Hours × rate = savings.** Hours are not cash until the cost base changes.
5. **One “AI score.”** Never blend activity, outcomes, money, and risk.
6. **Taxonomy synonyms.** “GR issue” is not a code. Use `GR-MISS` / E07.
7. **Cross-ledger posting.** A twin document in NetSuite is not permission to post in SAP.
8. **Agent as Accountable on a RACI.** Agents own nothing.
9. **Prompt pack as product.** A list of prompts without fence, owner, evidence, and stop is not AP Agent OS.
10. **Fake customers, fake testimonials, fake logos.**
11. **Countdown scarcity** and “30-day no questions” harvest-and-refund.
12. **Contempt.** The buyer already knows the market is noisy. Teach.

---

## 10. ERP-agnostic rules

1. The **charter stays**. The **adapter translates**.
2. If the agent and the ledger disagree, the **ledger wins** until a human posts a correcting document.
3. Do not assume a global vendor number. Key work objects on `(source_system, source_vendor_id)` plus a cross-walk.
4. Invoice natural key: `(company_code, vendor_id, invoice_number, invoice_date, gross_amount, currency)` plus legal e-invoice UUID where one exists.
5. Do not force a named OCR brand. Require extract, confidence, and a human-review path.
6. The adapter must never: post in one ledger because a twin posted in another; recycle a payment proposal across systems; treat a NetSuite “pending approval” bill as a SAP-posted invoice; write back without the autonomy gate and a named posting user.
7. Two books, one stack is normal. Northline is the teaching case: SAP S/4 for core, NetSuite for the acquired entity.

---

## 11. Illustrative versus evidence

| Object | Status |
|---|---|
| Northline headcount, volume, team shape, named staff, PO 4500218831, invoice HF-88421, $14,260 | **Illustrative.** Fictional. |
| Promotion clocks (20 / 40 / 60 / 90 operating days) | **ER-framework.** Not industry law. Raise them locally. |
| Envelope example ≤ $25,000, 10% sample | **ER-framework / illustrative.** |
| Ardent 2024 BIC gaps and adoption rates listed in §6 | **Independent.** Context only. |
| Forrester six use cases | **Independent.** Coverage map, not permission to skip a level. |
| Forrester Wave RES181078 | **Independent existence.** No scores invented here. |
| NIST AI RMF 1.0 + AI 600-1 | **Independent.** Voluntary framework. Not a certificate. |
| Lemon Squeezy fee table | **Independent** as of the cited pages. Re-read at launch. |
| $10–$15 vs $2–$3 | **Vendor / unverified.** |
| evidenceroom.ai availability | **Independent** (Vercel registrar, this build). Domains move. Re-check before buy. |
| Seller 90-day unit build | **Illustrative planning.** Internal. Never a customer slide. |

When a chart could be misread as a result, the caption must say **illustrative** in the first line.

---

## 12. Operating model defaults (product)

| Default | Value |
|---|---|
| Agents | Sixteen. Starter subset: A01, A02, A03, A04, A05, A07, A08, A10, A12, A16. |
| Start levels | See Responsibility Model. Almost all 0 or 1. |
| What stays human | Payment file / bank batch / positive-pay; DOA above matrix; vendor create and bank/tax-ID change (default); write-off and tolerance override above policy; fraud conclusion; close sign-off; autonomy promotion; prompt/rule change; legal/tax interpretation; SOD override. |
| Control spine | Written policy · autonomy register · immutable work log · SOD · change control · inbound completeness · evidence pack. |
| KPI families | Activity · Operational · Financial · Risk-control. No vanity. Customer baseline first. |
| Implementation waves | 0 A16+register · 1 A01/A02/A10 · 2 A03/A04 · 3 A05/A09/A08 · 4 A06/A07 · 5 A12/A11/A13 · 6 A14/A15. Order is not local. Dates are. |
| Commerce | Five products. No subscription. Affiliates off. `EARNED20` on Professional only. |

---

## 13. Commercial tests (must be answerable)

The quality scorecard answers these in writing. A shrug is a fail.

1. Is the Diagnostic valuable enough to earn an email address without a savings calculator?
2. Does Starter feel worth **more than** $79 to a Controller who will actually fence an agent?
3. Can Professional be defended at $199 as a system, not a PDF dump?
4. Is Team $499 a working-group kit, and not a fake consulting engagement?
5. Is Custom clearly scoped design, with decline as a normal outcome?
6. Do unit economics survive Lemon Squeezy’s 5% + 50¢ (and extras) without inventing volume?
7. Can counsel live with the non-promise list and the MoR footer?
8. Does every public page survive a “show me the customer” question? (Answer: there is no customer. Northline is fictional.)

---

## 14. Definition of done

A file is done when all of the following are true:

1. It is a **complete usable document**, not an outline.
2. It matches this spec on voice, facts, non-goals, and Northline.
3. It scores ≥ 9 on each applicable quality dimension, or the miss is logged with a revise note.
4. A practitioner can **do the next action** without a call to Evidence Room.
5. Internal Audit could **pick up an artefact** the file names.
6. Nothing in the file requires the reader to assume savings, fraud detection, compliance, accuracy, autonomous payments, or ROI.
7. Cross-references resolve to files that exist in this suite.

The **suite** is done when:

- The Friday–Monday path is walkable from Diagnostic through Team.
- The product index matches the store blueprint trees.
- The research ledger contains every required row.
- The quality scorecard is filled, including commercial tests.
- Legal remains labelled draft.
- evidenceroom.ai availability and Lemon Squeezy fees are recorded as of this build.

---

## 15. What we told the files to be

Write as if a Controller, an AP manager, and an internal auditor will read the same page on the same day. If a sentence cannot survive that room, it does not ship.

Responsibility is earned. Full autonomy is never the default. Payment stays human. Evidence over theatre.
