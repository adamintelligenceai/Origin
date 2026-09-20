# Shadow Mode Methodology

**Product:** AP Agent OS — Evidence Room  
**Method step:** 7  
**Rule:** The ERP, vendor master, and payment file remain human-operated. The agent writes proposals and flags to a shadow store. Comparison is the product.

Shadow is not a quiet week and not a pilot. If processors change behaviour because they can see the agent, you are no longer measuring the baseline.

---

## 1. Purpose

1. Measure agreement between agent leaves and human outcomes on the **same** objects.  
2. Find shared bad habits (human and agent both wrong) by sampling against gold-label.  
3. Collect disagreement cases as the improvement unit.  
4. Produce a proceed / remediate / stop memo for the process owner.

Non-purpose: training the SSC on suggestions; generating “hours saved”; claiming the path is safe to post.

---

## 2. Design

### 2.1 Two windows

| Window | Processors see agent output? | Why |
|---|---|---|
| S-A Baseline | No | Unbiased human outcome |
| S-B Open | Yes, after S-A is locked | Measures whether output is usable, not only theoretically right |

Do not skip S-A because “we are in a hurry”. If skipped, say so on the exit memo; the disagreement rate is then contaminated.

### 2.2 Duration and volume

Minimum: **ten working days** or **200 in-scope objects**, whichever is later.  
Northline Dayton PO-goods Wave 1: target 10 days *and* 200 invoices; extend if volume is thin.

Split S-A / S-B roughly 50/50 unless volume forces a longer S-A.

### 2.3 Scope lock

Write on the charter: entity, path, channels, value band, agents, autonomy (shadow write-blocked), supplier inclusions/exclusions.

Mid-shadow model changes void the window (same rule as SC-P). Run S-A2 / S-B2.

### 2.4 Write-block

Verify daily: agent principals cannot post, approve, pay, lift holds, or write masters. A failed check is an incident, not a footnote.

---

## 3. Charter template

| Field | Entry |
|---|---|
| Shadow id | SH-`<entity>`-`<path>`-`<nn>` |
| S-A / S-B dates | |
| Objects in scope | |
| Agents / hashes | |
| Gold-label third reference | Pack id / sample rate |
| Comparison fields | Type, required fields, match leaf, taxonomy code, dup flag, hold annotation |
| Owners | Process owner, test lead, AP lead |
| Kill-switch | Person, deputy, action, time to effect |
| Privacy | Image handling |

Signed before S-A day 1.

---

## 4. Comparison method

For each in-scope object:

| Column | Source |
|---|---|
| Object id | Orchestrator / stub |
| Human terminal or leaf | ERP / exception register (the live path) |
| Agent leaf | Shadow store |
| Agree / disagree | Exact on the comparison field |
| Adjudication | If disagree, or on the gold-label sample |
| Gold-label (if in sample) | Historical / expert label |
| Notes | One sentence |

**Agreement is not correctness.** If gold-label is present and both parties miss EX-ILE, log `agree-wrong`.

Adjudication roles: AP lead on operational leaves; Controls Lead on EX-DUP/PDUP/BNK; Controller on EX-ILE/DOA.

---

## 5. Daily rhythm (15 minutes)

1. Write-block ping.  
2. Intake reconciliation (channel vs stubs) — even in shadow.  
3. Count: compared, disagreed, agree-wrong, EX-SYS.  
4. Pull two disagreement cases for the stand-up.  
5. No prompt tuning on the live hash.

File a daily line even on quiet days.

---

## 6. Measures (shadow-specific)

Use KPI definitions; add:

| Measure | Formula |
|---|---|
| Pair coverage | Objects with both human and agent leaves / in-scope handled |
| Disagreement rate | Disagree / paired |
| Agree-wrong rate | Agree-wrong / gold-label sample |
| Usability (S-B only) | Share of shown proposals testers would have used (from a 3-way tag: use / edit / ignore) |

FPR/FNR per detector on the paired set. Small n printed.

---

## 7. Case file (disagreement)

```
Case id / object id
Comparison field
Human leaf / Agent leaf / Gold (if any)
Who is right? Human / Agent / Neither / Unclear
Tree id that should have applied
Fix class: data / tree / model / SOP / human habit / out of scope
Owner / due
Promote to defect? Y/N
```

Fix class drives the work. “Tune the model” is not the default class.

---

## 8. Sampling against gold-label

Draw a random sample from the shadow window (Northline: 40 objects or 10%, whichever greater) and score as if it were a mini SC-T. This is how silent agreement on a bad habit is found (e.g. remembered PO numbers).

---

## 9. Exit memo

Required sections:

1. Scope and hashes  
2. Pair coverage  
3. Disagreement rate trend (not a single average if mix shifted)  
4. Agree-wrong findings  
5. Detector FNR on EX-DUP, EX-ILE, EX-BNK  
6. Write-block integrity  
7. Open defects Critical / High  
8. Recommendation: **proceed to pilot / remediate / stop**  
9. What must be true before pilot (not a wish list — gates)

Process owner writes the recommendation. Control owner countersigns if the recommendation is proceed.

---

## 10. Northline SH-DAY-PO-01 (illustrative)

- S-A 10 days, 214 PO-goods invoices; S-B 8 days, 171. Hash stable.  
- Pair coverage 0.96. Disagreement 0.18 falling to 0.12. Agree-wrong 3/40: two remembered-PO habits (human), one EX-PRX/QTM (both).  
- FNR EX-DUP 0/7; EX-ILE 0/2 (small n); EX-BNK 0/5 where remittance present; compare coverage 0.71 — residual risk R-08 watch.  
- Write-block: pass daily.  
- Recommendation: remediate EX-PRX wording and PO-source field; then controlled pilot on 12 named suppliers, still L1.

---

## 11. Failure modes

| Failure | What to do |
|---|---|
| Processors opened S-B during S-A | Void S-A; restart |
| Agent wrote to ERP | Incident; stop; do not call it shadow |
| Tuning on the live hash | Void window |
| Only clean invoices compared | Extend until exception mix resembles the queue |
| Exit memo without agree-wrong sample | Incomplete; no proceed |
