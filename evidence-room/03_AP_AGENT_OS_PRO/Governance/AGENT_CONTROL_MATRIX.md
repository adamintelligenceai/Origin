# Agent Control Matrix

**Product:** AP Agent OS — Evidence Room  
**Use with:** `GOVERNANCE_FRAMEWORK.md`, `RISK_REGISTER.md`  
**Columns:** Agent, Risk, Control, Preventive/Detective, Human owner, Evidence, Frequency, Escalation trigger  
**Roster:** 16 agents. Each agent has multiple risks. Agents assist; humans remain Accountable.

**Northline owners (illustrative):**  
Process owner — Marcus Chen (AP Manager)  
Control owner — Priya Shah (Financial Controller)  
AP lead — Elena Voss  
Test lead — implementation designate  
Privacy — finance ops designate  
Systems — David Park

Frequencies are operating defaults. Tighten after incidents.

---

## Intake Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Intake | Invoice arrives and is not filed (silent drop) | CM-INTAKE-01: mailbox/portal items must map to a stub or rejection log same day | P | Chen | Intake reconciliation (channel count vs stub count) | Daily | Unfiled items overnight, or channel count gap > 0 |
| Intake | Agent deletes or moves source mail so the trail is gone | Least privilege: no delete; dispositions are copy-and-file | P | Park | Access review of the service principal | Quarterly + on change | Any delete right detected |
| Intake | Duplicate intake from two channels creates two stubs | Handoff to Duplicate Agent; both stubs retained until X4 | D | Voss | Paired stub ids | Continuous | Second stub posted |
| Intake | Untrusted sender content treated as an instruction | Prompt/content separation; no arbitrary URL fetch | P | Test lead | Injection test pack results | Each release | Any successful injection in test or prod |
| Intake | Personal data in the mailbox sent in bulk to a model | Scope prompts to the single item; privacy inventory | P | Privacy | Prompt-size and item-id logs | Weekly sample | Batch-send of a full mailbox detected |

---

## Classification Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Classification | Statement or credit treated as an invoice and keyed for payment | DT-CLASS; processor accepts type | P | Chen | Type vs gold-label / shadow | Weekly | One statement posted as invoice |
| Classification | Invoice classed as credit and closed | Human accept on type; sample of “credit” leaves | D | Voss | Accept/reject log | Weekly | False credit classification > agreed FPR |
| Classification | Intercompany or foreign-currency item left on the domestic PO path | Path filters on entity/currency/type | P | Chen | Path-mismatch sample | Weekly | Item posted on the wrong path |
| Classification | Hallucinated document type without face evidence | Output validation: type requires citation | P | Test lead | Validation failures | Continuous | Ready-status without citation |

---

## Extraction Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Extraction | Wrong invoice number, amount, or date copied into the draft | Field citations; confidence floors; processor review | P | Chen | Field-level accuracy vs gold-label | Each test cycle; weekly sample in prod | Required-field accuracy below floor |
| Extraction | Low-confidence fields posted | EX-OCR blocks ready status | P | Chen | EX-OCR rate + override log | Daily in pilot; weekly later | Override of EX-OCR without keying from face |
| Extraction | Model invents a PO or tax amount not on the face | Grounding: copy-don’t-restate; refuse if unread | P | Test lead | Unsupported-output review | Weekly | Any invented required field in sample |
| Extraction | Prompt injection via PDF annotation changes fields | Tool allow-list; injection tests | P | Test lead | Test pack | Each model change | Injection success |
| Extraction | Images retained or reused for vendor training without review | Vendor contract + disable training-use | P | Privacy | Vendor attestation + config | On boarding and annually | Training-use found on |

---

## Quality Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Quality | Incomplete invoice proceeds because the agent “filled gaps” | Quality checklist; no constructed invoice numbers | P | Chen | EX-IQ packs | Weekly | Posted invoice missing a required face field |
| Quality | Wrong legal entity not flagged (logo-only match) | DT-ID requires legal name or registered number | P | Shah | EX-ILE sample and misses | Weekly | Any EX-ILE miss that posted |
| Quality | Bank-detail difference not flagged | Face-to-master compare → EX-BNK | P | Shah | EX-BNK log | Continuous | Difference found after payment-pack input |
| Quality | Excessive EX-IQ on usable invoices (noise) | FPR review; checklist versioning | D | Chen | Quality FPR | Weekly | FPR above scorecard threshold |

---

## Duplicate Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Duplicate | Exact duplicate posts | CM-DUP-01; EX-DUP blocks post | P | Shah | X4 record + query id | 100% of flags | Duplicate posted |
| Duplicate | Near-duplicate / other-site duplicate missed | DT-DUP secondary tests; group/site id | D | Voss | EX-PDUP packs; missed-pair reviews | Weekly | Posted pair later judged EX-PDUP |
| Duplicate | False EX-DUP blocks a genuine invoice | AP lead confirm; reason on clear | D | Voss | Clear-reason log | Weekly | Genuine invoice aged solely on false EX-DUP > 5 days |
| Duplicate | Agent voids or deletes an invoice | No void/delete tool | P | Park | Tool allow-list | Each release | Void tool present |
| Duplicate | Processor self-clears their own re-key | SoD: X4 ≠ original keyer | P | Shah | User-id compare | Weekly | Same-user X4 without controller note |

