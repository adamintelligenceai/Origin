# Evidence Room — brand system

**Version:** 1.0 · September 2026  
**Domain:** evidenceroom.ai (available on Vercel registrar check this build — re-check before purchase)  
**Tokens:** `design-system.css`  
**This file:** idea, lines, type, colour, mark, iconography, charts/tables/callouts/covers, product-family architecture.

The brand is a **room**, not a robot. A claim about an agent has to survive process, control, and measurement. If it cannot, it does not ship as a story.

---

## 1. Brand idea

Finance does not need another assistant. It needs a place where “the agent will handle it” is forced to become a job, a fence, an owner, an evidence pack, and a pause.

**Evidence Room** is that place. The product is the standard. The aesthetic is institutional research, not a launch party.

**Supporting sense:** Governed agents. Measurable outcomes.

**Audience feeling we want:** “I can defend this on Tuesday, to Audit and to the floor.”  
**Audience feeling we refuse:** “This will 10x AP.”

---

## 2. Line evaluation

| Line | Decision | Reason |
|---|---|---|
| **Responsibility is earned.** | **Master.** Locked. | A standard. Matches Levels 0–4. A controller can repeat it. It forbids demo promotion. |
| Governed agents. Measurable outcomes. | **Supporting only.** | Accurate. Less of a moral rule. Use under the master line, in footers, on method. |
| Evidence over hype | Rejected as master | True; leads with contempt. The buyer already knows the market is noisy. |
| From workflow to workforce | Rejected | Implies replacement. Not the offer. |
| Evidence over theatre | Internal only | Useful in operating spec. Too insider for the H1. |
| The operating system for AP agents | Product descriptor | Use in titles and decks. Not a brand line. |
| Full autonomy is never the default | Operating rule | May appear in product. Not the wordmark. |

Do not rotate slogans by campaign. Do not add a third public line. Do not abbreviate the master line to “RIE.”

**How to use the master line**

- After the H1 or as the H1 on Method  
- Footer strip on every marketing page  
- Last slide / last page of a brief  
- Never as a sticker on a savings chart (we have no savings charts)

---

## 3. Voice

Intelligent. Concise. Credible. Executive. Specific. Non-hype.

| Prefer | Avoid |
|---|---|
| Invoice, exception, fence, steward, evidence pack, parked, GR/IR | Unlock, supercharge, 10x, AI-powered, seamless, magic |
| Named owner | The team (as an owner) |
| Observe / recommend / prepare | Autonomous (unless Level 4, defined) |
| Northline is fictional | Case study, customer, logo wall |
| We do not promise… | But you *could* save… |

Read `08_WEBSITE/COPY_HOME.md` and the Agent Library if a sentence feels like a landing page from 2021.

---

## 4. Typography

| Role | Spec | Use |
|---|---|---|
| Serif | **Source Serif 4**, 500, tracking −0.015em. Fallback: Iowan Old Style, Palatino | H1–H4, wordmark, cover titles |
| Sans | **IBM Plex Sans**. Fallback: Helvetica Neue, Arial | Body, tables, UI |
| Mono | **IBM Plex Mono**. Fallback: SF Mono, Menlo, Consolas | Kickers, labels, IDs (A03), codes (`GR-MISS`), prices |

**Scale (print / PDF)**

| Style | Size | Line |
|---|---|---|
| Cover title | 28–34 pt serif | 1.15 |
| H1 | 22 pt serif | 1.2 |
| H2 | 16 pt serif | 1.25 |
| Body | 11 pt sans (print) / 15.5 px sans (web) | 1.4 / 1.55 |
| Kicker | 11 px/pt mono, 0.16em, uppercase, forest | — |
| Label | 10.5 px/pt mono, 0.12em, uppercase, slate | — |
| Wordmark | 13 px/pt, 0.22em, uppercase, weight 600 | — |

Do not use Inter, Roboto, Comic faces, or display italics for “emotion.”

---

## 5. Colour

From `design-system.css`. Do not introduce purple, neon, or lemon-yellow on *our* surfaces. Lemon Squeezy checkout may look like Lemon Squeezy; that is acceptable.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#14171c` | Text, rules of force |
| `--ink-soft` | `#2a3038` | Secondary text |
| `--slate` | `#5c6370` | Labels, meta |
| `--rule` | `#b8a888` | Gold rule, table lines of record |
| `--rule-soft` | `#d4cbb8` | Hairlines |
| `--paper` | `#f3efe6` | Page ground |
| `--cream` | `#faf7f0` | Panels |
| `--white` | `#fffcf7` | Cards |
| `--forest` | `#1e5c45` | Links, kickers, mark |
| `--forest-deep` | `#143d2e` | Hover, cover mark |
| `--rust` | `#8c3a2f` | “What this is not,” hard gates, Sev-1 |
| `--amber` | `#8a6a2f` | Caution, unsigned F, Level 0 |

**Meaning (do not invert)**

- Forest = proceed with governance  
- Rust = refusal / non-promise / stop  
- Amber = observe, unsigned, caution  
- Gold rule = institutional line, not decoration  

Contrast: ink on paper meets body-text needs. Do not put slate on rule-soft.

---

## 6. Logo and wordmark

**Wordmark:** `EVIDENCE ROOM` in the wordmark style (serif or tracked small-caps per context). No tagline inside the mark.

