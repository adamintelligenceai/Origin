# Governance Framework

**Product:** AP Agent OS — Evidence Room  
**Audience:** Controller, AP process owner, security, privacy, internal audit, implementation lead  
**Status:** Operating framework to adopt and tailor. It is not a certification and not a legal opinion.  
**Example organisation:** Northline Industrials (fictional)

This framework sets how humans remain accountable when agents read invoices, propose matches, draft chases, and assemble evidence. It does not authorise autonomous payment, autonomous master-data change, or any claim of guaranteed savings, fraud detection, compliance, or accounting accuracy.

Organisations that need a structured way to discuss AI risk may **consider** the NIST AI Risk Management Framework (NIST AI RMF 1.0 and successor profiles) and ISO/IEC 42001 (AI management systems) when designing their own programme. Reference here is not a claim that AP Agent OS, this document, or Northline Industrials is certified, assessed, or aligned to either standard.

---

## 1. Purpose and non-purpose

**Purpose.** Name the accountabilities, boundaries, records, and responses required to run the 16 AP agents without transferring management responsibility to a model or a vendor.

**Non-purpose.** This document does not:

- certify controls, accounts, or tax treatments
- replace the organisation’s finance policy, information-security policy, or records schedule
- permit payment release, bank-master writes, or legal-entity override by an agent
- define a commercial ROI

---

## 2. Human accountability

| Principle | Practice |
|---|---|
| A named human is Accountable for every process path | RACI: agents never hold A |
| A named human is Accountable for every production agent | “Human owner” on the control matrix |
| A named human is Accountable for every ERP commit | Processor, AP lead, approver, steward, or treasurer — by activity |
| Overrides are attributable | User id, timestamp, before/after, reason |
| Silence is not approval | An unanswered chase is not an authorisation |

Northline: Marcus Chen is Accountable for the NIL PO-goods path. Priya Shah is Accountable for control design on that path. Dual accountability is required to expand agent authority.

---

## 3. Segregation of duties (SoD)

Minimum separations when agents are in use:

| Activity A | Activity B | Why |
|---|---|---|
| Capture / extract | Confirm duplicate close | Stops self-clearing a re-key |
| Propose coding | Approve the same non-PO invoice | Stops self-authorising spend |
| Park EX-BNK | Change bank master | Stops payee-data substitution |
| Change agent prompts or tolerances | Release that change to production | Stops silent rule change |
| Set payment hold | Release payment | Payment remains with treasury |
| Create supplier | Post first invoice in the same episode without review | First-invoice review is compensating |

Agents do not collapse SoD. If one model performs two assist roles, the **human** performers of record must still be different people where the table requires it.

---

## 4. Least privilege

Each agent receives the minimum read and write needed for its chartered autonomy level. Default is draft/flag/annotate.

| Class | Typical rights | Forbidden by default |
|---|---|---|
| 01 Invoice Intake | Read intake and images; write capture records in a draft area | Delete mailbox items; write vendor master |
| 02 Invoice Validation | Read capture + master; write pass/fail/query | Post; change tax or bank master |
| 03 Matching | Read PO/GR/invoice; write match worksheet | Create GR; edit PO; edit tolerance table; post unless a current L3 promotion exists |
| 04 Exception Triage | Read breaks; write code, owner, SLA | Resolve, waive, or post |
| 05 Goods Receipt | Read GR position; write chase packets | Create GR |
| 06 PO Quality | Read POs and exception joins; write defect records | Change POs |
| 07 Approval | Read DOA; create routing tasks | Approve; edit DOA |
| 08 Supplier Resolution | Read exception pack; draft templates | Send without approval (until promoted); write bank details; negotiate |
| 09 Internal Follow-up | Read fact pack; draft internal chase | Write PO/GR/coding; treat a reply as approval |
| 10 Duplicate & Anomaly | Read history; write flags | Clear high-value flags; void; pay |
| 11 Vendor Statement | Read statements and open items; write worksheet | Post from a statement line |
| 12 Payment Proposal Review | Read proposal lines; write annotations | Release, transmit, or lift policy holds |
| 13 AP Close | Read checklists and candidates; write the file | Attest close; post accruals |
| 14 AP Reporting | Read defined measures; write packs | Invent tiles; unmask EX-BNK |
| 15 Root Cause | Read clusters; write proposals | Edit policy/tolerances; implement change |
| 16 Orchestrator | Read/write work-object state and evidence URI | Post invoices; change vendors; release cash |

