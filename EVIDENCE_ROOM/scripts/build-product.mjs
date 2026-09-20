#!/usr/bin/env node
/**
 * Evidence Room — AP Agent OS Product Builder
 * Generates the complete commercial product file tree.
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function write(relPath, content) {
  const full = join(ROOT, relPath);
  ensureDir(dirname(full));
  writeFileSync(full, content, 'utf8');
  return relPath;
}

function csv(headers, rows) {
  const escape = (v) => {
    const s = String(v ?? '');
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(','), ...rows.map(r => r.map(escape).join(','))].join('\n');
}

// ─── AGENT DEFINITIONS ───────────────────────────────────────────────
const AGENTS = [
  { id: 'AGT-01', name: 'Invoice Intake Agent', purpose: 'Review incoming invoices for completeness, extraction quality, and downstream suitability.', inputs: 'Raw invoice (PDF/email/EDI), OCR output, supplier metadata', tools: 'OCR engine, email parser, supplier directory, document store', responsibilities: 'Classify intake channel; validate minimum fields present; flag extraction confidence; route to validation queue', exclusions: 'Does not approve payments; does not post to ERP; does not modify master data', owner: 'AP Operations Lead', approval: 'None for routing; human review for low-confidence extractions', escalation: 'Extraction confidence <85%; unreadable document; unknown supplier', outputs: 'Intake assessment record with confidence score and routing decision', controls: 'Document retention; access logging; PII handling', kpis: 'Extraction confidence rate, intake cycle time, misroute rate', risk: 'Medium' },
  { id: 'AGT-02', name: 'Invoice Validation Agent', purpose: 'Validate invoice header and line data against business rules and master data.', inputs: 'Structured invoice data, supplier master, PO references, legal entity config', tools: 'ERP read API, supplier master, tax tables, duplicate index', responsibilities: 'Validate supplier, invoice number, date, PO, legal entity, currency, amounts, tax fields, line completeness, duplicates', exclusions: 'Does not perform PO line matching; does not approve; does not execute payments', owner: 'AP Manager', approval: 'Human review for validation failures', escalation: 'Missing required fields; tax mismatch; potential duplicate', outputs: 'Validation result with pass/fail per field and exception codes', controls: 'Validation rule versioning; audit log of all checks performed', kpis: 'Validation accuracy, false-positive rate, field-level error rate', risk: 'Medium' },
  { id: 'AGT-03', name: 'Matching Agent', purpose: 'Perform PO, price, quantity, and receipt matching with tolerance analysis.', inputs: 'Invoice lines, PO data, goods receipt data, tolerance rules', tools: 'ERP PO/GR read APIs, matching engine, tolerance configuration', responsibilities: 'Two-way and three-way match; multi-line matching; tolerance application; variance quantification', exclusions: 'Does not create POs; does not approve variances; does not post invoices', owner: 'AP Manager', approval: 'Human approval for out-of-tolerance matches', escalation: 'Price variance >tolerance; quantity mismatch; no matching PO line', outputs: 'Match result per line with variance detail and recommended action', controls: 'Tolerance rule governance; match audit trail', kpis: 'Match rate, auto-match rate, variance detection accuracy', risk: 'High' },
  { id: 'AGT-04', name: 'Exception Triage Agent', purpose: 'Classify every AP exception into taxonomy and recommend next action.', inputs: 'Exception signals from all upstream agents, exception taxonomy', tools: 'Exception taxonomy, routing rules, priority matrix', responsibilities: 'Classify exception; assign priority; recommend resolver; estimate SLA', exclusions: 'Does not resolve exceptions; does not communicate with suppliers', owner: 'AP Operations Lead', approval: 'None for classification; human confirms priority overrides', escalation: 'High-risk exceptions; aged items >SLA; fraud indicators', outputs: 'Classified exception with priority, owner, and recommended action', controls: 'Taxonomy versioning; classification audit log', kpis: 'Classification accuracy, triage time, priority accuracy', risk: 'Medium' },
  { id: 'AGT-05', name: 'Goods Receipt Agent', purpose: 'Identify missing receipts and prepare internal follow-ups.', inputs: 'Unmatched invoices, PO data, receipt status, org chart', tools: 'ERP receipt API, employee directory, notification system', responsibilities: 'Detect missing/partial receipts; identify likely responsible employee; draft follow-up', exclusions: 'Does not create goods receipts; does not approve receipt posting', owner: 'Procurement / Receiving Lead', approval: 'Human approval before sending follow-ups', escalation: 'Receipt missing >5 business days; high-value PO', outputs: 'Receipt gap report with responsible party and draft communication', controls: 'Follow-up approval gate; communication logging', kpis: 'Receipt resolution rate, follow-up response time, GRNI reduction', risk: 'Medium' },
  { id: 'AGT-06', name: 'PO Quality Agent', purpose: 'Identify poor PO creation practices driving downstream AP exceptions.', inputs: 'PO data, exception history, supplier data, coding rules', tools: 'ERP PO API, exception analytics, master data', responsibilities: 'Detect wrong price, insufficient quantity, expired PO, incorrect coding, incomplete PO, wrong vendor, blanket PO misuse', exclusions: 'Does not modify POs; does not approve new POs', owner: 'Procurement Manager', approval: 'Reports only; human initiates PO corrections', escalation: 'Systemic PO quality issues from single requester', outputs: 'PO quality report with root cause and recommended procurement action', controls: 'Read-only access to PO data; report distribution controls', kpis: 'PO-related exception rate reduction, repeat offender identification', risk: 'Low' },
  { id: 'AGT-07', name: 'Approval Agent', purpose: 'Monitor approval workflows and identify bottlenecks.', inputs: 'Approval queue, DOA matrix, employee availability, payment calendar', tools: 'Workflow engine, org chart, calendar, delegation rules', responsibilities: 'Detect stalled approvals, absent approvers, delegation gaps, hierarchy issues, approaching deadlines', exclusions: 'Does not approve invoices; does not override DOA', owner: 'AP Manager', approval: 'Human initiates escalation and delegation changes', escalation: 'Payment deadline <3 days; approver absent >5 days', outputs: 'Approval status dashboard with bottleneck analysis and escalation recommendations', controls: 'Read-only workflow access; escalation audit trail', kpis: 'Approval cycle time, escalation rate, on-time approval rate', risk: 'Medium' },
  { id: 'AGT-08', name: 'Supplier Resolution Agent', purpose: 'Draft supplier communications for invoice-related issues.', inputs: 'Exception details, supplier contact data, communication templates', tools: 'Email draft system, supplier portal, template library', responsibilities: 'Draft communications for missing PO, duplicates, incorrect invoices, missing info, credit notes, statement differences', exclusions: 'Does not send without human approval; does not commit to payment terms', owner: 'AP Team Lead', approval: 'Mandatory human approval before any supplier communication', escalation: 'Disputed high-value invoice; legal/compliance concern', outputs: 'Draft supplier communication with context and recommended resolution', controls: 'Mandatory approval gate; communication archive; brand compliance', kpis: 'Supplier response rate, resolution time, communication quality score', risk: 'Medium' },
  { id: 'AGT-09', name: 'Internal Follow-Up Agent', purpose: 'Draft and manage internal follow-ups for AP exceptions.', inputs: 'Exception details, employee directory, internal templates', tools: 'Email/Teams integration, task management, template library', responsibilities: 'Follow up on missing GR, incorrect PO, approvals, coding, requester clarification, business-owner action', exclusions: 'Does not approve; does not modify ERP records', owner: 'AP Operations Lead', approval: 'Human approval for follow-up dispatch', escalation: 'No response after 2 follow-ups; executive-level blocker', outputs: 'Draft internal communication with tracking ID and SLA', controls: 'Approval before send; internal communication logging', kpis: 'Internal response rate, resolution time, repeat follow-up rate', risk: 'Low' },
  { id: 'AGT-10', name: 'Duplicate & Anomaly Agent', purpose: 'Identify duplicate invoices and payment anomalies. Not a fraud guarantee.', inputs: 'Invoice history, payment history, supplier patterns', tools: 'Duplicate detection engine, anomaly scoring, historical analytics', responsibilities: 'Detect exact/near duplicates, repeated amounts, suspicious number variations, supplier anomalies, unusual payment characteristics', exclusions: 'Does not block payments autonomously; does not guarantee fraud detection', owner: 'AP Manager / Internal Audit liaison', approval: 'Human review for all flagged items before hold', escalation: 'High-confidence duplicate; bank detail change + invoice', outputs: 'Anomaly report with confidence score and evidence package', controls: 'Detection rule governance; false-positive review process', kpis: 'Duplicate detection rate, false-positive rate, payments reviewed', risk: 'High' },
  { id: 'AGT-11', name: 'Vendor Statement Reconciliation Agent', purpose: 'Reconcile supplier statements against AP sub-ledger.', inputs: 'Supplier statement, AP open items, payment history', tools: 'Statement parser, AP sub-ledger read, matching engine', responsibilities: 'Match statement lines to AP records; identify missing items, timing differences, discrepancies', exclusions: 'Does not approve adjustments; does not initiate payments', owner: 'AP Reconciliation Lead', approval: 'Human review for all discrepancies', escalation: 'Material discrepancy; potential duplicate payment risk', outputs: 'Reconciliation report with matched/unmatched items and variance detail', controls: 'Statement handling procedures; reconciliation sign-off', kpis: 'Reconciliation completion rate, discrepancy resolution time', risk: 'Medium' },
  { id: 'AGT-12', name: 'Payment Proposal Review Agent', purpose: 'Analytical pre-payment review. Payment authorisation remains human-controlled.', inputs: 'Payment proposal, invoice status, approval records, master data changes', tools: 'Payment system read API, approval status, bank master', responsibilities: 'Review for duplicates, unusual changes, high-value items, missing approvals, holds, bank/master-data changes', exclusions: 'Does NOT authorise payments; does NOT execute payment runs', owner: 'Treasury / AP Manager', approval: 'All payments require human authorisation', escalation: 'Duplicate in proposal; bank detail change; missing approval on high-value', outputs: 'Pre-payment review report with risk flags and recommended holds', controls: 'Mandatory human payment authorisation; review audit trail', kpis: 'Review completion rate, issues caught pre-payment, false hold rate', risk: 'Critical' },
  { id: 'AGT-13', name: 'AP Close Agent', purpose: 'Support month-end AP completeness and accrual activities.', inputs: 'Open invoice queue, blocked items, aged receipts, cut-off calendar', tools: 'ERP AP data, close calendar, accrual templates', responsibilities: 'Identify unresolved/unprocessed/blocked invoices, aged receipts, potential accruals, cut-off issues', exclusions: 'Does not post accruals; does not approve close sign-off', owner: 'AP Manager / Controller', approval: 'Controller sign-off on close package', escalation: 'Material open items at cut-off; accrual estimate >threshold', outputs: 'AP close readiness report with accrual recommendations', controls: 'Close checklist governance; segregation of duties on accruals', kpis: 'Close cycle time, open item count at close, accrual accuracy', risk: 'High' },
  { id: 'AGT-14', name: 'AP Reporting Agent', purpose: 'Produce daily, weekly, and monthly AP operational reports.', inputs: 'AP operational data, KPI definitions, reporting calendar', tools: 'BI connector, KPI engine, report templates', responsibilities: 'Generate standard reports; highlight variances from baseline; distribute to stakeholders', exclusions: 'Does not make operational decisions; does not modify data', owner: 'AP Manager', approval: 'Report distribution list governed by AP Manager', escalation: 'KPI breach beyond threshold', outputs: 'Scheduled reports with commentary and exception highlights', controls: 'Report access controls; data accuracy validation', kpis: 'Report delivery timeliness, data accuracy, stakeholder satisfaction', risk: 'Low' },
  { id: 'AGT-15', name: 'Root Cause Agent', purpose: 'Analyse recurring exceptions to identify systemic causes.', inputs: 'Exception history, resolution data, process maps, master data quality metrics', tools: 'Analytics engine, process documentation, trend analysis', responsibilities: 'Identify patterns in supplier quality, PO discipline, employee behaviour, receipt discipline, system config, master data, approval structures', exclusions: 'Does not implement fixes; recommends only', owner: 'Process Excellence / AP Manager', approval: 'Human prioritises improvement initiatives', escalation: 'Systemic issue affecting >10% of exceptions', outputs: 'Root cause analysis report with Pareto breakdown and improvement recommendations', controls: 'Analysis methodology versioning; recommendation tracking', kpis: 'Repeat exception rate reduction, root cause identification accuracy', risk: 'Low' },
  { id: 'AGT-16', name: 'AP Manager / Orchestrator Agent', purpose: 'Supervisory layer across the agent workforce.', inputs: 'All agent outputs, KPIs, workload data, SLA status', tools: 'Agent registry, task queue, performance dashboard, escalation engine', responsibilities: 'Distribute tasks, monitor performance, track exceptions, prioritise work, escalate, maintain metrics, recommend responsibility progression, identify underperformers', exclusions: 'Does not override human decisions; does not autonomously expand agent authority', owner: 'Head of AP / Finance Transformation', approval: 'Human approves all responsibility level changes', escalation: 'Agent performance below threshold; SLA breach; control incident', outputs: 'Orchestration dashboard, workload allocation, performance reports, responsibility recommendations', controls: 'Agent authority matrix; responsibility change approval workflow', kpis: 'Overall AP throughput, agent utilisation, SLA compliance, cost per outcome', risk: 'High' },
];

const EXCEPTIONS = [
  { code: 'EXC-001', name: 'Missing PO', definition: 'Invoice received without a valid purchase order reference', rootCause: 'Non-PO spend, PO not created, wrong PO referenced', data: 'Invoice, supplier, requester history', resolution: 'Obtain PO or process as non-PO per policy', party: 'Requester / Procurement', escalation: 'Value >$10K or recurring', agent: 'AGT-04, AGT-08', automation: 'High', risk: 'Medium' },
  { code: 'EXC-002', name: 'Invalid PO', definition: 'Referenced PO does not exist or is not valid for this supplier/entity', rootCause: 'Data entry error, wrong PO number, cancelled PO', data: 'PO master, invoice, supplier', resolution: 'Verify correct PO; request new PO if needed', party: 'Requester / Procurement', escalation: 'Repeat from same requester', agent: 'AGT-02, AGT-06', automation: 'High', risk: 'Medium' },
  { code: 'EXC-003', name: 'PO Closed', definition: 'PO is closed but invoice references it', rootCause: 'Late invoice, PO closed prematurely', data: 'PO status, invoice date, receipt history', resolution: 'Reopen PO or create new PO per policy', party: 'Procurement', escalation: 'Material amount', agent: 'AGT-03, AGT-06', automation: 'Medium', risk: 'Medium' },
  { code: 'EXC-004', name: 'PO Exhausted', definition: 'Invoice amount exceeds remaining PO value', rootCause: 'Scope change, partial invoicing, PO underfunded', data: 'PO balance, invoice amount', resolution: 'Amend PO or split invoice', party: 'Requester / Procurement', escalation: 'Overage >10%', agent: 'AGT-03', automation: 'High', risk: 'Medium' },
  { code: 'EXC-005', name: 'Price Mismatch', definition: 'Invoice price differs from PO price beyond tolerance', rootCause: 'Price change, wrong PO line, currency issue', data: 'Invoice line, PO line, tolerance rules', resolution: 'Verify with supplier; amend PO or accept variance', party: 'Procurement / AP', escalation: 'Variance >tolerance', agent: 'AGT-03', automation: 'High', risk: 'Medium' },
  { code: 'EXC-006', name: 'Quantity Mismatch', definition: 'Invoiced quantity differs from PO/receipt quantity', rootCause: 'Partial delivery, over-billing, unit mismatch', data: 'Invoice qty, PO qty, receipt qty', resolution: 'Verify delivery; adjust invoice or receipt', party: 'Receiving / AP', escalation: 'Material quantity difference', agent: 'AGT-03, AGT-05', automation: 'High', risk: 'Medium' },
  { code: 'EXC-007', name: 'Missing Receipt', definition: 'Goods/services receipt not recorded for PO-based invoice', rootCause: 'Receipt not entered, goods not received, service not confirmed', data: 'PO, receipt status, delivery notes', resolution: 'Confirm receipt; enter GR or escalate', party: 'Receiving / Requester', escalation: '>5 business days', agent: 'AGT-05', automation: 'High', risk: 'High' },
  { code: 'EXC-008', name: 'Partial Receipt', definition: 'Receipt quantity less than invoiced quantity', rootCause: 'Partial delivery, premature invoicing', data: 'Receipt qty, invoice qty', resolution: 'Wait for balance or adjust invoice', party: 'Receiving', escalation: 'Balance due >30 days', agent: 'AGT-05, AGT-03', automation: 'Medium', risk: 'Medium' },
  { code: 'EXC-009', name: 'Duplicate Invoice', definition: 'Exact duplicate of previously processed invoice', rootCause: 'Supplier error, system resubmission', data: 'Invoice number, amount, date, supplier', resolution: 'Reject duplicate; request credit if paid', party: 'AP', escalation: 'If already paid', agent: 'AGT-10', automation: 'High', risk: 'High' },
  { code: 'EXC-010', name: 'Potential Duplicate', definition: 'Near-duplicate suggesting possible double billing', rootCause: 'Similar invoice number, amount, date from same supplier', data: 'Invoice history, fuzzy match scores', resolution: 'Investigate; confirm with supplier', party: 'AP', escalation: 'High confidence match', agent: 'AGT-10', automation: 'Medium', risk: 'High' },
  { code: 'EXC-011', name: 'Wrong Supplier', definition: 'Invoice from supplier not matching PO or master data', rootCause: 'Supplier acquisition, wrong vendor selected, fraud', data: 'Supplier master, PO vendor, invoice header', resolution: 'Verify supplier identity; update master if legitimate', party: 'AP / Procurement', escalation: 'Bank detail change involved', agent: 'AGT-02, AGT-10', automation: 'Medium', risk: 'High' },
  { code: 'EXC-012', name: 'Incorrect Legal Entity', definition: 'Invoice addressed to wrong company entity', rootCause: 'Multi-entity supplier confusion, wrong entity on PO', data: 'Legal entity master, invoice, PO', resolution: 'Reassign to correct entity or reject', party: 'AP', escalation: 'Cross-entity payment risk', agent: 'AGT-02', automation: 'High', risk: 'High' },
  { code: 'EXC-013', name: 'Tax Issue', definition: 'Tax amount, rate, or registration inconsistent with rules', rootCause: 'Wrong tax code, exempt supplier charged tax, cross-border issue', data: 'Tax tables, invoice tax lines, supplier tax status', resolution: 'Correct tax coding; request amended invoice if needed', party: 'AP / Tax', escalation: 'Material tax variance', agent: 'AGT-02', automation: 'Medium', risk: 'High' },
  { code: 'EXC-014', name: 'Approval Missing', definition: 'Required approval not obtained per DOA', rootCause: 'Approver unavailable, workflow gap, wrong routing', data: 'DOA matrix, approval history, invoice amount', resolution: 'Route to correct approver; obtain approval', party: 'Approver / AP', escalation: 'Payment deadline approaching', agent: 'AGT-07', automation: 'High', risk: 'Medium' },
  { code: 'EXC-015', name: 'DOA Issue', definition: 'Delegation of authority problem preventing approval', rootCause: 'Absent approver, expired delegation, hierarchy gap', data: 'DOA matrix, delegation records, org chart', resolution: 'Activate delegation or escalate to backup approver', party: 'AP Manager', escalation: 'No backup available', agent: 'AGT-07', automation: 'Medium', risk: 'Medium' },
  { code: 'EXC-016', name: 'Coding Missing', definition: 'GL/cost centre/project coding not assigned', rootCause: 'Non-PO invoice, unclear spend category', data: 'Coding rules, invoice description, requester', resolution: 'Assign coding per policy; confirm with requester', party: 'AP / Requester', escalation: 'Month-end approaching', agent: 'AGT-02, AGT-09', automation: 'High', risk: 'Low' },
  { code: 'EXC-017', name: 'Invalid Cost Centre', definition: 'Assigned cost centre closed, invalid, or unauthorised', rootCause: 'Org restructure, coding error, expired project', data: 'Cost centre master, org structure', resolution: 'Reassign to valid cost centre', party: 'Requester / FP&A', escalation: 'Material amount', agent: 'AGT-02', automation: 'High', risk: 'Medium' },
  { code: 'EXC-018', name: 'Invoice Quality', definition: 'Invoice document illegible, incomplete, or non-compliant', rootCause: 'Poor supplier invoice format, damaged scan', data: 'Invoice image, OCR confidence', resolution: 'Request corrected invoice from supplier', party: 'AP / Supplier', escalation: 'Repeated from same supplier', agent: 'AGT-01', automation: 'Medium', risk: 'Low' },
  { code: 'EXC-019', name: 'OCR/Extraction Issue', definition: 'Automated extraction failed or low confidence', rootCause: 'Unusual format, poor scan quality, handwritten elements', data: 'OCR output, confidence scores', resolution: 'Manual review and correction', party: 'AP', escalation: 'High-volume supplier affected', agent: 'AGT-01', automation: 'Low', risk: 'Low' },
  { code: 'EXC-020', name: 'Master Data Issue', definition: 'Supplier, item, or coding master data incorrect or stale', rootCause: 'Incomplete onboarding, org changes, data migration', data: 'Master data records, change history', resolution: 'Correct master data; reprocess invoice', party: 'Master Data / AP', escalation: 'Systemic data quality issue', agent: 'AGT-02, AGT-15', automation: 'Medium', risk: 'Medium' },
  { code: 'EXC-021', name: 'Banking Change Concern', definition: 'Supplier bank details changed recently', rootCause: 'Legitimate change, potential fraud, acquisition', data: 'Bank master history, supplier verification', resolution: 'Verify change through established protocol', party: 'AP / Treasury', escalation: 'Always — mandatory verification', agent: 'AGT-10, AGT-12', automation: 'Low', risk: 'Critical' },
  { code: 'EXC-022', name: 'Credit Note Required', definition: 'Invoice should be credited rather than processed', rootCause: 'Duplicate payment, overcharge, return', data: 'Payment history, invoice, correspondence', resolution: 'Request credit note; apply against open balance', party: 'AP / Supplier', escalation: 'If payment already made', agent: 'AGT-08', automation: 'Medium', risk: 'Medium' },
  { code: 'EXC-023', name: 'Statement Discrepancy', definition: 'Supplier statement does not match AP records', rootCause: 'Timing difference, missing invoice, payment in transit', data: 'Statement, AP sub-ledger, payment history', resolution: 'Reconcile and resolve differences', party: 'AP', escalation: 'Material unmatched items', agent: 'AGT-11', automation: 'Medium', risk: 'Medium' },
  { code: 'EXC-024', name: 'Payment Hold', definition: 'Invoice or supplier on payment hold', rootCause: 'Dispute, compliance, credit hold, audit', data: 'Hold reason, hold authority, invoice status', resolution: 'Resolve hold reason; obtain release authority', party: 'AP Manager / Treasury', escalation: 'Hold approaching expiry', agent: 'AGT-12', automation: 'High', risk: 'Medium' },
  { code: 'EXC-025', name: 'Disputed Invoice', definition: 'Invoice under active dispute with supplier', rootCause: 'Quality issue, pricing disagreement, non-delivery', data: 'Dispute record, correspondence, PO/receipt', resolution: 'Resolve dispute; process or credit', party: 'Procurement / AP', escalation: 'Legal involvement', agent: 'AGT-08', automation: 'Low', risk: 'High' },
  { code: 'EXC-026', name: 'Aged Unresolved Item', definition: 'Exception open beyond defined SLA', rootCause: 'Any unresolved exception exceeding ageing threshold', data: 'Exception age, history, assigned owner', resolution: 'Escalate; executive review if critical', party: 'AP Manager', escalation: 'Automatic at SLA breach', agent: 'AGT-04, AGT-16', automation: 'High', risk: 'High' },
  { code: 'EXC-027', name: 'System/Interface Error', definition: 'Technical failure in AP system or integration', rootCause: 'ERP outage, interface timeout, data format error', data: 'Error logs, interface status', resolution: 'IT resolution; manual processing if urgent', party: 'IT / AP', escalation: 'Payment impact', agent: 'AGT-16', automation: 'Low', risk: 'Medium' },
];

const DIAGNOSTIC_QUESTIONS = [
  ['Q01', 'Process', 'What percentage of invoices are processed without human touch (straight-through)?', '0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
  ['Q02', 'Process', 'Average days to process a single invoice from receipt to posting?', '>15 days', '10-15 days', '5-10 days', '2-5 days', '<2 days'],
  ['Q03', 'Process', 'What is your approximate invoice exception rate?', '>25%', '15-25%', '10-15%', '5-10%', '<5%'],
  ['Q04', 'Process', 'Percentage of invoices matched to a purchase order?', '<40%', '40-60%', '60-75%', '75-90%', '>90%'],
  ['Q05', 'Process', 'How are invoices primarily received?', 'Paper/mail', 'Email PDF', 'Supplier portal', 'EDI/e-invoice', 'Mixed channels'],
  ['Q06', 'Technology', 'Do you have AP automation software deployed?', 'No', 'Pilot/evaluating', 'Partial (1-2 processes)', 'Most processes', 'End-to-end automated'],
  ['Q07', 'Technology', 'Is OCR/AI extraction in use for invoice data capture?', 'No', 'Evaluating', 'Basic OCR', 'ML-enhanced OCR', 'AI with continuous learning'],
  ['Q08', 'Technology', 'ERP system in use?', 'Legacy/on-prem', 'Cloud ERP (single)', 'Cloud ERP (multi-entity)', 'ERP + AP automation', 'Fully integrated stack'],
  ['Q09', 'Data', 'How would you rate supplier master data quality?', 'Poor', 'Below average', 'Adequate', 'Good', 'Excellent'],
  ['Q10', 'Data', 'How would you rate PO data quality and discipline?', 'Poor', 'Below average', 'Adequate', 'Good', 'Excellent'],
  ['Q11', 'Governance', 'Is there a defined AI/automation governance framework in Finance?', 'No', 'Informal', 'Draft/in development', 'Approved but not enforced', 'Fully operational'],
  ['Q12', 'Governance', 'Are agent/automation responsibilities formally defined with owners?', 'No', 'Partially', 'For some processes', 'Most processes', 'All processes'],
  ['Q13', 'Governance', 'Do you measure automation/agent performance with defined KPIs?', 'No', 'Ad hoc', 'Some metrics', 'Defined KPIs', 'KPIs with targets and review'],
  ['Q14', 'People', 'AP team willingness to adopt AI-assisted workflows?', 'Resistant', 'Cautious', 'Neutral', 'Positive', 'Championing'],
  ['Q15', 'People', 'Is there executive sponsorship for AP transformation?', 'No', 'Informal interest', 'Sponsored project', 'Funded initiative', 'Strategic priority'],
  ['Q16', 'Controls', 'Segregation of duties defined for AP automation?', 'No', 'Partially', 'Documented', 'Enforced', 'Audited regularly'],
  ['Q17', 'Controls', 'Audit trail requirements for automated decisions understood?', 'No', 'Partially', 'Documented', 'Implemented', 'Tested and certified'],
  ['Q18', 'Volume', 'Monthly invoice volume?', '<500', '500-2,000', '2,000-10,000', '10,000-50,000', '>50,000'],
  ['Q19', 'Volume', 'Number of active suppliers?', '<100', '100-500', '500-2,000', '2,000-10,000', '>10,000'],
  ['Q20', 'Volume', 'Number of legal entities AP supports?', '1', '2-5', '6-15', '16-50', '>50'],
  ['Q21', 'Complexity', 'Percentage of non-PO invoices?', '>60%', '40-60%', '20-40%', '10-20%', '<10%'],
  ['Q22', 'Complexity', 'Multi-line invoice frequency?', 'Rare', 'Occasional', 'Common', 'Most invoices', 'Nearly all'],
  ['Q23', 'Complexity', 'Cross-border / multi-currency invoice volume?', '<10%', '10-25%', '25-50%', '50-75%', '>75%'],
  ['Q24', 'Opportunity', 'Biggest AP pain point today?', 'Manual data entry', 'Exception resolution', 'Approval bottlenecks', 'Supplier issues', 'Reporting/visibility'],
  ['Q25', 'Opportunity', 'Where would AI agents deliver most value first?', 'Invoice capture', 'Matching', 'Exception triage', 'Approvals', 'Reporting/analytics'],
  ['Q26', 'Economics', 'Estimated cost to process one invoice (all-in)?', '>$12', '$8-12', '$5-8', '$3-5', '<$3'],
  ['Q27', 'Economics', 'AP headcount dedicated to invoice processing?', '>20 FTE', '10-20 FTE', '5-10 FTE', '2-5 FTE', '<2 FTE'],
  ['Q28', 'Economics', 'Have you built a business case for AP automation/AI?', 'No', 'Informal estimate', 'Draft', 'Approved', 'Realised benefits tracked'],
  ['Q29', 'Readiness', 'API/integration access to ERP AP module available?', 'No', 'Read-only', 'Limited write', 'Full API', 'Event-driven integration'],
  ['Q30', 'Readiness', 'Historical invoice data available for agent testing?', 'No', '<6 months', '6-12 months', '1-3 years', '>3 years'],
];

// ─── GENERATE FILES ──────────────────────────────────────────────────
const files = [];

// Research Ledger
files.push(['09_RESEARCH/RESEARCH_LEDGER.csv', csv(
  ['claim_id', 'claim', 'source', 'date', 'url', 'context', 'type'],
  [
    ['R001', 'Average AP cost to process one invoice: $9.40', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'All-inclusive staff and operating costs, n=212', 'independent'],
    ['R002', 'Best-in-Class AP cost per invoice: $2.78', 'Ardent Partners - AP Metrics that Matter 2025', '2025', 'https://ardentpartners.com/ap-metrics-that-matter-in-2025/', 'Bottom 20% by cost and cycle time', 'independent'],
    ['R003', 'All others average cost per invoice: $12.88', 'Ardent Partners - AP Metrics that Matter 2025', '2025', 'https://ardentpartners.com/ap-metrics-that-matter-in-2025/', 'Non-Best-in-Class organisations', 'independent'],
    ['R004', 'Average invoice processing time: 9.15 days', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Receipt to posting', 'independent'],
    ['R005', 'Invoice exception rate: 14.0%', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Average across surveyed organisations', 'independent'],
    ['R006', 'Straight-through processing rate: 32.6%', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Invoices processed without manual intervention', 'independent'],
    ['R007', 'Invoices linked to PO: 61.0%', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Percentage of invoices with PO reference', 'independent'],
    ['R008', 'Staff time on supplier inquiries: 21.8%', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Average AP staff time allocation', 'independent'],
    ['R009', 'Best-in-Class: 78% lower processing cost vs peers', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Best-in-Class vs all others comparison', 'independent'],
    ['R010', 'Best-in-Class: 82% faster processing time', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Cycle time comparison', 'independent'],
    ['R011', 'Best-in-Class: 59% lower exception rate', 'Ardent Partners - State of ePayables 2024', '2024', 'https://ardentpartners.com/', 'Exception rate comparison', 'independent'],
    ['R012', 'Lemon Squeezy platform fee: 5% + $0.50 per transaction', 'Lemon Squeezy Pricing', '2025', 'https://www.lemonsqueezy.com/pricing', 'No monthly fee; MoR included', 'vendor'],
    ['R013', 'Lemon Squeezy acts as Merchant of Record', 'Lemon Squeezy MoR', '2025', 'https://www.lemonsqueezy.com/reporting/merchant-of-record', 'Handles global tax collection and remittance', 'vendor'],
    ['R014', 'HighRadius claims up to 90% touchless processing', 'HighRadius AP Automation', '2025', 'https://www.highradius.com/product/ap-automation/', 'Vendor marketing claim — not independently verified', 'vendor'],
    ['R015', 'Medius: AI auto-fills coding with 95% precision after 2 invoices', 'Medius Blog', '2025', 'https://www.medius.com/blog/', 'Vendor claim for non-PO invoice coding', 'vendor'],
    ['R016', 'Illustrative: 4-6 weeks for one well-bounded agent pilot', 'Evidence Room Framework', '2025', 'N/A — internal framework', 'Depends on systems, data, governance maturity', 'illustrative'],
  ]
)]);

// Exception Taxonomy CSV
files.push(['03_AP_AGENT_OS_PRO/Governance/EXCEPTION_TAXONOMY.csv', csv(
  ['code', 'name', 'definition', 'probable_root_cause', 'required_data', 'suggested_resolution', 'responsible_party', 'escalation', 'assigned_agent', 'automation_potential', 'risk_level'],
  EXCEPTIONS.map(e => [e.code, e.name, e.definition, e.rootCause, e.data, e.resolution, e.party, e.escalation, e.agent, e.automation, e.risk])
)]);

// Agent Registry CSV
files.push(['03_AP_AGENT_OS_PRO/Agent_Library/AGENT_REGISTRY.csv', csv(
  ['agent_id', 'name', 'purpose', 'human_owner', 'default_autonomy_level', 'risk_level', 'primary_kpis'],
  AGENTS.map(a => [a.id, a.name, a.purpose, a.owner, '0 - Observe', a.risk, a.kpis])
)]);

// Agent Control Matrix
const controlRows = AGENTS.flatMap(a => [
  [a.id, a.name, 'Incorrect automated decision', 'Mandatory human approval for actions above Level 1', 'Preventive', a.owner, 'Approval log + audit trail', 'Per transaction', 'Unapproved action attempted'],
  [a.id, a.name, 'Data privacy breach', 'Least-privilege data access; PII masking', 'Preventive', 'IT Security / ' + a.owner, 'Access review records', 'Quarterly', 'Unauthorized data access detected'],
  [a.id, a.name, 'Model drift / accuracy degradation', 'Performance monitoring against KPI thresholds', 'Detective', a.owner, 'Performance scorecard', 'Weekly', 'KPI below threshold for 2 consecutive periods'],
]);
files.push(['03_AP_AGENT_OS_PRO/Controls/AGENT_CONTROL_MATRIX.csv', csv(
  ['agent_id', 'agent_name', 'risk', 'control', 'control_type', 'human_owner', 'evidence', 'frequency', 'escalation_trigger'],
  controlRows
)]);

// KPI Scorecard
const kpis = [
  ['ACT-001', 'Activity', 'Invoices processed', 'Count of invoices entering AP pipeline', 'Daily/Weekly/Monthly', 'Volume trend', 'Higher is not always better — quality matters'],
  ['ACT-002', 'Activity', 'Exceptions created', 'Count of new exceptions classified', 'Daily/Weekly', 'Exception rate = exceptions/invoices', 'Track by category'],
  ['ACT-003', 'Activity', 'Agent recommendations generated', 'Count of agent outputs requiring human review', 'Weekly', 'Recommendation volume by agent', 'Activity metric only'],
  ['ACT-004', 'Activity', 'Human interventions', 'Count of manual overrides or corrections', 'Weekly', 'Intervention rate = interventions/invoices', 'Should decrease over time'],
  ['OP-001', 'Operational', 'Straight-through processing rate', 'Invoices posted without manual touch / total invoices', 'Monthly', 'Target: benchmark vs 32.6% industry avg (Ardent 2024)', 'Independent benchmark: R006'],
  ['OP-002', 'Operational', 'Exception resolution rate', 'Exceptions resolved within SLA / total exceptions', 'Weekly', 'Target: >85%', ''],
  ['OP-003', 'Operational', 'Average resolution time', 'Mean hours from exception creation to resolution', 'Weekly', 'Target: reduce 20% per quarter', ''],
  ['OP-004', 'Operational', 'Time to invoice posting', 'Mean days from receipt to ERP posting', 'Monthly', 'Target: benchmark vs 9.15 days industry avg (Ardent 2024)', 'Independent benchmark: R004'],
  ['OP-005', 'Operational', 'Classification accuracy', 'Correctly classified exceptions / total classified', 'Monthly', 'Target: >90%', 'Agent-specific'],
  ['OP-006', 'Operational', 'Matching accuracy', 'Correct auto-matches / total match attempts', 'Monthly', 'Target: >95%', 'Agent-specific: AGT-03'],
  ['OP-007', 'Operational', 'False-positive rate', 'Incorrect flags / total flags', 'Monthly', 'Target: <5%', 'Critical for trust'],
  ['OP-008', 'Operational', 'Repeat exception rate', 'Exceptions from same root cause within 90 days / total', 'Monthly', 'Target: decreasing trend', 'Root cause indicator'],
  ['FIN-001', 'Financial', 'Cost per invoice', 'Total AP cost / invoices processed', 'Monthly', 'Target: benchmark vs $9.40 industry avg (Ardent 2024)', 'Independent benchmark: R001'],
  ['FIN-002', 'Financial', 'Cost per exception resolved', 'Exception resolution cost / exceptions resolved', 'Monthly', 'Target: decreasing trend', ''],
  ['FIN-003', 'Financial', 'AI inference cost per invoice', 'Total AI/API costs / invoices processed', 'Monthly', 'Target: <$0.50/invoice illustrative', 'Illustrative target'],
  ['FIN-004', 'Financial', 'Cost per correct outcome', 'Total agent cost / verified correct outcomes', 'Monthly', 'Target: <$2.00 illustrative', 'Illustrative target'],
  ['FIN-005', 'Financial', 'Estimated human hours released', 'Baseline hours - current hours (validated)', 'Quarterly', 'Requires time-motion study', 'Conservative estimate only'],
  ['FIN-006', 'Financial', 'Validated financial savings', 'Documented savings from automation (audited)', 'Quarterly', 'Conservative/Base/Upside scenarios', 'Do not overstate'],
  ['RISK-001', 'Risk/Control', 'Control breaches', 'Count of SoD or control violations', 'Monthly', 'Target: zero', ''],
  ['RISK-002', 'Risk/Control', 'Escalation rate', 'Escalated items / total exceptions', 'Monthly', 'Monitor trend', ''],
  ['RISK-003', 'Risk/Control', 'Audit exceptions', 'Findings related to AP automation', 'Per audit', 'Target: zero material findings', ''],
  ['RISK-004', 'Risk/Control', 'Rework rate', 'Invoices reprocessed / total processed', 'Monthly', 'Target: <2%', ''],
  ['RISK-005', 'Risk/Control', 'Duplicate payments prevented', 'Duplicates caught pre-payment', 'Monthly', 'Track value where measurable', 'Not a fraud guarantee'],
];
files.push(['03_AP_AGENT_OS_PRO/KPI_and_Measurement/KPI_DEFINITIONS.csv', csv(
  ['kpi_id', 'category', 'metric_name', 'definition', 'frequency', 'target_guidance', 'notes'],
  kpis
)]);

// ROI Calculator
files.push(['03_AP_AGENT_OS_PRO/Business_Case/ROI_CALCULATOR.csv', csv(
  ['input_parameter', 'your_value', 'notes', 'source'],
  [
    ['Monthly invoice volume', '5000', 'Enter your actual volume', ''],
    ['AP headcount (processing)', '8', 'FTE dedicated to invoice processing', ''],
    ['Fully loaded cost per FTE (annual)', '75000', 'Salary + benefits + overhead', ''],
    ['Current cost per invoice', '9.40', 'Industry average if unknown', 'Ardent Partners 2024 - R001'],
    ['Current manual touch rate (%)', '67', '100% minus STP rate', 'Derived from 32.6% STP - R006'],
    ['Current exception rate (%)', '14', 'Industry average if unknown', 'Ardent Partners 2024 - R005'],
    ['Avg minutes to resolve exception', '45', 'Time-motion study recommended', ''],
    ['Duplicate invoice rate (%)', '0.5', 'Estimate if unknown', ''],
    ['AI/tool monthly cost', '2000', 'LLM API + automation platform', ''],
    ['Implementation cost (one-time)', '50000', 'Internal effort + external support', ''],
    ['Expected STP improvement (pp)', '15', 'Conservative scenario', 'Illustrative'],
    ['Expected exception reduction (pp)', '3', 'Conservative scenario', 'Illustrative'],
    ['', '', '', ''],
    ['OUTPUT', 'Conservative', 'Base', 'Upside'],
    ['Annual invoice volume', '=B2*12', '=B2*12', '=B2*12'],
    ['Baseline annual AP cost', '=B5*B17', '=B5*B17', '=B5*B17'],
    ['Processing cost savings', '=B17*B11/100*B5*0.5', '=B17*B11/100*B5*0.75', '=B17*B11/100*B5'],
    ['Exception cost savings', '=B17*B12/100*B7/60*B3*75000/1920', '=B17*B12/100*B7/60*B3*75000/1920*1.5', '=B17*B12/100*B7/60*B3*75000/1920*2'],
    ['Total annual savings', '=B19+B20', '=C19+C20', '=D19+D20'],
    ['Annual AI/tool cost', '=B10*12', '=B10*12', '=B10*12'],
    ['Net annual benefit', '=B21-B22', '=C21-C22', '=D21-D22'],
    ['Payback period (months)', '=B11/(B23/12)', '=B11/(C23/12)', '=B11/(D23/12)'],
    ['3-year ROI (%)', '=(B23*3-B11)/(B11)*100', '=(C23*3-B11)/(B11)*100', '=(D23*3-B11)/(B11)*100'],
  ]
)]);

// Diagnostic CSV
files.push(['01_FREE_AP_AI_READINESS/DIAGNOSTIC_QUESTIONS.csv', csv(
  ['question_id', 'category', 'question', 'score_1', 'score_2', 'score_3', 'score_4', 'score_5'],
  DIAGNOSTIC_QUESTIONS
)]);

// Maturity Model
files.push(['01_FREE_AP_AI_READINESS/MATURITY_MODEL.csv', csv(
  ['level', 'name', 'description', 'typical_characteristics', 'agent_readiness'],
  [
    ['1', 'Manual', 'Paper-heavy, manual entry, minimal automation', 'Email PDFs, spreadsheet tracking, no OCR', 'Not ready — stabilise process first'],
    ['2', 'Digitising', 'Basic scanning/OCR, some workflow', 'OCR deployed, basic approval workflow, ERP posting', 'Ready for Observe-level agents'],
    ['3', 'Automating', 'Workflow automation, partial matching', 'AP automation tool, PO matching, exception queues', 'Ready for Recommend/Prepare agents'],
    ['4', 'Optimising', 'High STP, analytics-driven, governed AI', '>50% STP, KPI dashboards, AI governance framework', 'Ready for Execute within guardrails'],
    ['5', 'Autonomous (Governed)', 'Agent workforce with earned autonomy', '>70% STP, agent orchestration, continuous improvement', 'Ready for Managed autonomy (selected agents)'],
  ]
)]);

// Implementation Roadmap
const phases = [
  ['0', 'Baseline & Readiness', '1-2 weeks', 'Complete diagnostic, establish KPI baseline, secure sponsorship', 'Readiness score, baseline KPIs, sponsor commitment'],
  ['1', 'Process Discovery', '2-3 weeks', 'Observe, transcribe, extract AP process; map exceptions and controls', 'Process map, exception taxonomy, control map'],
  ['2', 'Agent Specification', '1-2 weeks', 'Select first agent; write charter, controls, KPIs', 'Agent charter, control matrix, test plan'],
  ['3', 'Data & Tool Access', '1-3 weeks', 'Configure read access, APIs, historical data for testing', 'Integration spec, data access log'],
  ['4', 'Prototype', '1-2 weeks', 'Build agent logic; test against historical cases', 'Prototype results, accuracy report'],
  ['5', 'Historical Testing', '1-2 weeks', 'Run agent against 3+ months historical data', 'Test results, accuracy/confidence metrics'],
  ['6', 'Shadow Mode', '2-4 weeks', 'Agent operates without action permissions; compare to human', 'Shadow report, divergence analysis'],
  ['7', 'Controlled Execution', '2-4 weeks', 'Limited users/transactions/categories at Level 2-3', 'Pilot results, exception handling log'],
  ['8', 'Performance Review', '1 week', 'Evaluate KPIs against targets; decide on progression', 'Performance review, go/no-go decision'],
  ['9', 'Responsibility Progression', 'Ongoing', 'Earn higher autonomy through demonstrated performance', 'Updated autonomy levels, evidence package'],
  ['10', 'Scale', 'Ongoing', 'Add agents, expand scope, continuous improvement', 'Scaled deployment plan, benefits tracker'],
];
files.push(['03_AP_AGENT_OS_PRO/Templates/IMPLEMENTATION_ROADMAP.csv', csv(
  ['phase', 'name', 'duration', 'activities', 'deliverables'],
  phases
)]);

// Benefits Tracker
files.push(['04_AP_AGENT_OS_TEAM/Implementation/BENEFITS_TRACKER.csv', csv(
  ['benefit_id', 'description', 'category', 'baseline_value', 'target_value', 'current_value', 'validation_method', 'status', 'owner', 'review_date'],
  [
    ['BEN-001', 'Cost per invoice', 'Financial', '9.40', '7.00', '', 'Monthly cost/volume calculation', 'Not started', 'AP Manager', ''],
    ['BEN-002', 'Straight-through processing rate', 'Operational', '32.6', '50.0', '', 'STP count / total invoices', 'Not started', 'AP Manager', ''],
    ['BEN-003', 'Exception rate', 'Operational', '14.0', '10.0', '', 'Exceptions / total invoices', 'Not started', 'AP Manager', ''],
    ['BEN-004', 'Average processing time (days)', 'Operational', '9.15', '5.0', '', 'Receipt to posting timestamp', 'Not started', 'AP Manager', ''],
    ['BEN-005', 'Human hours released per month', 'Financial', '0', '200', '', 'Time-motion study comparison', 'Not started', 'Transformation Lead', ''],
  ]
)]);

// Agent Job Descriptions
for (const a of AGENTS) {
  const spec = `# ${a.name}
## Agent Specification — ${a.id}

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
${a.purpose}

## Job Description
The ${a.name} is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
${a.inputs}

## Tools & Data Required
${a.tools}

## Responsibilities
${a.responsibilities}

## Explicit Exclusions
${a.exclusions}

## Human Owner
${a.owner}

## Approval Requirements
${a.approval}

## Escalation Criteria
${a.escalation}

## Output Standard
${a.outputs}

## Control Requirements
${a.controls}

## KPIs
${a.kpis}

## Default Autonomy Level
**Level 0 — Observe**

The agent begins in Observe mode. Progression to higher levels requires:
1. Documented performance against KPIs for minimum 4-week period
2. Control effectiveness validation
3. Human owner sign-off
4. Recorded in Agent Registry

## Autonomy Progression Criteria

| To Level | Requirement |
|----------|-------------|
| 1 — Recommend | >85% accuracy in Observe mode for 4+ weeks |
| 2 — Prepare | >90% recommendation acceptance rate for 4+ weeks |
| 3 — Execute within guardrails | >95% accuracy, zero control breaches for 8+ weeks |
| 4 — Managed autonomy | Executive approval, full control audit, 12+ weeks at Level 3 |

## Failure Handling
- On KPI breach: automatic revert to previous autonomy level
- On control incident: immediate suspension pending investigation
- On ambiguous outcome: flag for human review; do not retry autonomously

## Cost Monitoring
Track AI inference cost per outcome. Review monthly against cost-per-correct-outcome target.

---
*Evidence Room — AP Agent OS. Agents earn responsibility. Evidence over hype.*
`;
  files.push([`03_AP_AGENT_OS_PRO/Agent_Library/${a.id}_${a.name.replace(/[^a-zA-Z0-9]/g, '_')}.md`, spec]);
}

// Write all files
let count = 0;
for (const [path, content] of files) {
  write(path, content);
  count++;
}

console.log(`Generated ${count} core data files.`);
console.log('Run build-content.mjs for full content generation.');
