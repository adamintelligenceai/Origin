# AP agent risk register

**Evidence Room · AP Agent OS Pro**  
Version 1.0 · September 2026 · Licensed material · ERP-agnostic  
Answers: *What can go wrong? Who owns it? How control? How measure?*

---

## How to use this register

This is the standard risk catalogue for AP agents. Instantiate it per client: keep IDs stable, localise owners, set residual after *their* controls operate.

**Ratings** use a 5×5 inherent/residual grid. Numbers are ordinal, not a forecast of loss.

| Score | Likelihood | Impact |
|---|---|---|
| 5 | Expected in a typical year without this control | Material mis-payment, entity error, or reportable control failure |
| 4 | Probable over a year | Significant rework, delayed run, local audit exception |
| 3 | Possible | Contained error, extra cycle time |
| 2 | Unlikely | Minor rework |
| 1 | Rare | Negligible |

**Inherent** = no agent-specific controls (the raw job + a naïve agent).  
**Residual** = after the standard matrix in `AGENT_CONTROL_MATRIX.md` is *operating*. Residual is illustrative for a well-run first slice; it is not a promise.

| Inherent / residual | L × I band |
|---|---|
| Critical | 20–25 |
| High | 12–16 |
| Medium | 8–10 |
| Moderate | 5–6 |
| Low | 1–4 |

**Treatment types:** mitigate, avoid (do not agentise), transfer (insurance/vendor — rarely sufficient alone), accept (written, time-bound, executive).

**Do not** treat vendor-blog savings as a risk treatment. **Do not** accept payment-authorisation risk.

Owners are roles. Names go on the client instance.

---

## Register

