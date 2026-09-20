#!/usr/bin/env python3
"""Build the Evidence Room static site."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "08_WEBSITE" / "site"

NAV = [
    ("AP Agent OS", "ap-agent-os.html"),
    ("Method", "method.html"),
    ("Diagnostic", "diagnostic.html"),
    ("Professional", "professional.html"),
    ("Team", "team.html"),
    ("Custom", "custom.html"),
    ("About", "about.html"),
]


def page(title: str, body: str, *, description: str, canonical: str) -> str:
    links = "".join(f'<a href="{href}">{label}</a>' for label, href in NAV)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="https://evidenceroom.ai/{canonical}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/site.css">
  <link rel="icon" href="assets/mark.svg">
</head>
<body>
  <div class="wrap">
    <nav class="nav">
      <a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span>Evidence Room</a>
      <div class="nav-links" id="nav">
        {links}
        <a class="btn" href="diagnostic.html">Assess readiness</a>
      </div>
      <a class="btn ghost" href="#nav" onclick="document.getElementById('nav').classList.toggle('open'); return false;" style="display:none" id="menu">Menu</a>
    </nav>
  </div>
  {body}
  <footer class="site">
    <div class="wrap foot-grid">
      <div>
        <div class="brand" style="margin-bottom:10px"><span class="mark"></span>Evidence Room</div>
        <p>The operating system for building, governing and scaling AI agents across Accounts Payable.</p>
        <p>Responsibility is earned.</p>
      </div>
      <div>
        <strong>Product</strong>
        <a href="ap-agent-os.html">AP Agent OS</a>
        <a href="diagnostic.html">Free diagnostic</a>
        <a href="professional.html">Professional · $199</a>
        <a href="team.html">Team · $499</a>
        <a href="custom.html">Custom Blueprint</a>
      </div>
      <div>
        <strong>Company</strong>
        <a href="method.html">Method</a>
        <a href="about.html">About</a>
        <a href="resources.html">Resources</a>
        <a href="landing.html">Landing</a>
      </div>
      <div>
        <strong>Legal</strong>
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="disclaimer.html">Disclaimer</a>
        <p class="muted" style="margin-top:12px">© 2026 Evidence Room. Digital operating materials. Not an ERP, payment system, or guarantee of savings.</p>
      </div>
    </div>
  </footer>
</body>
</html>
"""


def write(name: str, title: str, description: str, body: str) -> Path:
    path = SITE / name
    path.write_text(page(title, body, description=description, canonical=name), encoding="utf-8")
    return path


