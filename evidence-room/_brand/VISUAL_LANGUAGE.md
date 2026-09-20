# Visual Language — Evidence Room

**Version:** 1.0.0 · **Date:** 2026-03-20  
**Companion:** `BRAND_SYSTEM.md`  

This document specifies cover templates, iconography, and product-preview screenshot style so Free through Custom artefacts feel like one institutional system.

---

## 1. Principles

1. **One composition per cover** — brand, title, one sentence, meta. No stat strips on the cover.  
2. **Paper field first** — atmosphere from paper texture / soft grain, not purple gradients.  
3. **Signal teal is scarce** — reserved for structure and truth markers.  
4. **Data looks like data** — IBM Plex Mono for figures; never display serif for big KPI digits.  
5. **Screenshots are evidence** — quiet UI, labelled, cropped to the decision.

---

## 2. Cover templates

### Template A — Standard product cover (`paper`)

**Use:** Free, Starter, Pro modules, Team non-executive, Research PDFs.

```
┌──────────────────────────────────────────────┐
│  [ER wordmark]                    AP AGENT OS│
│                                              │
│                                              │
│  Title in Fraunces                           │
│  ────────────────────────────────            │  ← 1pt signal rule (optional)
│  One supporting sentence in Source Serif 4.  │
│                                              │
│                                              │
│                                              │
│  TIER  ·  v1.0.0  ·  2026-03-20              │  ← IBM Plex Mono
└──────────────────────────────────────────────┘
  Field: #F7F4EF   Type: #0B1F33   Rule: #1F6F78
```

**Margins:** ≥ 0.75 in print; ≥ 48 px digital.  
**Title max:** 3 lines. Prefer 1–2.  
**Forbidden on Template A:** photos, charts, badge clusters, QR codes (unless fulfilment requires — then bottom-right only).

### Template B — Executive inverse (`ink`)

**Use:** Team `Executive/` briefs, Custom kickoff covers.

```
┌──────────────────────────────────────────────┐
│  [ER wordmark reversed]                      │
│                                              │
│  Title in Fraunces (#F7F4EF)                 │
│  Supporting sentence (#F7F4EF at 85%)        │
│                                              │
│  Thin paper rule                             │
│                                              │
│  CONFIDENTIAL · TEAM / CUSTOM · date         │
└──────────────────────────────────────────────┘
  Field: #0B1F33
```

Accent: optional 4 pt `signal` vertical bar at left edge — not a card.

### Template C — Research / Evidence cover

Same as Template A, plus footer source block:

```
SOURCE  Ardent Partners / Bottomline  ·  State of ePayables 2025
```

Or for fee sheets:

```
SOURCE  docs.lemonsqueezy.com  ·  Platform fee schedule
```

### Template D — Module spine (Pro internal modules)

Horizontal banner for markdown/PDF section starts:

- Left: module name (Fraunces 18–22 pt)  
- Right: `03 · PRO` in mono  
- Bottom hairline `rule`  

No full-page art required.

---

## 3. Iconography rules

### Style

- **Line weight:** 1.5–2 pt optical at 24 px  
- **Corner:** slight square (2 px radius max) — not pill-round  
- **Colour:** default `ink` on `paper`; active `signal`; alert `caution` / `critical`  
- **Grid:** 24×24 px keyline; 2 px padding  

### Allowed metaphors (AP / governance)

| Concept | Preferred mark |
|---|---|
| Evidence | Stacked lines with check notch |
| Governance | Balanced horizontal rules (not cartoon scales) |
| Exception | Diamond outline |
| KPI | Simple ascending bars (3) |
| Agent | Small bracketed glyph `[ A ]` — not robots |
| Stop condition | Solid square with gap (hard stop) |
| Promotion | Step-up polyline |

### Forbidden icons

- Robots, rockets, magic wands, brain-circuit clichés  
- Gradient filled icons  
- Emoji as iconography  
- Purple variants of any mark  

### Icon sets in documents

Use at most **one** icon per H2 in long documents. Prefer none in executive briefs.

---

## 4. Screenshot style for product previews

Evidence Room is documentation-led; “product previews” show **artefact UI mock frames** (assessment forms, KPI sheets, agent registers) — not fake SaaS dashboards claiming live customer data.

### Frame

- Browser or sheet chrome in `ink` at 40% opacity, 1 pt  
- Outer background `paper`  
- Inner content background `#FFFFFF` or `paper`  
- Corner radius ≤ 4 px (functional, not “card UI”)  

### Content rules

1. Use **realistic but fictional** company names (e.g. “Northbridge Industrial”) — never invent performance stats beyond ledgered industry figures.  
2. When industry numbers appear in a mock, caption: `Industry context — Ardent Partners 2025` (or 2024).  
3. Highlight the decision region with a 1 pt `signal` rectangle — not a neon glow.  
4. Crop tight to the control: promotion criteria, exception route, KPI cadence.  
5. Annotate with numbered callouts outside the frame (Source Serif 4, 9–10 pt).  

### Typography inside mocks

- Match brand fonts where the mock represents Evidence Room artefacts.  
- If mocking a generic ERP field, use IBM Plex Mono for field values; keep chrome neutral gray (`muted`).  

### Motion (web only)

If the website animates previews:

- Fade/slide ≤ 200–300 ms  
- Prefer rule draw and type opacity — not bounce  
- At most 2–3 intentional motions per page (per brand motion budget)  

---

## 5. Tables and in-doc figures

- Align to `BRAND_SYSTEM.md` §8.  
- Width: full content column; avoid floating card shadows.  
- Caption below: `Figure n ·` + description + source.  

### Example caption

```
Figure 2 · Peer vs Best-in-Class cost per invoice
Source: Ardent Partners / Bottomline, State of ePayables 2025
($9.84 peer · $2.65 BIC)
```

---

## 6. File naming for visual assets

```
ER_cover_[tier]_[slug]_v100.png
ER_mock_[artefact]_[slug]_v100.png
ER_icon_[name]_24.svg
ER_chart_[topic]_2025_v100.svg
```

Store under `08_WEBSITE/assets/` or `_brand/exports/` when created.

---

## 7. Accessibility

- Body text on `paper`: `ink` only (contrast well above AA).  
- Inverse covers: `paper` on `ink`.  
- Never `signal` text on `ink` at small sizes.  
- Don’t convey exception severity by colour alone — include label text (Caution / Critical).  

---

## 8. QA checklist (visual)

- [ ] Correct template for tier  
- [ ] No purple / glow / robot imagery  
- [ ] Fonts: Fraunces, Source Serif 4, IBM Plex Mono  
- [ ] Chart/table sources present  
- [ ] Screenshots captioned; no fake ER customer ROI  
- [ ] Version and date on cover footer  

---

*Visual language inherits Evidence Standard: if a figure shows a number, the ledger owns it.*
