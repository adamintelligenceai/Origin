# Evidence Room — QA Scorecard (Commercial GTM Package)

**Document ID:** `00_READ_ME/04_QA_SCORECARD`  
**Version:** 1.0  
**Scope:** GTM artefacts in `06_`, `07_`, `08_`, `10_`, and `00_READ_ME/02–04`  
**Bar:** Ship only if every gate ≥ 9/10 after notes/remediation  

---

## Scoring rubric

| Score | Meaning |
|---|---|
| 10 | Exemplary; CFO-safe |
| 9 | Ship-ready; minor polish only |
| 8 | Usable but needs revision before ship |
| ≤7 | Blocker |

---

## Gate scores

| # | Quality gate | Score | Notes / remediation |
|---|---|---|---|
| 1 | **CFO-useful** — language a Finance Director would respect | **9** | Positioning, landing, and emails stay non-hype; avoid any leftover “transformative” phrasing in future edits. |
| 2 | **Tomorrow-usable** — clear Friday→Monday / next actions | **9** | Funnel + Professional path + onboarding emails give concrete next steps; keep Start Here cross-links live when site ships. |
| 3 | **Specific** — agents, levels, exclusions named | **9** | 16-agent stack and L0–L4 appear consistently across marketing surfaces. |
| 4 | **Premium** — institutional tone; not prompt-shop aesthetics | **9** | Brand System referenced; marketplace section explicitly bans cheap prompt aesthetics. |
| 5 | **Evidence-based** — no invented stats; illustrative labelled | **9** | Email 6 and financial model labelled NON-EVIDENCE; research claims deferred to ledger. **Remediation if publishing charts:** require Ledger ID footnotes. |
| 6 | **Differentiated** vs prompt packs / vendors / consulting | **10** | Comparison tables and posts make operating-layer white space unmistakable. |
| 7 | **Coherent** ladder Free→Starter→Pro→Team→Blueprint | **10** | Same prices and jobs everywhere. |
| 8 | **Navigable** IA and file map | **9** | Sitemap + document IDs consistent; confirm live nav matches `08_WEBSITE/01`. |
| 9 | **Commercially over-delivered** — listings, fulfilment, emails complete | **9** | LS specs + listings + onboarding written; still need actual ZIP packaging QA at build time. |
| 10 | **Control & payment safety** — human payment authorisation | **10** | Repeated non-negotiable across funnel, web, legal drafts. |
| 11 | **Legal humility** — drafts flagged; no advice theatre | **9** | Privacy/Terms/Licence/Refund flagged for counsel; MoR tax notes explicitly not advice. **Do not publish legal pages without review.** |
| 12 | **Lemon Squeezy accuracy** — fees cited to docs | **9** | 5% + US$0.50 cited with docs.lemonsqueezy.com / pricing URLs; extra fee caveats included. Re-verify on go-live day. |
| 13 | **Domain honesty** | **9** | evidenceroom.ai marked preferred + availability verification needed throughout. |
| 14 | **Content engine completeness** | **9** | 30 posts, 10 carousels, 5 articles, charts, diagnostic posts, frameworks, marketplace plan present. Longform are outlines (as specified) — full prose still to draft when publishing. |
| 15 | **Voice compliance** (banned hype list) | **9** | Spot-check passed on core pages; run banned-term grep before launch creatives. |

### Aggregate

| Metric | Value |
|---|---|
| Gates scored | 15 |
| Minimum gate | 9 |
| Gates below 9 | **0** |
| Ship decision (GTM docs) | **PASS — proceed to packaging/legal review** |

---

## Revisions applied where risk of &lt;9 existed

| Risk | Revision in package |
|---|---|
| ROI hype in email | Email 6 forced ILLUSTRATIVE / NON-EVIDENCE labelling |
| Fee handwaving | LS fees tied to official pricing/docs + add-on caveats |
| Legal overclaim | Privacy/Terms/Licence/Refund marked draft + counsel |
| Cannibalisation via Etsy | Hard rules in marketplace expansion doc |
| Autopay confusion | Explicit “not autonomous payments” on CTAs and LP |

---

## Pre-launch residual checklist (ops — not score deductions yet)

- [ ] Counsel review of Privacy, Terms, Licence, Refund  
- [ ] Domain + trademark verification for evidenceroom.ai  
- [ ] Live Lemon Squeezy fee confirmation on a test product  
- [ ] ZIP fulfilment dry run  
- [ ] Banned-language grep on final site build  
- [ ] Aikido / security scan on any first-party app code when present  

---

*End of QA Scorecard v1.0.*
