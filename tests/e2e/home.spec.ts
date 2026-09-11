import { test, expect } from '@playwright/test';

test('marketing homepage shows MarginShield brand', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Protect every point of margin.' })).toBeVisible();
  await expect(page.getByText('MarginShield by Evidence Room')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Run the demo scan' })).toBeVisible();
});
