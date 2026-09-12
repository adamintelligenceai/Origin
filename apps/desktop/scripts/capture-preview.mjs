import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const out = process.env.SHOT_DIR ?? "/opt/cursor/artifacts/screenshots";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 920 } });

await page.goto("http://localhost:1420/", { waitUntil: "networkidle" });
await page.getByText("Good morning.").waitFor();
await page.screenshot({ path: `${out}/today_final.png`, fullPage: true });

const approve = page.getByRole("button", { name: "Approve" }).first();
await approve.click();
await page.getByLabel("Action receipt").waitFor();
await page.screenshot({ path: `${out}/approved_receipt_final.png`, fullPage: true });

await page.getByRole("button", { name: /Privacy/ }).click();
await page.getByRole("heading", { name: "Privacy." }).waitFor();
await page.screenshot({ path: `${out}/privacy_final.png`, fullPage: true });

await page.getByRole("button", { name: /Chief/ }).click();
await page.getByRole("button", { name: "Prepare me for tomorrow" }).click();
await page.getByText("Prepared for tomorrow").waitFor();
await page.screenshot({ path: `${out}/chief_final.png`, fullPage: true });

await page.getByRole("button", { name: /Decisions/ }).click();
await page.getByRole("heading", { name: "Decisions." }).waitFor();
await page.screenshot({ path: `${out}/decisions_final.png`, fullPage: true });

await page.getByRole("button", { name: /Connections/ }).click();
await page.getByRole("heading", { name: "Connections." }).waitFor();
await page.screenshot({ path: `${out}/connections_final.png`, fullPage: true });

const web = await browser.newPage({ viewport: { width: 1440, height: 920 } });
await web.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await web.getByText("Wake up with less to do.").waitFor();
await web.screenshot({ path: `${out}/web_home_final.png`, fullPage: true });
await web.goto("http://localhost:3000/trust", { waitUntil: "networkidle" });
await web.getByText("Trust architecture").waitFor();
await web.screenshot({ path: `${out}/web_trust_final.png`, fullPage: true });
await web.goto("http://localhost:3000/product", { waitUntil: "networkidle" });
await web.getByText("Not another chatbot.").waitFor();
await web.screenshot({ path: `${out}/web_product_final.png`, fullPage: true });

await browser.close();
console.log(`wrote screenshots to ${out}`);
