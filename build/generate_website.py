"""Generate Evidence Room website HTML."""
from pathlib import Path
from content_data import BRAND, AGENTS, RESPONSIBILITY_LEVELS

ROOT = Path(__file__).resolve().parent.parent / "evidence-room"

CSS = """
:root {
  --ink: #0B1220; --slate: #1E293B; --stone: #64748B; --paper: #F8FAFC;
  --accent: #0F4C5C; --accent-light: #1A6B7C; --gold: #B8860B;
  --border: #E2E8F0; --white: #FFFFFF;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', -apple-system, sans-serif; color: var(--ink); background: var(--paper); line-height: 1.6; }
.container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
nav { background: var(--ink); padding: 16px 0; position: sticky; top: 0; z-index: 100; }
nav .container { display: flex; justify-content: space-between; align-items: center; }
.logo { font-family: Georgia, serif; font-size: 1.4rem; color: var(--white); font-weight: 700; letter-spacing: -0.02em; }
.logo span { color: var(--gold); }
nav a { color: #94A3B8; text-decoration: none; margin-left: 28px; font-size: 0.9rem; transition: color 0.2s; }
nav a:hover { color: var(--white); }
.hero { background: var(--ink); color: var(--white); padding: 100px 0 80px; }
.hero h1 { font-family: Georgia, serif; font-size: 3.2rem; line-height: 1.15; margin-bottom: 20px; max-width: 700px; }
.hero p { font-size: 1.2rem; color: #94A3B8; max-width: 560px; margin-bottom: 36px; }
.btn { display: inline-block; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 0.95rem; text-decoration: none; transition: all 0.2s; }
.btn-primary { background: var(--accent); color: var(--white); }
.btn-primary:hover { background: var(--accent-light); }
.btn-secondary { background: transparent; color: var(--white); border: 1px solid #475569; margin-left: 12px; }
.btn-secondary:hover { border-color: var(--white); }
section { padding: 80px 0; }
section h2 { font-family: Georgia, serif; font-size: 2rem; margin-bottom: 16px; }
section .subtitle { color: var(--stone); font-size: 1.1rem; margin-bottom: 48px; max-width: 600px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.card { background: var(--white); border: 1px solid var(--border); border-radius: 8px; padding: 32px; }
.card h3 { font-size: 1.1rem; margin-bottom: 8px; }
.card p { color: var(--stone); font-size: 0.95rem; }
.card .price { font-size: 2rem; font-weight: 700; color: var(--accent); margin: 16px 0 8px; }
.card .price span { font-size: 0.9rem; color: var(--stone); font-weight: 400; }
.stat { text-align: center; padding: 24px; }
.stat .number { font-size: 2.4rem; font-weight: 700; color: var(--accent); }
.stat .label { color: var(--stone); font-size: 0.9rem; margin-top: 4px; }
.agent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.agent-chip { background: var(--white); border: 1px solid var(--border); border-radius: 6px; padding: 12px 16px; font-size: 0.85rem; }
.agent-chip strong { display: block; color: var(--accent); font-size: 0.75rem; margin-bottom: 2px; }
.level-bar { display: flex; gap: 4px; margin: 24px 0; }
.level { flex: 1; padding: 16px 12px; border-radius: 6px; text-align: center; font-size: 0.8rem; }
.level-0 { background: #F1F5F9; } .level-1 { background: #E0F2FE; }
.level-2 { background: #BAE6FD; } .level-3 { background: #7DD3FC; }
.level-4 { background: var(--accent); color: white; }
.faq { border-bottom: 1px solid var(--border); padding: 20px 0; }
.faq h4 { margin-bottom: 8px; }
.faq p { color: var(--stone); font-size: 0.95rem; }
footer { background: var(--ink); color: #64748B; padding: 48px 0; font-size: 0.85rem; }
footer a { color: #94A3B8; text-decoration: none; }
.cta-section { background: var(--accent); color: var(--white); text-align: center; padding: 64px 0; }
.cta-section h2 { color: var(--white); margin-bottom: 12px; }
.cta-section p { color: #BAE6FD; margin-bottom: 28px; }
@media (max-width: 768px) {
  .grid-3, .grid-2, .agent-grid { grid-template-columns: 1fr; }
  .hero h1 { font-size: 2.2rem; }
}
"""

def page(title, body):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Evidence Room</title>
<style>{CSS}</style>
</head>
<body>
<nav><div class="container">
  <div class="logo">Evidence <span>Room</span></div>
  <div><a href="index.html">Home</a><a href="ap-agent-os.html">AP Agent OS</a><a href="diagnostic.html">Free Diagnostic</a><a href="pricing.html">Pricing</a><a href="method.html">Method</a><a href="about.html">About</a></div>