def home() -> str:
    return """
  <div class="wrap hero">
    <p class="kicker">Evidence Room · AP Agent OS</p>
    <h1>The operating system for AP agents.</h1>
    <p class="deck">Evidence Room turns Finance AI from experimentation into measurable operating performance.</p>
    <p class="line">Responsibility is earned.</p>
    <div class="actions">
      <a class="btn" href="diagnostic.html">Assess Your AP Agent Readiness</a>
      <a class="btn ghost" href="ap-agent-os.html">Explore the AP Agent OS</a>
    </div>
  </div>
  <div class="wrap">
    <div class="strip">
      <div><strong>What</strong><span>An operating system — method, controls, measurement, and agent designs — for a governed agent layer across AP.</span></div>
      <div><strong>Who</strong><span>Finance, AP, controllership, shared-services, and internal-audit leaders.</span></div>
      <div><strong>Improves</strong><span>How you design, govern, measure, and scale agent work. Not a new ERP.</span></div>
      <div><strong>Different</strong><span>Evidence over theatre. No guaranteed savings. No autonomous payments.</span></div>
    </div>
  </div>
  <section>
    <div class="wrap grid-2">
      <div>
        <h2>The software is not the gap. The operating system is.</h2>
        <p>Most AP teams are asked to “add AI” to a stack that already includes an ERP, an AP suite, a bank portal, and a shared-services team.</p>
        <p>Without a designed agent layer, pilots stay in a slide. Exceptions still sit with the same six people. Nobody can say what the agent is allowed to do, what it must escalate, or which operating measure would count as progress.</p>
        <p>That is not a model problem. It is a responsibility problem.</p>
      </div>
      <div class="do-not">
        <h3>What this is not</h3>
        <p>Not a ChatGPT prompt pack. Not an ebook. Not an ERP replacement. Not an autonomous payment system. Not a guarantee of savings, fraud detection, compliance, or ROI.</p>
        <p>It does not replace Coupa, SAP, Oracle, NetSuite, Tipalti, Medius, or the bank. It does not pay suppliers.</p>
      </div>
    </div>
  </section>
  <section class="alt">
    <div class="wrap">
      <p class="kicker">The workforce</p>
      <h2>Sixteen agents. One human payment release.</h2>
      <p class="muted">Intake, validation, matching, triage, goods receipt, PO quality, approval, supplier and internal follow-up, duplicate screening, statements, payment-proposal challenge, close, reporting, root cause, orchestrator.</p>
      <table style="margin-top:28px">
        <thead><tr><th>Path</th><th>Agents</th><th>Hard boundary</th></tr></thead>
        <tbody>
          <tr><td>Invoice</td><td>A01 → A10 → A02 → A03 → A07 → post</td><td>Ledger remains book of record</td></tr>
          <tr><td>Exception</td><td>A04 with A05 / A06 / A08 / A09</td><td>Agents route and draft; humans resolve</td></tr>
          <tr><td>Periodic</td><td>A11, A12, A13, A14, A15</td><td>A12 never releases a payment</td></tr>
          <tr><td>Supervise</td><td>A16 Orchestrator</td><td>Cannot promote itself or anyone else</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <section>
    <div class="wrap">
      <p class="kicker">Responsibility model</p>
      <h2>Agents earn the next level. They do not start there.</h2>
      <div class="levels">
        <article><h3>0 Observe</h3><p>Reviews. Cannot act.</p></article>
        <article><h3>1 Recommend</h3><p>Recommendations for humans.</p></article>
        <article><h3>2 Prepare</h3><p>Drafts. Approval required.</p></article>
        <article><h3>3 Guarded execute</h3><p>Pre-approved low-risk actions only.</p></article>
        <article><h3>4 Managed autonomy</h3><p>Scoped, time-boxed, exception oversight.</p></article>
      </div>
    </div>
  </section>
  <section class="alt">
    <div class="wrap">
      <p class="kicker">Commercial suite</p>
      <h2>Start Friday. Redesign Monday.</h2>
      <div class="grid-3" style="margin-top:28px">
        <article class="card">
          <p class="kicker">Tier 0</p>
          <h3>AP AI Readiness Diagnostic</h3>
          <div class="price">Free</div>
          <p>36 questions. Maturity model. Heatmap. Baseline worksheet.</p>
          <a class="btn" href="diagnostic.html">Start the diagnostic</a>
        </article>
        <article class="card">
          <p class="kicker">Tier 1–2</p>
          <h3>Starter · Professional</h3>
          <div class="price">$79 · $199</div>
          <p>Operating model through the full 16-agent OS, controls, KPIs, and economics model.</p>
          <a class="btn ghost" href="professional.html">See Professional</a>
        </article>
        <article class="card">
          <p class="kicker">Tier 3–4</p>
          <h3>Team · Blueprint</h3>
          <div class="price">$499 · from $1,500</div>
          <p>Workshop, steering, change, or a productised assessment returned as a pack.</p>
          <a class="btn ghost" href="team.html">See Team</a>
        </article>
      </div>
    </div>
  </section>
  <section>
    <div class="wrap grid-2">
      <div>
        <h2>Evidence, not borrowed dollars.</h2>
        <p>Ardent Partners’ 2024 Best-in-Class AP teams — the top 20% by cost and cycle — reported 78% lower invoice-processing cost, 82% faster cycle times, and 59% lower exception rates than peers, with a 9% Best-in-Class exception rate.</p>
        <p>Forrester (March 2025) maps current AI value in AP to capture, matching, reporting, fraud management, payment management, and e-invoicing/tax.</p>
        <p class="muted">Those are industry observations. They are not a forecast for your entity, and they are not Evidence Room results.</p>
      </div>
      <div class="do">
        <h3>Governed agents. Measurable outcomes.</h3>
        <p>NIST AI RMF (Govern, Map, Measure, Manage) and the July 2024 Generative AI Profile inform the control system. Evidence Room is not ISO/IEC 42001 certified. The product helps you run an evidence-producing operation.</p>
      </div>
    </div>
  </section>
"""


def simple(kicker: str, title: str, deck: str, inner: str) -> str:
    return f"""
  <div class="wrap page-hero">
    <p class="kicker">{kicker}</p>
    <h1>{title}</h1>
    <p class="deck">{deck}</p>
  </div>
  <section style="padding-top:10px">
    <div class="wrap">{inner}</div>
  </section>
"""


