"""Shared chrome for Evidence Room product pages. Run: python3 _chrome.py"""

from pathlib import Path

SITE = Path(__file__).resolve().parent

HEAD = """<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{title}</title>
<meta name="description" content="{desc}"/>
<link rel="stylesheet" href="styles.css"/>
<link rel="icon" href="favicon.svg" type="image/svg+xml"/>
</head><body>
  <header class="site-header"><div class="wrap header-inner">
    <a class="brand" href="index.html"><span class="mark"></span>EVIDENCE ROOM — AP AGENT OS</a>
    <nav class="nav">
      <a href="index.html">Home</a>
      <a href="ap-agent-os.html">AP Agent OS</a>
      <a href="method.html">Method</a>
      <a href="diagnostic.html">Diagnostic</a>
      <a href="professional.html">Professional</a>
      <a href="team.html">Team</a>
      <a href="about.html">About</a>
    </nav>
    <div class="header-cta"><a class="btn" href="diagnostic.html">Assess readiness</a></div>
  </div></header>
<main>
"""

FOOT = """
</main>
  <footer class="site-footer"><div class="wrap footer-grid">
    <div><p class="brand"><span class="mark"></span>EVIDENCE ROOM — AP AGENT OS</p>
    <p>Design the layer. Keep the stack.</p>
    <p>Not Evidence Room LLC (forensic animation). Not an ERP. Not a payment institution.</p></div>
    <div class="footer-links">
      <a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>
      <a href="disclaimer.html">Disclaimer</a><a href="custom-blueprint.html">Custom Blueprint</a>
      <a href="resources.html">Resources</a><a href="starter.html">Starter · $79</a>
    </div>
    <div><p>hello@evidenceroom.ai</p><p>evidenceroom.ai</p>
    <p>Working drafts. Counsel must confirm legal pages before publish.</p></div>
  </div></footer>
</body></html>
"""


def page(name: str, title: str, desc: str, body: str) -> None:
    (SITE / name).write_text(HEAD.format(title=title, desc=desc) + body + FOOT, encoding="utf-8")