| ID | Risk | Agents | Inherent L | Inherent I | Inherent | Residual L | Residual I | Residual | Owner | Treatment | Key controls | Measure |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R-PAY-01 | Agent authorises, releases, or transmits payment | A12, any mis-scoped agent | 4 | 5 | Critical | 1 | 5 | Moderate | Treasury lead | Mitigate; never accept | C-A12-01; allow-list; SoD; runtime deny | Payment events with agent identity = 0 |
| R-PAY-02 | Duplicate payment | A10, A11, A12, A01 | 4 | 5 | Critical | 2 | 5 | High | AP Director | Mitigate | A10 exact-key across ERPs; proposal exclusions; no unattended retry | Duplicates detected; duplicate payments (target 0); FNR sample |
| R-PAY-03 | Held / disputed / E21 item paid | A12, A07, A04 | 4 | 5 | Critical | 2 | 5 | High | Payments officer | Mitigate | Deterministic exclusions; hold owner | Inclusion exceptions per run |
| R-PAY-04 | Unattended replay of a payment-adjacent job | A12, E27 handlers | 3 | 5 | High | 1 | 5 | Moderate | AI product owner + Treasury | Avoid (no auto-retry); mitigate reconcile-then-decide | Retry policy; incident Sev-1 | Retry count of payment-adjacent jobs = 0 |
| R-ID-01 | Wrong supplier paid (lookalike / factoring) | A02, A08, A12 | 3 | 5 | High | 2 | 5 | High | AP supervisor + steward | Mitigate | Recommend-only identity; assignment pack | Payee disagreements; E11 rate |
| R-ID-02 | Wrong legal entity posted | A02, A01 | 4 | 5 | Critical | 2 | 5 | High | Controller | Mitigate | Bill-to / tax-id checks; policy on re-address | E12 count and $ |
| R-ID-03 | Bank-detail change via invoice or email | A08, A10, A12 | 3 | 5 | High | 2 | 5 | High | Treasury | Mitigate; never Execute | E21 halt; dual human; out-of-band verify | Bank changes without verify artefact = 0 |
| R-ID-04 | Hallucinated PO, tax ID, or IBAN used | A01, A02 | 4 | 4 | High | 2 | 4 | Medium | AI product owner | Mitigate | Grounding; schema; no silent fill | Hallucination incidents |
| R-MATCH-01 | Overbill / exhausted PO paid as matched | A03 | 4 | 5 | Critical | 2 | 4 | Medium | Process owner | Mitigate | Certified tolerances; no model-decided match | Override $; E04/E05 rates |
| R-MATCH-02 | Auto-receipt without goods | A03, A05 | 3 | 5 | High | 1 | 5 | Moderate | Operations owner | Avoid (agent cannot GR) | Write-attempt deny | GR by agent identity = 0 |
| R-MATCH-03 | Unofficial variance list becomes policy | A03 | 4 | 4 | High | 2 | 3 | Moderate | Control owner | Avoid / retire informal list | Table certification | Informal lists found |
| R-EXC-01 | Exception closed by posting to clear ageing | A04, E26 path | 3 | 4 | Medium | 2 | 4 | Medium | AP supervisor | Mitigate | A04 cannot post; E26 escalations | Ageing reduction *with* control-breach = 0 |
| R-EXC-02 | Mis-triage delays a material dispute | A04, E25 | 3 | 3 | Medium | 2 | 3 | Moderate | AP lead | Mitigate | Taxonomy enum; recode review | Recode rate; aged disputes |
| R-APP-01 | Agent or terminated user “approves” | A07 | 3 | 5 | High | 1 | 5 | Moderate | DOA owner + process owner | Mitigate | Human-only approval; HR feed | Approval events by agent; E15 hits |
| R-APP-02 | Self-approval or engineered splits | A07, A02 | 3 | 4 | Medium | 2 | 4 | Medium | Control owner | Mitigate | Deterministic SoD; split window | Split report; self-approval count |
| R-APP-03 | Email-only approval treated as sufficient | A07 | 4 | 4 | High | 2 | 4 | Medium | Control owner | Mitigate | Policy + A16 artefact | Email-only posts above threshold |
| R-TAX-01 | Wrong tax posted or invented position | A02 | 3 | 5 | High | 2 | 4 | Medium | Tax lead | Mitigate | Matrix first; residual to Tax; no filing tools | Tax residual queue; audit exceptions |
| R-COD-01 | Systematic mis-coding (budget / management info) | A02 | 4 | 3 | Medium | 2 | 3 | Moderate | Controller | Mitigate | Locked policy for Execute; samples | Accept/edit rate; invalid CC |
| R-INT-01 | Invoice lost between channels | A01 | 3 | 3 | Medium | 2 | 3 | Moderate | AP process owner | Mitigate | Hash de-dupe; quarantine | Lost-invoice incidents |
| R-INT-02 | Statement keyed as invoice | A01, A02, A11 | 3 | 4 | Medium | 1 | 4 | Moderate | AP process owner | Mitigate | Classify before create; A11 cannot create | Payables from statements = 0 |
| R-COM-01 | Supplier message leaks pricing or goes to wrong party | A08, A09 | 3 | 4 | Medium | 2 | 3 | Moderate | AP Director | Mitigate | Templates; recipient bind; rate limits | Wrong-recipient incidents |
| R-COM-02 | Prompt injection via supplier mail or PDF | A08, A01, all | 4 | 5 | Critical | 2 | 4 | Medium | AI product owner | Mitigate | Content/instruction split; tool allow-list | Injection tool-calls |
| R-PRI-01 | Invoice data used to train a shared model or pasted to a consumer LLM | A01, all | 3 | 4 | Medium | 2 | 4 | Medium | Data owner | Mitigate / avoid consumer tools | Contract; DLP; Observe rules | Spill incidents |
| R-ACC-01 | Joiner/mover/leaver leaves a live approver or admin | A07, all | 4 | 5 | Critical | 2 | 4 | Medium | Control owner + HRIS owner | Mitigate | Same-day JML; quarterly recert | Terminated ID still entitled |
| R-ACC-02 | Over-privileged agent identity | All | 4 | 5 | Critical | 2 | 4 | Medium | AI product owner | Mitigate | Least privilege; Shadow read-only | Entitlement exceptions |
| R-CHG-01 | Model or workflow change without recertification | All | 4 | 4 | High | 2 | 4 | Medium | AI product owner | Mitigate | Pin versions; golden-set gate | Unpinned or untested releases |
| R-CHG-02 | Authority self-promotes because “accuracy looked good” | All | 4 | 5 | Critical | 2 | 5 | High | CFO + control owner | Avoid | Step 10 only; auto step-down on failed cert | Unauthorised promotions = 0 |
| R-OPS-01 | Provider or interface outage on a payment day | A12, E27 | 3 | 4 | Medium | 3 | 3 | Medium | IT ops + Treasury | Mitigate | Fallback; no skip of match/duplicate | Outage incidents; fallback drills |
| R-OPS-02 | Evidence store down, Execute continues | A16, all Execute | 3 | 4 | Medium | 1 | 4 | Moderate | Control owner | Mitigate | Halt Execute if cannot log | Unlogged execute events |
| R-OPS-03 | Alert fatigue hides a Sev-1 | A16 | 3 | 5 | High | 2 | 5 | High | Control owner | Mitigate | Severity routing | Sev-1 without same-day notify |
| R-VND-01 | Vendor cannot pin models or trains on customer data | All generative | 3 | 4 | Medium | 2 | 4 | Medium | AI product owner + legal | Avoid Execute-class if unpinned; mitigate contract | Vendor file | Unpinned Execute |
| R-VND-02 | Concentration on one model provider | All | 3 | 3 | Medium | 3 | 3 | Medium | AI product owner | Mitigate (fallback path) | BCP | Single-provider Execute without fallback |
| R-INCENT | KPIs reward speed/STP without control metrics | All | 4 | 4 | High | 2 | 4 | Medium | CFO | Mitigate | Balanced pack; no savings target on canvas | Pack review |
| R-SCOPE | Dual-ERP duplicate or entity miss because slice ignored the other system | A10, A02, A11 | 4 | 5 | Critical | 2 | 5 | High | AP Director | Mitigate | Cross-ERP keying and statements | Cross-ledger duplicates |
| R-BCP | SOP cannot run if agents are off | All | 3 | 4 | Medium | 2 | 3 | Moderate | Process owner | Mitigate | Annual exercise | Failed BCP exercise |
| R-RET | Logs or images destroyed before statutory / audit need | A16 | 2 | 4 | Medium | 1 | 4 | Moderate | Data owner + IA | Mitigate | Retention policy + store tests | Retention exceptions |
| R-FRAUD | Invoice or mandate fraud not detected | A10, A08, E21 path | 3 | 5 | High | 3 | 4 | Medium | Control owner | Mitigate controls; **do not claim detection** | E21; duplicates; identity | Control operation — not a “fraud caught” KPI as a promise |