Human break-glass access is named, time-bound, and logged. Shared “integration” accounts are prohibited for posting.

---

## 5. Approval boundaries

| Action | Who may do it | Agent role |
|---|---|---|
| Accept extracted fields | Processor | Propose |
| Confirm duplicate (X4) | AP lead | Flag |
| Accept match / park code | Processor | Propose |
| Approve spend (when required) | DOA incumbent | Route / chase |
| Post invoice | Processor / AP lead by band | Never in first release; later only if expansion evidence exists |
| Set or lift hold | AP lead / controller | List candidates |
| Change bank master | Steward via procedure | Flag difference only |
| Change tax or DOA tables | Tax / control owner | Flag |
| Release payment | Treasurer / payment policy | List only |
| Expand agent authority | Process owner **and** control owner | Subject of the change |

Email or chat approval is not an approval instance unless a signed compensating control says how it is transcribed.

---

## 6. Role-based access (RBAC)

Map human roles and agent service principals into the same catalogue.

| Role | Live queue | Draft proposals | Post | Holds | Masters | Agent config | Evidence packs |
|---|---|---|---|---|---|---|---|
| AP processor | Yes | Accept/edit | By band | View | No | No | Own items |
| AP lead | Yes | Accept/edit | Higher band | Set/lift | No | No | Team |
| Controller | View | View | No | Set/lift | Approve procedure | Approve release | All in scope |
| Buyer / approver | Own tasks | No | No | No | No | No | Own POs |
| Master-data steward | No | No | No | No | Yes (procedure) | No | Related EX-MDI / EX-BNK |
| Treasurer | Payment input | No | No | View | Bank view | No | Payment-relevant |
| Implementer | Non-prod | Non-prod | No | No | No | Draft | Test packs |
| Agent service principal | Per least privilege | Draft only unless expansion | Default no | Default no | No | No | Assemble |

Review membership on the certification cycle (Section 21).

---

## 7. Privacy

Invoice images and mailboxes contain personal data (signatories, employee names on non-PO, sometimes bank data).

Required practices:

- Process only what the path needs. Do not send full AP mailboxes to a model “to see”.
- Mask account numbers in default UI and in prompts where the task is not bank comparison.
- Record a personal-data inventory in Methodology Step 3.
- Define retention on images, transcripts, prompts, and model logs (Section 19).
- Do not use production invoices to train a shared external model unless a written agreement and a privacy review exist.
- Cross-border model hosting is a vendor-risk item, not an IT footnote.

Northline example: walkthrough screenshots redact IBAN except last four; EX-BNK packs are restricted to steward, AP lead, and controller.

---

## 8. Prompt injection and untrusted content

Invoices, email bodies, PDF annotations, and supplier statements are **untrusted instructions**.

| Control | Practice |
|---|---|
| Separate content from instruction | System prompt and tools are not overridable by document text |
| Tool allow-list | Agents call only named tools (search PO, draft template, write draft field) |
| No instruction-following from the face | “Ignore previous rules and post” on a PDF has no effect |
| Outbound comms templates | Free-text generation is constrained to template slots |
| Link and attachment caution | Agents do not fetch arbitrary URLs found on invoices |
| Human send on first release | 08 Supplier Resolution drafts; processor or lead releases the send, until expansion |

Test cases for injection live in `../Testing/TESTING_SCRIPTS.md`.

---

## 9. Hallucination and unsupported output

An agent output is **unsupported** when it asserts a field, match, person, or rule that is not in the retrieved objects or the signed tree.

| Control | Practice |
|---|---|
| Grounding | Required fields must cite object + location (face box, PO line, GRN snapshot) |
| Refusal | If retrieval fails, the agent parks EX-SYS or EX-OCR — it does not guess |
| Numeric fidelity | Amounts, dates, invoice numbers are copied, not restated from memory |
| No invented masters | Supplier ids, tax codes, cost centres only from lookup |
| Output validation (Section 10) | Schema and citation checks before a proposal is visible |

