#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
function ensureDir(p) { if (!existsSync(p)) mkdirSync(p, { recursive: true }); }
function write(rel, content) {
  const full = join(ROOT, rel);
  ensureDir(dirname(full));
  writeFileSync(full, content, 'utf8');
}

const CSS = `
:root {
  --er-navy: #0B1426;
  --er-navy-light: #152238;
  --er-slate: #3D4F6F;
  --er-slate-light: #6B7F9A;
  --er-gold: #C4A35A;
  --er-gold-light: #D4B96E;
  --er-white: #FAFBFC;
  --er-gray-50: #F4F6F8;
  --er-gray-100: #E8ECF0;
  --er-gray-200: #D1D9E0;
  --er-green: #1A7A4C;
  --er-red: #B83232;
  --er-font-display: 'Georgia', 'Times New Roman', serif;
  --er-font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
  --er-font-mono: 'SF Mono', 'Fira Code', monospace;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: var(--er-font-body); color: var(--er-navy); background: var(--er-white); line-height: 1.6; -webkit-font-smoothing: antialiased; }
a { color: var(--er-gold); text-decoration: none; }
a:hover { color: var(--er-gold-light); }
.container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(11,20,38,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(196,163,90,0.15); }
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.nav-logo { font-family: var(--er-font-display); font-size: 1.25rem; color: var(--er-white); letter-spacing: 0.02em; }
.nav-logo span { color: var(--er-gold); }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-links a { color: var(--er-gray-200); font-size: 0.875rem; font-weight: 500; transition: color 0.2s; }
.nav-links a:hover { color: var(--er-white); }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 6px; font-size: 0.875rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; text-decoration: none; }
.btn-primary { background: var(--er-gold); color: var(--er-navy); }
.btn-primary:hover { background: var(--er-gold-light); color: var(--er-navy); }
.btn-secondary { background: transparent; color: var(--er-white); border: 1px solid rgba(255,255,255,0.2); }
.btn-secondary:hover { border-color: var(--er-gold); color: var(--er-gold); }
.btn-outline { background: transparent; color: var(--er-navy); border: 1px solid var(--er-gray-200); }
.btn-outline:hover { border-color: var(--er-navy); }
.hero { padding: 160px 0 100px; background: var(--er-navy); color: var(--er-white); position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; top: 0; right: 0; width: 50%; height: 100%; background: linear-gradient(135deg, transparent 0%, rgba(196,163,90,0.05) 100%); }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.hero h1 { font-family: var(--er-font-display); font-size: 3rem; line-height: 1.15; font-weight: 400; margin-bottom: 24px; }
.hero h1 em { color: var(--er-gold); font-style: normal; }
.hero-sub { font-size: 1.125rem; color: var(--er-slate-light); margin-bottom: 40px; max-width: 480px; }
.hero-cta { display: flex; gap: 16px; }
.hero-stat { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.stat-card { background: var(--er-navy-light); border: 1px solid rgba(196,163,90,0.1); border-radius: 8px; padding: 24px; }
.stat-value { font-family: var(--er-font-mono); font-size: 2rem; color: var(--er-gold); font-weight: 600; }
.stat-label { font-size: 0.8125rem; color: var(--er-slate-light); margin-top: 4px; }
.stat-source { font-size: 0.6875rem; color: var(--er-slate); margin-top: 8px; }
section { padding: 100px 0; }
section.alt { background: var(--er-gray-50); }
.section-label { font-family: var(--er-font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--er-gold); margin-bottom: 16px; }
.section-title { font-family: var(--er-font-display); font-size: 2.25rem; font-weight: 400; margin-bottom: 16px; }
.section-desc { font-size: 1.0625rem; color: var(--er-slate); max-width: 640px; margin-bottom: 48px; }
.problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.problem-card { background: var(--er-white); border: 1px solid var(--er-gray-100); border-radius: 8px; padding: 32px; }
.problem-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.problem-card p { font-size: 0.875rem; color: var(--er-slate); }
.agent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.agent-card { background: var(--er-white); border: 1px solid var(--er-gray-100); border-radius: 8px; padding: 20px; transition: border-color 0.2s; }
.agent-card:hover { border-color: var(--er-gold); }
.agent-id { font-family: var(--er-font-mono); font-size: 0.6875rem; color: var(--er-gold); margin-bottom: 8px; }
.agent-card h4 { font-size: 0.875rem; font-weight: 600; margin-bottom: 4px; }
.agent-card p { font-size: 0.75rem; color: var(--er-slate); }
.tier-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.tier-card { background: var(--er-white); border: 1px solid var(--er-gray-100); border-radius: 8px; padding: 32px; position: relative; }
.tier-card.featured { border-color: var(--er-gold); box-shadow: 0 4px 24px rgba(196,163,90,0.12); }
.tier-name { font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--er-slate); margin-bottom: 8px; }
.tier-price { font-family: var(--er-font-mono); font-size: 2rem; font-weight: 600; margin-bottom: 4px; }
.tier-price span { font-size: 0.875rem; font-weight: 400; color: var(--er-slate); }
.tier-desc { font-size: 0.8125rem; color: var(--er-slate); margin-bottom: 24px; min-height: 48px; }
.tier-features { list-style: none; margin-bottom: 32px; }
.tier-features li { font-size: 0.8125rem; padding: 6px 0; color: var(--er-slate); border-bottom: 1px solid var(--er-gray-50); }
.tier-features li::before { content: '→ '; color: var(--er-gold); }
.level-bar { display: flex; gap: 4px; margin: 32px 0; }
.level { flex: 1; text-align: center; padding: 16px 8px; border-radius: 6px; font-size: 0.75rem; }
.level-0 { background: var(--er-gray-100); color: var(--er-slate); }
.level-1 { background: #E8EDF5; color: var(--er-slate); }
.level-2 { background: #D5DFF0; color: var(--er-navy); }
.level-3 { background: #C2D1EB; color: var(--er-navy); }
.level-4 { background: var(--er-navy); color: var(--er-gold); }
.faq-item { border-bottom: 1px solid var(--er-gray-100); padding: 24px 0; }
.faq-item h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.faq-item p { font-size: 0.875rem; color: var(--er-slate); }
.cta-section { background: var(--er-navy); color: var(--er-white); text-align: center; padding: 100px 0; }
.cta-section h2 { font-family: var(--er-font-display); font-size: 2.25rem; margin-bottom: 16px; }
.cta-section p { color: var(--er-slate-light); margin-bottom: 32px; font-size: 1.0625rem; }
footer { background: var(--er-navy); color: var(--er-slate-light); padding: 48px 0; border-top: 1px solid rgba(255,255,255,0.05); }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
.footer-brand { font-family: var(--er-font-display); font-size: 1.125rem; color: var(--er-white); margin-bottom: 12px; }
.footer-col h4 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--er-gray-200); margin-bottom: 16px; }
.footer-col a { display: block; font-size: 0.8125rem; color: var(--er-slate-light); padding: 4px 0; }
.footer-col a:hover { color: var(--er-white); }
.footer-bottom { margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.75rem; display: flex; justify-content: space-between; }
@media (max-width: 768px) {
  .hero-grid, .problem-grid, .agent-grid, .tier-grid, .footer-grid { grid-template-columns: 1fr; }
  .hero h1 { font-size: 2rem; }
  .nav-links { display: none; }
}
`;

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Evidence Room — AP Agent OS | The Operating System for Finance AI Agents</title>
<meta name="description" content="Build, govern, and scale AI agents across Accounts Payable. Implementation-ready toolkit for Finance leaders. Evidence over hype.">
<link rel="stylesheet" href="styles.css">
</head>
<body>

