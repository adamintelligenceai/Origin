import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("styleguide renders Ledger components without axe violations", async ({ page }) => {
  await page.goto("/styleguide");
  await expect(page.getByRole("heading", { name: "Ledger", exact: true })).toBeVisible();
  await expect(page.getByText("Detected leakage").first()).toBeVisible();
  await expect(page.getByText("Modelled opportunity").first()).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