---

## Match Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Match | Invoice posts above received quantity | DT-GRN / DT-MATCH; EX-MRX / EX-PRX / EX-QTM | P | Chen | GRN snapshot on posted sample | Weekly sample; 100% in pilot | Post with invoice qty > received qty |
| Match | Price variance outside tolerance posts | Signed tolerance table; EX-PRM | P | Shah | Match report | Weekly sample | Post outside tolerance without waiver |
| Match | Agent widens tolerance or uses chat as acceptance | Tolerance not writable by the agent; waiver object required | P | Shah | Waiver register | Continuous | Waiver without control-owner id |
| Match | Wrong PO attached because of supplier familiarity | PO from face or buyer-confirmed reference only | P | Chen | PO-source field | Weekly | Source = “operator memory” or last-used list |
| Match | Exhausted or closed PO treated as open | Status and residual tests | P | Chen | PO snapshot | Weekly | Post to closed/exhausted PO |
| Match | Match reported without citations | Output validation | P | Test lead | Validation log | Continuous | Ready match without PO/GRN pointers |

---

## Coding Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Coding | Empty coding block posts | EX-CDM; DT-POST | P | Chen | Posted-without-coding query | Daily | Any hit |
| Coding | Invalid or neighbour cost centre substituted | Combination validation; no neighbour fill | P | Chen | EX-ICC vs posted combinations | Weekly | Invalid combination posted |
| Coding | Non-PO novel spend coded from “last invoice” without a rule | Standing-rule register; else unknown → EX-CDM | P | Chen | Rule-id on proposal | Weekly | Proposal cites “last invoice” only |
| Coding | Agent creates a cost centre | No master-write tool | P | Park | Tool allow-list | Each release | Write attempt |

---

## Tax Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Tax | Face tax not compared before post | DT-TAX; EX-TAX | P | Shah | Tax compare note on sample | Weekly | Posted item without compare |
| Tax | Agent changes tax master or invents a code | Read-only master; EX-TAX to specialist | P | Tax specialist | Master change log vs agent id | Continuous | Any agent-id on master change |
| Tax | Rounding or mixed-rate invoice force-balanced | Rounding threshold signed; no force-balance | P | Shah | Break analysis | Weekly | Force-balance flag |
| Tax | Outputs described as “tax compliant” | Language rule in SOP and UI | P | Shah | UI/SOP review | Each release | “Compliant” in user-facing text |

---

## Approval Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Approval | Invoice posts without a required approval instance | DT-POST; EX-APM | P | Shah | Approval instance on sample | Weekly | Missing instance on posted item |
| Approval | Agent approves | No approve tool; DOA incumbent only | P | Shah | Tool allow-list + approval user-id | Continuous | Agent principal on an approval |
| Approval | Stale or evaded DOA (splits, expired delegate) | EX-DOA tests; split heuristic | D | Shah | EX-DOA packs | Weekly | Suspected split |
| Approval | Email yes treated as the system of record | Compensating-control list or reject | P | Shah | Approval source field | Weekly | Source = email without waiver |
| Approval | Chase spam to approvers (noise, ignored controls) | Chase frequency caps; ageing to AP lead | D | Chen | Chase counts | Weekly | > agreed chases per invoice |

---

## Exception Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Exception | Wrong taxonomy code hides the blocking issue | Master tree order; related-code field | P | Chen | Code vs gold-label | Weekly | Blocking-code accuracy below floor |
| Exception | EX-AGE replaces the original code | Ageing tree: add, do not replace | P | Voss | Dual-code presence | Weekly | EX-AGE as sole code |
| Exception | Agent posts or waives to “clear the queue” | No post/waive tool | P | Shah | Tool allow-list | Each release | Waiver by agent |
| Exception | High-risk codes (EX-BNK, EX-ILE, EX-DUP, EX-DOA) treated as routine | Risk-level routing to AP lead / controller | P | Shah | Route log | Continuous | High/Critical code with only processor close |
| Exception | Oscillating codes reset ageing indefinitely | Ageing on first set; reason required to reset | D | Voss | Age vs code-change log | Weekly | > 2 code changes without reason |

---

