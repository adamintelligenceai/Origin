# 10 executive charts — Evidence Room

**Use:** one-slide images for LinkedIn, Method, and Team executive pack.  
**Aesthetic:** investment-research small multiples. Paper ground, ink bars, forest for “ours / recommended”, slate for context, rust only for “do not claim”.  
**Sourcing rule:** **Ardent Partners and Forrester only** for third-party numbers. Everything else is **illustrative**, **fictional (Northline)**, or **structural** (no numbers).  
**Never** title a chart “ROI of AP Agent OS” or “Savings you will get”.

Verify Ardent/Forrester figures against the original publication before a board-facing use. Secondary citations below were checked in September 2026 via public pages that quote the research. If the original differs, the original wins — update this file.

---

## Chart 01 — Invoice processing cost: average vs best-in-class

**Type:** Two-bar comparison, USD per invoice.  
**Title:** Invoice processing cost — industry context (not your baseline)  
**Subtitle:** Ardent Partners, as cited in public 2025/26 commentary on *AP Metrics That Matter*

**Data to plot**

| Series | Value | Source note |
|---|---|---|
| Average | $9.40 | Cited as Ardent Partners by Parseur, “AI Invoice Processing Benchmarks 2026”, quoting *Accounts Payable Metrics That Matter*: https://parseur.com/blog/ai-invoice-processing-benchmarks |
| Best-in-class | $2.78 | Same citation chain |

**Footnotes on the slide (required)**

- This is industry research context. It is not Evidence Room’s result and not Northline’s result.  
- It is not a savings promise. Your cost is whatever your finance team measures.  
- Confirm against Ardent’s current publication before external use: https://ardentpartners.com/ap-metrics-that-matter-in-2025/

**Do not:** add a third bar “With AP Agent OS = $X”.

---

## Chart 02 — Invoice exception rate (industry)

**Type:** Single big number + small comparison if space.  
**Title:** Exception rate — industry context  
**Data**

| Figure | Value | Source note |
|---|---|---|
| Average exception rate (2024, as cited) | 14% | Apex Analytix and Tungsten Automation public notes on Ardent’s 2025 metrics work: https://www.apexanalytix.com/resources/blog/ardent-partners-key-ap-metrics-2025/ · https://www.tungstenautomation.com/blog/ai-in-accounts-payable-metrics-that-matter |
| Older / other Ardent vintage (do not mix on same slide) | e.g. 18.4% or 22% vs 9% best-in-class | Medius and Payables Place pages quote different vintages. **Pick one vintage per slide.** Prefer the 14% 2024 figure *or* go to the primary ebook and replace. |

**Footnote:** Exception rate definitions vary. This is not your queue. Evidence Room does not claim to reduce this by a stated percent.

---

## Chart 03 — Touchless / no-human-touch share (industry)

**Type:** Progress bar 0–100%.  
**Title:** Invoices processed without human intervention — industry context  
**Data**

| Figure | Value | Source note |
|---|---|---|
| Share processed without human intervention | 32.6% | Apex Analytix citing Ardent Partners 2025 metrics: https://www.apexanalytix.com/resources/blog/ardent-partners-key-ap-metrics-2025/ |

**Footnote:** “Touchless” is a vendor-loved word. It is not a synonym for governed. A touchless invoice can still be unowned. Confirm definition in the Ardent source before quoting.

---

## Chart 04 — Northline exception mix (fictional)

**Type:** Horizontal 100% bar.  
**Title:** Northline Industrial Group — exception mix (fictional illustration)  
**Subtitle:** Not a client. Not a result. Numbers invented for teaching Framework 07.

| Bucket | Share |
|---|---|
| Data | 28% |
| Match | 34% |
| Policy | 12% |
| Vendor | 9% |
| System | 17% |

**Teaching point:** the first agent fence should not pretend to own Vendor or System. Match-and-flag, if used, sits on Match inside a written box.

**Do not** present this as benchmark data.

---

## Chart 05 — Cycle time by invoice class (Northline, fictional)

**Type:** Grouped bars, hours, three classes × two states (policy vs Tuesday).  
**Title:** Northline — hours, receipt to complete coding (fictional)

| Class | Policy map | Tuesday (live) |
|---|---|---|
| PO under threshold | 8 | 26 |
| PO over threshold | 16 | 40 |
| Non-PO | 24 | 72 |

