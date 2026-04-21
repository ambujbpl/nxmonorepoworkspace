import { expect, test } from '@playwright/test';

test.describe('frontend home journeys', () => {
  test('shows the landing experience', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/loan management system/i);
    await expect(
      page.getByRole('heading', { name: /loan management system/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByText(/track applications, disbursements, repayments/i),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /sign in/i }).first(),
    ).toBeVisible();
  });

  test('supports language and theme preferences', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await expect
      .poll(async () => page.locator('html').getAttribute('data-theme'))
      .toBe('dark');

    const languageSelect = page.locator('select[aria-label="Language"]').last();
    await languageSelect.selectOption('hi');
    await expect
      .poll(async () => page.locator('html').getAttribute('lang'))
      .toBe('hi');

    await page.reload();
    await expect
      .poll(async () => page.locator('html').getAttribute('data-theme'))
      .toBe('dark');
    await expect(
      page.getByRole('button', { name: /switch to light mode/i }),
    ).toBeVisible();
  });

  test('opens a loan category detail page', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('link', { name: /retail loan management systems/i })
      .click();

    await expect(page).toHaveURL(/loan-types\/retail-loan-management-systems/);
    await expect(
      page.getByRole('heading', { name: /retail loan management systems/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/banks, nbfcs, and housing finance providers/i),
    ).toBeVisible();
  });
});
