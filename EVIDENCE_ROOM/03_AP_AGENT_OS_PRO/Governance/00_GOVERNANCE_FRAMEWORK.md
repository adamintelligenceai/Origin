# Evidence Room — AP Agent OS Professional

## Governance — 00 Framework

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Governance  
**Standard:** Proof before permission  
**Audience:** CFO, Controller, Head of AP, Control / Risk, Internal Audit, Finance Systems, Privacy, Legal  
**ERP stance:** Agnostic. Governance binds people, identities and evidence — not a vendor module.  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Binding operating standard. Buyer completes `[BUYER]` fields. This document does **not** certify legal, regulatory, accounting, or security compliance.

---

### Position

Agents are tools with job descriptions. They earn scope. They never hold accountability. This framework is the set of rules that makes that sentence operational.

Use with:

| Topic | File |
|---|---|
| Autonomy ladder and promotion | `01_AUTONOMY_POLICY.md` |
| Testing, release, model and workflow change | `02_RELEASE_AND_CHANGE.md` |
| Incidents, override, fallback, BCP | `03_INCIDENT_AND_OVERRIDE.md` |
| Control design and matrix | `../Controls/` |
| Measurement | `../KPI_and_Measurement/` |
| Who is A/R/C/I | `../Process_Mapping/04_RACI_STANDARD.md` |

Every section below uses the same seven answers: what to do / how / who / what can go wrong / control / measure / evidence.

---

## 1. Human accountability

**What to do.** Name one human Accountable for every agent, every control, every exception family, and every release.

**How.** Charter field `Accountable` is a standard role plus named incumbent (`04_RACI_STANDARD.md`). Deputies are named. Absence of the incumbent does not transfer accountability to the agent or to a vendor.

**Who.** Head of AP / Controller for operating agents; Controller for financial claims; CFO / Finance Director for L3+ autonomy and any payment-adjacent expansion.

**What can go wrong.** “The model did it.” Vendor success-manager treated as owner. Shared mailbox as Accountable.

**Control.** Charter gate rejects blank, vendor, mailbox, or agent Accountable. Quarterly incumbency certification.

**Measure.** Charters with valid human A; recertifications overdue.

**Evidence.** Charter register; certification file.

---

## 2. Segregation of duties (SoD)

**What to do.** Keep incompatible duties apart for humans **and** for the system identities agents use.

**How.** Default incompatible pairs (extend locally):

| Duty A | Duty B |
|---|---|
| Invoice capture / entry | Payment authorisation |
| Vendor master create | Payment authorisation |
| Vendor bank-detail change | Payment authorisation |
| Invoice approval (DOA) | Payment authorisation (unless local policy explicitly combines — treat as residual risk) |
| Exception close above `[BUYER cap]` | Same person who created the invoice record |
| Agent entitlement grant | Agent performance accept (Measure) |

Agent identities inherit the narrower of: (a) the human role they assist, (b) the exclusions on the charter. An orchestrator must not hold payment-release or master-data-write entitlements.

**Who.** Control owner maintains the pair list. Finance Systems implements. Controller approves exceptions.

**What can go wrong.** A “service account” that can park **and** propose **and** release. An agent that changes vendor bank data because the connected API token was reused.

**Control.** Access review at every promotion and quarterly. SoD exceptions have risk-register ID and expiry.

**Measure.** Open SoD exceptions; identities with incompatible entitlements (count must be explainable).

**Evidence.** Access extract; exception file; `../Controls/01_CONTROL_MATRIX.md` rows.

---

## 3. Least privilege

**What to do.** Give each agent identity the minimum objects, verbs and records needed for the current autonomy level and allow-list.

**How.** Privilege is an allow-list: entities, channels, supplier segments, exception codes, value cap, verbs (`read`, `write-evidence`, `draft`, `send`, `park`, `post` — post is default **denied**). Shadow = read + write-evidence only. Promotion adds one increment (`01_AUTONOMY_POLICY.md`).

**Who.** Finance Systems implements; AP Manager requests; Control owner approves.

**What can go wrong.** Shared human credentials. Production write “just for the demo.” Prompt-time instructions used as the only access control.

**Control.** Technical enforcement preferred over procedure. If the platform cannot enforce a cap, autonomy stays at L1 and the residual risk is logged.

**Measure.** Entitlements vs charter (drift count); unused write verbs.

