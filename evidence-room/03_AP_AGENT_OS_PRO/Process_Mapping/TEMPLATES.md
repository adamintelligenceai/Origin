# Process Mapping — Working Templates

Copy into your workspace. Keep one living workbook per programme.

---

## T1 — Volume & mix snapshot

| Period | Total invoices | PO % | Non-PO % | Credits % | Avg $ | P95 $ | Touch rate % |
|--------|----------------|------|----------|-----------|-------|-------|--------------|
| Prior month | | | | | | | |
| Prior quarter avg | | | | | | | |

**Touch rate** = invoices with ≥2 human touches after initial capture ÷ total invoices.

---

## T2 — Stage timing (sample of N=__)

| Stage | Median hours | P90 hours | Owner lane |
|-------|--------------|-----------|------------|
| Receipt → captured | | | |
| Captured → coded | | | |
| Coded → matched | | | |
| Matched → approved | | | |
| Approved → payment proposal | | | |
| Exception open → resolved | | | |

---

## T3 — Handoff matrix

| From | To | Trigger | Artifact | Failure mode |
|------|----|---------|----------|--------------|
| Mailbox | Capture | New email | PDF/email | Lost in spam / wrong inbox |
| Capture | AP | OCR complete | Invoice header | Bad vendor match |
| AP | Buyer | Missing GR / coding | Exception ticket | Silent email |
| AP | Supplier | Price/qty dispute | Query email | No template / no SLA |

---

## T4 — Policy rules inventory

| Rule ID | Description | System enforced? | Shadow spreadsheet? | Candidate for agent |
|---------|-------------|------------------|---------------------|---------------------|
| POL-01 | 2-way vs 3-way by category | | | Matching Agent |
| POL-02 | Tolerance % / $ | | | Matching Agent |
| POL-03 | Approval matrix | | | Approval Agent |
| POL-04 | Duplicate windows | | | Duplicate/Anomaly |

---

## T5 — Agent insertion canvas

```
Process stage: ________________
Friction ID: __________________
Agent: ________________________
Start level (0/1): ____________
Inputs: _______________________
Outputs: ______________________
Human must still: _____________
Evidence stored: ______________
Promotion metric: _____________
Rollback trigger: _____________
```

---

## T6 — RACI mini (process design)

| Activity | AP Mgr | Controller | IT/ERP | Processors | Audit |
|----------|--------|------------|--------|------------|-------|
| Approve scope | A | C | C | C | I |
| Sign agent charter | A | A | C | I | I |
| Promote level | C | A | C | I | I |
| Own weekly scorecard | A | C | I | R | I |

R=Responsible A=Accountable C=Consulted I=Informed

Full template: `../Templates/RACI.md`

---

## T7 — Workshop agenda (half-day)

| Time | Segment |
|------|---------|
| 0:00 | Outcomes & non-goals |
| 0:15 | Observe findings |
| 0:45 | Swimlane critique |
| 1:15 | Friction ranking |
| 1:45 | Agent fit (Level 0–1) |
| 2:15 | Human gates & controls |
| 2:45 | Next 30-day plan |

Team facilitation script: `../../04_AP_AGENT_OS_TEAM/Workshop/WORKSHOP_FACILITATION.md`
