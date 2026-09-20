# Evidence Room — AP Agent OS Professional

## Process Mapping — 02 Transcript to Workflow

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Process Mapping  
**Standard:** Proof before permission  
**Audience:** Analyst, AP process owner, Control owner, Privacy owner  
**ERP stance:** Agnostic. System names are quoted as spoken, then mapped to the buyer’s system register.  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Working instrument for Steps 2–3 (Transcribe, Extract) and the hand-off to Structure.

---

### Purpose

Turn spoken AP work into objects that can be structured, agentised and tested. The transcript is evidence. The workflow is a derived artefact. Do not overwrite the transcript to make the workflow look tidy.

### How to use

1. Capture or write the transcript with the header below.  
2. Redact before the file leaves the session-owner’s control.  
3. Tag Extract objects with source quotes.  
4. Hand the object register to `03_SOP_GENERATOR_FRAMEWORK.md`.

---

## 1. What to do

Produce three artefacts, in order:

1. **Transcript** — what was said, who said it, when.  
2. **Redaction log** — what was removed and why.  
3. **Object register** — steps, systems, decisions, rules, inputs, outputs, exceptions, controls, dependencies — each with a quote.

A workflow diagram that cannot be traced to a quote is out of scope for this file. That diagram is created in Structure, from the register.

---

## 2. How

### 2.1 Consent and recording

| Condition | Action |
|---|---|
| Recording permitted by policy and all attendees | Record; state start/stop on the record |
| Recording refused | Structured contemporaneous notes using the same headings; mark `SOURCE = NOTES` |
| Mixed (some refuse) | Do not record. Notes only. |
| External supplier on the call | Default to notes; Legal reviews if a recording is still required |

Store consent with the transcript. No consent, no file.

### 2.2 Transcript header (mandatory)

```
Transcript ID:     TR-[YYYYMMDD]-[##]
Session type:      walkthrough / exception huddle / payment prep / interview
Date / time:       [ ]
Legal entity:      [ ]
Channel / queue:   [ ]
Location:          [ ]
Recording:         yes / notes only
Consent file:      [pointer]
Attendees:         role — name or staff ID
Scribe:            [ ]
Privacy reviewer:  [ ]
Redaction status:  raw / redacted / released
Related observation sheets: [IDs]
```

### 2.3 Speaker map

| Code | Role | Named person (or “role only”) | Can bind a rule? |
|---|---|---|---|
| S1 | AP clerk | | Operational practice |
| S2 | AP Manager | | Queue policy (still needs written confirmation) |
| S3 | Buyer | | PO practice (Procurement must confirm) |

A rule spoken by a clerk is a **practice candidate**. A rule spoken by the policy owner is a **policy candidate**. They are not the same. Extract both. Do not promote a practice to policy in this step.

### 2.4 Transcript body rules

- Timestamp at least every 60 seconds or at each speaker change, whichever is finer.  
- Do not correct grammar if it changes meaning.  
- Mark inaudible as `[inaudible]`, not a guess.  
- Mark observer prompts as `OBS:`.  
- Preserve uncertainty language: *usually, sometimes, depends, Jane knows, we just pay it*.  
- Do not insert taxonomy codes into the transcript. Coding happens in Extract.

### 2.5 Redaction

Redact before sharing outside the discovery team.

| Class | Action | Example |
|---|---|---|
| Bank account / IBAN / sort code | Replace with `[BANK]` | |
| Personal addresses, national IDs | `[PII]` | |
| Individual employee performance comments | `[HR]` | |
| Pricing under NDA if Legal requires | `[COMMERCIAL]` | |
| Invoice images in the appendix | Mask supplier bank and personal data | |

Keep a redaction log: location, class, reviewer. The raw file stays in a restricted store.

### 2.6 Extract tagging

Work through the redacted transcript. Create one register row per object. Quote is mandatory.

| Object type | Code | What to capture |
|---|---|---|
| Step | ST | Verb + object + system |
| System | SY | Spoken name → register name |
| Decision | DEC | If / then / else as spoken |
| Business rule | BR | Threshold, tolerance, calendar, policy cite, or habit |
| Input | IN | Document or field the step needs |
| Output | OUT | Artefact produced |
| Exception | EX | Stop-the-line condition; map to taxonomy **after** quoting |
| Control | CTL | Preventive or detective check actually performed |
| Dependency | DEP | Person, team, file, or job the step waits on |
| Open question | Q | Cannot be resolved from this transcript |

**Exception mapping rule.** First write the exception as spoken (“no GR against the PO”). Then assign `EX-GR-001`. If two codes could apply, assign the primary (what stops posting) and note the secondary. Do not invent a new code.

**Deterministic vs judgement flag.** On every BR and DEC row, mark `exact-compare / threshold / judgement / unknown`. This feeds Agentise. Exact-compare should not be sent to a language model later.

### 2.7 Object register schema

| Column | Required | Notes |
|---|---|---|
| Object ID | Yes | `ST-014` |
| Type | Yes | ST/SY/DEC/BR/IN/OUT/EX/CTL/DEP/Q |
| Statement | Yes | Analyst’s normalised wording |
| Source quote | Yes | Verbatim |
| Transcript ID + timestamp | Yes | |
| Speaker | Yes | Speaker code |
| Practice vs policy | Yes | |
| System register name | If SY or ST | |
| Taxonomy code | If EX | From `../Controls/03_EXCEPTION_TAXONOMY.md` |
| Deterministic flag | If BR or DEC | |
| Confidence | Yes | High = repeated and demonstrated; Med = spoken once; Low = inferred — **Low rows cannot be used as SOP rules** |
| Reviewer | Yes | Process owner or control owner |

