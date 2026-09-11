import { test, expect } from '@playwright/test';

test('home page shows MarginShield brand', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('MarginShield').first()).toBeVisible();
  await expect(page.getByText('Protect every point of margin.')).toBeVisible();
});