def main() -> None:
    page(
        "professional.html",
        "Professional · $199 | AP Agent OS",
        "Full sixteen-agent operating system for one named practitioner.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">Tier 2 · default paid SKU</p>
  <h1>Professional · $199</h1>
  <p class="lede">The operating system for the AP agent layer. Sixteen named roles, a packet standard, a permission ladder, and a written list of decisions that stay human. One named practitioner. File-based — not a hosted bot.</p>
  <div class="hero-actions">
    <a class="btn" href="diagnostic.html">Assess first</a>
    <a class="btn secondary" href="team.html">Need a workshop? Team · $499</a>
  </div>
</section>
<section class="wrap prose">
  <p>Would a Finance Director responsible for 15,000 invoices a month pay $199 of their own money to avoid days of unstructured research and leave with a framework they can defend in a room with Audit present? That is the commercial test this SKU is written to pass.</p>
  <p>You keep SAP, Oracle, Dynamics 365, NetSuite, Workday, Coupa, Tipalti, BILL, the shared-service team, and the delegation of authority. You add a designed layer.</p>
</section>
<section class="wrap">
  <p class="eyebrow">In the zip</p>
  <h2>What a Professional purchaser opens on Monday</h2>
  <div class="table-wrap" style="margin-top:24px">
    <table>
      <thead><tr><th>Object</th><th>What you do with it</th></tr></thead>
      <tbody>
        <tr><td>START HERE — 12 steps</td><td>Diagnose, map, charter, control, measure, then expand responsibility.</td></tr>
        <tr><td>Sixteen agent specifications</td><td>Job, owner, inputs, exclusions, packet, failure handling, default L0/L1.</td></tr>
        <tr><td>Charter + SOP + RACI Word templates</td><td>Blank plus a completed Matching example (Northline, fictional).</td></tr>
        <tr><td>Exception taxonomy (27 codes)</td><td>Closed list. Free-text “other” is a design smell.</td></tr>
        <tr><td>Governance standard + control matrix</td><td>SoD, least privilege, output validation, incident, recertification.</td></tr>
        <tr><td>KPI scorecard workbook</td><td>Activity, operational, financial, risk-control — not a vanity composite.</td></tr>
        <tr><td>Business-case workbook</td><td>Arithmetic on your inputs. Duplicate-suspect savings forced to 0.</td></tr>
        <tr><td>Shadow, historical test, UAT, pilot</td><td>No action permissions until the packet exists.</td></tr>
        <tr><td>217-page Professional OS book</td><td>Printable typeset of the working system.</td></tr>
      </tbody>
    </table>
  </div>
</section>
<section class="wrap">
  <div class="hold">
    <p class="eyebrow gilt">Hard hold</p>
    <h2>Agents do not approve, release, or transmit payment.</h2>
    <p>Vendor-bank change and close attestation stay human. Duplicate &amp; Anomaly flags are hypotheses, not fraud verdicts. Remaining at L1 is a successful outcome.</p>
  </div>
</section>
<section class="wrap prose">
  <h2>Licence</h2>
  <p>Individual: one named user, including ordinary internal presentation. No resale, redistribution, sublicensing, or publishing the files as your own product. Team is the working-group licence. Drafts for counsel — not legal advice.</p>
  <p>Starter ($79) is a working subset. Custom Blueprint ($1,500–$3,000) is a productised assessment, not software.</p>
</section>
""",
    )
    page(
        "team.html",
        "Team · $499 | Workshop edition",
        "Everything in Professional plus a facilitation pack for a real transformation room.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">Tier 3 · working-group licence</p>
  <h1>Team · $499</h1>
  <p class="lede">A transformation lead can take this into a room tomorrow and run a credible AP AI session. Outcome: maturity sentence, holds, six Wave 1 charters, two-week shadow plan, steering date. Non-outcome: a savings target or a platform shortlist.</p>
</section>
<section class="wrap">
  <div class="two">
    <div class="prose">
      <h2>In the room</h2>
      <p>Full-day agenda (08:45–16:30), facilitation notes, timed exercises, interview guides, process-owner questionnaires, steering templates, change toolkit, training outlines, executive communication, multi-entity overlay.</p>
      <p>Decks: CFO briefing, workshop, steering, business-case method. Workbooks and the Professional OS are included.</p>
    </div>
    <div class="card">
      <p class="eyebrow">Who must attend</p>
      <p>Process owner. Controls or Internal Audit as challenger. Match / exception desk. Transformation facilitator. Controller and Treasury at holds.</p>
      <p class="quiet">If C1 (dual humans on payment) is absent, afternoon charters are L0 only and Agent 12 is marked CLOSED.</p>
    </div>
  </div>
</section>
<section class="wrap prose">
  <h2>Licence</h2>
  <p>Internal use within one named organisation / working group (proposed cap: 10 named people — counsel to confirm). Not a product you resell. Not a substitute for Professional if only one pen will sit on the files.</p>
</section>
""",
    )
    page(
        "starter.html",
        "Starter · $79 | AP Agent Starter Kit",
        "Operating model, ten blueprints, taxonomy starter, checklists.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">Tier 1</p>
  <h1>Starter · $79</h1>
  <p class="lede">A working subset: operating model, ten agent blueprints, exception starter list, KPI language, governance checklist, implementation ticks. Designed so the kit feels worth more than the price — and so the buyer knows when to step up to Professional.</p>
</section>
<section class="wrap prose">
  <p>Use Starter to design Wave 1 on paper and stand a two-week shadow. Default autonomy is L0 or L1. Full sixteen-agent specs, control matrix, testing protocols, and the business-case workbook ship in Professional.</p>
  <p>Individual licence. One named user.</p>
  <p><a class="btn" href="professional.html">See what Professional adds</a></p>
</section>
""",
    )
    page(
        "custom-blueprint.html",
        "Custom Blueprint | $1,500–$3,000",
        "Productised assessment. Structured intake. Repeatable fulfilment.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">Tier 4 · application</p>
  <h1>Custom Blueprint</h1>
  <p class="lede">You provide structured information. Evidence Room returns a current-state assessment, opportunity map, recommended architecture, controls framing, KPI baseline language, and a 90-day plan. Repeatable and AI-assisted on our side. Production invoices do not enter our tools.</p>
</section>
<section class="wrap prose">
  <p>This is a productised service, not software implementation, not a guarantee of savings, and not a substitute for counsel or your auditor.</p>
  <p>Range $1,500–$3,000 depending on entities, ERP count, and whether a live workshop is in scope. Application via the intake questionnaire. We may decline if the success criterion is a guaranteed ROI or autonomous payments.</p>
</section>
""",
    )
    page(
        "method.html",
        "Method | Proof before permission",
        "Observe, structure, agentise, shadow, measure, then expand responsibility.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">Method</p>
  <h1>Proof before permission.</h1>
  <p class="lede">Ten steps. Responsibility is earned. Duration depends on systems, controls, data quality, and organisational governance. A 4–6 week illustration for one well-bounded agent is not a commitment.</p>
</section>
<section class="wrap">
  <div class="table-wrap">
    <table>
      <thead><tr><th>Step</th><th>Name</th><th>Exit</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Observe</td><td>Walkthrough recorded with AP staff</td></tr>
        <tr><td>2</td><td>Transcribe</td><td>Transcript exists</td></tr>
        <tr><td>3</td><td>Extract</td><td>Steps, systems, rules, exceptions, controls listed</td></tr>
        <tr><td>4</td><td>Structure</td><td>Map, decision tree, taxonomy, control map, RACI, SOP</td></tr>
        <tr><td>5</td><td>Agentise</td><td>Human / recommend / prepare / execute / deterministic</td></tr>
        <tr><td>6</td><td>Test</td><td>Historical cases scored against a gold label</td></tr>
        <tr><td>7</td><td>Shadow</td><td>Agent operates with no action permissions</td></tr>
        <tr><td>8</td><td>Controlled pilot</td><td>Limited users, transactions, categories + kill-switch</td></tr>
        <tr><td>9</td><td>Measure</td><td>Compared against a locked baseline</td></tr>
        <tr><td>10</td><td>Expand responsibility</td><td>Evidence pack only — missing any item is a decline</td></tr>
      </tbody>
    </table>
  </div>
  <p class="quiet" style="margin-top:24px">Wave 1 is Intake, Validation, Matching, Triage, Duplicate &amp; Anomaly, Orchestrator — at L0 or L1. Do not commission sixteen L3 agents.</p>
</section>
""",
    )
    page(
        "resources.html",
        "Resources | Evidence Room",
        "Articles, frameworks, and diagnostic posts — no hype PDFs.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">Resources</p>
  <h1>Useful first. Commercial second.</h1>
  <p class="lede">About 80% insight, 20% conversion. The 90-day calendar lives in the suite. Nothing here is a customer result.</p>
</section>
<section class="wrap">
  <div class="three">
    <article class="card"><h3>The AP stack is not an agent operating system</h3><p>Capture, match, and workflow can be competent while the workforce on top of them is unnamed.</p></article>
    <article class="card"><h3>Agents earn responsibility</h3><p>L0–L4 is a permission ladder, not a maturity badge you print on a slide.</p></article>
    <article class="card"><h3>A flag is not a fraud verdict</h3><p>Duplicate &amp; Anomaly raises hypotheses. Humans clear. Language matters in the packet.</p></article>
    <article class="card"><h3>Payment is not a promotion topic</h3><p>There is no L3 for cash movement. Dual humans release.</p></article>
    <article class="card"><h3>Do not paste vendor cost-per-invoice as a target</h3><p>Ardent figures, where cited, are vendor-citing-independent. They are not your baseline.</p></article>
    <article class="card"><h3>Free diagnostic</h3><p>36 questions. Six dimensions. Veto rules. No invoice upload.</p><p><a href="diagnostic.html">Score locally →</a></p></article>
  </div>
</section>
""",
    )
    page(
        "ap-agent-os.html",
        "AP Agent OS | Sixteen agents. One payment boundary.",
        "A licensed sixteen-agent architecture, evidence standard, and permission ladder for Accounts Payable.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">Product</p>
  <h1>The operating system for the AP agent layer</h1>
  <p class="lede">Specify, charter, govern, and scale AI agents across invoice-to-pay without pretending the ERP was built for that job. File-based toolkit. Not a hosted bot.</p>
</section>
<section class="wrap prose">
  <p>Sixteen named roles. Five autonomy levels. One payment boundary. ERP remains the system of record for accounting. Named humans remain the system of record for cash.</p>
  <p>Intake does not decide match. Matching does not invent receipts. Triage does not resolve. Supplier Resolution drafts; humans send. Duplicate &amp; Anomaly never says “fraud.” Payment Proposal Review annotates; dual humans release. Orchestrator routes and records; it does not post or pay.</p>
  <p class="note">Default autonomy is L0 or L1. No agent is commissioned at L3 or L4. Payment-related work has a hard ceiling: recommend and prepare only.</p>
  <p><a class="btn" href="professional.html">Professional · $199</a></p>
</section>
""",
    )
    page(
        "about.html",
        "About | Evidence Room",
        "Who we are and who we are not.",
        """
<section class="page-hero wrap">
  <p class="eyebrow">About</p>
  <h1>A room for evidence, not a theatre for demos.</h1>
  <p class="lede">Evidence Room publishes operating systems for Finance agents. AP is the first domain. Future modules — AR, Close, Treasury, Reconciliations, Controls, FP&amp;A — are not built and are not for sale.</p>
</section>
<section class="wrap prose">
  <p>We are not Evidence Room LLC, the forensic-animation studio at evidence-room.net. Distinctive lockup: EVIDENCE ROOM — AP AGENT OS. Intended domain: evidenceroom.ai. Trademark clearance is a professional item before public launch.</p>
  <p>We do not run your ERP. We do not take payment authority. We do not certify compliance. We do not invent customer results.</p>
  <p>Brand idea: <em>Proof before permission.</em></p>
</section>
""",
    )
    page(
        "privacy.html",
        "Privacy | Draft",
        "Draft privacy notice. Not legal advice.",
        """
<section class="page-hero wrap"><h1>Privacy (draft)</h1></section>
<section class="wrap prose">
  <p>This notice is a working draft for counsel. Do not treat it as a complete privacy programme.</p>
  <p>The free diagnostic does not require invoice upload. Scores in this static demo never leave the browser. Production email capture would be used to send the diagnostic and the stated sequence if opted in. We do not sell lists.</p>
  <p>Lemon Squeezy acts as merchant of record for paid checkouts — their processing terms also apply. We do not intend to receive or store full card numbers. Production AP invoices are not required to deliver the toolkit and should not be sent to us.</p>
  <p>We are not Evidence Room LLC (forensic animation). Confirm entity, legal bases, cookies, transfers, and MoR wording with qualified counsel before publish.</p>
</section>
""",
    )
    page(
        "terms.html",
        "Terms | Draft",
        "Draft terms of sale and site use.",
        """
<section class="page-hero wrap"><h1>Terms (draft)</h1></section>
<section class="wrap prose">
  <p>Digital toolkit licence: Individual (Starter / Professional), Team, or Custom Blueprint as stated at checkout. You are buying a licence to use files, not ownership of the copyright, and not software that connects to an ERP.</p>
  <p>No resale, redistribution, sublicensing, or publishing the files (or a thin rewrite) as your own product. Not a transfer of copyright. Not a consultancy methodology you may productise.</p>
  <p>Not legal advice. Counsel must finalise before publish. Lemon Squeezy merchant-of-record terms may also apply to the purchase contract.</p>
</section>
""",
    )
    page(
        "disclaimer.html",
        "Disclaimer | Draft",
        "Limitation of claims.",
        """
<section class="page-hero wrap"><h1>Disclaimer (draft)</h1></section>
<section class="wrap prose">
  <p>Evidence Room does not guarantee savings, ROI, fraud detection, regulatory compliance, accounting accuracy, or autonomous payment safety.</p>
  <p>Business-case outputs are arithmetic on your inputs. They are not a forecast. Duplicate-suspect lines do not create savings.</p>
  <p>Agents do not authorise payment. This is not professional accounting, legal, tax, or audit advice. Northline Industrials is a fictional illustration.</p>
  <p>Customer-facing statistics are limited to the research ledger and labelled for independence. If a number is not in the ledger, it does not ship.</p>
</section>
""",
    )
    print("product pages written")


if __name__ == "__main__":
    main()