**Evidence.** Identity sheet attached to the charter.

---

## 4. Approval boundaries

**What to do.** Agents do not create DOA. They may route, remind, or prepare. Approval remains a human act unless a **separate**, documented workflow engine already performs deterministic routing — and even then the agent does not become the approver.

**How.**

- DOA table is a source of truth owned by the Controller.  
- Agent may flag `EX-APR-001` / `EX-APR-002`.  
- Agent may not approve, re-assign DOA, or raise a limit.  
- Value caps on agent **actions** (send, park) are not a substitute for DOA on the invoice.

**Who.** Controller owns DOA. Approval Agent’s Accountable is Head of AP.

**What can go wrong.** Auto-approval “because the match is clean” introduced in a prompt. Delegation harvested from out-of-office text and treated as DOA.

**Control.** Prompt and workflow deny-lists for approve/release verbs. Sample of agent-touched approvals in QA.

**Measure.** Agent-initiated approval events (target: zero unless a documented non-agent workflow is in scope — even then, count and review).

**Evidence.** DOA version cited on the charter; QA sample.

---

## 5. Role-based access (RBAC)

**What to do.** Map people and agents to named roles. No personal standing exceptions without expiry.

**How.** Human roles follow `04_RACI_STANDARD.md`. Agent roles are `agt.[charter].[env]` (e.g. `agt.match.shadow`). Privileged break-glass is a separate role, logged, time-bound (`03_INCIDENT_AND_OVERRIDE.md`).

**Who.** Finance Systems + Control owner.

**What can go wrong.** Copy-paste of a privileged role to “make the pilot work.”

**Control.** Joiner/mover/leaver for agent identities as well as people. Quarterly RBAC certification.

**Measure.** Standing exceptions; stale identities.

**Evidence.** RBAC matrix; certification.

---

## 6. Data privacy

**What to do.** Treat invoice, vendor, employee and bank data as personal or confidential by default. Minimise what enters prompts, logs, vendor clouds and training sets.

**How.**

- Data inventory: fields the agent may read, may write to evidence, may not send to a model vendor.  
- Redaction rules from `../Process_Mapping/02_TRANSCRIPT_TO_WORKFLOW.md` apply to prompts and traces.  
- Buyer records lawful basis and vendor location in `[BUYER privacy file]`. This OS does not declare GDPR/CCPA adequacy.  
- Default: **no** customer data used to train a shared vendor model.

**Who.** Privacy / DPO Accountable for the inventory. AP Manager Responsible for not pasting restricted data into unsanctioned tools.

**What can go wrong.** Full invoice PDF pasted into a consumer chatbot. Traces stored with IBAN in plain text.

**Control.** Approved tool list. Technical DLP where the buyer has it. Privacy review of each charter.

**Measure.** Unsanctioned-tool incidents; traces found with forbidden fields.

**Evidence.** Inventory; vendor processing record; privacy review on the charter.

---

## 7. Confidential information

**What to do.** Separate ordinary AP data from marked confidential (M&A vendors, sealed settlements, employee-payable, attorney-client).

**How.** Confidential suppliers/entities on a deny-list or a dedicated human-only queue. Agents default to **exclude** until an allow-list is signed.

**Who.** Legal + Controller define the list. AP Manager operates the queue.

**What can go wrong.** Orchestrator prioritises a sealed invoice into a shared agent Slack.

**Control.** Deny-list enforced in routing. Periodic search of evidence stores for listed vendor IDs.

**Measure.** Confidential items processed by a general agent (incident).

**Evidence.** Deny-list version; routing logs.

---

## 8. Prompt injection

**What to do.** Treat every invoice, email, statement, PDF comment, and filename as **untrusted text**.

**How.**

- Untrusted content is data, never instructions. System prompt states that documents cannot change rules, autonomy, or recipients.  
- Outbound actions (mail, post, master-data write) require a separate policy check that does not read the document body for instructions.  
- Hidden text / very small text / “ignore previous” patterns are flagged `EX-QLT-001` or `EX-SYS-001` for human review.  
- Tools the agent can call are an allow-list.  
- Do not retrieve arbitrary URLs printed on invoices.

**Who.** Finance Systems + Control owner design; AP Manager escalates suspected injection.

**What can go wrong.** Invoice line “please pay to new IBAN” processed as a bank change. Email from a supplier that says “approve this exception” consumed as a workflow command.

