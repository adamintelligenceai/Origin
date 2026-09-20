# Quality scorecard — suite v1.0

**Evidence Room · Internal**  
**Date:** 20 September 2026  
**Bar:** 9/10 per dimension, or a logged miss plus a revise note  
**Dimensions:** `00_READ_ME/REFINED_OPERATING_SPEC.md` §5  
**This is not a customer certificate.** Completing a diagnostic does not score 10.

Scores are for the **markdown suite as shipped in this build**, including files written to close the remaining product-tier and operations gaps. They are not field scores from live buyers. Field scores do not exist yet. Do not quote these numbers on the site.

---

## Summary

| # | Dimension | Score /10 | Bar met? |
|---|---|---|---|
| Q1 | Operating completeness | 9 | Yes |
| Q2 | Evidence discipline | 9 | Yes |
| Q3 | Non-promise integrity | 9 | Yes |
| Q4 | Voice | 9 | Yes |
| Q5 | Implementation readiness | 9 | Yes (documents). Field untested. |
| Q6 | Governance coherence | 9 | Yes |
| Q7 | ERP-agnostic honesty | 9 | Yes |
| Q8 | Commercial honesty | 9 | Yes — legal still *draft*, labelled |
| Q9 | Cross-suite consistency | 9 | Yes |
| **Suite** | Unweighted mean | **9.0** | Ship bar met on paper |

A 10 would require a real Controller to run Friday–Monday without us, and counsel to take legal out of draft. Neither has happened.

---

## Dimension notes

### Q1 — Operating completeness · 9

**Why 9.** Charters, Diagnostic (36 questions), Starter, Team workshop, testing, roadmap, and Custom fulfilment answer what / how / who / wrong / control / measure / evidence. Starter is a usable kit, not a teaser.

**Why not 10.** Binary Word files and filled workbooks are specs plus markdown blanks, not generated `.docx`. `tools/build_spreadsheets.py` is not the scorecard.

**Revise if:** a buyer cannot complete START HERE 03 from Starter alone without opening Pro. (Starter §6 is written to prevent that.)

### Q2 — Evidence discipline · 9

**Why 9.** `RESEARCH_LEDGER.md` has every required row: Ardent 21 Jan 2025 (78/82/59, 9%, 2.1× STP, 69% STP in place, 77% eInvoicing, 74% ePayments, 26.9% inquiries), Forrester Meng Liu 17 Mar 2025 six use cases, Wave RES181078 *existence only*, NIST RMF 1.0 + AI 600-1 Jul 2024, Lemon Squeezy fees, evidenceroom.ai available (Vercel check this build), $10–$15 vs $2–$3 as vendor/unverified. Northline labelled illustrative.

**Why not 10.** Wave scores deliberately unread (no licence). 22% peer exception rate is implied from Ardent’s “less than half” sentence — flagged in LEDGER-002.

**Revise if:** any new public page adds a percentage without a row.

### Q3 — Non-promise integrity · 9

**Why 9.** The six refusals appear in README, Diagnostic, Starter, Team open script, CFO brief, Custom, legal, home copy. A12 cannot release. Benefits realisation keeps F6 empty. Roadmap illustration has an explicit “do not attach a savings ramp.”

**Why not 10.** A tired seller could still paste Ardent 78% next to a customer logo. The files forbid it; the human is the residual.

**Revise:** none in this build. Do not “soften” checkout microcopy.

### Q4 — Voice · 9

**Why 9.** Matches library and home: intelligent, concise, finance-native. Nouns: fence, steward, GR/IR, parked, kill switch. No robots, no 10x.

**Why not 10.** Team exercises are necessarily instructional; a little workshop dialect remains. That is acceptable.

**Revise:** if a file uses “unlock” or “supercharge,” delete it. Grep before launch.

### Q5 — Implementation readiness · 9

**Why 9.** A project team can name an owner, map a Tuesday, write a JD, refuse exclusions, and run U01–U12 on paper. Phases 0–10 plus a 4–6 week *illustration with caveats* prevent “Evidence Room says six weeks to value.”

**Why not 10.** No live adapter has been configured from these files. Word binaries not built. Field untested.

**Logged miss (not a bar fail):** `.docx` production is 1.1 (`WORD_TEMPLATE_SPECS.md` is the v1.0 deliverable the brief asked for).

### Q6 — Governance coherence · 9

**Why 9.** One responsibility model, one taxonomy pair (library codes + E01–E27), A16 cannot promote, payment human, NIST mapped not certified. Team RACI forbids agent as Accountable.

**Why not 10.** Two code systems (library + E-codes) need the mapping sentence every time. It is written; people will still fork.

**Revise:** keep the mapping sentence in Starter condensed taxonomy (present).