**Cover mark:** a forest square (the “room”) — 1:1, `#1e5c45`, optional 1 px rule-gold inset. Empty. Not a pictogram of a filing cabinet, a tick, or a robot.

**Lockup (default)**

```
[■]  EVIDENCE ROOM
     Responsibility is earned.
```

Square left, wordmark, supporting or master line underneath in sans/ink-soft.

**Do not**

- Add a lens, an eye, a brain, a sparkle  
- Animate the square into a chat bubble  
- Place the mark on a photograph of people pointing at glass  
- Use a lemon, a check-orange, or a gradient orb  

**Favicon:** forest square or ink monogram `ER` in mono, no colour animation.

**Clear space:** one square-width on all sides. Minimum digital size: 16×16 favicon; 28×28 pt on covers.

---

## 7. Iconography

Almost none. If an icon is required (site nav, PDF kicker):

- 1 px stroke, ink or forest, 24 px grid  
- Geometric: fence (box in a box), register (ruled lines), pause (two bars)  
- No 3D, no filled illustration sets, no Remix-style colourful packs  

Agent IDs (`A01`) *are* the icons. Do not commission sixteen mascots.

---

## 8. Charts, tables, callouts, covers

### Charts

- Paper ground, ink series, forest for “ours / operating,” amber for baseline, rust for a control break  
- Caption **first line** must say `Illustrative` or `Independent — see ledger` or `Customer baseline`  
- No 3D, no exploded pie, no “78%” as a hero number without LEDGER-001 and the words *industry context, not our forecast*  
- No dual-axis tricks that imply ROI  

Executive chart files in sales (`06_SALES_AND_MARKETING/charts/`) follow this. If a chart cannot survive Q3, delete it.

### Tables

- Left-aligned text, lining figures if available  
- Header: mono label or sans 13 px, rule under  
- Hairline `#d4cbb8`; heavier `#b8a888` for totals  
- Do not zebra in purple-grey. Alternate cream / paper if needed  

### Callouts

| Kind | Treatment |
|---|---|
| Non-promise | Rust 3 pt left rule, cream fill, list unsoftened |
| Operating rule | Forest left rule, no fill or paper |
| Illustrative (Northline) | Amber left rule + first words `Fictional example.` |
| Stop / kill switch | Rust, short, named human |

### Covers (PDF / zip / OG)

- Ground `#f3efe6`  
- Forest mark + serif title + mono product label (`DIAGNOSTIC` / `STARTER` / `PROFESSIONAL` / `TEAM` / `BLUEPRINT`)  
- Master line at the foot  
- 1200×1200 and 1600×900 per store blueprint  
- No photographs, no people, no robots, no purple  

Thumbnails: `thumb-diagnostic-sq.png` etc. as in `07_LEMON_SQUEEZY/STORE_BLUEPRINT.md` §5.

---

## 9. Product-family architecture

One family. Five rungs. Same room.

```
Diagnostic (free, evaluation)
    → Starter $79 (individual, first fence)
        → Professional $199 (one practitioner, full OS)
            → Team $499 (eight seats, human system)
                → Custom $1,500–$3,000 (named entity, application)
```

| Rung | Mono label | Visual cue | Promise (only this) |
|---|---|---|---|
| Diagnostic | `DIAGNOSTIC` | Level ladder 0–4 on paper | A level, a gap map, a next step |
| Starter | `STARTER` | Fence diagram (box in a box) | Design and fence the first agent |
| Professional | `PROFESSIONAL` | Eight-pack grid, mono labels | The operating system |
| Team | `TEAM` | Eight-seat mark + `WORKSHOP` | The OS plus the human system |
| Custom | `BLUEPRINT` | Blank map | A written design for one environment |

**Shared modules** (site and PDF): five-second block · what this is not · responsibility model · workforce diagram · tier table · Northline vignette labelled fictional · FAQ · legal/MoR strip.

**Hierarchy of surfaces**

1. evidenceroom.ai — paper, our type, our mark  
2. Lemon Squeezy checkout — their UI + our thumbnails + our microcopy  
3. Zip interiors — markdown / PDF in this system  
4. LinkedIn — same type discipline; no carousel that implies savings  

**Do not** create a second mascot for Team or a “pro” chrome gradient. Seriousness scales by *completeness of documents*, not by gloss.

---

## 10. Photography and motion

None required at launch. If later:

- Empty rooms, paper, industrial still life without hero workers  
- No stock “diverse team at agile board”  
- Motion: fade and rule-draw only; no bounce, no confetti  

---

## 11. Legal line (every public surface)

Independently authored operating materials. Not legal, tax, accounting, audit, or investment advice. Does not replace your ERP, AP, or control environment. Does not promise savings, fraud detection, compliance, accounting accuracy, autonomous payments, or ROI. Northline Industrial Group is a fictional example. Checkout processed by Link, LLC f/k/a Lemon Squeezy LLC as merchant of record where that is the fact.

---

## 12. Checks before a surface ships

- [ ] Master line present or one click from the footer  
- [ ] Non-promise list or a pointer that does not soften it  
- [ ] Northline labelled fictional if used  
- [ ] No purple, no robot, no savings hero  
- [ ] Type triad only  
- [ ] Product label matches the SKU  
- [ ] Ledger cited if a number appears  

If a surface fails a check, it is not off-brand in a cute way. It is unpublished.