**Control.** Injection test cases in every release (`02_RELEASE_AND_CHANGE.md`). Bank-change path is never document-driven (`EX-PAY-001`).

**Measure.** Injection-test fails; incidents tagged `INJ`.

**Evidence.** Test file; incident records.

---

## 9. Hallucination

**What to do.** Separate **extracted or computed facts** from **generated language**. Facts that are not in the source or the system of record are defects.

**How.**

- Deterministic work (match maths, exact duplicate keys, ageing) must not be performed by a language model.  
- Model outputs that assert a PO number, amount, VAT ID, or approver must cite the field source. Uncited assertions fail validation.  
- Draft communications may not invent discounts, legal positions, or payment dates.  
- Root-cause clusters are hypotheses until a human accepts them.

**Who.** AP Manager owns output standards. Control owner samples.

**What can go wrong.** Agent invents a GR number. Report shows a saving that Finance did not validate.

**Control.** Output validation (section 10). QA sample. Dictionary bans unvalidated financial lines.

**Measure.** Hallucination defects in QA; FNR/FPR per `01_KPI_DICTIONARY.md`.

**Evidence.** QA file; failed-output store.

---

## 10. Output validation

**What to do.** No agent output becomes an operational action until it passes the validators for that charter.

**How.** Layer validators:

1. **Schema** — required fields present, types valid, taxonomy code exists.  
2. **Cite** — amounts, IDs, dates match source or ERP read.  
3. **Policy** — autonomy level, value cap, allow-list, SoD.  
4. **Human** — required at L0–L2 for external action; at L3+ for exceptions listed on the charter.

Failed validation = no send/post + exception to human + logged reason.

**Who.** Finance Systems implements validators. AP Manager handles fails.

**What can go wrong.** Validator bypass flag left on after debug. Only schema checked.

**Control.** Bypass is break-glass (`03_INCIDENT_AND_OVERRIDE.md`). Release tests include failed-validation cases.

**Measure.** Validation-fail rate; bypass events.

**Evidence.** Validator logs; bypass tickets.

---

## 11. Audit logs

**What to do.** Keep an immutable-enough trail of what the agent saw (reference, not necessarily the full payload), what it proposed, what was validated, who accepted, and what system action occurred.

**How.** Minimum event fields: timestamp (UTC), agent identity, charter version, model/prompt hash, input references, output hash, validation result, human actor, action verb, correlation ID, invoice/vendor IDs. Retention in section 21. Logs are not writable by the agent identity.

**Who.** Finance Systems operates. Control owner and Internal Audit read.

**What can go wrong.** Logs only on the vendor side, deleted at contract end. Logging the full IBAN “for completeness.”

**Control.** Log-integrity check. Privacy review of log fields.

**Measure.** Events without correlation ID; gaps vs invoice volume.

**Evidence.** Log store pointer; integrity report.

---

## 12. Version control

**What to do.** Version every artefact that can change behaviour: SOP, RACI, charter, prompt, tools list, taxonomy, validators, DOA citation.

**How.** Semantic versions. Production runtime cites hashes (prompt, model ID, workflow). “Latest” is not a version.

**Who.** AP Manager (content); Finance Systems (runtime hashes).

**What can go wrong.** Prompt edited in the vendor UI with no record.

**Control.** Production run refuses to start without hash match to the approved release (`02_RELEASE_AND_CHANGE.md`).

**Measure.** Unmatched runtime hashes (incident).

**Evidence.** Version register.

---

## 13. Model changes

**What to do.** Treat a model swap, major version, or temperature/tool-config change as a **release**, not a maintenance patch.

**How.** See `02_RELEASE_AND_CHANGE.md`. Re-run the labelled Test pack. Shadow if error profile moves. No model change combined with an autonomy promotion.

**Who.** Finance Systems proposes; Control owner + Head of AP approve.

**What can go wrong.** Vendor silently routes to a new model. “It’s the same family.”

**Control.** Pin model IDs. Alert on vendor-side ID change.

**Measure.** Unplanned model-ID changes; post-change defect delta.

**Evidence.** Release record; pin configuration.

---

## 14. Workflow changes

**What to do.** Treat routing, allow-lists, value caps, exception-code mapping and validator rules as workflow changes — same discipline as model changes.

**How.** Change ticket; impact on SoD and DOA; test cases for the touched codes; communication to processors.