## Supplier Comms Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Supplier Comms | Agent negotiates price or promises payment | Template slots only; forbidden-claims list | P | Chen | Sent-mail review | Weekly sample | Any promise of payment date or price acceptance |
| Supplier Comms | Wrong supplier contacted (privacy / commercial leak) | Recipient from master record, not from the PDF letterhead alone | P | Chen | Recipient vs master | Weekly | Off-master recipient |
| Supplier Comms | Injection in supplier email alters the next draft | Content/instruction split; templates | P | Test lead | Injection tests | Each release | Injection success |
| Supplier Comms | Unreviewed send in first release | Human release of send | P | Chen | Send-approver id | 100% until expansion | Send without human id |
| Supplier Comms | Tone or content creates an apparent admission | Template legal review of high-risk codes (EX-DIS, EX-BNK) | P | Shah | Template version | On template change | Free-text send on EX-DIS / EX-BNK |

---

## Internal Chase Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Internal Chase | “Goods are here” email used as a GRN | SOP forbids post without system receipt | P | Chen | Posted-without-GRN query | Daily | Any hit |
| Internal Chase | Wrong buyer or leaked vendor pricing to the wrong inbox | Recipient from PO owner table | P | Chen | Recipient vs PO | Weekly | Off-PO recipient |
| Internal Chase | Chase fatigue; genuine blocks ignored | Cap + escalate to AP lead per tree | D | Voss | Chase vs age | Weekly | EX-AGE without AP-lead touch |
| Internal Chase | Agent changes PO or creates GRN | No write to PO/GRN | P | Park | Tool allow-list | Each release | Write attempt |

---

## Credit Note Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Credit Note | Credit allocated to the wrong original invoice | Pairing keys (supplier, entity, ref, amount); human accept | P | Chen | Allocation sample | Weekly | Mis-allocation found |
| Credit Note | Duplicate credit posted | Duplicate gate on credit numbers | P | Voss | EX-DUP on credits | Continuous | Duplicate credit posted |
| Credit Note | Agent silently reduces an invoice instead of waiting for a credit | EX-CNR; adjustment type only if signed | P | Shah | Adjustment report | Weekly | Unsigned adjustment |
| Credit Note | Credit used to mask a duplicate payment situation | Link to EX-DUP / payment-pack review | D | Shah | Linked-code pack | On each such pair | Unlinked credit on a duplicate episode |

---

## Statement Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Statement | Invoice created from a statement line | Forbidden action; EX-STD pairing only | P | Chen | Created-from-statement query | Daily | Any hit |
| Statement | Wrong entity open-items used | Entity filter mandatory | P | Chen | Entity on reconciliation | Weekly | Cross-entity pair accepted |
| Statement | Chronic discrepancy aged without an owner | EX-AGE + AP lead | D | Voss | Aged EX-STD list | Weekly | Item > trigger with no owner |
| Statement | Supplier contacted with a full open-item list containing extra entities | Pack scoping | P | Privacy | Outbound pack review | Weekly sample | Cross-entity data in outbound |

---

## Payment Pack Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Payment Pack | Agent releases a payment or lifts a hold | No release/lift tools; treasurer remains A | P | Reid / Shah | Tool allow-list + payment log vs agent id | Continuous | Agent id on a release |
| Payment Pack | Hold candidate (EX-BNK, EX-DIS) omitted from the list | DT-HOLD completeness check | P | Voss | Candidate vs hold-worthy query | Each run | Omission of EX-BNK / EX-DIS |
| Payment Pack | Listed item described as “safe to pay” | Language: candidate / hold / unclear only | P | Shah | UI copy review | Each release | “Safe to pay” or “fraud-free” wording |
| Payment Pack | Duplicate open items both listed for payment input | Cross-check Duplicate Agent pairs | D | Voss | Pair vs list | Each run | Both legs listed without note |

---

## Evidence Agent

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Evidence | Pack omits the object that justified posting | CM-EVD-01 checklist | P | Shah | Pack completeness score | Monthly sample of 25 | Incomplete pack on a sampled posted invoice |
| Evidence | Agent alters a source image or log | Read-and-assemble only | P | Park | Write-deny on sources | Each release | Write attempt |
| Evidence | Pack over-collects personal data (full IBAN, unrelated mail) | Masking + scope to the invoice id | P | Privacy | Pack privacy review | Monthly sample | Unmasked bank number in a general pack |
| Evidence | Pack presented as audit certification or “compliant” | Language rule | P | Shah | Cover-sheet text | Each release | Certification claim |
| Evidence | Gaps quietly filled with generated narrative | Citation required on every included object | P | Shah | Unsupported-narrative review | Monthly | Narrative without object id |

---

## How to use this matrix

1. Every production agent must have its rows completed with **local named owners** before shadow.
2. Add rows when a new tool is granted. Do not leave a new write path on an old row.
3. Escalation triggers feed the weekly performance report and the incident path.
4. Residual risks that are accepted are written on `RISK_REGISTER.md`, not implied by a blank cell.

Northline v03 first release: all agents **propose / draft / flag / assemble** only. Rows that mention posting assume a later expansion and stay red until dual A is signed.
