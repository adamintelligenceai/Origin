import { expect, test } from '@playwright/test';

test('demo scan reaches overview with live engine figures', async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto('/demo');
  await expect(page.getByText('Fictional demonstration company')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByText('Detected leakage')).toBeVisible();
  await expect(page.getByText('Modelled opportunity')).toBeVisible();
  await expect(page.getByText('Adam Intelligence')).toHaveCount(0);
});

test('scan wizard maps Harbourline messy files', async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto('/scan');
  await page.getByRole('button', { name: 'Load Harbourline messy files' }).click();
  await expect(page.getByText('sales.csv')).toBeVisible();
  await expect(page.getByText('Inv No')).toBeVisible();
  await page.getByRole('button', { name: 'Confirm mapping and check data health' }).click();
  await expect(page.getByText('sales lines')).toBeVisible({ timeout: 60_000 });
  await page.getByRole('button', { name: 'Continue to tie-out' }).click();
  await page.getByRole('button', { name: 'Confirm tie-out and calculate' }).click();
  await expect(page.getByText('addressable')).toBeVisible({ timeout: 90_000 });
});
