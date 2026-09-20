# Agent Charter — AP Agent OS Pro

**Evidence Room** · Pro · Templates  
**Rule:** No production use without a completed charter and named human owner.

## Charter form

| Field | Entry |
|---|---|
| Charter ID | CHAR-A__-___ |
| Agent canonical name | e.g., A04 Exception Triage Agent |
| Version | |
| Status | Draft / Active / Suspended / Retired |
| Human owner (name + role) | |
| Deputy owner | |
| Sponsor | |
| Effective date | |
| Next review date | |

### 1. Purpose (one sentence)

### 2. Scope

| In scope | Out of scope |
|---|---|
| Invoice classes: | |
| Entities / company codes: | |
| Channels: | |

### 3. Stage ceiling

| Current stage | Observe / Recommend / Draft / Execute (narrow) / Expand |
|---|---|
| Approved by | |
| Approval date | |
| Earliest reconsideration date | |

### 4. Inputs

| System | Fields / objects read | Notes |
|---|---|---|

### 5. Outputs

| Artefact | Destination | Human gate? |
|---|---|---|

### 6. Forbidden actions (minimum set — extend)

- [ ] Payment release / payment file approval  
- [ ] Vendor bank detail create/change  
- [ ] Unrestricted master-data delete  
- [ ] Force-match override without human  
- [ ] Sending external supplier email without human send authority at stage  
- [ ] Other: ________  

### 7. Tools & models

| Tool / model | Purpose | Data handling notes |
|---|---|---|

### 8. Evidence standard

Minimum fields retained per run:

| Field | Required |
|---|---|
| Case / invoice ID | Y |
| Agent ID + instruction version | Y |
| Stage | Y |
| Inputs referenced | Y |
| Output summary | Y |
| Exception codes | If any |
| Human decision | If gated |
| Timestamp (UTC) | Y |

Retention location: `/Evidence_Room/...`

### 9. KPIs for earn-up

| KPI | Definition | Gate threshold (pilot) |
|---|---|---|

### 10. Promotion gates

| From → To | Evidence required | Approver |
|---|---|---|

### 11. Demotion / kill triggers

| Trigger | Action | Authority |
|---|---|---|
| Sample fail below threshold | Demote one stage | AP owner |
| S1 incident | Kill-switch | Kill-switch owner |
| Owner vacancy | Suspend | Sponsor |

Kill-switch owner: ________ · Method: ________

### 12. Sampling

| Stage | Sample rate | Reviewer |
|---|---|---|

### 13. Related documents

SOP · RACI · Risk assessment · Test results · Steering minutes

### 14. Sign-off

| Role | Name | Signature / date |
|---|---|---|
| Human owner | | |
| Controls | | |
| IT (if write path) | | |
| Sponsor (Execute+) | | |

---

## Example snippet (A04)

| Field | Example |
|---|---|
| Purpose | Classify and route AP exceptions with taxonomy codes for human action |
| Stage ceiling | Recommend |
| Forbidden | Payment release; bank change; auto-close without human |
| KPI | Code accuracy vs lead sample; time-to-route |

---

*Evidence Room — Agents that earn responsibility.*  
*Charters do not certify safety. Humans remain accountable.*