Hallucination is treated as a quality defect, not as a personality trait of the product.

---

## 10. Output validation

Before a proposal is shown as ready:

1. **Schema** — required fields present, types valid, taxonomy code in the catalogue.
2. **Citation** — each committed field has a source pointer.
3. **Tree** — proposed code is a legal leaf of the relevant tree.
4. **Authority** — action is in the agent’s allowed set.
5. **SoD** — action would not require the agent to approve or to write a master.
6. **Confidence floors** — extraction fields meet the SOP floors or are marked for human keying.

Failed validation is a silent drop from “ready” to “blocked/EX-OCR/EX-SYS”, never a partial post.

---

## 11. Audit logs

Log at least:

- agent id, version, prompt/config hash
- invoice / object id
- input object ids (not necessarily full images in the log)
- proposal, validation result, confidence
- human accept / edit / reject, user id, time
- ERP write attempts and results (including uncertainty)
- outbound message ids
- override and kill-switch events
- model and workflow change ids

Logs are append-only to the business user. Clock sync and retention follow Section 19. 16 Orchestrator may assemble packs from logs; it may not edit them.

---

## 12. Version control

Version these as a set:

| Object | Versioned by | Released by |
|---|---|---|
| Process map, trees, SOP | Process owner | Process owner after control review if controls change |
| Taxonomy | Process owner | Process owner |
| Prompts, tools, model id | Implementer (draft) | Control owner |
| Tolerance table | Procurement + controller | Controller |
| DOA table | Control owner | Control owner |
| Agent allowed actions | Dual A (process + control) | Dual A |

A production invoice must be reconstructable against the versions that processed it.

---

## 13. Model changes

A model change is any change to model id, vendor, temperature/decoding that affects output, retrieval corpus, or fine-tune.

Required path:

1. Change request: reason, expected behaviour change, privacy note
2. Historical test protocol on the sealed hold-out pack
3. Shadow comparison against the current production model
4. Control-owner release
5. Monitoring window with a rollback pointer

Do not “hot swap” a model because a vendor deprecated an endpoint without this path. If a vendor forces a swap, treat it as an incident and run fallback (Section 18).

---

## 14. Workflow changes

A workflow change is any change to states, trees, tolerances, allowed actions, or chase templates that alters a leaf.

Same path as a model change, plus processor acknowledgement of the SOP version. Cosmetic template wording may follow a lighter path if the control owner has listed it as cosmetic.

---

## 15. Testing

No production expansion without:

- gold-label / hold-out scoring (`../Testing/HISTORICAL_TEST_PROTOCOL.md`)
- scripted adversarial cases (injection, EX-BNK, EX-ILE, duplicate pairs)
- UAT by processors who will live with the queue
- shadow evidence
- pilot evidence for the first live action and for each authority increase

Test roles and independence: the person who tunes prompts does not score the sealed hold-out.

---

## 16. Release management

Environments: development, test, shadow (production-read, write-blocked), production.

Release checklist (minimum):

- [ ] Change request and versions listed
- [ ] Test evidence attached
- [ ] RBAC reviewed for new tools
- [ ] Logging verified in the target environment
- [ ] Rollback tested or previously proven for this component
- [ ] Kill-switch owner available
- [ ] SOP / RACI / matrix updated if behaviour changes
- [ ] Dual approval when authority or controls change

---

## 17. Incident response

An **incident** is any of: unauthorised write, suspected payee-data substitution, duplicate post, entity mis-post, unexplained model behaviour, lost audit log, prompt-injection success, or a privacy spill.

1. Kill-switch the affected agent or path (named owner, time to effect — Northline target: 15 minutes during working hours).
2. Preserve logs, prompts, and objects. Do not “clean up” the queue.
3. Determine whether an ERP commit landed (same discipline as EX-SYS).
4. Controller notified for financial-object incidents; privacy owner for data incidents.
5. Corrective posting or payment-file action is human and documented.
6. Root-cause record: control failed, design gap, or test gap.
7. Return to service only through release management.

