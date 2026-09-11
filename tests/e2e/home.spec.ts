import { expect, test } from "@playwright/test";

test("homepage presents MarginShield without prohibited brand references", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Protect every point of margin." })).toBeVisible();
  await expect(page.getByText("MarginShield", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("by Evidence Room")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Adam Intelligence");
});