**Who.** AP Manager requests; Control owner approves policy-affecting changes; Finance Systems implements.

**What can go wrong.** Someone widens tolerance in a config table to “clear the queue.”

**Control.** Config write restricted. Diff of production workflow vs last approved export, periodic.

**Measure.** Unapproved config diffs.

**Evidence.** Export + ticket.

---

## 15. Testing

**What to do.** No production action rights without a labelled historical pack and a recorded go/no-go (`00_METHODOLOGY.md` Step 6).

**How.** Labels before model output. Stratify by taxonomy code and high-risk types (duplicates, bank change, tax, high value). Include injection and hallucination cases. Buyer sets numeric gates; this file does not.

**Who.** Analyst + AP specialists label; Control owner accepts the scoring rules.

**What can go wrong.** Vendor demo set used as the only test.

**Control.** Test-pack ownership is the buyer’s. Promotion checklist requires the pack ID.

**Measure.** Codes with n = 0 in the pack; gate breaches.

**Evidence.** `[BUYER]/Evidence/Test/`.

---

## 16. Release management

**What to do.** Ship agent behaviour through the same change path as any finance system change.

**How.** `02_RELEASE_AND_CHANGE.md`: change record, back-out, owners, windows, production hash lock.

**Who.** Finance Systems + Head of AP. Payment-adjacent releases Inform Treasury.

**What can go wrong.** Weekend “hot fix” to a prompt.

**Control.** Emergency changes still ticketed, with 24-hour retrospective.

**Measure.** Emergency vs planned releases; rolled-back releases.

**Evidence.** Change records.

---

## 17. Incident response

**What to do.** When an agent causes, or could have caused, a wrong payment, data leak, control bypass, or operational outage, follow `03_INCIDENT_AND_OVERRIDE.md`.

**How.** Detect, contain (disable identity / revoke send), eradicate (fix + test), recover, review. Classify severity. Notify Accountable within the buyer’s clock.

**Who.** AP Manager coordinates; Control owner classifies; Finance Systems contains technical identities; Controller involved when money or books are affected.

**What can go wrong.** Incident closed as “user training” with the agent still live.

**Control.** Severity table; time-to-contain metric; no close without residual-risk statement.

**Measure.** Incidents by severity; open > buyer SLA; repeat incidents.

**Evidence.** Incident file.

---

## 18. Override

**What to do.** Allow a named human to bypass an agent recommendation or validator **with a reason code**, never silently.

**How.** Override types: accept agent (agree), reject agent (proceed differently), force-path (bypass validator — break-glass). Force-path requires Control owner or Head of AP per severity. All overrides logged and sampled.

**Who.** Processors may reject recommendations. Only listed roles force-path.

**What can go wrong.** Override becomes the operating model.

**Control.** Override rate on the weekly report. Force-path dual control.

**Measure.** Override rate; force-path count; codes most overridden (signal of a bad rule, not a bad user).

**Evidence.** Override log.

---

## 19. Fallback

**What to do.** Pre-write how AP continues when the agent, model vendor, or interface is down.

**How.** Fallback is the CS-1.0 SOP without the agent lane. Queues must remain workable in the ERP/workflow the humans already use. Do not make the agent the system of record.

**Who.** AP Manager owns fallback drills. Finance Systems owns vendor-down detection.

**What can go wrong.** Work only exists in the agent UI.

**Control.** Semiannual fallback drill. Agent UIs are not the archive.

**Measure.** Drill success; minutes to disable an agent identity.

**Evidence.** Drill record; disable runbook.

---

## 20. Business continuity (BCP)

**What to do.** Include agent vendors and identity stores in the AP BCP. Recovery objective is buyer-set.

**How.** Dependencies: model API, capture, ERP, evidence store, IdP. If the evidence store is down, new agent actions stop (cannot meet audit-log rule). Payment authorisation path must work without agents.

**Who.** Controller / BCP owner Accountable. Finance Systems Responsible for technical dependencies.

**What can go wrong.** Ransomware on the evidence store with no export. Vendor bankruptcy.

**Control.** Dependency map; export of evidence; exit clause notes in vendor file (Legal).

**Measure.** Dependencies without an owner; last successful evidence export.

**Evidence.** BCP annex; export logs.

---

## 21. Evidence retention

**What to do.** Keep proof for the period the buyer’s finance, tax and litigation policies require. This OS does not set a statutory period.

**How.** Retention table (buyer completes periods):

