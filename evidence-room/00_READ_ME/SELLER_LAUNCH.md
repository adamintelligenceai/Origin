# Seller launch — from repository to revenue

The product files, customer archives, website, diagnostic, product copy, email
copy, and fulfilment instructions are complete. The steps below connect assets
that require the publisher's identity, bank account, tax details, and legal
approval. Those details cannot be safely invented in source code.

## 1. Build the customer downloads

From the repository root:

```bash
npm run release:evidence-room
```

Upload the four ZIP files from `evidence-room/releases/` to Lemon Squeezy. Match
each archive to the SKU and price in `release-manifest.json`. Retain
`SHA256SUMS.txt` so a customer download can be verified.

Do not upload the repository or the publisher-only folders `06`, `07`, `09`, or
the full `10` folder as a customer download.

## 2. Create the three paid products

Use the finished listings in
`07_LEMON_SQUEEZY/PRODUCT_LISTINGS.md`:

| SKU      | Product                  | Price | Delivery file                           |
| -------- | ------------------------ | ----: | --------------------------------------- |
| ER-START | AP Agent Starter         |   $79 | `Evidence_Room_starter_v1.1.0.zip`      |
| ER-PRO   | AP Agent OS Professional |  $199 | `Evidence_Room_professional_v1.1.0.zip` |
| ER-TEAM  | AP Agent OS Team         |  $499 | `Evidence_Room_team_v1.1.0.zip`         |

Configure tax, merchant identity, payout bank, receipt sender, licence-key
behaviour, and refund handling in the merchant account. Use
`CHECKOUT_AND_EMAILS.md` for the checkout and lifecycle copy.

## 3. Connect checkout

Copy the three live HTTPS checkout URLs into:

`08_WEBSITE/commerce-config.js`

Until those URLs are present, every order button intentionally opens a
pre-filled message to `hello@evidenceroom.ai`. That keeps the offers orderable
without pretending a payment connection exists.

## 4. Publish the website

Deploy the contents of `08_WEBSITE/` as a static site. Before changing DNS:

1. Replace the support email if the mailbox is not active.
2. Confirm all three checkout links in a private browser window.
3. Complete a real low-value test order and verify the correct ZIP arrives.
4. Process a refund test.
5. Have qualified counsel approve the licence, terms, privacy, disclaimer, and
   refund policy for the selling entity and buyer countries.
6. Remove every “draft” or “counsel to confirm” notice only after that approval.
7. Confirm the Evidence Room name and domain are legally available.

## 5. Run the launch funnel

1. Publish the free diagnostic as the primary call to action.
2. Use `06_SALES_AND_MARKETING/EMAIL_SEQUENCE.md` for nurture.
3. Send completed diagnostic users to Professional by default.
4. Position Starter as the lower-commitment path and Team as the workshop path.
5. Use `FULFILMENT_AND_ONBOARDING.md` for buyer onboarding.
6. Record refunds, support questions, and conversion by SKU weekly.

## Revenue-readiness definition

The launch is commercially live only when all are true:

- checkout accepts payment in the publisher's legal entity;
- a test buyer receives the correct, uncorrupted archive;
- licence and legal pages are approved and published;
- support and refund inboxes are monitored;
- domain, analytics, and email consent settings are verified;
- the free diagnostic and all paid pages work on phone and desktop.

Code and content can make the product launch-ready. They cannot create a legal
entity, approve legal terms, or connect a payout bank on the publisher's behalf.
