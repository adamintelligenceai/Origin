# Enterprise Governance Pack — AP Agent OS Team

**Evidence Room** · Team · Implementation / Governance  
**Audience:** Controller, Internal Audit, IT Risk, Shared Services leadership

## 1. Governance purpose

Ensure every production AP agent has a **charter**, **human owner**, **stage ceiling**, **evidence standard**, and **revocation path**.

## 2. Evidence Room folder structure (recommended)

```
/Evidence_Room_AP_Agent_OS/
  /00_Mandate_and_Licence/
  /01_Charters/
  /02_RACI_and_SoD/
  /03_Risk_and_Controls/
  /04_Evidence_Packs/
      /YYYY/
          /WW_or_MM/
  /05_KPI_and_Reports/
  /06_Testing_UAT_Shadow/
  /07_Steering_Minutes/
  /08_Incidents_and_Demotions/
  /09_Training_and_Change/
  /10_Claims_and_Disclaimers/
```

**Rule:** No production agent without a file in `/01_Charters/`.

## 3. Seat roster (Team licence)

| Seat # | Name | Email | Role | Entity | Date added | Date removed |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| … | | | | | | |

Keep roster with licence terms acknowledgment.

## 4. Policy stubs (adapt with counsel)

### 4.1 Agent production policy (stub)

- Only chartered agents may process live invoices.  
- Stage ceiling enforced technically where possible; procedurally otherwise.  
- Payment release and vendor bank change remain human dual-control.  
- Kill-switch must be testable.  

### 4.2 Evidence retention (stub)

- Retain agent inputs/outputs/decisions per company retention schedule (AP/audit).  
- Redact personal data in shared training examples.  

### 4.3 Claims policy (stub)

- External and board materials follow Evidence Room claims discipline.  
- Ardent figures only as labeled third-party context.  

*FLAG FOR LAWYER REVIEW — stubs are not legal advice.*

## 5. Control objectives (mapped)

| Objective | Control activity | Evidence |
|---|---|---|
| Authorised agent use only | Charter board approval | Charter + minutes |
| SoD preserved | RACI + system access review | Access cert |
| Traceability | Evidence packs | Sample tests |
| Change control | Version pin on instructions | Change log |
| Incident response | Severity model + demotion | Incident records |
| Human accountability | Named owners | Roster |

## 6. Severity model

| Sev | Example | Immediate action |
|---|---|---|
| S1 | Agent path used to change bank details | Kill-switch; investigate |
| S2 | Systematic wrong match recommendations accepted | Demote stage; expand sample |
| S3 | Evidence fields incomplete | Remediate; coaching |
| S4 | UX friction / minor misroutes | Backlog |

## 7. Audit request response kit

When Audit asks “show me how AI is controlled in AP,” provide:

1. Mandate + claims note  
2. Charters for live agents  
3. Stage promotion history  
4. Sample evidence packs  
5. Kill-switch drill record  
6. Training roster  
7. Incident/demotion log  

## 8. Multi-entity governance

| Topic | Central | Local |
|---|---|---|
| Method & stages | Own | Adopt |
| Tax/statutory fields | Standardise where possible | Validate |
| Hard gates | Minimum bar | May tighten |
| Seat licence | Track | Nominate users |
| Language of supplier drafts | Templates | Localize |

## 9. Recertification calendar

| Item | Cadence |
|---|---|
| Access rights for agent tools | Quarterly |
| Charter still valid | Quarterly |
| Owner succession | Semiannual |
| Claims / disclaimer text | Quarterly |
| Maturity reassessment | Annual |

## 10. Integration with Pro artefacts

| Need | Pro path |
|---|---|
| Charter template | `03_AP_AGENT_OS_PRO/Templates/02_AGENT_CHARTER.md` |
| RACI | `Templates/04_RACI.md` |
| Risk | `Templates/06_RISK_ASSESSMENT.md` |
| Governance standard | `Templates/05_GOVERNANCE_STANDARD.md` |
| KPI reporting | `KPI_Measurement/` |

## 11. Board-level one-liner

> We run AP agents only inside charters with earn-up stages, human owners, evidence packs, and kill-switches — complementary to our AP/ERP stack, without guaranteed savings claims.

---

*Evidence Room — Agents that earn responsibility.*  
*Not legal, audit, or SOX certification.*