| Class | Examples | Period `[BUYER]` | Store |
|---|---|---|---|
| Operating evidence | Charters, logs, QA, scorecards | | |
| Tax-relevant invoices / workpapers | As finance policy | | |
| Privacy-limited traces | Prompts with residual PII | Minimise; not longer than operating need | Restricted |
| Incident / override | | | |

Disposal is logged. Agents cannot delete evidence.

**Who.** Controller owns retention policy. Privacy owns personal-data minimisation.

**What can go wrong.** Infinite vendor logs; or 30-day wipe that destroys audit proof.

**Control.** Annual retention attestation.

**Measure.** Stores past policy; stores with no policy row.

**Evidence.** Retention schedule; attestation.

---

## 22. Access termination

**What to do.** Remove human and agent access the same day the need ends: leaver, role change, charter retired, vendor off-boarded, pilot ended.

**How.** Checklist: IdP, ERP roles, workflow, mailbox, vendor console, API keys, evidence-store ACLs, shared vaults. Confirm no standing personal tokens.

**Who.** Line manager + Finance Systems. Control owner samples.

**What can go wrong.** Agent key in a personal vault after the vendor project ends.

**Control.** Leaver ticket cannot close without agent-identity section. Quarterly orphan-identity scan.

**Measure.** Orphan identities; tickets closed without checklist.

**Evidence.** Termination tickets; scan report.

---

## 23. Periodic certification

**What to do.** Recertify, on a calendar, that the operating facts are still true.

| Item | Default frequency (buyer may tighten) | Certifier |
|---|---|---|
| Incumbents and deputies | Quarterly | Head of AP |
| RBAC + agent entitlements | Quarterly | Control owner + FinSys |
| SoD exceptions | Quarterly or at expiry | Controller |
| Charters vs runtime hashes | Monthly | FinSys + AP Manager |
| Confidential deny-list | Quarterly | Legal + Controller |
| Retention / privacy inventory | Annual | Privacy + Controller |
| Fallback drill | Semiannual | AP Manager |
| Control matrix still mapped | Semiannual | Control owner |

**How.** Attest “accurate / exception listed.” Exceptions enter the risk register.

**Who.** As table. Internal Audit may inspect the file; they do not own the operating cert.

**What can go wrong.** Click-through certification.

**Control.** Sample of entitlements vs ERP extract on each cycle.

**Measure.** Overdue certs; exception rate.

**Evidence.** Certification pack.

---

## 24. Vendor and model risk

**What to do.** Treat model hosts, OCR vendors, iPaaS and “agent platforms” as third parties that can change behaviour, fail, or retain data.

**How.** Minimum vendor file: services in use, data classes sent, residency, subprocessors, model-pin capability, silent-update policy, incident contact, exit/export, whether buyer data is used for training (must be **no** unless Controller + Privacy sign). Concentration risk: a single vendor that is both capture and payment messaging is recorded.

This is **not** a vendor-assurance certificate and not a security audit.

**Who.** Finance Systems + Procurement / vendor management. Privacy and Legal on data terms. Control owner on operational residual risk.

**What can go wrong.** Shadow SaaS. Training-data opt-in buried in a UI. Model change with no notice.

**Control.** Approved-vendor list. Charter cannot cite an unlisted tool. Pin + monitor model IDs.

**Measure.** Unlisted tools found; vendors without an exit/export test.

**Evidence.** Vendor file; list; last export test.

---

## Governance operating cycle

| Cadence | Forum | Inputs | Decisions |
|---|---|---|---|
| Daily | AP Manager huddle | Queue, incidents, overrides | Containment |
| Weekly | Agent performance (`03_WEEKLY_AGENT_REPORT.md`) | Scorecard | Hold / investigate |
| Monthly | Hash and entitlement check | Runtime vs charter | Emergency disable if drift |
| Quarterly | Certification | RBAC, SoD, incumbents | Exceptions and expiries |
| Each release | Change record | Test pack | Go / no-go |
| Each promotion | Autonomy board (can be the same people as change) | Measure pack | One increment or refuse |

---

## What this framework is not

- A legal opinion, SOC report, or ISO certificate.  
- A guarantee that fraud will be detected or that books are correct.  
- Permission to process payments without the buyer’s existing authorisation path.

Proof before permission.

---

*End of 00_GOVERNANCE_FRAMEWORK.md*
