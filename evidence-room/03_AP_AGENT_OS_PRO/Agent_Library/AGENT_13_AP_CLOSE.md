# AGENT 13 — AP Close

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_13`  
**Domain:** Period-end close support  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

AP Close Agent runs the AP period-end checklist: open exception aging, GRIR/suspense health, accrual candidates, cut-off tests, statement recon status, and evidence pack assembly for Controller sign-off. It prepares close — it does not unilaterally close the books.

---

## 2. Inputs

| Input | Source |
|---|---|
| Close calendar & checklist | Finance close plan |
| Open invoices / exceptions | ERP + Agents 04–11 |
| GRIR / clearing balances | ERP |
| Accrual policy | Controllership |
| Prior period packs | Archive |

---

## 3. Tools / data required

- Checklist engine
- Accrual candidate analytics
- Report extractors
- Evidence binder generator
- Sign-off workflow

---

## 4. Responsibilities

1. Track checklist completion status.
2. Identify accrual candidates (received not invoiced / invoiced not approved).
3. Highlight cut-off risks near period end.
4. Assemble evidence binder for AP Manager / Controller.
5. Record sign-offs and residual risks.

---

## 5. Explicit exclusions

- Does **not** post accruals without human approval.
- Does **not** lock periods in the ERP alone.
- Does **not** override Controller materiality judgments.
- Does **not** clear GRIR differences without DOA.

---

## 6. Human owner

**AP Manager** with **Controller** as close owner. Backup: Assistant Controller.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Post accruals | Controller / DOA |
| Accept residual exceptions into next period | AP Manager + Controller |
| Close checklist attestation | AP Manager |

---

## 8. Escalation criteria

- Material unreconciled GRIR
- Critical exceptions unresolved at hard close
- Cut-off breach indicators
- Missing statement recons for top vendors

---

## 9. Output standard

Close pack: checklist status, KPIs, accrual schedule draft, residual risk log, sign-off page, agent version.

---

## 10. Control requirements

- Checklist version control
- Evidence retention tied to close archive
- Accrual posting SOD

---

## 11. Audit evidence

Binder, approvals, journal IDs, residual risk acceptances.

---

## 12. KPIs

1. **Checklist on-time completion %**  
2. **Close pack readiness lead time**  
3. **Accrual accuracy (post-close true-up)**  
4. **Material residuals count/$**  
5. **GRIR aging improvement**  
6. **Cost per close cycle**  

---

## 13. Performance history fields

`checklist_ontime_rate`, `pack_ready_hours_before_close`, `accrual_trueup_rate`, `material_residual_dollars`, `cost_per_close`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1** recommendations and **L2** draft binders/accrual schedules. Posting and period lock remain human.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Data extract failure | Delay checklist item; alert; no partial silent attestation |
| Late high-value invoice | Escalate cut-off decision to Controller |

---

## 16. Cost monitoring

Measure overtime hours avoided vs. binder automation cost each close.

---

## 17. Example worked scenario (fictional — ACME Corp)

For September close, Agent 13 flags $420k RNI accrual candidates at Plant 1200, lists 7 material exceptions still open, and drafts the AP close binder. AP Manager reviews; Controller approves accrual journal `JE-ACME-0930-17`. Agent 13 records sign-off. It does not post the JE itself.
