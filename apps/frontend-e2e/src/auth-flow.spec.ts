import { expect, test } from '@playwright/test';

test.describe('frontend auth journeys', () => {
  test('shows a validation error when register passwords do not match', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel(/full name/i).fill('Ambuj Sharma');
    await page.getByLabel(/work email/i).fill('ambuj@example.com');
    await page.getByLabel(/^password$/i).fill('SecurePass1');
    await page.getByLabel(/confirm password/i).fill('DifferentPass1');
    await page.getByRole('button', { name: /create account/i }).click();

    await expect(page.getByText(/password and confirm password must match/i)).toBeVisible();
  });

  test('submits registration successfully', async ({ page }) => {
    let payload: Record<string, unknown> | undefined;

    await page.route('**/api/register', async (route) => {
      payload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'user-123' }),
      });
    });

    await page.goto('/register');
    await page.getByLabel(/full name/i).fill('Ambuj Sharma');
    await page.getByLabel(/work email/i).fill('ambuj@example.com');
    await page.getByRole('spinbutton', { name: /^age$/i }).fill('28');
    await page.getByLabel(/^password$/i).fill('SecurePass1');
    await page.getByLabel(/confirm password/i).fill('SecurePass1');
    await page.getByRole('button', { name: /create account/i }).click();

    await expect(page.getByText(/account created successfully/i)).toBeVisible();
    await expect(page.getByLabel(/full name/i)).toHaveValue('');
    await expect(page.getByLabel(/work email/i)).toHaveValue('');
    expect(payload).toMatchObject({
      name: 'Ambuj Sharma',
      email: 'ambuj@example.com',
      age: 28,
    });
  });

  test('signs in successfully and stores the access token', async ({ page }) => {
    let payload: Record<string, unknown> | undefined;

    await page.route('**/api/login', async (route) => {
      payload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ accessToken: 'token-123' }),
      });
    });

    await page.goto('/login');
    await page.getByLabel(/work email/i).fill('ambuj@example.com');
    await page.getByLabel(/^password$/i).fill('SecurePass1');
    await page.getByRole('button', { name: /sign in securely/i }).click();

    await expect(page.getByText(/login successful/i)).toBeVisible();
    expect(payload).toMatchObject({
      email: 'ambuj@example.com',
      password: 'SecurePass1',
    });
  });

  test('shows an error when login fails', async ({ page }) => {
    await page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials' }),
      });
    });

    await page.goto('/login');
    await page.getByLabel(/work email/i).fill('ambuj@example.com');
    await page.getByLabel(/^password$/i).fill('WrongPass1');
    await page.getByRole('button', { name: /sign in securely/i }).click();

    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });
});
