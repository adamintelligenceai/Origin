#!/usr/bin/env python3
"""Static evidenceroom.ai pages."""

from pathlib import Path

OUT = Path("/workspace/EVIDENCE_ROOM/08_WEBSITE")

NAV = [
    ("AP Agent OS", "ap-agent-os.html"),
    ("Diagnostic", "diagnostic.html"),
    ("Method", "method.html"),
    ("Pricing", "pricing.html"),
    ("About", "about.html"),
]


def chrome(title, body, hero=None):
    nav = "".join(f'<a href="{href}">{label}</a>' for label, href in NAV)
    hero_html = hero or ""
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>{title} — Evidence Room</title>
  <meta name="description" content="Evidence Room — AP Agent OS. Proof before permission. The operating system for building, governing and scaling AI agents across Accounts Payable."/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif:wght@500;600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="css/er.css"/>
</head>
<body>
  <div class="wrap">
    <header class="site">
      <a class="brand" href="index.html">Evidence Room</a>
      <nav class="site">{nav}</nav>
    </header>
    {hero_html}
    {body}
    <footer class="site">
      <p>Evidence Room does not replace your AP stack. It designs the agent layer that operates across it.</p>
      <p>
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="disclaimer.html">Disclaimer</a>
        <a href="resources.html">Resources</a>
        <span class="mono">evidenceroom.ai</span>
      </p>
      <p class="fine">Not a guarantee of savings, fraud detection, regulatory compliance, accounting accuracy, or autonomous payment safety. Licence, privacy, and tax settings require professional review before they are in force.</p>
    </footer>
  </div>
</body>
</html>"""


def write(name, title, body, hero=None):
    (OUT / name).write_text(chrome(title, body, hero), encoding="utf-8")
    print(name)


hero_home = """
<section class="hero" style="border:0;padding-top:64px;">
  <div class="kicker">AP Agent OS</div>
  <h1>Proof before permission.</h1>
  <div class="rule"></div>
  <p class="sub">Agents earn responsibility. Evidence decides. The operating system for building, governing and scaling AI agents across Accounts Payable — on the stack you already run.</p>
  <p class="fine" style="margin-top:12px;">For CFOs, Controllers, Heads of AP, Shared Services and Finance Transformation. ERP-agnostic.</p>
  <div class="cta">
    <a class="btn" href="diagnostic.html">Assess Your AP Agent Readiness</a>
    <a class="btn ghost" href="ap-agent-os.html">Explore the AP Agent OS</a>
  </div>
</section>
"""

home_body = """
<section>
  <div class="grid four">
    <div><div class="kicker">What</div><p>An operating system for the AP agent layer. Sixteen charters. A packet. A promotion rule.</p></div>
    <div><div class="kicker">Who</div><p>Finance leaders who will be asked what the agents are allowed to do.</p></div>
    <div><div class="kicker">Improves</div><p>How you design, govern, test and measure agents — not how you replace the ERP.</p></div>
    <div><div class="kicker">Different</div><p>Not a prompt pack. Not a capture vendor. Responsibility is earned.</p></div>
  </div>
</section>
<section>
  <h2>The problem is not a missing chatbot.</h2>
  <p>Deloitte’s Finance Trends 2026 release (8 October 2025) found that 63% of finance teams have fully deployed and actively use AI, while only 21% report clear, measurable ROI, and 14% are using fully integrated AI agents. Adoption without evidence is the gap this house was built for.</p>
  <p>APQC (16 March 2026) still shows a wide spread in the cost to perform AP per $1,000 of revenue — about $0.38 at the top versus about $0.92 at the bottom. Process quality moves money. A model does not erase that.</p>
</section>
<section>
  <h2>What agentic AP actually means here</h2>
  <p>Named jobs. Structured hand-offs. Autonomy that starts at Observe. Four classes of work that stay human: payment release, vendor bank-change, policy exceptions, legal disputes.</p>
  <p>It is not “turn on autonomous AI and remove the AP team.” Humans keep judgement, suppliers, controls and improvement. Agents handle repeatable analytical and administrative work under a written ceiling.</p>