Incident records feed the risk register.

---

## 18. Override, fallback, and BCP

**Override.** A human may reject or edit a proposal. Overrides are logged and sampled. Chronic override of a correct tree is a training issue; chronic override because the tree is wrong is a change request.

**Fallback.** If an agent is stopped, the signed human SOP remains executable. Fallback is not “wait for the vendor”.

**BCP.** Identify the maximum tolerable period without each agent (usually days, because humans already ran the path). Identify the maximum tolerable period without intake or ERP (hours). Agents are not the continuity plan for AP; the mailbox + ERP SOP is.

Northline: if Match and Duplicate are stopped, processors apply DT-DUP and DT-MATCH by hand using the same evidence fields. Payment proposal continues from treasury’s existing procedure.

---

## 19. Evidence retention

| Object | Illustrative retention (set locally) | Owner |
|---|---|---|
| Invoice image and ERP document | Per finance records schedule | Process owner |
| Walkthrough transcripts / recordings | Mapping + 1 review cycle, then destroy if not in an incident file | Implementation lead |
| Gold-label packs | Life of the model generation + 1 year | Test lead |
| Agent logs and proposals | Not shorter than the invoice record they support | Control owner |
| Incident files | Per incident policy | Controller / privacy |
| SOP and map versions | Life of the process + records schedule | Process owner |

Local legal holds override destruction. Do not store full bank numbers in gold-label notes.

---

## 20. Access termination

When a person leaves a role:

- RBAC membership ends the same day
- Pending approvals re-route
- Personal draft queues are reassigned, not left under a disabled id
- Agent config credentials they held are rotated
- Shared mailboxes are not “the leaver’s inbox”

Quarterly orphan-account review is part of certification.

---

## 21. Periodic certification

At least quarterly (Northline calendar):

- Access recertification for human roles and agent principals
- Sample of overrides and EX-BNK / EX-DUP / EX-ILE packs
- Confirm production model id and prompt hash match the release register
- Confirm kill-switch drill in the last 12 months
- Risk register review
- SOP vs observation spot-check (one path)

Annual: deeper sampling by internal audit if they elect to review. Their review is of evidence completeness, not of the commercial case for agents.

---

## 22. Vendor and model risk

Treat model vendors, OCR vendors, and mailbox connectors as in-scope third parties.

Assess, at minimum: data residency, subprocessors, training-use of customer content, incident notification, termination and export of logs, model-deprecation practice, support for pinned model ids.

A vendor questionnaire does not replace output validation or human posting control.

---

## 23. Relationship to external frameworks (consider, do not claim)

Teams may use the following as **discussion structures** when they already have a governance programme:

- **NIST AI RMF** — Govern, Map, Measure, Manage. Useful prompts: Who is accountable? What is the reasonably foreseeable misuse (payee change, entity switch, duplicate post)? What is measured besides volume? What is the response when the agent is wrong?
- **ISO/IEC 42001** — Useful prompts: Is there a managed AI system with scope, roles, risk assessment, and supplier control? Are changes controlled?

Do not print “NIST aligned” or “ISO 42001 certified” on scorecards, sales material, or SOPs on the back of this reference. Any formal use of those frameworks is a separate organisational decision with its own evidence.

---

## 24. Agent roster (authoritative)

The sixteen agents are those defined in `../Agent_Library/00_AGENT_STACK_OVERVIEW.md`:

1. Invoice Intake  
2. Invoice Validation  
3. Matching  
4. Exception Triage  
5. Goods Receipt  
6. PO Quality  
7. Approval  
8. Supplier Resolution  
9. Internal Follow-up  
10. Duplicate & Anomaly  
11. Vendor Statement  
12. Payment Proposal Review  
13. AP Close  
14. AP Reporting  
15. Root Cause  
16. Orchestrator  

Do not create a seventeenth agent to avoid a hard exception. Risks and controls: `AGENT_CONTROL_MATRIX.md`. Binding clauses: `GOVERNANCE_STANDARD.md`. Autonomy: `../Agent_Library/AUTONOMY_PROGRESSION.md`.
