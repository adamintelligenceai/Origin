import { test } from '@playwright/test';

test('capture marketing homepage screenshot', async ({ page }, testInfo) => {
  test.skip(!!process.env.CI, 'Artifact screenshots are captured in local walkthrough runs only');

  const outputDir = process.env.ARTIFACT_DIR ?? testInfo.outputDir;
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.screenshot({ path: `${outputDir}/marginshield-home-1440.png`, fullPage: true });
  await page.goto('/pricing');
  await page.screenshot({ path: `${outputDir}/marginshield-pricing-1440.png`, fullPage: true });
});
