import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Welcome to frontend/i);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome');
});
