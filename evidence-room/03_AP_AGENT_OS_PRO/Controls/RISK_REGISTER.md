# AP Agent Risk Register

**Evidence Room — AP Agent OS Pro**  
**Document type:** Risk register  
**Audience:** Controller, Risk, Internal Audit, AP leadership, Steering Committee  
**Cadence:** Review monthly; deep refresh quarterly; after material incidents

**Scoring (illustrative scale — calibrate locally):** Impact 1–5 · Likelihood 1–5 · **Score = Impact × Likelihood**. Risk appetite and residual targets are set by the organization, not by Evidence Room.

---

## 1. How to use this register

1. Confirm inherent risk scores with local context (volume, ERP maturity, control history).  
2. Link each risk to controls in `AGENT_CONTROL_MATRIX.md`.  
3. Track residual risk after controls; escalate if residual &gt; appetite.  
4. Record owners, treatments, and due dates.  
5. Do not convert industry benchmarks into your residual risk scores without measurement.

**Industry context (not your score):** Ardent Partners *State of ePayables 2025* reports peer average exception rate **18.4%** and STP **35.4%**, with Best-in-Class exception **11.1%** and STP **51%**. High exception environments elevate operational and control risk until root causes are addressed.

---

## 2. Risk register

| Risk ID | Risk title | Description | Category | Inherent I | Inherent L | Inherent score | Key controls | Residual target | Owner | Status | Treatment / notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R-01 | Unauthorized payment release | Agent or misconfigured workflow releases payment without human authorization | Financial / Fraud | 5 | 2 | 10 | Agent 12 human gate; proposal seal; kill-switch | ≤4 | Controller / Treasury | Open | Default L4 exclusion for pay release |
| R-02 | Duplicate payment | True duplicate invoice paid | Financial | 5 | 3 | 15 | Agent 10 multi-signal; intake hash; post-pay detective | ≤6 | AP Manager | Open | Track recovery SLA |
| R-03 | Vendor bank detail diversion | Fraudulent or erroneous bank change leads to misdirected funds | Fraud / Cyber | 5 | 2 | 10 | Dual control master data; bank-change holds on proposals | ≤4 | Treasury + Procurement MD | Open | Agents never self-approve bank changes |
| R-04 | False match / overpay | Incorrect PO/line match posts and pays | Financial | 4 | 3 | 12 | Match fences; citation checks; sample QA | ≤6 | AP Manager | Open | Tune tolerances with evidence |
| R-05 | Material false exception backlog | Over-blocking drives ageing, supplier strain, manual cost | Operational | 3 | 4 | 12 | Triage priority; FP monitoring; root cause | ≤6 | AP Manager | Open | Balance with R-04 |
| R-06 | SoD collapse via agent service accounts | Privileged bot combines incompatible duties | Compliance | 5 | 2 | 10 | Per-agent accounts; permission reviews; Orchestrator limits | ≤4 | Internal Audit + IT | Open | Quarterly access cert |
| R-07 | Prompt injection / adversarial invoice | Untrusted content manipulates agent tools | Cyber / AI | 4 | 3 | 12 | Channel separation; allow-listed tools; red team | ≤6 | IT Security + Prompt Steward | Open | Include in release tests |
| R-08 | Hallucinated accounting data | Fabricated PO, tax, or entity data enters SoR | Financial integrity | 4 | 3 | 12 | Grounding; no silent fill; validators | ≤4 | Prompt Steward + AP Manager | Open | Zero tolerance for fabricated IDs |
| R-09 | Autonomy creep | Level raised without evidence or dual approval | Governance | 4 | 3 | 12 | Ceiling workflow; Orchestrator immutability; Steering | ≤4 | Controller | Open | Link to promotion packs |
| R-10 | Model / prompt drift | Silent quality degradation after change or provider shift | AI quality | 3 | 4 | 12 | Version pin; gold-set monitors; change classes | ≤6 | Prompt Steward | Open | Auto-demote on breach |
| R-11 | Privacy / PII leakage | Sensitive data in wrong channel, log, or model vendor | Privacy | 4 | 3 | 12 | Minimization; masking; DPA; distribution controls | ≤4 | Privacy Office | Open | Incident class Critical if confirmed |
| R-12 | Incomplete audit trail | Cannot reconstruct decision six months later | Compliance / Audit | 4 | 3 | 12 | Mandatory run logs; retention; pack tests | ≤4 | Controller + Internal Audit | Open | Retrieval SLA |
| R-13 | Period-close misstatement | Accrual/cut-off failure aided by weak agent close support | Financial reporting | 5 | 2 | 10 | Agent 13 checklist; Controller approval; evidence pack | ≤4 | Controller | Open | Heightened in first closes |
| R-14 | Supplier commitment risk | Agent correspondence implies payment or commercial terms | Legal / Reputational | 3 | 3 | 9 | Templates; human send; prohibited phrases | ≤4 | AP Manager / Legal | Open | L3 send rare and fenced |
| R-15 | Integration / availability failure at critical window | Outage during payment run or close | Continuity | 4 | 3 | 12 | BCP runbooks; fallback SOP; monitoring | ≤6 | Technical Owner | Open | Tabletop annually |
| R-16 | KPI misrepresentation | Vanity or wrong definitions drive bad promotion decisions | Governance | 3 | 3 | 9 | Metric dictionary; Agent 14 governance; Steering challenge | ≤4 | Controller | Open | No promotion on vanity metrics |
| R-17 | Master-data poisoning | Bad vendor/item/cost centre data scaled by automation | Data | 4 | 3 | 12 | Validation gates; MD ownership; Agent 06 loops | ≤6 | Master Data Owner | Open | Closed-loop with Procurement |
| R-18 | Tax determination error at scale | Systematic wrong tax codes | Regulatory | 4 | 2 | 8 | Tax rules; abstain; Tax review samples | ≤4 | Tax Lead | Open | Jurisdiction complexity elevates L |
| R-19 | Cross-entity posting | Invoice posted to wrong legal entity | Financial / Legal | 4 | 2 | 8 | Entity resolution; ambiguity holds | ≤4 | Controller | Open | Multi-entity orgs: raise L |
| R-20 | Over-reliance / skill atrophy | Team cannot operate fallback; weak challenge culture | Operational / People | 3 | 3 | 9 | Training; manual drills; override quality review | ≤6 | AP Manager | Open | Team tier change curriculum |
| R-21 | Third-party model vendor failure | Provider outage, policy change, or subprocessor shift | Vendor | 3 | 3 | 9 | Contracts; fallback; evaluation harness | ≤6 | Technical Owner + Procurement | Open | Exit plan documented |
| R-22 | Exception taxonomy chaos | Unmanaged “other” codes destroy routing and KPIs | Operational | 3 | 4 | 12 | Controlled taxonomy; change control; % other cap | ≤6 | AP Manager | Open | See Exception Taxonomy |
| R-23 | Statement reconciliation forced matches | Liabilities hidden by incorrect clears | Financial | 4 | 2 | 8 | Evidence-required matches; unexplained ageing | ≤4 | AP Manager | Open | Material suppliers prioritized |
| R-24 | GR fraud or false receiving | Fake receipts to clear match | Fraud | 4 | 2 | 8 | Receiver attestation; anomaly on GR patterns; SoD | ≤4 | Operations + AP | Open | Industry-specific |
| R-25 | Change without regression | Hotfix breaks stop conditions | Quality | 3 | 3 | 9 | Release mgmt; UAT; shadow | ≤4 | Technical Owner | Open | Untagged prod edit = incident |