**Teaching point:** if you only automate the policy map, you will measure a fiction. START HERE 03 exists because of the gap between the two bars.

Label every axis “illustrative hours — fictional company”.

---

## Chart 06 — Readiness levels (illustrative distribution)

**Type:** Column chart, levels 0–4.  
**Title:** Illustrative distribution — not a survey Evidence Room ran  
**Subtitle:** A teaching shape: mass at 0–1. Do not quote as research.

| Level | Illustrative share |
|---|---|
| 0 | 30% |
| 1 | 45% |
| 2 | 15% |
| 3 | 7% |
| 4 | 3% |

**Footnote:** We have not surveyed the market. This is a pedagogical prior. If we later have our own Diagnostic-aggregate stats, they will be anonymised, opt-in, and will replace this chart — never mix with Ardent.

---

## Chart 07 — Control coverage heatmap (illustrative)

**Type:** 4×4 heatmap (Framework 05 layers × invoice classes).  
**Title:** Control coverage — worked pattern (illustrative)

Rows: Fence integrity · Human release · Segregation · Change  
Columns: PO-low · PO-high · Non-PO · Expense  

**Fill:** empty / partial / present (slate / amber / forest). Example fill: PO-low present on fence + release; empty on segregation; partial on change. Other columns mostly empty.

**Teaching point:** coverage is local to a fence. A green SOC badge in IT does not fill this grid.

No numbers that look like percentages of “risk reduction”.

---

## Chart 08 — Agent vs workflow (structural)

**Type:** Decision tree, no statistics.  
**Title:** Is this an agent job or a workflow job?

```
Is the work already a deterministic path in the AP suite?
├─ Yes, and it runs → fix the workflow; do not add an “agent”
└─ No
   ├─ Can you write a fence and a human release? → candidate for a designed agent
   └─ Would the job be “pay / override / certify / detect all fraud”? → out of method
```

**Use:** executive slide that prevents buying a chat window for a configuration problem.

---

## Chart 09 — Human review rate by risk tier (Northline, fictional)

**Type:** Bar, percent reviewed by a human.  
**Title:** Northline — human review rate by fence tier (fictional target pattern)

| Tier | Illustrative review rate |
|---|---|
| Inside fence, match clean | 100% release recorded (not “0% human”) — we still want a recorded release in v1 |
| Inside fence, flagged | 100% |
| Escalated | 100% |
| Outside fence | Agent must not touch — show as n/a |

**Teaching point:** Evidence Room’s first production fence does **not** celebrate 0% human touch. Recorded release is a feature. If a later organisation designs a different control, that is their auditor’s conversation — not our chart.

Optional second series “vendor slide fantasy 5% review” in rust, labelled “what we will not print as a goal”.

---

## Chart 10 — Forrester agentic AP use-case map (conceptual)

**Type:** 2×2 or simple list diagram. **No numeric ROI.**  
**Title:** Agentic AP as a category — Forrester’s 2026 use-case discussion (conceptual)  
**Source:** Forrester blog, “Top Agentic AI Use Cases For AP Automation In 2026”  
https://www.forrester.com/blogs/top-agentic-ai-use-cases-for-ap-automation-in-2026/

**How to draw it (do not reprint their prose):**

- One axis: *efficiency-at-the-margin* (capture, fewer touches) → *agentic work* (tasks that propose / prepare inside a process).  
- Plot **categories as labels only**, in our words: capture & classify · match-and-flag · evidence chase · review pack.  
- Cross out, in rust: pay autonomously · guarantee accuracy · detect all fraud.

**Footnote:** Forrester is discussing a market category. They are not endorsing Evidence Room. We are not using vendor TEI studies (Basware, Medius, etc.) as if they were Forrester’s opinion of our toolkit. Those TEI ROI figures are **out of bounds** on our charts.

If the blog is paywalled at render time, keep the title, URL, and the structural diagram, and do not invent Forrester statistics.

---

## Production checklist for every chart PNG

- [ ] Source line in 9pt mono under the plot  
- [ ] Fictional / illustrative / Ardent / Forrester labelled  
- [ ] No Evidence Room savings bar  
- [ ] No robot  
- [ ] Filename: `ER-CHART-01-cost-context.png` … `ER-CHART-10-forrester-map.png`  
- [ ] Alt text = title + footnote in one paragraph
