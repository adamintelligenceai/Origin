import { test, expect } from "@playwright/test";

test("homepage loads with MarginShield branding", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Protect every point of margin." })).toBeVisible();
  await expect(page.getByText("MarginShield by Evidence Room")).toBeVisible();
});
