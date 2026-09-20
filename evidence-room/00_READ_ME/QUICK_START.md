# Quick Start — START HERE 01–12

**Evidence Room · AP Agent OS**  
**Version:** 1.0 · September 2026  
**Audience:** The person who will be blamed if the pilot is vague.  
**Time:** Twelve working sessions, not twelve minutes. You may pause.  
**Companion:** `06_SALES_AND_MARKETING/CUSTOMER_ONBOARDING.md` (the zip-facing twin)

Custom Blueprint customers receive a separate kickoff, not this list.

---

## How to use this list

Do the steps in order. Do not skip to “pick an agent” because a vendor is on site.

If a step tells you to **stop**, stop. The operating system is allowed to recommend waiting.

Keep **Northline Industrial Group** out of your files. It is a fictional illustration in these materials, not your template company.

We do not promise savings, fraud detection, compliance, accounting accuracy, autonomous payments, or ROI.

---

## START HERE 01 — Open the room

**Outcome:** You know what you bought and what you refused.

Read the licence and the disclaimer that shipped with your files. Read the non-promise list aloud.

Write one sentence:

> I am using AP Agent OS to ________, for invoice class ________, in system ________.

If you cannot name the class and the system, you are not starting an agent. You are starting a map.

**Diagnostic:** complete `01_FREE_AP_AI_READINESS/DIAGNOSTIC.md` before 02.  
**Starter:** you will take one agent through 01–08, with a light 09.  
**Professional:** the same path, with the full packs.  
**Team:** run 01–03 in a room together.

**Northline (illustrative, fictional).** Priya Menon, AP Manager, writes: “I am using AP Agent OS to fence a match-and-flag agent for PO invoices, in SAP company code NL10.” She does not write “transform AP with AI.”

---

## START HERE 02 — Take a level (0–4)

**Outcome:** A number you can defend.

Complete the Diagnostic even if you bought a paid tier first.

Record:

- Readiness level (0 Unscoped / 1 Tool-led / 2 Designed / 3 Governed / 4 Operating)
- The two weakest gaps (process, data, controls, people, systems, economics)
- Whether the Diagnostic told you to wait

If it told you to wait, your next work is a live-process map only. Do not open the agent library yet.

Most teams that “have AI in AP” are at 0 or 1. That is a starting coordinate, not an insult.

---

## START HERE 03 — Draw the live path

**Outcome:** A map the people who work exceptions recognise.

Sit with someone who touches invoices, not only someone who owns the policy.

Draw: receipt → capture → code → match → exception → approve → schedule → pay → archive.

Mark: systems, queues, handoffs, where work waits.

Ask them to strike anything that is “supposed to happen” and does not.

**Exit:** they say “that is what Tuesday looks like.”  
If they say “that is what the SOP says,” you are not done.

Professional / Team: use `03_AP_AGENT_OS_PRO/Process_Mapping/ER_METHODOLOGY.md` and `TEMPLATES.md`.  
Starter: use the process-mapping sheet in `02_AP_AGENT_STARTER/STARTER_GUIDE.md`.

---

## START HERE 04 — Choose one invoice class

**Outcome:** A fence starting-point.

Pick one class. Example pattern, not a rule: PO-backed, one entity, one currency, amount under a threshold a controller will sign.

Write what is **out**: new vendors, non-PO, after-the-fact POs, employee expenses, intercompany if that is a different war.

Do not pick “all AP” because a slide said transformation.

**Northline (illustrative).** In: SAP NL10, domestic PO invoices, existing vendors, ≤ $25,000, USD/CAD. Out: NetSuite Pacific, non-PO, one-time vendors, employee expenses, anything A10 flags `DUP-SUS`.

---

## START HERE 05 — Write the purpose sentence

**Outcome:** One sentence a controller will read aloud.

Pattern:

> Flag [condition] on [class] for human release. Do not [payment / override / new vendor / close].

If the sentence contains “autonomously pay”, tear it up.

Team: the executive reader must accept this sentence before 06.

**Northline (illustrative).** “Flag PO invoice mismatches under $25,000 on NL10 for human release. Do not post, do not pay, do not create vendors.”

---

## START HERE 06 — Write the fence and the escalation list

**Outcome:** The agent has a box and a list of states it must not resolve.

**Fence:** entity, system, class, amount, vendor set, document types, language.