</div></nav>
{body}
<footer><div class="container" style="display:flex;justify-content:space-between;">
  <div>© 2026 Evidence Room. All rights reserved.</div>
  <div><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="disclaimer.html">Disclaimer</a></div>
</div></footer>
</body></html>"""


def gen_home():
    agents_html = "".join(f'<div class="agent-chip"><strong>{a["code"]}</strong>{a["name"]}</div>' for a in AGENTS)
    levels_html = "".join(f'<div class="level level-{l["level"]}"><strong>L{l["level"]}</strong><br>{l["name"]}</div>' for l in RESPONSIBILITY_LEVELS)
    body = f"""
<div class="hero"><div class="container">
  <h1>The operating system for governed AI agents in Accounts Payable</h1>
  <p>Evidence Room AP Agent OS gives Finance leaders the frameworks, agent specifications, and governance tools to design, deploy, and measure AI agents across the AP lifecycle. Not another automation tool — an operating model.</p>
  <a href="diagnostic.html" class="btn btn-primary">Assess Your AP Agent Readiness</a>
  <a href="ap-agent-os.html" class="btn btn-secondary">Explore the AP Agent OS</a>
</div></div>
<section><div class="container">
  <h2>The AP challenge is operational, not technological</h2>
  <p class="subtitle">Most organisations have the tools. They lack the operating model.</p>
  <div class="grid-3">
    <div class="stat"><div class="number">$9.40</div><div class="label">Average cost per invoice<br><small>Ardent Partners, 2024</small></div></div>
    <div class="stat"><div class="number">32.6%</div><div class="label">Straight-through processing rate<br><small>Industry average</small></div></div>
    <div class="stat"><div class="number">41</div><div class="label">AP automation vendors<br><small>Forrester Q4 2025</small></div></div>
  </div>
</div></section>
<section style="background:var(--white)"><div class="container">
  <h2>16 agents. One operating system.</h2>
  <p class="subtitle">A complete agent architecture covering every stage of the AP lifecycle.</p>
  <div class="agent-grid">{agents_html}</div>
</div></section>
<section><div class="container">
  <h2>Agents earn responsibility</h2>
  <p class="subtitle">Never default to full autonomy. Progress through evidence-based stages.</p>
  <div class="level-bar">{levels_html}</div>
</div></section>
<section style="background:var(--white)"><div class="container">
  <h2>What makes Evidence Room different</h2>
  <div class="grid-2">
    <div class="card"><h3>Not a software vendor</h3><p>We don't replace your ERP or AP stack. We help you design the agent layer that operates across it.</p></div>
    <div class="card"><h3>Not a prompt pack</h3><p>16 agent specifications, governance frameworks, control matrices, and testing methodologies — not ChatGPT prompts.</p></div>
    <div class="card"><h3>Governed autonomy</h3><p>5-stage responsibility model. Payment authorisation stays human. Agents earn the right to act.</p></div>
    <div class="card"><h3>Implementation-ready</h3><p>Buy on Friday. Begin redesigning your AP operating model on Monday. ROI calculator included.</p></div>
  </div>
</div></section>
<div class="cta-section"><div class="container">
  <h2>Start with evidence, not hype</h2>
  <p>Free AP AI Readiness Diagnostic — 37 questions, maturity score, opportunity heatmap.</p>
  <a href="diagnostic.html" class="btn btn-primary" style="background:var(--white);color:var(--accent)">Get Your Readiness Score</a>
</div></div>"""
    (ROOT / "08_WEBSITE/index.html").write_text(page("Home", body), encoding="utf-8")
    print("  Created 08_WEBSITE/index.html")


def gen_pricing():
    body = """
<section><div class="container">
  <h2>Simple, transparent pricing</h2>
  <p class="subtitle">One-time purchase. No subscriptions. Team licence available.</p>
  <div class="grid-3">
    <div class="card"><h3>Starter Kit</h3><div class="price">$79</div><p>Top 10 agent blueprints, exception taxonomy, governance checklist, process-mapping templates, KPI scorecard, implementation roadmap.</p><br><a href="#" class="btn btn-primary">Buy Starter</a></div>
    <div class="card" style="border-color:var(--accent);border-width:2px"><h3>Professional</h3><div class="price">$199 <span>most popular</span></div><p>Full 16-agent OS, governance framework, control matrix, ROI calculator, testing scripts, UAT templates, executive reporting pack.</p><br><a href="#" class="btn btn-primary">Buy Professional</a></div>
    <div class="card"><h3>Team Edition</h3><div class="price">$499</div><p>Everything in Professional plus workshop facilitation pack, change management toolkit, steering committee templates, benefits tracker.</p><br><a href="#" class="btn btn-primary">Buy Team</a></div>
  </div>
  <div style="margin-top:48px;text-align:center">
    <div class="card" style="display:inline-block;max-width:500px;text-align:left">
      <h3>Custom Blueprint</h3><div class="price">$1,500–2,500</div>
      <p>Bespoke AP agent transformation plan. Current-state assessment, recommended architecture, business case, 90-day implementation plan. Delivered in 10 business days.</p><br><a href="#" class="btn btn-primary">Apply Now</a>
    </div>
  </div>
