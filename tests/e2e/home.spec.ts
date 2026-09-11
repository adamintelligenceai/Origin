import { expect, test } from '@playwright/test';

test('marketing home renders live engine figures', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Protect every point of margin.' })).toBeVisible();
  await expect(page.getByText('Run the demo scan')).toBeVisible();
  await expect(page.getByText('Detected leakage')).toBeVisible();
  await expect(page.getByText('Adam Intelligence')).toHaveCount(0);
});