</section>
<section>
  <h2>A workforce, not a thread</h2>
  <div class="grid four">
    <div class="card"><div class="meta">CAPTURE</div><h3>Intake</h3><p>Complete, cited, suitable for downstream work — or parked with a reason.</p></div>
    <div class="card"><div class="meta">QUALIFY</div><h3>Validate · Match · Duplicate</h3><p>Prove the invoice. Match within a versioned tolerance. Flag pairs. Not a fraud opinion.</p></div>
    <div class="card"><div class="meta">RESOLVE</div><h3>Triage · GR · PO · Chase</h3><p>Taxonomy codes. Named owners. Drafts behind a send-gate.</p></div>
    <div class="card"><div class="meta">CONTROL</div><h3>Approve · Review pay · Close</h3><p>A human authorises the payment run. The orchestrator sequences and stops.</p></div>
  </div>
</section>
<section>
  <h2>Responsibility is earned</h2>
  <div class="levels">
    <div class="level"><strong>L0</strong>Observe. Reviews. Cannot act.</div>
    <div class="level"><strong>L1</strong>Recommend. Advice for a human.</div>
    <div class="level"><strong>L2</strong>Prepare. Drafts. Approval to send or post.</div>
    <div class="level"><strong>L3</strong>Execute within guardrails. Pre-approved, low-risk only.</div>
    <div class="level"><strong>L4</strong>Managed autonomy. Sampled. Kill-switched. Still no cash movement.</div>
  </div>
</section>
<section>
  <h2>What you buy</h2>
  <table>
    <thead><tr><th>Tier</th><th>Price</th><th>For</th></tr></thead>
    <tbody>
      <tr><td>AP AI Readiness Diagnostic</td><td class="mono">$0</td><td>An executive who will trade an email for a score they can defend</td></tr>
      <tr><td>Starter Kit</td><td class="mono">$79</td><td>First slice. Ten blueprints. Monday start.</td></tr>
      <tr><td>Professional</td><td class="mono">$199</td><td>The full OS a practitioner runs</td></tr>
      <tr><td>Team</td><td class="mono">$499</td><td>Five named seats. Workshop pack. One legal entity.</td></tr>
      <tr><td>Custom Blueprint</td><td class="mono">$1,500–3,000</td><td>Productised written assessment. Application, not impulse.</td></tr>
    </tbody>
  </table>
  <div class="cta">
    <a class="btn" href="diagnostic.html">Assess Your AP Agent Readiness</a>
    <a class="btn ghost" href="pricing.html">See licences</a>
  </div>
</section>
<section>
  <h2>Who it is for</h2>
  <p>200–10,000+ employee organisations. Complex AP. ERP. Meaningful exceptions. Shared services. Audit pressure. Microsoft Dynamics 365, SAP, Oracle, NetSuite, Workday Financials, or a mix. The OS is not dependent on one of them.</p>
</section>
<section>
  <h2>Questions we actually answer</h2>
  <div class="grid two">
    <div class="card"><h3>Is this software?</h3><p>No. It is an operating system you run on the stack you have. Software may come later. This ships as files you can use on Monday.</p></div>
    <div class="card"><h3>Will it detect fraud?</h3><p>No. Agent 10 flags duplicates and anomalies. It is not a fraud-detection guarantee.</p></div>
    <div class="card"><h3>Can the agent pay?</h3><p>No. Payment authorisation remains human-controlled. That is a product rule, not a footnote.</p></div>
    <div class="card"><h3>Is this a prompt pack?</h3><p>No. Charters, taxonomy, controls, KPIs, test method, and a promotion file. Instruction skeletons are starting operating instructions.</p></div>
  </div>
</section>
"""

write("index.html", "Proof before permission", home_body, hero_home)

write("ap-agent-os.html", "AP Agent OS", """
<section class="hero" style="border:0;">
  <div class="kicker">Product</div>
  <h1>AP Agent OS</h1>
  <div class="rule"></div>
  <p class="sub">Sixteen agents. Five autonomy levels. Four things that stay human. ERP-agnostic by design.</p>
</section>
<section>
  <h2>The library</h2>
  <ol>
    <li>Invoice Intake</li><li>Invoice Validation</li><li>Matching</li>
    <li>Exception Triage</li><li>Goods Receipt</li><li>PO Quality</li>
    <li>Approval</li><li>Supplier Resolution</li><li>Internal Follow-Up</li>
    <li>Duplicate &amp; Anomaly</li><li>Vendor Statement Reconciliation</li>
    <li>Payment Proposal Review</li><li>AP Close</li><li>AP Reporting</li>
    <li>Root Cause</li><li>AP Manager / Orchestrator</li>
  </ol>
  <p>Each charter names purpose, exclusions, inputs, tools, output standard, L0–L4 rights, owner, escalation, controls, evidence, failure handling, cost envelope, and KPIs.</p>
