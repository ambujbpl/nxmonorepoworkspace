import { expect, test } from '@playwright/test';

test.describe('frontend contact-us journeys', () => {
  test('shows the contact experience', async ({ page }) => {
    await page.goto('/contact-us');

    await expect(page).toHaveTitle(/loan management system/i);
    await expect(
      page.getByRole('heading', {
        name: /ready to take your digital transformation to the next level/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /plan your lending rollout/i }),
    ).toBeVisible();
    await expect(page.getByLabel(/state/i)).toBeVisible();
    await expect(page.getByLabel(/city/i)).toBeVisible();
  });

  test.skip('updates city choices when the state changes', async ({ page }) => {
    await page.goto('/contact-us');

    const stateSelect = page.locator('#state');
    const citySelect = page.locator('#city');

    await expect(stateSelect).toHaveValue('Maharashtra');
    await expect(citySelect).toHaveValue('Mumbai');

    await stateSelect.selectOption({ label: 'Karnataka' });
    // await page.getByLabel('State').selectOption('Karnataka');

    await page.waitForTimeout(5000); // Pauses for 5 seconds
    await expect(stateSelect).toHaveValue('Karnataka');
    await expect(citySelect).toHaveValue('Bengaluru');
    await expect(page.getByRole('option', { name: 'Mysuru' })).toBeVisible();
  });

  test('submits the contact form successfully', async ({ page }) => {
    await page.goto('/contact-us');

    await page.getByLabel(/first name/i).fill('Ambuj');
    await page.getByLabel(/last name/i).fill('Sharma');
    await page.getByLabel(/email id/i).fill('ambuj@example.com');
    await page.getByLabel(/contact number/i).fill('+91 99999 99999');
    await page.getByLabel(/job title/i).fill('Engineer');
    await page.getByLabel(/organisation/i).fill('Example Corp');
    await page.getByLabel(/your message/i).fill('Need a demo for our team.');
    await page
      .getByLabel(/how did you hear about us/i)
      .selectOption('LinkedIn');
    const stateSelect = page.locator('#state');
    const citySelect = page.locator('#city');

    await stateSelect.selectOption({ label: 'Kerala' });

    await expect(stateSelect).toHaveValue('Kerala');
    await expect(citySelect).toHaveValue('Thiruvananthapuram');

    await page.getByRole('button', { name: /submit/i }).click();

    await expect(
      page.getByText(/our india solutions team will contact you shortly/i),
    ).toBeVisible();
  });
});