**Escalation:** missing PO, amount breach, vendor master change, duplicate suspicion you are not equipped to adjudicate, payment instruction, control override, anything outside the fence.

Name the human who receives escalations. If that name is “the team”, you do not have a name.

Starter and Professional: copy the fence block from the Responsibility Model. Team: write it on the wall in the workshop, then type it.

---

## START HERE 07 — Attach controls and evidence

**Outcome:** Each control has an owner and an artefact.

Minimum three:

1. **Fence integrity** — how you know the agent stayed inside.
2. **Human release** — how a person records they released or refused.
3. **Evidence completeness** — inputs, outputs, timestamp, brief version.

Professional / Team: use `03_AP_AGENT_OS_PRO/Controls/AGENT_CONTROL_MATRIX.md`.  
Starter: use the minimum control sheet in the Starter Guide.

Do not paste your vendor’s SOC report and call it an AP control.

---

## START HERE 08 — Choose three operating measures

**Outcome:** A 30-day reading list.

Pick three from: cycle time by class, exception age, human review rate, evidence completeness, fence-breach count, pause events.

Write where each number will come from (which system, which extract). If you cannot name the source, pick a different measure.

Do **not** add a savings line “to make it interesting”.

Professional: map picks to the KPI framework families (A / O / F / R). A pack that contains only activity is incomplete. Pilot close requires operational + risk-control.

---

## START HERE 09 — Historical-sample test

**Outcome:** You know what fails before production.

Take a past sample of the fenced class. Run the agent design as a desk exercise or in a non-production tool. Record misses, false flags, and fence confusion.

Write: “We would have been wrong about X. We will change Y or we will not go live.”

If you cannot get a sample, you are not ready for 10.

Professional / Team: use `03_AP_AGENT_OS_PRO/Testing/TESTING_UAT_SHADOW.md`.  
Starter: a light sample of 25 documents is enough to learn; it is not enough to promote.

---

## START HERE 10 — Limited production fence

**Outcome:** A small live box with a rehearsed pause.

Turn the agent on only inside the fence. Rehearse the pause (who, how, in one sentence). Read measures on a named cadence (twice a week is enough).

If the pause requires a steering committee, redesign the pause.

Default start is Level 0 (Observe) or Level 1 (Recommend). Full autonomy is never the default. Payment authorisation stays human.

---

## START HERE 11 — Brief the executive reader

**Outcome:** Twelve minutes, no theatre.

Use the Team executive pack if you have it (`04_AP_AGENT_OS_TEAM/Executive/CFO_BRIEF.md`); otherwise a one-pager:

- Purpose sentence
- Fence
- Measures
- What we will not claim
- What would turn it off
- Ask (hold / limited continue / stop)

Do not show a vendor demo in this meeting unless the executive asks. Show the brief.

---

## START HERE 12 — Expand responsibility — or do not

**Outcome:** A written decision.

**Scale** a second class only if 10–11 are boringly stable.  
**Hold** if the first fence still teaches you.  
**Stop** if ownership, evidence, or pause is fictional.

File the decision in the change log. Version the brief.

Then — and only then — open the library to consider a second agent job (classify, chase evidence, pack a review). Still never: pay, override, “detect all fraud”, close the books.

Responsibility is earned. Promotion uses the pack in `03_AP_AGENT_OS_PRO/Agent_Library/RESPONSIBILITY_MODEL.md`. A vendor slide is not a pack.

---

## Tier trim

| Step | Diagnostic | Starter | Professional | Team |
|---|---|---|---|---|
| 01–02 | Yes | Yes | Yes | Together |
| 03–08 | Optional notes | Yes | Yes | Workshop |
| 09–12 | No | Light 09 | Yes | Yes + exec pack |

---

## If you get stuck

| Symptom | Do this |
|---|---|
| Cannot name a class | Stay on 03–04. Do not open A01–A16. |
| Vendor is already in a trial | Fence *that* trial. Starter exists for this. |
| Two people disagree on the live path | That disagreement is the finding. Map both. Do not average them. |
| Someone wants a savings number | Point at the Diagnostic business-case starter and the KPI framework. Customer baseline only. |
| Someone wants the agent to pay | Stop. A12 may challenge a proposal. A human releases cash. |

Support: hello@evidenceroom.ai — product questions, not “please design our agent on this call”. That call is a Custom Blueprint, and only after an application.