</section>
<section>
  <h2>Also in Professional</h2>
  <p>Process method (Observe → Expand responsibility). Governance. Control matrix. Exception taxonomy (27 codes). KPI dictionary. Historical test, UAT, shadow, pilot. Business-case model. Templates.</p>
  <p class="fine">Hackett (19 November 2025) research on AP <em>software</em> adopters — 60% average touchless, 3.5× productivity at ≥30% touchless — is market context. It is not an Evidence Room performance claim.</p>
</section>
""")

write("diagnostic.html", "AP AI Readiness Diagnostic", """
<section class="hero" style="border:0;">
  <div class="kicker">Free</div>
  <h1>Assess your AP Agent readiness.</h1>
  <div class="rule"></div>
  <p class="sub">Thirty-six questions. Six domains. A score you can show a Controller. Thirty to forty minutes. No invented industry target.</p>
  <div class="cta"><a class="btn" href="#form">Get the diagnostic</a></div>
</section>
<section>
  <h2>What you receive</h2>
  <ul>
    <li>Questions with a 0–4 AP rubric — not yes/no theatre.</li>
    <li>Domain subtotals and a hard brake if bank-change vs payment SoD is weak.</li>
    <li>Opportunity heatmap for a first-wave ten agents.</li>
    <li>Baseline KPI worksheet you fill with <em>your</em> numbers.</li>
    <li>A business-case starter that captures inputs, not promised savings.</li>
  </ul>
</section>
<section id="form">
  <h2>Exchange</h2>
  <p>Email address for the file. No drip of false urgency. The sequence that follows is seven letters. You can leave it.</p>
  <form class="card" action="#" method="post" onsubmit="alert('Connect this form to Lemon Squeezy lead-magnet or your email tool. The product file is ready in the repo.'); return false;">
    <label>Work email<br/><input type="email" required name="email" style="width:100%;padding:10px;margin:8px 0 16px;border:1px solid var(--rule);background:var(--white);"/></label>
    <button class="btn" type="submit">Send the diagnostic</button>
    <p class="fine">We do not sell your address. See Privacy. This form is a front-end until the store is live.</p>
  </form>
</section>
""")

write("professional.html", "Professional", """
<section class="hero" style="border:0;">
  <div class="kicker">US$199  ·  Professional licence</div>
  <h1>The OS a practitioner runs.</h1>
  <div class="rule"></div>
  <p class="sub">One named user. One legal entity. The full library, governance, controls, KPI standard, testing path, and business-case model.</p>
  <div class="cta"><a class="btn" href="pricing.html">Buy Professional</a></div>
</section>
<section>
  <p>Would a Finance Director responsible for about 15,000 invoices a month pay US$199 of their own money for this? That is the test we wrote to. If the files do not save them days of research and give them a credible implementation framework, they should not ship.</p>
</section>
""")

write("team.html", "Team Edition", """
<section class="hero" style="border:0;">
  <div class="kicker">US$499  ·  Five named seats</div>
  <h1>Take it into a workshop tomorrow.</h1>
  <div class="rule"></div>
  <p class="sub">Everything in Professional, plus facilitation, exercises, steering paper, training, change toolkit, and trackers. One legal entity.</p>
</section>
""")

write("custom.html", "Custom Blueprint", """
<section class="hero" style="border:0;">
  <div class="kicker">US$1,500–3,000  ·  Application</div>
  <h1>A written operating design. Not an implementation.</h1>
  <div class="rule"></div>
  <p class="sub">You return a structured intake. We return current-state, opportunity map, recommended first agents, controls, a case structure, and a 90-day plan that defaults to shadow — not execute.</p>
  <p>We will not accept ‘autonomous payment release’ as the success criterion.</p>
</section>
""")

write("method.html", "Method", """
<section class="hero" style="border:0;">
  <div class="kicker">Observe → Expand</div>
  <h1>Ten steps. One increment.</h1>
  <div class="rule"></div>
  <ol>
    <li>Observe as-done work</li>
    <li>Transcribe</li>
    <li>Extract objects</li>
    <li>Structure maps, trees, RACI, SOP</li>
    <li>Agentise — human / recommend / prepare / execute / deterministic</li>
    <li>Test on historical gold</li>
    <li>Shadow without action permissions</li>
    <li>Controlled pilot</li>
    <li>Measure against baseline</li>
    <li>Expand responsibility only with a file</li>
  </ol>
