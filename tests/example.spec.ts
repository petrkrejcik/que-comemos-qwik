import { test, expect } from '@playwright/test';

test('Page with week specified load week plan at the server', async ({ page }) => {
  await page.goto('/week/2022-06-06');

  // Expect a title "to contain" a substring.
  await expect(page).toContain(/pescado/);
});