---

## 3. Heat map (inherent)

|  | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|
| **I5** | | R-01, R-03, R-06, R-13 | R-02 | | |
| **I4** | | R-18, R-19, R-23, R-24 | R-04, R-07, R-08, R-09, R-11, R-12, R-15, R-17 | R-05, R-10 | |
| **I3** | | | R-14, R-16, R-20, R-21, R-25 | R-22 | |

*Illustrative placement from §2 scores; redraw after local calibration.*

---

## 4. Risk appetite statements (templates — finalize locally)

1. **Zero appetite** for unauthorized payment release and for fabricated system-of-record identifiers.  
2. **Low appetite** for residual duplicate-payment risk; detective controls and recovery must be proven.  
3. **Managed appetite** for false-positive exceptions during early pilot — time-boxed, measured, and reduced.  
4. **No appetite** for autonomy increases without promotion evidence packs.  
5. **Low appetite** for unresolved material statement differences beyond defined SLA.

---

## 5. Monitoring and KRIs (key risk indicators)

| KRI | Links to | Illustrative trigger |
|---|---|---|
| Confirmed duplicate payments (count / $) | R-02 | Any occurrence |
| Bank-change payments without dual control | R-03 | Any occurrence |
| Fabricated ID validator failures reaching ERP | R-08 | Any occurrence |
| Unapproved ceiling changes | R-09 | Any occurrence |
| Gold-set accuracy drop vs baseline | R-10 | &gt; agreed pp drop |
| % exceptions coded “Other” | R-22 | &gt; cap |
| Kill-switch drill fail | R-15 / Orchestrator | Any fail |
| Override rate on high-confidence recommendations | Multiple | Sustained &gt; band |

---

## 6. Escalation

| Residual vs appetite | Action |
|---|---|
| Within appetite | Monitor; standard cadence |
| Above appetite ≤ 30 days | Treatment plan; weekly Risk review |
| Above appetite &gt; 30 days or Critical inherent with weak residual | Steering Committee; consider demote/disable agent |
| Realized Critical incident | Incident response (§ Governance Framework) + register update within 5 business days |

---

## 7. Related documents

- `Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `Controls/AGENT_CONTROL_MATRIX.md`  
- `KPI_Measurement/KPI_FRAMEWORK.md` (control-breach and audit-exception metrics)  
- `Process_Mapping/EXCEPTION_TAXONOMY.md`
