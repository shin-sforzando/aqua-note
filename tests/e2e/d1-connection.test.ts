import { expect, test } from '@playwright/test';

test.describe('D1 Database Integration', () => {
	test('D1 database connection works correctly', async ({ page }) => {
		// Navigate to the D1 test page
		await page.goto('/test-d1');

		// Check that the page loads
		await expect(page.locator('h1')).toContainText('D1 Database Connection Test');

		// Verify D1 connection status
		const statusElement = await page.locator('.status');
		await expect(statusElement).toHaveClass(/connected/);

		// Verify success message
		await expect(page.locator('.success')).toContainText(
			'D1 database binding is working correctly'
		);

		// Check that the status text shows "connected"
		await expect(page.locator('h2')).toContainText('Status: connected');

		// Verify the message content
		await expect(page.getByText('D1 database is successfully connected!')).toBeVisible();
	});

	test('D1 error handling when platform is unavailable', async ({ page }) => {
		// This test would ideally check error handling, but requires
		// a way to simulate platform unavailability
		// For now, we just ensure the test page exists and loads
		const response = await page.goto('/test-d1');
		expect(response?.status()).toBeLessThan(400);
	});
});