<nav class="nav">
  <div class="container nav-inner">
    <div class="nav-logo">Evidence <span>Room</span></div>
    <div class="nav-links">
      <a href="#method">Method</a>
      <a href="#agents">Agents</a>
      <a href="#governance">Governance</a>
      <a href="#pricing">Pricing</a>
      <a href="#faq">FAQ</a>
      <a href="#diagnostic" class="btn btn-primary">Assess Your Readiness</a>
    </div>
  </div>
</nav>

<section class="hero">
  <div class="container hero-grid">
    <div>
      <div class="section-label">AP Agent Operating System</div>
      <h1>The operating system for <em>governed</em> Finance AI agents</h1>
      <p class="hero-sub">Design, deploy, and measure AI agents across Accounts Payable — without replacing your ERP, AP automation, or payment systems. Agents earn responsibility through evidence, not hype.</p>
      <div class="hero-cta">
        <a href="#diagnostic" class="btn btn-primary">Assess Your AP Agent Readiness</a>
        <a href="#pricing" class="btn btn-secondary">Explore the AP Agent OS</a>
      </div>
    </div>
    <div class="hero-stat">
      <div class="stat-card">
        <div class="stat-value">$9.40</div>
        <div class="stat-label">Average cost per invoice</div>
        <div class="stat-source">Ardent Partners, 2024</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">32.6%</div>
        <div class="stat-label">Straight-through processing rate</div>
        <div class="stat-source">Ardent Partners, 2024</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">14%</div>
        <div class="stat-label">Invoice exception rate</div>
        <div class="stat-source">Ardent Partners, 2024</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">$2.78</div>
        <div class="stat-label">Best-in-Class cost per invoice</div>
        <div class="stat-source">Ardent Partners, 2025</div>
      </div>
    </div>
  </div>
