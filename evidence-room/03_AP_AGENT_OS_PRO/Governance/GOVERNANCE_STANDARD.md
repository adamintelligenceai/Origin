# Governance Standard

**Product:** AP Agent OS — Evidence Room  
**Type:** Binding operating standard for adopters of this pack  
**Relationship:** Compresses `GOVERNANCE_FRAMEWORK.md` into shall / shall-not statements. If the two conflict, this standard wins until the framework is revised.  
**Not:** A certification, a legal opinion, or a claim of alignment to NIST AI RMF or ISO/IEC 42001. Those frameworks may be considered separately.

**Example:** Northline Industrials applies this standard to all 16 agents.

---

## 0. Application

This standard applies from the first shadow run. Mapping and historical testing may proceed before full RBAC automation, but **no live proposal** is shown to processors until sections 1–8 are met.

Local policies that are stricter prevail. Local policies that are looser require a written waiver from the control owner, with expiry.

---

## 1. Accountability

1.1 Each process path shall have one human process owner.  
1.2 Each production agent shall have one human owner named on the control matrix.  
1.3 Agents shall not be Accountable on the RACI.  
1.4 Every ERP commit shall name a human performer of record.  
1.5 Dual approval (process owner and control owner) shall be required to expand agent authority, to change tolerances, or to change allowed tools.

---

## 2. Authority boundaries

2.1 Agents shall not release payments, lift payment holds, or generate a payment file.  
2.2 Agents shall not approve spend or amend DOA limits.  
2.3 Agents shall not create or amend supplier bank details, tax masters, or cost-centre masters.  
2.4 Agents shall not create GRNs or re-open POs.  
2.5 Agents shall not construct invoice numbers or payable amounts that are not on the face or in a retrieved system object.  
2.6 Agents shall not post from a statement line.  
2.7 First release shall be propose / draft / flag / assemble / route / chase-draft only, unless a signed expansion record exists.  
2.8 Forbidden-action lists shall be written on the agentisation sheet and the SOP. Implied forbids are non-conformant.

---

## 3. Segregation of duties and access

3.1 Confirming a duplicate close shall not be performed by the original capturer when another qualified person is available.  
3.2 Bank-master change and EX-BNK park shall not be performed by the same person in the same episode.  
3.3 Prompt/config change and production release shall not be performed by the same person.  
3.4 Agent service principals shall use least privilege. Delete-mail, void, approve, post, and master-write shall be absent unless a current expansion record grants a specific write.  
3.5 Shared posting accounts shall not be used.  
3.6 Access shall end the same day a person leaves the role.  
3.7 Human and agent access shall be certified at least quarterly.

---

## 4. Untrusted content, privacy, and output

4.1 Invoice images, email bodies, and statements shall be treated as untrusted. They shall not override system instructions or tool policy.  
4.2 Agents shall call only allow-listed tools.  
4.3 Agents shall not fetch arbitrary URLs found on documents.  
4.4 Required output fields shall carry a citation to a retrieved object or a face location.  
4.5 Output shall pass schema, tree-leaf, authority, and confidence validation before it is marked ready.  
4.6 Personal data shall be limited to the item in hand. Full-mailbox prompts are non-conformant.  
4.7 Bank identifiers shall be masked in default displays and in non-EX-BNK prompts.  
4.8 Production content shall not be used to train a shared external model without a written agreement and a privacy review.

---

## 5. Records

5.1 Audit logs shall include agent version, config hash, object id, proposal, validation result, human decision, and write attempts.  
5.2 Logs shall be append-only to business users.  
5.3 Process maps, trees, SOPs, prompts, model ids, and tolerance tables shall be versioned.  
5.4 A posted invoice shall be reconstructable against the versions that processed it.  
5.5 Retention shall follow the organisation’s records schedule and the evidence table in the framework.  
5.6 Evidence packs shall not be described as certifications.

---

## 6. Change, test, and release