### 2.8 Conflict handling

When two speakers disagree:

1. Create two objects, not one blended rule.  
2. Tag both with `CONFLICT-[n]`.  
3. Route to the policy owner in Structure.  
4. Until resolved, the SOP draft shows **Unresolved conflict** — it does not pick a winner.

**ACME — ILLUSTRATIVE.** Clerk: “We park anything over 5% price variance.” Manager: “Policy is 2% unless the buyer emails.” Two BR rows, one CONFLICT. Structure will not write “2–5%” as a rule.

### 2.9 From register to workflow (hand-off, not this file’s design)

The analyst may produce a **traceability sketch** (boxes linked to ST-IDs) to help Structure. The official process map is issued only after Structure sign-off. Sketches are labelled `WORKING — NOT CURRENT-STATE APPROVED`.

---

## 3. Who

| Role | Duty |
|---|---|
| Scribe / analyst | Transcript, redaction draft, object register |
| Session owner (usually AP Manager) | Attendee list, consent, speaker map initials |
| Privacy owner | Redaction acceptance, storage location |
| AP process owner | Reviews ST, BR, EX, DEP rows |
| Control owner | Reviews CTL rows and money-adjacent DEC/BR |
| Policy owners (Procurement, Tax, Treasury) | Resolve CONFLICT rows that sit in their policy |

Agents do not extract. A model may **propose** tags; a named human accepts each row. Proposed-but-unaccepted rows are not inputs to Structure.

---

## 4. What can go wrong

| Failure | Effect | Prevention |
|---|---|---|
| Cleaned transcript | Variation and uncertainty disappear | Ban “polish” before Extract |
| Missing timestamps | Objects cannot be audited | Header rejected without timestamps |
| Speaker merge | Practice treated as policy | Speaker map mandatory |
| Inference rows marked High | Fiction enters the SOP | Low-confidence blocked from SOP |
| Taxonomy applied in the transcript | Evidence is overwritten | Codes only on EX register rows |
| Unredacted bank data in Slack | Incident | Redaction gate before any share |
| Model auto-extract accepted in bulk | Quiet hallucination | Row-level human accept |
| Only happy-path session transcribed | Exception objects missing | Coverage statement from discovery |

---

## 5. Control

Release gate to Structure:

- [ ] Header complete; consent pointer present  
- [ ] Speaker map initialled  
- [ ] Redaction status = redacted or notes-only with privacy review  
- [ ] Every register row has a quote, timestamp, speaker, confidence  
- [ ] No Low-confidence row marked “use in SOP”  
- [ ] Every EX row has a taxonomy code or `UNMAPPED` with a Q row  
- [ ] CONFLICT rows listed, not merged  
- [ ] Process owner and control owner have signed the register  

If a model assisted tagging, record model name, prompt hash, and that output was advisory.

---

## 6. Measure

| Metric | Definition |
|---|---|
| Transcript completeness | Recorded minutes vs transcribed minutes (or “notes only”) |
| Objects extracted | Count by type |
| Quote coverage | % rows with verbatim quote (target: 100%) |
| Unmapped exceptions | EX rows with `UNMAPPED` |
| Conflicts open | CONFLICT groups unresolved |
| Low-confidence rows | Count (watch, do not “fix” by raising confidence) |
| Human-accepted model tags | Accepted / proposed, if a model was used |

---

## 7. Evidence

Store under `[BUYER]/Evidence/Transcribe/` and `[BUYER]/Evidence/Extract/`:

- Raw recording or notes (restricted)  
- Redacted transcript  
- Consent  
- Redaction log  
- Speaker map  
- Object register (versioned)  
- Model-assist disclosure (if any)  
- Register sign-off  

---

## Worked extract — ACME ILLUSTRATIVE

**Quote (TR-20260312-02, 00:18:41, S1 clerk):**  
“If there’s no GR I ping the requester on Teams and I wait. If it’s over a week I just email their manager. I don’t block payment myself.”

| Object ID | Type | Statement | Taxonomy | Deterministic | Confidence |
|---|---|---|---|---|---|
| ST-022 | ST | Clerk messages requester via Teams when GR missing | — | — | High (also observed) |
| ST-023 | ST | After ~7 days, clerk emails requester’s manager | — | threshold, duration not system-enforced | Med |
| EX-011 | EX | Invoice stopped pending goods receipt | EX-GR-001 | — | High |
| DEP-007 | DEP | Requester; then requester’s manager | — | — | High |
| CTL-004 | CTL | No evidence the clerk can block a payment; payment block sits elsewhere | — | — | Med — confirm with payment preparer |
| BR-015 | BR | “About a week” before manager escalation | — | unknown / not written | Med — policy gap |
| Q-009 | Q | Who can place a payment hold for missing GR? | — | — | — |

This set becomes a decision tree in Structure. It does **not** become an agent that emails managers until Agentise, Test, Shadow and Pilot say so.

---

## Related documents

- `00_METHODOLOGY.md` — Steps 2 and 3  
- `01_PROCESS_DISCOVERY_GUIDE.md` — sessions that feed this file  
- `03_SOP_GENERATOR_FRAMEWORK.md` — Structure  
- `../Controls/03_EXCEPTION_TAXONOMY.md`  
- `../Governance/00_GOVERNANCE_FRAMEWORK.md` — privacy, prompt-injection if transcripts are later used as model context  

---

*End of 02_TRANSCRIPT_TO_WORKFLOW.md*
