# Website — evidenceroom.ai

Static, revenue-ready conversion site for Evidence Room — AP Agent OS.

Open `index.html` in a browser, or from this folder:

```
python3 -m http.server 8080
```

Then visit `http://localhost:8080/`.

**Primary CTA:** Complete the gamified AP Agent Readiness Quest → `diagnostic.html`  
**Secondary CTA:** Explore the AP Agent OS → `ap-agent-os.html`

The diagnostic scores locally in the browser, autosaves locally, awards
completion XP and dimension badges, applies the documented veto rules, and
generates a printable debrief. XP rewards completion only; it never inflates
readiness. Do not upload invoices.

Paid buttons read their URLs from `commerce-config.js`. Paste the three live
Lemon Squeezy HTTPS checkout URLs there before launch. If a URL is empty, the
button falls back to a pre-filled sales email so no visitor reaches a dead or
fabricated checkout.

Run the diagnostic logic tests from the repository root:

```
npm run test:diagnostic
```

See `../00_READ_ME/SELLER_LAUNCH.md` for packaging, merchant setup, test-order,
legal, and go-live gates. Legal pages remain drafts until qualified counsel
approves them for the selling entity and buyer countries.