def build() -> list[Path]:
    SITE.mkdir(parents=True, exist_ok=True)
    (SITE / "assets").mkdir(exist_ok=True)
    (SITE / "assets" / "mark.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" fill="none" stroke="#14171c" stroke-width="2"/><rect x="8" y="8" width="3" height="16" fill="#1e5c45"/></svg>""",
        encoding="utf-8",
    )
    paths = []
    paths.append(write("index.html", "Evidence Room · The operating system for AP agents",
                       "Evidence Room is the operating system for building, governing and scaling AI agents across Accounts Payable. Responsibility is earned.",
                       home()))
    paths.append(write("ap-agent-os.html", "AP Agent OS · Evidence Room",
                       "Sixteen-agent architecture, earned responsibility, controls, and measurement for Accounts Payable.",
                       simple("Product", "AP Agent OS", "The toolkit a Finance leader uses to design the agent layer that sits across the stack they already have.",
                              """
        <div class="grid-2">
          <div>
            <h2>What you receive</h2>
            <ul>
              <li>16 agent charters with exclusions, owners, KPIs, and Northline worked examples.</li>
              <li>Levels 0–4 responsibility model. Full autonomy is never the default.</li>
              <li>Exception taxonomy E01–E27.</li>
              <li>10-step Observe → Expand methodology.</li>
              <li>Governance mapped to NIST AI RMF. Control matrix. Risk register.</li>
              <li>KPI families: Activity, Operational, Financial, Risk-control.</li>
              <li>Business-case model that will report “no payback” if that is what the maths says.</li>
            </ul>
          </div>
          <div class="card">
            <h3>Hard rules</h3>
            <p>Payment authorisation stays human. Agents are not controls. The ERP is the book of record. Invoice text is untrusted data. Model changes are releases.</p>
            <a class="btn" href="professional.html">Professional · $199</a>
          </div>
        </div>
        """)))
    paths.append(write("diagnostic.html", "AP AI Readiness Diagnostic · Evidence Room",
                       "Free 36-question diagnostic for AP agent readiness. Email-gate lead magnet.",
                       simple("Free · Tier 0", "Assess Your AP Agent Readiness",
                              "Thirty-six questions across process, data, controls, people, systems, and economics. A score is not a certification.",
                              """
        <p>Score 0–3 per question. Domains average into an overall 0–100. Bands: Forming, Defined, Governed, Evidenced.</p>
        <p>Hard gates: if payment release is not dual-controlled, do not discuss Level 3. If you cannot extract 12 months of invoice history, do not start with matching.</p>
        <p>Includes a 10-agent opportunity heatmap and a business-case starter that refuses vendor-blog cost-per-invoice figures as your baseline.</p>
        <p class="muted">In production this page captures an email via Lemon Squeezy lead magnet and delivers the diagnostic ZIP. This preview is the content and worksheet, not a live checkout.</p>
        <div class="actions" style="margin-top:24px">
          <a class="btn" href="assets/ER_AP_READINESS_DIAGNOSTIC.xlsx">Open the scorecard workbook</a>
          <a class="btn ghost" href="professional.html">See what comes after</a>
        </div>
        """)))
    paths.append(write("professional.html", "AP Agent OS Professional · $199 · Evidence Room",
                       "Full 16-agent operating system, controls, KPIs, testing, and economics.",
                       simple("US$199 · One named user", "Professional",
                              "Everything required to specify, govern, test, and measure an AP agent workforce — without buying another platform first.",
                              """
        <ul>
          <li>Full 16-agent library and charter standard.</li>
          <li>Process discovery, taxonomy, decision trees, SOP framework.</li>
          <li>Governance framework, control matrix, risk register, RACI.</li>
          <li>KPI definitions, ROI calculator, agent economics, autonomy progression.</li>
          <li>Testing scripts, UAT, shadow and pilot methodology.</li>
          <li>Management dashboard layouts, weekly pack, CFO/board templates.</li>
        </ul>
        <p>Licence: Professional — one named user for professional/commercial work inside one organisation. No resale, redistribution, or republishing as your product.</p>
        <a class="btn" href="team.html">Need a workshop? Team · $499</a>
        """)))
    paths.append(write("team.html", "AP Agent OS Team · $499 · Evidence Room",
                       "Enterprise transformation edition: workshop, steering, change, trackers.",
                       simple("US$499 · One defined company/team", "Team Edition",
                              "Suitable to walk into a workshop tomorrow and run a credible AP AI transformation session.",
                              """
        <p>Everything in Professional, plus facilitation pack, 1- and 2-day agendas, interview guide, process-owner questionnaires, exercises, training modules, steering templates, implementation and benefits trackers, and a change-management toolkit.</p>
        <p>Hours released are tracked as capacity until Finance signs cash.</p>
        <a class="btn" href="custom.html">Or commission a Blueprint</a>
        """)))
    paths.append(write("custom.html", "AP Transformation Blueprint · Evidence Room",
                       "Productised service. Structured intake in, executive pack out.",
                       simple("US$1,500–3,000 · Productised service", "Transformation Blueprint",
                              "You provide structured information. Evidence Room returns an assessment, architecture, controls, and a 90-day plan — or declines the work.",
                              """
        <p>Delivered as a repeatable, AI-assisted fulfilment workflow. Decline is a normal outcome when data, ownership, or control preconditions are missing.</p>
        <p>Not a software implementation. Not a substitute for your auditor or counsel.</p>
        """)))
    paths.append(write("method.html", "Method · Evidence Room",
                       "Observe, Transcribe, Extract, Structure, Agentise, Test, Shadow, Pilot, Measure, Expand.",
                       simple("Methodology", "Ten steps. Responsibility expands last.",
                              "A repeatable conversion of an existing AP process into an agent workflow.",
                              """
        <ol>
          <li>Observe — walk the real process with AP staff.</li>
          <li>Transcribe — capture the discussion.</li>
          <li>Extract — steps, systems, decisions, rules, controls.</li>
          <li>Structure — map, tree, taxonomy, control map, RACI, SOP.</li>
          <li>Agentise — human / recommend / prepare / execute / deterministic.</li>
          <li>Test — historical cases.</li>
          <li>Shadow — no action permissions.</li>
          <li>Controlled pilot — limited users, transactions, categories.</li>
          <li>Measure — against baseline, four KPI families.</li>
          <li>Expand responsibility — only after evidence.</li>
        </ol>
        """)))
    paths.append(write("about.html", "About · Evidence Room",
                       "Finance AI as measurable operating performance.",
                       simple("About", "A Finance AI brand that refuses theatre.",
                              "Evidence Room publishes operating systems for Finance agents. AP is the first domain.",
                              """
        <p>Future modules may include AR, Close, Treasury, Reconciliations, Controls, and FP&A. They are not for sale yet. AP Agent OS must stand alone.</p>
        <p>Contact for the store and diagnostic: hello@evidenceroom.ai (configure at launch).</p>
        """)))
    paths.append(write("landing.html", "Governed AP agents · Evidence Room",
                       "Conversion landing for AP Agent OS.",
                       simple("Landing", "Governed agents for Accounts Payable.",
                              "What it is. Who it is for. What it improves. Why it is different.",
                              """
        <div class="actions" style="margin-bottom:32px">
          <a class="btn" href="diagnostic.html">Assess Your AP Agent Readiness</a>
          <a class="btn ghost" href="ap-agent-os.html">Explore the AP Agent OS</a>
        </div>
        <div class="faq">
          <details open><summary>Does this replace our AP automation suite?</summary><p>No. It designs the agent layer that operates across the stack you already have.</p></details>
          <details><summary>Will agents pay our suppliers?</summary><p>No. Payment authorisation remains human. A12 challenges the proposal only.</p></details>
          <details><summary>Do you guarantee savings?</summary><p>No. The calculator uses your baseline and will show no payback when that is the result.</p></details>
          <details><summary>Is this a prompt pack?</summary><p>No. It is charters, controls, taxonomy, methodology, KPIs, and earned autonomy.</p></details>
          <details><summary>Which ERP?</summary><p>None exclusively. SAP, D365, Oracle, NetSuite, Workday, and equivalents.</p></details>
        </div>
        """)))
    paths.append(write("resources.html", "Resources · Evidence Room",
                       "Research notes and frameworks.",
                       simple("Resources", "What we cite, and what we refuse to invent.",
                              "A public slice of the research ledger.",
                              """
        <ul>
          <li>Ardent Partners Best-in-Class 2024 via Payables Place, 21 January 2025.</li>
          <li>Forrester, Meng Liu, 17 March 2025 — six AI AP use cases. Wave Q3 2024 exists (RES181078); we do not invent scores.</li>
          <li>NIST AI RMF 1.0 and NIST AI 600-1 (July 2024).</li>
          <li>Vendor-blog $10–$15 vs $2–$3 cost-per-invoice: treated as unverified absolute dollars.</li>
        </ul>
        """)))
    legal = "<p>Draft for professional legal review. Not legal advice. Selling entity to be named before first paid sale.</p>"
    paths.append(write("privacy.html", "Privacy · Evidence Room", "Privacy notice draft.",
                       simple("Legal", "Privacy", "How we intend to handle email and diagnostic data.",
                              legal + "<p>Lead-magnet email is used to deliver the diagnostic and the stated sequence. No sale of lists. Lemon Squeezy processes checkout as merchant of record.</p>")))
    paths.append(write("terms.html", "Terms · Evidence Room", "Terms of sale draft.",
                       simple("Legal", "Terms", "Licence, acceptable use, and limitations.",
                              legal + "<p>Individual / Professional / Team licences. No resale, redistribution, sublicensing, or republishing templates as the purchaser’s product.</p>")))
    paths.append(write("disclaimer.html", "Disclaimer · Evidence Room", "Product disclaimer.",
                       simple("Legal", "Disclaimer", "Materials are educational and operational. They are not legal, tax, accounting, or investment advice.",
                              legal + "<p>No guarantee of savings, fraud detection, regulatory compliance, accounting accuracy, autonomous payment safety, or ROI. Payment authorisation remains human.</p>")))
    return paths


if __name__ == "__main__":
    for p in build():
        print(p)