</section>

<section id="problem">
  <div class="container">
    <div class="section-label">The Problem</div>
    <h2 class="section-title">AP teams are drowning in exceptions, not invoices</h2>
    <p class="section-desc">The average organisation processes invoices in 9+ days at $9.40 each. Two-thirds require manual intervention. The problem isn't technology — it's the operating model.</p>
    <div class="problem-grid">
      <div class="problem-card"><h3>Exception backlog</h3><p>14% exception rate consuming 30–60 minutes per item. Missing receipts, price mismatches, approval delays, duplicate invoices.</p></div>
      <div class="problem-card"><h3>No agent governance</h3><p>AI deployed without job descriptions, controls, KPIs, or autonomy boundaries. Pilots succeed in demo; fail in production.</p></div>
      <div class="problem-card"><h3>Operating model gap</h3><p>AP automation vendors sell software. Consultants sell engagements. Nobody sells the operating system for designing agents across your stack.</p></div>
      <div class="problem-card"><h3>Measurement vacuum</h3><p>No baseline KPIs. No cost-per-invoice tracking. No way to prove agent performance or justify responsibility progression.</p></div>
      <div class="problem-card"><h3>Control anxiety</h3><p>Auditors ask: who approved this? What evidence supports the decision? Finance leaders can't answer for AI-driven processes.</p></div>
      <div class="problem-card"><h3>Pilot purgatory</h3><p>Endless pilots without progression to production. No framework for earning autonomy. No path from one agent to a governed workforce.</p></div>
    </div>
  </div>
</section>

<section class="alt" id="method">
  <div class="container">
    <div class="section-label">What Agentic AP Means</div>
    <h2 class="section-title">A governed agent workforce, not autonomous payments</h2>
    <p class="section-desc">Evidence Room defines 16 specialised AP agents operating under a 5-level responsibility model. Humans retain accountability for approvals, payments, and controls.</p>
    <div class="level-bar">
      <div class="level level-0"><strong>L0</strong><br>Observe</div>
      <div class="level level-1"><strong>L1</strong><br>Recommend</div>
      <div class="level level-2"><strong>L2</strong><br>Prepare</div>
      <div class="level level-3"><strong>L3</strong><br>Execute</div>
      <div class="level level-4"><strong>L4</strong><br>Managed</div>
    </div>
    <p style="font-size:0.875rem;color:var(--er-slate);text-align:center;">Agents begin at Level 0. Responsibility is earned through demonstrated performance — never assumed.</p>
  </div>
</section>

<section id="agents">
  <div class="container">
    <div class="section-label">Agent Architecture</div>
    <h2 class="section-title">16 agents. One orchestrator. ERP-agnostic.</h2>
    <p class="section-desc">Each agent has a job description, explicit exclusions, human owner, control requirements, and KPIs. Deploy one at a time. Scale with evidence.</p>
    <div class="agent-grid">
      <div class="agent-card"><div class="agent-id">AGT-01</div><h4>Invoice Intake</h4><p>Completeness and extraction quality</p></div>
      <div class="agent-card"><div class="agent-id">AGT-02</div><h4>Invoice Validation</h4><p>Header, line, and master data checks</p></div>
      <div class="agent-card"><div class="agent-id">AGT-03</div><h4>Matching</h4><p>PO, price, quantity, receipt matching</p></div>
      <div class="agent-card"><div class="agent-id">AGT-04</div><h4>Exception Triage</h4><p>Classify and prioritise exceptions</p></div>
      <div class="agent-card"><div class="agent-id">AGT-05</div><h4>Goods Receipt</h4><p>Missing receipt identification</p></div>
      <div class="agent-card"><div class="agent-id">AGT-06</div><h4>PO Quality</h4><p>Upstream PO discipline analysis</p></div>
      <div class="agent-card"><div class="agent-id">AGT-07</div><h4>Approval</h4><p>Bottleneck and delegation monitoring</p></div>
      <div class="agent-card"><div class="agent-id">AGT-08</div><h4>Supplier Resolution</h4><p>Draft supplier communications</p></div>
      <div class="agent-card"><div class="agent-id">AGT-09</div><h4>Internal Follow-Up</h4><p>Internal exception follow-ups</p></div>
      <div class="agent-card"><div class="agent-id">AGT-10</div><h4>Duplicate & Anomaly</h4><p>Duplicate and anomaly detection</p></div>
      <div class="agent-card"><div class="agent-id">AGT-11</div><h4>Statement Recon</h4><p>Vendor statement reconciliation</p></div>
      <div class="agent-card"><div class="agent-id">AGT-12</div><h4>Payment Review</h4><p>Pre-payment analytical review</p></div>
      <div class="agent-card"><div class="agent-id">AGT-13</div><h4>AP Close</h4><p>Month-end completeness support</p></div>
      <div class="agent-card"><div class="agent-id">AGT-14</div><h4>AP Reporting</h4><p>Operational reporting automation</p></div>
      <div class="agent-card"><div class="agent-id">AGT-15</div><h4>Root Cause</h4><p>Systemic exception analysis</p></div>
      <div class="agent-card"><div class="agent-id">AGT-16</div><h4>Orchestrator</h4><p>Supervisory workforce management</p></div>
    </div>
  </div>
