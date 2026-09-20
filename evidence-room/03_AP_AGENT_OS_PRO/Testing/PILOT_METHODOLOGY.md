# Pilot Methodology

**Evidence Room — AP Agent OS Pro**  
**Document type:** Method standard  
**Intent:** Supervised production learning under tight fences — earn the next responsibility step.

---

## 1. Definition

A **pilot** runs the agent in production with real side effects **limited** by scope fences (vendors, entities, document types, amounts, level). Humans monitor intensively. Success is measured, not declared.

---

## 2. Preconditions (entry gate)

- [ ] UAT exit approved  
- [ ] Shadow exit approved (if required)  
- [ ] Charter & RACI current  
- [ ] Kill-switch owner named and drill done  
- [ ] Fallback SOP communicated to shift team  
- [ ] Scorecard + weekly report templates ready  
- [ ] Support rota (Business + Tech) for pilot window  
- [ ] Controller aware if money-adjacent  

---

## 3. Fence design

| Fence | Example |
|---|---|
| Vendor set | Top 20 domestic PO vendors only |
| Entity | One ledger |
| Amount | ≤ illustrative micro/standard band |
| Doc type | PO invoices only |
| Level | L1 recommend or L2 prepare — not L3 execute initially |
| Channel | No autonomous external send |

Document fences in charter appendix; Orchestrator enforces where possible.

---

## 4. Pilot duration and sample

Illustrative: **3–8 weeks** or until statistically useful volume, including at least one payment cycle and one week with peak load if feasible.

Early stop triggers: Critical control breach; kill-switch event from real harm; data corruption; security incident.

---

## 5. Roles during pilot

| Role | Duty |
|---|---|
| AP Specialist | Execute accept/reject; log friction |
| AP Manager | Daily triage; decide pause |
| Prompt Steward | Defect triage on model/prompt |
| Tech Owner | Reliability; kill-switch |
| Controller | Gate on risk; waive/stop authority |

---

## 6. Daily / weekly cadence

**Daily (15 min):** breaches, aged pilot cases, kill-switch health, top failures.  

**Weekly:** full scorecard; pilot log; go/adjust/stop recommendation.

Use `WEEKLY_AGENT_PERFORMANCE_REPORT.md` with a “Pilot” banner.

---

## 7. Measurement

Track the same dictionary KPIs as production, plus:

| Pilot-specific | Purpose |
|---|---|
| Accept / reject / modify rates | Recommendation quality |
| Time-to-decision on agent items | Friction |
| Manual rework after accept | Hidden FN |
| Fence hits (blocked OOS) | Scope correctness |
| Specialist sentiment (structured) | Change signal |

---

## 8. Decision framework at pilot end

| Outcome | Criteria (illustrative) | Next |
|---|---|---|
| Expand scope | Metrics Green; 0 Crit; mix OK | Broader fences; keep level |
| Promote level | Sustained window + evidence pack | L+1 per Responsibility Model |
| Continue pilot | Amber with clear fix plan | Extend dated window |
| Rollback | Red gate / broken trust | Disable; RCA; re-shadow |

---

## 9. Pilot log (minimum fields)

| Date | Event | Impact | Action | Owner |
|---|---|---|---|---|
| | | | | |

Retain with evidence pack.

---

## 10. Communication

- Kickoff note to AP + Procurement stakeholders (what changes / what does not).  
- Midpoint check with Controller.  
- Close-out readout using Steering pack excerpt.  
- Explicit statement: pilot success ≠ full autonomy.  

---

## 11. Related documents

- `SHADOW_MODE_METHODOLOGY.md`  
- `Business_Case/IMPLEMENTATION_ROADMAP.md`  
- `Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `Templates/EXECUTIVE_STEERING_PACK.md`
