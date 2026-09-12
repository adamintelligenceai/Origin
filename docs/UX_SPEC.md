# UX Specification

## Product feel

An elite human Chief of Staff translated into software:

- anticipatory;
- calm;
- terse;
- evidence-backed;
- not theatrical;
- never pretends a task is done before verification.

## Desktop — Today

Top:
**Good morning**
"3 decisions need you. 2 items are at risk. 6 actions verified since yesterday."

Four compact metrics:

- Needs you
- At risk
- Verified
- Time saved

### Needs you card anatomy

- outcome headline
- 1–2 sentence context
- evidence chips
- proposed action
- consequence label
- `Approve`
- `Edit`
- `Dismiss`
- privacy route: `On device` / `External AI: OpenAI`

### At risk

Only high-confidence, time-relevant items.

### Completed

Show verified external result, not model intention.

## Decisions

Filters:

- Now
- Today
- This week
- Low risk
- Consequential

Approval interaction:

1. user taps Approve;
2. local permission token bound to action hash;
3. execution starts;
4. UI shows "Executing";
5. provider state refetched;
6. UI becomes "Verified" or "Needs attention".

Never optimistically mark mutation as complete.

## Chief

Input placeholder:
"What should I take care of?"

Quick commands:

- "Prepare me for tomorrow"
- "Who am I waiting on?"
- "What have I promised?"
- "Clear routine follow-ups"
- "Find conflicts next week"

Responses should offer structured work items rather than long essays when action is possible.

## Commitments

Two views:

- I owe
- Owed to me

Fields:

- statement
- person
- source
- due
- status
- follow-up action

## Activity

Ledger timeline:
`Detected → Prepared → Approved → Executed → Verified`

Receipt drawer:

- what
- why
- source/evidence
- permission basis
- external system result
- model provider used?
- undo/reverse if available

## Privacy center

Must feel like a product surface, not legal boilerplate.

Cards:

- **On this device**
- **Connected accounts**
- **External AI routes**
- **Device sync**
- **What our service cloud stores**
- **Export**
- **Wipe**
- **Revoke all connections**

## Mobile

### Today

One-screen executive briefing.

### Decisions

Swipe is not approval for consequential actions. Use explicit tap + confirmation where risk requires it.

### Chief

Text + voice.

### Activity

Receipts.

### You

Connections, privacy summary, devices, billing link.

## Empty states

Never show generic "No data".
Examples:

- "Nothing needs your decision."
- "No commitments are at risk."
- "Chief hasn't verified any work yet."

## Accessibility

- WCAG 2.2 AA baseline
- keyboard complete desktop
- visible focus
- reduced motion
- screen-reader action labels
- do not encode consequence only by color
