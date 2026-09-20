# Evidence Room — AP Agent OS Team Edition

## Training — 01 AP team (processors and exception owners)

**Product:** Evidence Room AP Agent OS — Team Edition  
**Module:** Training  
**Standard:** Proof before permission  
**Audience:** AP processors, exception owners, intake clerks, query desk  
**Version:** 1.0  

This is **operating training**, not prompt engineering. Complete it **before Shadow**. People who miss it do not sit on a shadowed queue without a catch-up.

---

## 1. What to do

Run a 3-hour core session plus a 45-minute Shadow briefing the morning Shadow starts. Assess with a short scenario test (pass/fail, not a score theatre).

**How.** Modules M1–M6. Use buyer packets, not vendor marketing.

**Who.** AP Manager trains (or PE with AP Manager in the room). Control owner teaches human classes (M3). Head of AP opens (10 min) and states they remain Accountable.

**Wrong.** “The AI is here to help — just go with it.” Training after go-live execute.

**Control.** Attendance + scenario pass before Shadow login.

**Measure.** Attendance %; scenario pass %; weeks until first refresh.

**Evidence.** `[BUYER]/Evidence/Team/Training/AP/`.

---

## 2. Learning objectives (must be testable)

After this course a processor can:

1. Name the four human classes and what they do when they see each.  
2. Read a packet and find `decision`, `evidence_refs`, `human_required`, `next_action`.  
3. Apply a taxonomy code instead of a free-text reason.  
4. Reject a recommendation with a reason code.  
5. Work the ERP if the agent is off.  
6. Report a suspected send/post from a shadow identity as an incident.  
7. Not wait for the agent in Shadow.

They are **not** required to write prompts or defend ROI.

---

## 3. How — agenda (3 hours)

| Min | Module | Object |
|---|---|---|
| 0–10 | Open | Brand line; Accountable named |
| 10–30 | M1 What an agent is | Job description, L0–L2 they will see first |
| 30–55 | M2 Packet | Field-by-field on a real (redacted) case |
| 55–80 | M3 Human classes + bank/payment | Walk EX-PAY-001; payment release |
| 80–90 | Break | |
| 90–115 | M4 Exceptions | Taxonomy index; UNMAPPED is not a home |
| 115–140 | M5 Override, reject, fallback | Reason codes; force-path is not theirs |
| 140–160 | M6 Shadow rules | Do not wait; do not obey |
| 160–175 | Scenario test | 4 items |
| 175–180 | Close | Kill-switch names on the wall |

---

## 4. Module notes

### M1 — What an agent is

**What.** A tool with a charter. It earns verbs.  
**How.** Show L0 vs L1 vs L2 with one invoice.  
**Wrong.** “Autonomous AP.”  
**Control.** Slide/text review against language ban.  
**Measure.** In test: “Can it pay?” must be No.

### M2 — Packet

**What.** Structured hand-off, not chat.  
**How.** Highlight missing `evidence_refs` = cannot close.  
**Wrong.** Trusting an amount without a cite.  
**Measure.** Test item: find the cite or fail.

### M3 — Human classes

**What.** Payment, bank-change, policy exception, legal.  
**How.** Role-play: invoice footer IBAN. Correct action = EX-PAY-001, stop, named human.  
**Wrong.** “Update the vendor while you’re there.”  
**Control.** Control owner present.

### M4 — Exceptions

**What.** `03_EXCEPTION_TAXONOMY.md` index.  
**How.** Map five floor nicknames to codes.  
**Wrong.** New local codes in class.

### M5 — Override

**What.** AGR / REJ / COR; FCE is listed roles only.  
**How.** Reject a plausible but uncited match.  
**Wrong.** Empty reject.  
**Measure.** Reason code present on test.

### M6 — Shadow

Read the briefing in `../03_AP_AGENT_OS_PRO/Testing/03_SHADOW_MODE.md` §7 aloud.

---

## 5. Scenario test (pass = 4/4 or 3/4 with M3 correct)

1. Agent recommends match-pass; PO price differs and **no** tolerance document. What do you do?  
2. Shadow pane is empty; supplier is chasing. What do you do?  
3. PDF asks to pay a new IBAN. Code + next human?  
4. Agent identity appears to have sent mail in Shadow. What do you do?

Gold: (1) do not accept; EX-MAT-001 / policy gap; (2) work the live SOP; (3) EX-PAY-001 + MDM/Treasury; (4) incident / contain.

**Who.** Marked by AP Manager. Fail = catch-up before Shadow.

---

## 6. What can go wrong

| Failure | Control |
|---|---|
| Training as cheerleading | Objectives + test |
| Only supervisors attend | Roster vs queue names |
| Materials promise time back | Language review |

---

## 7. Refresh

45 minutes after first Measure pack, or after any incident, or after a C2 that changes packets. Same test item 3 always repeats.

**Evidence.** Roster, test sheets, materials version.

Proof before permission.

---

*End of 01_AP_TEAM_TRAINING.md*