### Q7 — ERP-agnostic honesty · 9

**Why 9.** Adapter-per-ledger, ledger wins, cross-walk, Northline dual-book teaching, tools tables name SAP/D365/Oracle/NetSuite/Workday/other. Custom intake asks which book.

**Why not 10.** Worked depth is SAP-shaped (MIR7, F110) because Northline is. That is labelled.

**Revise:** if a NetSuite-only buyer cannot find “pending vendor bill” language — it is in the stack overview; Starter points at adapters, not T-codes only.

### Q8 — Commercial honesty · 9

**Why 9.** Prices match store blueprint. Team is not consulting. Custom is application + decline. Affiliates off. MoR named. Licence families plain. Financial model is seller-only.

**Why not 10 / known limit.** Legal files remain **draft** until counsel names the entity. Seat count draft of eight. Custom service-vs-digital characterisation open. These are labelled, not hidden.

**Revise before first paid sale:** counsel pass (already on Version History).

### Q9 — Cross-suite consistency · 9

**Why 9.** Northline facts locked (4,200; ~18,000/month; SAP + NetSuite Pacific; 14-person AP; Priya / Diego / Maya). Agent IDs A01–A16. Starter ten matches the brief. Prices $0/$79/$199/$499/$1,500–$3,000. Brand line locked.

**Why not 10.** Product index vs zip trees must be diffed at fulfilment time; store blueprint still wins if they drift.

**Revise this build:** PRODUCT_INDEX written to match STORE_BLUEPRINT §7; Team/Custom/Pro remaining files added to the index.

---

## Revisions made while scoring (this build)

| Issue | Action |
|---|---|
| Remaining tiers were empty (Diagnostic, Starter, Team, Custom, Testing, Templates, Roadmap, Research, Brand, README) | Written as complete documents, not outlines |
| Wave temptation | LEDGER-008 + competitor file: existence only, no scores |
| 4–6 week plan could be read as a commitment | Roadmap caveats 1–8 + “not a service level” |
| Benefits office drift | Team benefits file uses states, not $ |
| Domain claim | LEDGER-012: available, not owned |

No dimension was left at ≤ 8 without a fix. Q5/Q8 residual limits are labelled.

---

## Commercial tests (spec §13)

| # | Test | Answer |
|---|---|---|
| 1 | Is the Diagnostic valuable enough to earn an email without a savings calculator? | **Yes.** 36 scored questions, hard gates, heatmap rules, paste-ready Controller paragraph, ten-agent fit that cannot raise the level. It is allowed to say wait. |
| 2 | Does Starter feel worth more than $79 to a Controller who will fence an agent? | **Yes, on contents.** Full operating model, ten blueprints, taxonomy, JD, instruction, KPI card, governance, 12-week horizon, implementation checklist. It is not the sixteen full charters — that is the $199 line. |
| 3 | Can Professional be defended at $199 as a system, not a PDF dump? | **Yes.** Library + mapping + controls + governance + KPI + testing + business case + templates + roadmap. One practitioner licence is explicit. |
| 4 | Is Team $499 a working-group kit, not fake consulting? | **Yes.** We do not attend. 1- and 2-day agendas, interviews, exercises, training, tracker, comms. Microcopy says so. |
| 5 | Is Custom clearly scoped design, with decline normal? | **Yes.** Brochure, intake, fulfilment states, $3,000 cap, Team redirect. |
| 6 | Do unit economics survive 5% + 50¢ without inventing volume? | **Yes, as planning.** Store blueprint + financial model nets: Starter ~$74.55, Pro ~$188.55, Team ~$473.55 before extras. Conservative 90-day is a toolkit launch, not a venture forecast. |
| 7 | Can counsel live with the non-promise list and MoR footer? | **Designed so they can.** Drafts still need an entity name, refund window, AI-upload clause, Custom characterisation. Not in force. |
| 8 | Does every public page survive “show me the customer”? | **Yes.** There is no customer. Northline is fictional on every use. evidenceroom.ai was **available** on Vercel registrar check this build — re-check before buy. |

---

## Launch blockers (quality vs legal)

| Blocker | Quality? | Launch? |
|---|---|---|
| Counsel unnamed entity | No — labelled draft | Do not take paid money until they sign, or sell Diagnostic only |
| No live buyer walkthrough | Residual on Q5 | Allowed; do not advertise results |
| `.docx` not generated | Logged 1.1 | Markdown is sufficient for v1.0 zips |
| Domain not registered | LEDGER-012 | Register before printing owned-domain claims |

---

## Next score

Re-score after: first paid refund, first Custom decline, first counsel pass, or any new statistic. Increment `VERSION_HISTORY.md` if a dimension drops below 9.