---

## Rating notes

- Residual **High** remaining on R-PAY-02, R-PAY-03, R-ID-01/02/03, R-CHG-02, R-SCOPE, R-OPS-03 is intentional. These are not “solved by AI.” They are reduced and watched.
- R-FRAUD residual stays Medium even with controls. This toolkit does not sell fraud detection. It requires high-risk changes to be verified.
- Likelihood 1 residual still carries Impact 5 on payment-direction risks. A rare event can still be a Sev-1.

---

## Treatment backlog (standard)

| Priority | ID | Near-term work | Done looks like |
|---|---|---|---|
| P0 | R-PAY-01 | Runtime deny + allow-list test in every environment | Test evidence in the golden set |
| P0 | R-PAY-02 / R-SCOPE | Cross-ERP exact key before any payment-adjacent pilot | Key definition signed; sample of cross-ledger pairs |
| P0 | R-ID-03 | E21 procedure wired to holds | Bank disagreement cannot reach a proposal |
| P1 | R-CHG-01 / R-CHG-02 | Version pin + Step 10 paper | No unauthorised promotion in the quarter |
| P1 | R-APP-01 | HR termination feed into A10 same day | E15 test on a leaver |
| P2 | R-VND-01 | Pin or do not Execute | Written residual if vendor cannot pin |
| P2 | R-BCP | Desk-top: agents off on a payment week | SOP completed without the agent layer |

---

## Local instance header (copy)

```
Client:
Register version:          Date:
Linked control-map version:
Linked canvas versions:
Accountable executive:
Last residual review:

Changes this period:
Accepted residuals (ID, expiry, signature):
```

Review residuals quarterly and after any Sev-1/2. A risk without an owner is still the accountable executive’s.

---

## Northline (illustrative)

Fictional dual-ERP group. Illustrative residuals after a SAP-PO-only pilot — not a result.

| ID | Northline note |
|---|---|
| R-SCOPE | NetSuite not in the first slice — residual on cross-ledger duplicate stays High until A10 runs on both |
| R-MATCH-03 | Unofficial price-variance spreadsheet is a live inherent raiser until retired |
| R-APP-03 | Email approvals on NetSuite are out of slice but still an enterprise risk |
| R-PAY-01 | A12 out of scope — residual on this slice is the *mis-scope* risk (another agent growing a payment API). Tested. |

---

## Related documents

- `AGENT_CONTROL_MATRIX.md`
- `../Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`
- `../Process_Mapping/EXCEPTION_TAXONOMY.md`
- `../KPI_and_Measurement/KPI_FRAMEWORK.md`