</section>
""")

write("pricing.html", "Pricing", """
<section class="hero" style="border:0;">
  <div class="kicker">Licences</div>
  <h1>Pay for the right, not a seat-bot.</h1>
  <div class="rule"></div>
</section>
<section>
  <table>
    <thead><tr><th></th><th>Diagnostic</th><th>Starter</th><th>Professional</th><th>Team</th><th>Blueprint</th></tr></thead>
    <tbody>
      <tr><td>Price</td><td>$0</td><td>$79</td><td>$199</td><td>$499</td><td>$1,500–3,000</td></tr>
      <tr><td>Licence</td><td>Evaluation</td><td>Individual</td><td>1 named user, 1 entity</td><td>5 named seats, 1 entity</td><td>Service + licence</td></tr>
      <tr><td>16-agent library</td><td>—</td><td>First 10 (abbrev.)</td><td>Full</td><td>Full</td><td>Mapped to you</td></tr>
      <tr><td>Workshop pack</td><td>—</td><td>—</td><td>—</td><td>Yes</td><td>Optional in SOW</td></tr>
    </tbody>
  </table>
  <p class="fine">Checkout via Lemon Squeezy (Merchant of Record). Published platform fee 5% + 50¢ per transaction as of 20 September 2026; additional fees may apply. Launch window: Professional at $159 (20% off) for the first 30 days or 50 licences. Extra Team seat $79. Refund recommendation: 14-day fitness refund if files unused as a third-party deliverable — counsel to confirm.</p>
</section>
""")

write("about.html", "About", """
<section class="hero" style="border:0;">
  <div class="kicker">House</div>
  <h1>Evidence Room</h1>
  <div class="rule"></div>
  <p class="sub">A Finance AI house. AP is the first room. The standard is proof before permission.</p>
  <p>We publish operating systems, not vibes. We will not claim your ERP is obsolete. We will not sell autonomous payments. Future rooms — AR, Close, Treasury, Reconciliations, Controls, FP&amp;A — are named and not built.</p>
</section>
""")

write("resources.html", "Resources", """
<section class="hero" style="border:0;">
  <h1>Resources</h1>
  <div class="rule"></div>
  <p><a href="diagnostic.html">Diagnostic</a> · Research ledger (in the product) · 90-day content system (in the commercial pack).</p>
  <p class="fine">Sources we will cite in public: APQC 16 Mar 2026; Deloitte Finance Trends 2026 (8 Oct 2025); Hackett Group 19 Nov 2025 (software-adopter context); Lemon Squeezy pricing retrieved 20 Sep 2026.</p>
</section>
""")

write("privacy.html", "Privacy", """
<section class="hero" style="border:0;"><h1>Privacy</h1><div class="rule"></div>
<p>Draft language for counsel. Not in force until reviewed.</p>
<p>We collect account and order data via our Merchant of Record. Lead-magnet email is used to deliver the diagnostic and the stated sequence. We do not sell addresses. Invoice images you place in <em>your</em> agents are your processing, not ours, unless you send them to us for a Blueprint — in which case the intake says what to redact.</p>
</section>
""")

write("terms.html", "Terms", """
<section class="hero" style="border:0;"><h1>Terms</h1><div class="rule"></div>
<p>Draft. See the licence file in the product: Individual, Professional, Team. No resale, redistribution, sublicensing, or publishing the templates as your product. Counsel must finalise before checkout is live.</p>
</section>
""")

write("disclaimer.html", "Disclaimer", """
<section class="hero" style="border:0;"><h1>Disclaimer</h1><div class="rule"></div>
<p>Evidence Room products are educational and operational toolkits. They are not legal, tax, audit, accounting, or investment advice. They do not certify compliance, detect fraud, guarantee savings or ROI, or authorise autonomous payments. Third-party research is cited with source and independence. Software-adopter statistics are not our results.</p>
</section>
""")

# landing alias — same as home for conversion URL
(OUT / "landing.html").write_text((OUT / "index.html").read_text(encoding="utf-8"), encoding="utf-8")
print("landing.html")