</div></section>"""
    (ROOT / "08_WEBSITE/pricing.html").write_text(page("Pricing", body), encoding="utf-8")
    print("  Created 08_WEBSITE/pricing.html")


def gen_diagnostic_page():
    body = """
<section><div class="container" style="max-width:700px">
  <h2>AP AI Readiness Diagnostic</h2>
  <p class="subtitle">Free. 37 questions. Maturity score in 15 minutes.</p>
  <div class="card">
    <h3>What you'll receive</h3>
    <p>✓ AP AI readiness score with maturity classification<br>
    ✓ Opportunity heatmap across 10 agent categories<br>
    ✓ Baseline KPI worksheet<br>
    ✓ Business case starter with industry benchmarks<br>
    ✓ Downloadable executive scorecard</p>
    <br><p><strong>Enter your email to download:</strong></p>
    <form style="margin-top:16px"><input type="email" placeholder="work@company.com" style="padding:12px;width:60%;border:1px solid var(--border);border-radius:6px;margin-right:8px">
    <button class="btn btn-primary" type="submit">Download Free Diagnostic</button></form>
  </div>
</div></section>"""
    (ROOT / "08_WEBSITE/diagnostic.html").write_text(page("Free Diagnostic", body), encoding="utf-8")
    print("  Created 08_WEBSITE/diagnostic.html")


def gen_landing_page():
    body = f"""
<div class="hero"><div class="container">
  <h1>Build your AP agent workforce — with governance built in</h1>
  <p>The complete operating system for Finance leaders deploying AI agents across Accounts Payable. 16 agents. 5-stage autonomy model. Implementation-ready.</p>
  <a href="diagnostic.html" class="btn btn-primary">Assess Your Readiness — Free</a>
  <a href="pricing.html" class="btn btn-secondary">View Pricing</a>
</div></div>
<section><div class="container">
  <h2>AP problems agents can address today</h2>
  <div class="grid-3">
    <div class="card"><h3>Invoice intake & validation</h3><p>OCR errors, missing fields, duplicate detection, tax inconsistencies, wrong supplier identification.</p></div>
    <div class="card"><h3>Matching & exceptions</h3><p>PO matching, price/quantity variances, missing receipts, exception triage and prioritisation.</p></div>
    <div class="card"><h3>Approvals & follow-up</h3><p>Stalled approvals, delegation issues, supplier communication drafting, internal follow-up management.</p></div>
    <div class="card"><h3>Controls & compliance</h3><p>Duplicate payment prevention, bank change detection, payment proposal review, audit evidence.</p></div>
    <div class="card"><h3>Close & reporting</h3><p>Month-end completeness, accrual support, daily/weekly/monthly reporting, root cause analysis.</p></div>
    <div class="card"><h3>Orchestration</h3><p>Task distribution, performance monitoring, autonomy progression, management reporting.</p></div>
  </div>
</div></section>
<section style="background:var(--white)"><div class="container">
  <h2>What's in the toolkit</h2>
  <div class="grid-2">
    <div><h3>Professional ($199)</h3><p>16 agent specs · Governance framework · Control matrix · ROI calculator · Testing scripts · UAT templates · Shadow-mode methodology · Executive reporting pack · Exception taxonomy (27 categories) · KPI definitions (22+ metrics)</p></div>
    <div><h3>Team ($499)</h3><p>Everything in Professional · 2-day workshop deck · Stakeholder interview guides · Change management toolkit · Steering committee pack · Benefits realisation tracker · Training materials · Executive communication templates</p></div>
  </div>
</div></section>
<section><div class="container">
  <h2>Frequently asked questions</h2>
  <div class="faq"><h4>Is this AP automation software?</h4><p>No. Evidence Room is an operating system toolkit — frameworks, agent specifications, governance tools, and templates. You implement agents on your existing ERP and AP stack.</p></div>
  <div class="faq"><h4>Does it work with our ERP?</h4><p>Yes. The toolkit is ERP-agnostic. Agent specifications reference generic data requirements that map to SAP, Oracle, D365, NetSuite, Workday, and other major platforms.</p></div>
  <div class="faq"><h4>Will agents make payments automatically?</h4><p>No. Payment authorisation remains human-controlled at all times. Agents can review payment proposals and flag issues, but cannot execute payments.</p></div>
  <div class="faq"><h4>How is this different from ChatGPT prompts?</h4><p>Evidence Room provides 16 detailed agent specifications with job descriptions, controls, KPIs, testing scripts, governance frameworks, and implementation methodology — not prompts.</p></div>
  <div class="faq"><h4>What if it doesn't work for us?</h4><p>30-day money-back guarantee. If the toolkit doesn't meet your expectations and hasn't been substantially used, we'll refund your purchase.</p></div>
