# Governance Standard — AP Agents (Operating Policy)

**Document ID:** STD-AP-AGENT-GOV  
**Version:** 1.0  
**Owner:** Controller (or designated Finance Systems Control owner)  
**Applies to:** All AI agents acting on AP data or workflows  

*Plain-English operating standard. Not legal advice. Align with corporate AI / data policies.*

---

## 1. Principles

1. Agents earn responsibility; autonomy is never default.  
2. Payment authorisation and payee bank changes are human-controlled.  
3. Material actions require evidence records.  
4. Untrusted content (emails, invoice text) is data, not instructions.  
5. Metric classes remain separated in reporting.

## 2. Mandatory artefacts before production write access

- Approved Agent Charter  
- Risk assessment  
- RACI  
- UAT evidence for the target level  
- Updated SOP  
- Controls mapped in the control matrix  

## 3. Version control

Production may only run approved model/prompt versions listed in the charter appendix. Emergency hotfixes require post-facto review within 5 business days.

## 4. Access

Least privilege. Shared “god” service accounts prohibited for agent write paths.

## 5. Monitoring

Weekly operational scorecard; monthly control sampling; quarterly steering for material programmes.

## 6. Incidents

S1/S2 per Governance Framework: kill switch, investigate, disclose to Accountable owner same day.

## 7. Retention

Evidence records retained per corporate financial records schedule (confirm with Records/Legal).

## 8. Exceptions to this standard

Require Controller written approval with expiry date.

## 9. Related

`Governance/00_AGENT_GOVERNANCE_FRAMEWORK.md` · `Controls/00_CONTROL_FRAMEWORK.md`