6.1 Model changes and workflow changes shall follow change request, historical test, comparison against current behaviour, and control-owner release.  
6.2 The person who tunes shall not score the sealed hold-out pack.  
6.3 Shadow shall complete before a controlled pilot.  
6.4 A kill-switch shall name a person, a deputy, an action, and a time to effect, before the first live proposal.  
6.5 Rollback shall be identified before production release.  
6.6 Stale evidence (process, ERP, or model changed since the test) shall not support expansion.

---

## 7. Exceptions and language

7.1 Park reasons shall use the taxonomy. Local codes shall follow the extension rule.  
7.2 Critical codes (EX-DUP posted-risk, EX-ILE, EX-DOA, EX-BNK) shall route above the processor.  
7.3 EX-AGE shall be added, not used as the sole original code.  
7.4 User-facing text shall not claim guaranteed savings, fraud detection, compliance, accounting accuracy, autonomous payments, or ROI.  
7.5 Duplicate and bank-mismatch controls shall be described as error-reduction controls, not as a fraud programme.  
7.6 Estimated hours shall not be labelled validated financial savings.

---

## 8. Incidents, override, fallback

8.1 Unauthorised writes, duplicate posts, entity mis-posts, payee-data incidents, injection successes, privacy spills, and lost logs shall be incidents.  
8.2 The affected agent or path shall be stopped, logs preserved, and commit-landed checked before retry.  
8.3 Return to service shall use the release path.  
8.4 Overrides shall be attributable and sampled.  
8.5 The human SOP shall remain executable without agents.  
8.6 Agents shall not be the continuity plan for invoice-to-pay.

---

## 9. Measurement

9.1 Scorecards shall separate Activity, Operational, Financial, and Risk-control measures as defined in `../KPI_and_Measurement/KPI_FRAMEWORK.md`.  
9.2 Risk-control breaches may veto expansion regardless of operational measures.  
9.3 Definitions shall be locked before a pilot window. Mid-window formula changes invalidate the comparison unless the control owner restarts the window.

---

## 10. Vendor and model

10.1 Model hosting, training-use, deprecation, and incident notice shall be assessed before production data is sent.  
10.2 Model ids shall be pinned where the vendor allows. Forced swaps are incidents.  
10.3 A completed vendor questionnaire shall not replace output validation or human posting control.

---

## 11. External frameworks

11.1 NIST AI RMF and ISO/IEC 42001 may be considered when the organisation already runs an AI or control programme.  
11.2 No team shall state that this product pack, an implementation, or Northline Industrials is certified to, or officially aligned with, those frameworks on the basis of this standard.

---

## 12. Waivers

12.1 A waiver shall name the clause, the path, the expiry, the residual risk id, and the control-owner signature.  
12.2 Waivers shall not cover sections 2.1–2.6 (payment, approve, masters, GRN/PO writes, invented amounts, statement posting).  
12.3 Expired waivers shall be treated as non-conformant the next working day.

---

## 13. Conformity review

| Review | Who | When |
|---|---|---|
| Pre-shadow gate | Process owner + control owner | Before processors see proposals |
| Pre-pilot gate | Same + test lead | Before first live action |
| Quarterly certification | Control owner | Access, hashes, samples, kill-switch drill currency |
| Incident | Controller / privacy as applicable | Per event |

Northline pre-shadow gate for NIL PO-goods v03: sections 1–8 initialled by Chen and Shah on 2026-04-17, with R-17 and R-27 listed as open and out of agent scope until closed.

---

## 14. Non-conformity examples (for training)

| Situation | Clause | Required response |
|---|---|---|
| 03 Matching posts a “clear” invoice overnight | 2.7, 2.4 | Incident; stop agent; reverse or leave per controller |
| 08 Supplier Resolution sends “we will pay Friday” | 2.1, 7.4 | Recall if possible; incident; template lock |
| Implementer hot-swaps a model on Friday | 6.1, 10.2 | Incident; rollback; re-test |
| Dashboard tile “AI fraud score” | 7.4, 7.5 | Remove before release |
| Hours × rate shown as “savings delivered” | 7.6, 9.1 | Relabel as estimated hours; financial tile stays empty until validated |