</div></section>
<div class="cta-section"><div class="container">
  <h2>Ready to build your AP agent operating model?</h2>
  <p>Start free. Upgrade when you're ready to implement.</p>
  <a href="diagnostic.html" class="btn btn-primary" style="background:var(--white);color:var(--accent)">Get Started — Free</a>
</div></div>"""
    (ROOT / "08_WEBSITE/ap-agent-os.html").write_text(page("AP Agent OS", body), encoding="utf-8")
    print("  Created 08_WEBSITE/ap-agent-os.html")


def gen_simple_pages():
    pages = {
        "method.html": ("Our Method", "<section><div class='container'><h2>The Evidence Room Methodology</h2><p class='subtitle'>10 steps from process observation to agent autonomy.</p><div class='grid-2'><div class='card'><h3>1. Observe</h3><p>Record real process walkthroughs with AP staff.</p></div><div class='card'><h3>2. Transcribe</h3><p>Generate structured transcripts of process discussions.</p></div><div class='card'><h3>3. Extract</h3><p>Identify steps, systems, decisions, rules, exceptions, controls.</p></div><div class='card'><h3>4. Structure</h3><p>Convert into process maps, decision trees, RACI, SOPs.</p></div><div class='card'><h3>5. Agentise</h3><p>Determine human vs agent responsibilities at each step.</p></div><div class='card'><h3>6. Test</h3><p>Run historical cases. Measure accuracy.</p></div><div class='card'><h3>7. Shadow</h3><p>Agent operates without action permissions.</p></div><div class='card'><h3>8. Pilot</h3><p>Limited users, transactions, categories.</p></div><div class='card'><h3>9. Measure</h3><p>Compare against baseline KPIs.</p></div><div class='card'><h3>10. Expand</h3><p>Progress autonomy only with evidence.</p></div></div></div></section>"),
        "about.html": ("About", "<section><div class='container' style='max-width:700px'><h2>Evidence over hype</h2><p class='subtitle'>Evidence Room turns Finance AI from experimentation into measurable operating performance.</p><p>We believe AI agents in Finance should earn responsibility through demonstrated performance — not be deployed at full autonomy on day one. Our AP Agent OS provides the operating model, governance framework, and implementation tools that Finance leaders need to deploy governed agent workforces across Accounts Payable.</p><p style='margin-top:16px'>AP is the first domain. Future modules will address AR, Financial Close, Treasury, Reconciliations, Controls, and FP&A.</p></div></section>"),
        "privacy.html": ("Privacy", "<section><div class='container' style='max-width:700px'><h2>Privacy Policy</h2><p>Evidence Room collects email addresses for product delivery and opted-in communications. Diagnostic responses are stored securely and not sold to third parties. We use analytics to improve our products. Contact hello@evidenceroom.ai for data requests.</p></div></section>"),
        "terms.html": ("Terms", "<section><div class='container' style='max-width:700px'><h2>Terms of Service</h2><p>By purchasing Evidence Room products, you agree to our licence terms. Products are provided as digital downloads. 30-day refund policy applies. Evidence Room provides frameworks and tools, not accounting, legal, or tax advice.</p></div></section>"),
        "disclaimer.html": ("Disclaimer", "<section><div class='container' style='max-width:700px'><h2>Disclaimer</h2><p>Evidence Room frameworks are for informational and implementation guidance purposes. Industry benchmarks are sourced from third parties and provided for context. No guarantee of savings, ROI, fraud detection, regulatory compliance, or accounting accuracy is made. AI agent implementations require human oversight. Payment authorisation must remain human-controlled.</p></div></section>"),
    }
    for fname, (title, body) in pages.items():
        (ROOT / f"08_WEBSITE/{fname}").write_text(page(title, body), encoding="utf-8")
        print(f"  Created 08_WEBSITE/{fname}")


def generate_all():
    print("Generating website...")
    (ROOT / "08_WEBSITE").mkdir(parents=True, exist_ok=True)
    gen_home()
    gen_pricing()
    gen_diagnostic_page()
    gen_landing_page()
    gen_simple_pages()
    print("Website generation complete.")


if __name__ == "__main__":
    generate_all()
