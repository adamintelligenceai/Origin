# Agent economics

**Product:** Evidence Room — AP Agent OS · Professional  
**Use:** See each agent as a cost object with a token, not as a savings engine.  
**Rule:** An agent that is expensive and wrong is demoted or retired, not scaled.

This file does not estimate fraud losses avoided, compliance value, or ROI.

---

## 1. Cost token (every work object)

The Orchestrator field `cost token` is an estimate, good enough to compare agents, not good enough to book.

| Component | What to capture | Cadence |
|---|---|---|
| Model / IDR | Vendor usage or a unit estimate | Weekly |
| Human minutes | Accept/edit/reject + chase using the draft | Sample, then extrapolate |
| Tool licence | Allocated share of I11 | Monthly |
| Failure minutes | Rework when the recommendation was wrong | Weekly |

`Token ≈ model unit + (human minutes × hourly) + allocated licence + failure minutes × hourly`

Store the token on the object. Roll up by agent and by thousand invoices.

---

## 2. What “good economics” looks like

| Signal | Reading |
|---|---|
| Token falling while reject rate stable | Possible efficiency — still not a saving until Finance validates |
| Token falling because rejects were trained away | Possible capture of a bad habit — investigate |
| Token rising with coverage | Expected in L0 (you added recording). Do not panic. |
| Token high, disagreement high | Demote or retire |
| Token low, silent scope | Control incident, not a win |

---

## 3. Per-agent economic notes

| Agent | Usually cheap when | Usually expensive when | Never “monetise” as |
|---|---|---|---|
| 01 Intake | Structured XML/EDI | Dirty PDF, paper | “OCR ROI” |
| 02 Validation | Stable checklist | Tax-position guesses (should not be doing these) | “Compliance value” |
| 03 Matching | Narrow class, good GR | Force-match culture | “Touchless saving” |
| 04 Triage | Closed codes | EX-OTH pile | Headcount cut |
| 05 GR | Receivers respond | Dummy-GR culture (refuse it) | Warehouse FTE takeout |
| 07 Approval | DOA clean | Approver tourism | Cycle-time guarantee |
| 08 Supplier | Fact drafts | Drafts that concede terms (language incident) | Supplier goodwill $ |
| 10 Dup/Anom | Register + outcomes | Alerts with no owner | Fraud-loss avoided |
| 12 Proposal | Annotations on real holds | Any path toward release | Discount capture by bot |
| 16 Orchestrator | Sheet or ticket is enough | Building a platform to justify the licence | “Control plane ROI” |

Agents 06, 09, 11, 13, 14, 15: treat as diagnostic/periodic. Their value is visibility and proposals. Do not assign them a payback.

---

## 4. Decision rule

At each recertification:

1. Is the charter still true?
2. Is the token visible?
3. Is disagreement within the gate?
4. Is language clean?
5. Is the owner in post?

If 2 is “no,” you may not argue economics. If 3 or 4 fail, economics are irrelevant — demote.

If 1–5 pass and the token is high, you may **narrow** the object class. You may not raise autonomy to “spread the cost.”

---

## 5. Portfolio view

Report monthly:

- Cost per thousand invoices (layer)
- Token by agent (share of layer)
- Objects handled (activity — context only)
- Correct-proposal rate where gold labels exist
- Open STOP incidents

Do not rank agents by “estimated $ saved.”

---

## 6. Northline illustration (fictional)

Wave 1 layer cost $40k tools + small model + sampled minutes. Intake and Matching dominate tokens. Agent 10 is cheap in model units and expensive in Controls time — that is acceptable; Controls time is the point. Agent 12 is not opened in Wave 1, so it has no token. None of these sentences is a benchmark.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Agent economics |
| Related | Orchestrator spec; KPI framework; business-case model |
| Status | Edition 1.0.0 |
