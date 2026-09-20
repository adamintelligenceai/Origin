# Evidence Room — AP Agent OS

**Proof before permission.**  
Agents earn responsibility. Evidence decides.

This repository is the commercial product system for **Evidence Room — AP Agent OS**: the operating system for building, governing and scaling AI agents across Accounts Payable. It does not replace the AP stack. It designs the agent layer that operates across it.

- **Domain:** [evidenceroom.ai](https://evidenceroom.ai) (available as of 20 September 2026)
- **Launch prices:** Diagnostic $0 · Starter $79 · Professional $199 · Team $499 · Blueprint $1,500–3,000
- **Refined prompt:** [`PROMPT/00_REFINED_MASTER_PROMPT.md`](PROMPT/00_REFINED_MASTER_PROMPT.md)
- **Product root:** [`EVIDENCE_ROOM/`](EVIDENCE_ROOM/)
- **Start here:** [`EVIDENCE_ROOM/00_READ_ME/START_HERE.md`](EVIDENCE_ROOM/00_READ_ME/START_HERE.md)

## What shipped

| Layer | Where |
|---|---|
| Flagship PDFs | Diagnostic, Starter, Professional, Team, Blueprint, Start Here |
| Workbooks | Readiness scorecard, business case, KPI, registry, exceptions, controls, roadmap, benefits, tracker |
| Word templates | SOP, charter, discovery, RACI, UAT, risk, meeting, plan, governance |
| Decks | CFO, workshop, steering, business case |
| Website | `EVIDENCE_ROOM/08_WEBSITE/` |
| Store / funnel / legal / research / brand | folders `06`–`11` |

## Build artefacts

```bash
python3 EVIDENCE_ROOM/99_BUILD/generate_workbooks.py
python3 EVIDENCE_ROOM/99_BUILD/generate_docs.py
python3 EVIDENCE_ROOM/99_BUILD/generate_decks.py
python3 EVIDENCE_ROOM/99_BUILD/generate_site.py
python3 EVIDENCE_ROOM/99_BUILD/generate_pdfs.py
```

## Commercial tests

1. Would a Finance Director with ~15,000 invoices/month pay **US$199** for this?
2. Could a transformation lead run a Team workshop tomorrow?
3. Is it obviously an operating system for Finance agents — not a prompt pack?

If any answer is no, do not ship.
