# Method — /method

**Page title:** Method · Evidence Room  
**Meta description:** The Evidence Room method for governed AP agents: responsibility, measurement, controls, and a roadmap that does not invent ROI.  
**Primary CTA:** Assess Your AP Agent Readiness  
**Secondary CTA:** Explore the AP Agent OS  
**Job:** Teach. Do not hard-sell. This page should work if the checkout is down.

---

## Kicker

METHOD · GOVERNED AGENTS

## H1

Responsibility is earned.

## Deck

Evidence Room’s method is how a finance organisation moves from “we are trying AI in AP” to “we can say what the agent is for, what it may not do, and what we will read.”

Supporting line: **Governed agents. Measurable outcomes.**

This page is the public method. The toolkit is the method made operational.

---

## Section: The problem the method is for

AP already has systems. What it usually lacks is an operating layer for agents:

- a written job
- a fence
- an owner
- evidence
- a measure
- a way to stop

Vendors will sell capture, matching, and “intelligence”. None of that is an operating system. If you skip this layer, you do not get a workforce. You get a second queue with a nicer name.

---

## Section: What “agentic AP” means here

In this method, an **AP agent** is a designed role that can propose or prepare work inside a fence, under a human responsibility model, with evidence and a pause rule.

It is not:

- a synonym for your AP automation suite
- a licence to pay suppliers
- a claim that the books are right
- a replacement for a person with a named control duty

Agentic AP, as we use the words, is a **workforce design problem** sitting on top of a systems problem you have already spent years on.

---

## Section: The responsibility model

Five objects must have owners before an agent sees production traffic.

### 1. Purpose

One sentence a controller will sign.  
Example (fictional Northline): “Flag PO invoice mismatches under $5,000 for human release; do not code new vendors.”

### 2. Fence

Invoice class, amount, vendor set, entities, systems, languages, and document types. If it is not in the fence, the agent does not touch it.

### 3. Escalation

The list of states the agent must not resolve: new vendor, amount breach, missing PO, policy exception, payment instruction, anything that looks like a control override.

### 4. Evidence

What is kept: inputs, outputs, confidence or rule trace, human decision, timestamp, version of the agent brief. Where it is kept. Who can read it.

### 5. Measure

Operating numbers only. Cycle by class. Exception age. Human review rate. Evidence completeness. Fence-breach count. Pause events.

Not: “savings”, “ROI”, “fraud caught”, “compliance achieved”.

If any of the five is missing, the agent is a pilot in name and a risk in practice.

---

## Section: The workforce diagram (text)

Use this as the alt-text and the on-page caption for the diagram.

```
                    ┌─────────────────────────────┐
                    │     EXECUTIVE READER         │
                    │  purpose, pause, measures    │
                    └──────────────┬──────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
┌───────────────┐        ┌─────────────────┐        ┌─────────────────┐
│ AGENT STEWARD │        │  CONTROL OWNER  │        │ REVIEW / AP OPS │
│ day-to-day    │        │ control +       │        │ exceptions,     │
│ brief + log   │        │ evidence        │        │ release, stop   │
└───────┬───────┘        └────────┬────────┘        └────────┬────────┘
        │                         │                          │
        └─────────────┬───────────┴──────────────┬───────────┘
                      ▼                          ▼
            ┌──────────────────┐       ┌─────────────────────┐
            │   AP AGENT(S)    │       │   SYSTEMS OF RECORD  │
            │ classify, flag,  │       │ ERP · AP · bank ·    │
            │ draft, pack      │       │ OCR · archive        │
            │ NEVER: pay,      │       │                      │
            │ override, close  │       │                      │
            └──────────────────┘       └─────────────────────┘
```

Humans hold responsibility. Agents hold a job. Systems hold the record. The OS is the written agreement among the three.

---

## Section: Measurement without invention

You may measure what the operation already produces.

**Allowed (examples)**

- Median hours from invoice receipt to first complete coding (by class)
- Share of invoices that leave the fence
- Age of exceptions in the human queue
- Share of agent outputs with a complete evidence pack
- Number of times the agent was paused

**Not allowed on an Evidence Room page or in our templates as claims**

- Dollar savings attributed to the toolkit
- ROI
- Fraud prevented
- “Fully compliant”
- Payment accuracy guarantees

Industry benchmarks from Ardent Partners or Forrester may be used as *context* when you cite the source. They are not your baseline until you measure your own environment. See `06_SALES_AND_MARKETING/charts/10_EXECUTIVE_CHARTS.md`.

---

## Section: Governance, in practice

Governance here is dull on purpose.

- A named steward and a named control owner.
- A versioned agent brief.
- A change request if the fence, model, or prompt (if any) moves.
- A scheduled reading of the measures.
- A written pause authority that does not require a steering committee.

If governance needs a town hall, it is not yet governance.

---

## Section: Roadmap (the work, not the product launch)

A serious sequence looks like this. Times are illustrative, not a service-level promise.

| Stage | Work | Exit |
|---|---|---|
| 0 | Diagnostic. Honest level. | You know you are at 0–4. |
| 1 | Map one live invoice class. | A map people who do the work recognise. |
| 2 | Write one agent brief and fence. | A controller can read it aloud. |
| 3 | Attach controls and evidence. | Audit can see the index. |
| 4 | Historical-sample test. | You know what failed. |
| 5 | Limited production fence. | Measures are read. Pause works. |
| 6 | Decide to scale, hold, or stop. | A written decision. |

Skipping to stage 5 is how “AI in AP” becomes a second exception pile.

---

## Section: What we refuse

The method will not help you write:

- an agent that issues payment instructions without a human control
- a claim that the agent detects fraud
- a claim that the agent makes the company compliant
- a savings number for a board paper that did not come from your own finance team

We will help you write the opposite: a fenced job, a human release, and a measure you can defend.

---

## Section: Continue

**[Assess Your AP Agent Readiness]**  
**[Explore the AP Agent OS]**  
**[About Evidence Room]**