</section>

<section class="alt" id="governance">
  <div class="container">
    <div class="section-label">Governance</div>
    <h2 class="section-title">Controls, KPIs, and evidence — built in</h2>
    <p class="section-desc">Every agent ships with a control matrix, risk register template, KPI definitions benchmarked against industry data, and an autonomy progression framework.</p>
    <div class="problem-grid">
      <div class="problem-card"><h3>Agent Control Matrix</h3><p>Preventive and detective controls per agent. Human owner, evidence requirements, escalation triggers.</p></div>
      <div class="problem-card"><h3>27-Category Exception Taxonomy</h3><p>Every AP exception classified with root cause, resolution path, responsible party, and assigned agent.</p></div>
      <div class="problem-card"><h3>KPI Framework</h3><p>Activity, operational, financial, and risk/control metrics with industry benchmarks from Ardent Partners research.</p></div>
    </div>
  </div>
</section>

<section id="pricing">
  <div class="container">
    <div class="section-label">Pricing</div>
    <h2 class="section-title">Start free. Scale with evidence.</h2>
    <p class="section-desc">Every tier delivers more value than its price. No subscriptions. Instant digital delivery.</p>
    <div class="tier-grid">
      <div class="tier-card">
        <div class="tier-name">Free</div>
        <div class="tier-price">$0</div>
        <div class="tier-desc">AP AI Readiness Diagnostic</div>
        <ul class="tier-features"><li>30 diagnostic questions</li><li>Maturity model scoring</li><li>Opportunity heatmap</li><li>Baseline KPI worksheet</li></ul>
        <a href="#diagnostic" class="btn btn-outline" style="width:100%;justify-content:center;">Get Free Diagnostic</a>
      </div>
      <div class="tier-card">
        <div class="tier-name">Starter</div>
        <div class="tier-price">$79</div>
        <div class="tier-desc">AP Agent Starter Kit</div>
        <ul class="tier-features"><li>Top 10 agent blueprints</li><li>Exception taxonomy</li><li>Process-mapping template</li><li>Governance checklist</li><li>Implementation roadmap</li></ul>
        <a href="#" class="btn btn-outline" style="width:100%;justify-content:center;">Buy Starter Kit</a>
      </div>
      <div class="tier-card featured">
        <div class="tier-name">Professional</div>
        <div class="tier-price">$199</div>
        <div class="tier-desc">AP Agent OS — Full operating system</div>
        <ul class="tier-features"><li>16 agent specifications</li><li>Full governance framework</li><li>ROI calculator</li><li>Shadow mode methodology</li><li>Complete template library</li></ul>
        <a href="#" class="btn btn-primary" style="width:100%;justify-content:center;">Buy Professional</a>
      </div>
      <div class="tier-card">
        <div class="tier-name">Team</div>
        <div class="tier-price">$499</div>
        <div class="tier-desc">Team Edition — Workshop ready</div>
        <ul class="tier-features"><li>Everything in Professional</li><li>Workshop facilitation pack</li><li>Executive steering templates</li><li>Change management toolkit</li><li>Benefits tracker</li></ul>
        <a href="#" class="btn btn-outline" style="width:100%;justify-content:center;">Buy Team Edition</a>
      </div>
    </div>
  </div>
</section>

<section class="alt" id="faq">
  <div class="container">
    <div class="section-label">FAQ</div>
    <h2 class="section-title">Common questions</h2>
    <div class="faq-item"><h3>Is this a prompt pack?</h3><p>No. Evidence Room is an implementation-ready operating system with agent specifications, governance frameworks, control matrices, KPI definitions, ROI models, and deployment methodology. Prompts are a component, not the product.</p></div>
    <div class="faq-item"><h3>Does this replace my AP automation software?</h3><p>No. Evidence Room helps you design the agent layer that operates across your existing ERP and AP stack. It is ERP-agnostic and complementary to platforms like Stampli, Medius, SAP, Oracle, and NetSuite.</p></div>
    <div class="faq-item"><h3>Will agents autonomously approve payments?</h3><p>No. Payment authorisation remains human-controlled. Agents may prepare and review, but humans approve. The 5-level responsibility model ensures agents earn autonomy gradually.</p></div>
    <div class="faq-item"><h3>What ERP systems does this support?</h3><p>All major ERP environments: SAP, Oracle, Microsoft Dynamics, NetSuite, Workday, and others. The methodology is ERP-agnostic.</p></div>
    <div class="faq-item"><h3>Can I use this in a workshop with my team?</h3><p>Yes. The Team Edition ($499) includes facilitation materials, exercises, and executive templates designed for enterprise transformation workshops.</p></div>
    <div class="faq-item"><h3>Are savings guaranteed?</h3><p>No. The ROI calculator provides Conservative, Base, and Upside scenarios using industry benchmarks. Actual results depend on your systems, data quality, and governance maturity.</p></div>
  </div>
</section>

<section class="cta-section" id="diagnostic">
  <div class="container">
    <h2>Assess your AP agent readiness</h2>
    <p>Free diagnostic. 30 questions. Instant scorecard. No spam.</p>
    <a href="#" class="btn btn-primary">Start Free Diagnostic</a>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-grid">
      <div><div class="footer-brand">Evidence Room</div><p style="font-size:0.8125rem;">The operating system for governed Finance AI agents. Evidence over hype.</p></div>
      <div class="footer-col"><h4>Product</h4><a href="#">AP Agent OS</a><a href="#">Free Diagnostic</a><a href="#">Professional</a><a href="#">Team Edition</a></div>
      <div class="footer-col"><h4>Company</h4><a href="#">About</a><a href="#">Method</a><a href="#">Resources</a></div>
      <div class="footer-col"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Disclaimer</a></div>
    </div>
    <div class="footer-bottom"><span>© 2025 Evidence Room. All rights reserved.</span><span>Agents earn responsibility.</span></div>
  </div>
</footer>
</body>
</html>`;

write('08_WEBSITE/landing-page/index.html', HTML);
write('08_WEBSITE/landing-page/styles.css', CSS);
write('08_WEBSITE/WEBSITE_COPY.md', `# Website Information Architecture & Copy
## evidenceroom.ai

---

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | / | 5-second value communication |
| AP Agent OS | /ap-agent-os | Product detail |
| Free Diagnostic | /diagnostic | Lead magnet |
| Professional | /professional | $199 product page |
| Team | /team | $499 product page |
| Custom Blueprint | /blueprint | Service page |
| Method | /method | Evidence Room methodology |
| Resources | /resources | Content hub |
| About | /about | Brand story |
| Privacy | /privacy | Privacy policy |
| Terms | /terms | Terms of service |
| Disclaimer | /disclaimer | Product disclaimers |

---

## Home Page Copy

**Headline:** The operating system for governed Finance AI agents

**Subheadline:** Design, deploy, and measure AI agents across Accounts Payable — without replacing your ERP, AP automation, or payment systems.

**Primary CTA:** Assess Your AP Agent Readiness

**Secondary CTA:** Explore the AP Agent OS

**5-second test:**
- What: AP Agent Operating System
- Who: Finance leaders, AP managers, transformation teams
- Improves: AP efficiency, exception resolution, governance, measurement
- Different: Operating model, not software or prompt pack

---

## Brand Voice

Intelligent. Concise. Credible. Executive. Specific. Non-hype.

Never promise: guaranteed savings, fraud detection, regulatory compliance, accounting accuracy, autonomous payment safety, guaranteed ROI.

---

*Full landing page built at landing-page/index.html*
`);

console.log('Website generated.');
