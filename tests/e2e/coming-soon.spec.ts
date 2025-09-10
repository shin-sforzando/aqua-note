import { test, expect } from '@playwright/test';

test.describe('Coming Soon Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should display the coming soon page', async ({ page }) => {
		// Verify title
		await expect(page).toHaveTitle('Aqua Note - 水槽管理をもっとシンプルに');

		// Verify main header
		await expect(page.locator('h1')).toContainText('Aqua Note');

		// Verify Coming Soon badge
		await expect(page.locator('text=COMING SOON')).toBeVisible();

		// Verify upcoming release message
		await expect(page.locator('h2')).toContainText('まもなく公開予定');
	});

	test('should display service description', async ({ page }) => {
		// Verify service description
		await expect(page.locator('text=アクアリウム愛好家のためのWebアプリケーション')).toBeVisible();

		// Verify free/paid plan descriptions
		await expect(page.locator('text=無料プランで基本機能をお使いいただけます')).toBeVisible();
		await expect(page.locator('text=有料プランもご用意する予定です')).toBeVisible();
	});

	test('should display feature preview', async ({ page }) => {
		// Verify three main features
		await expect(page.locator('h3:has-text("水槽管理")')).toBeVisible();
		await expect(page.locator('h3:has-text("記録管理")')).toBeVisible();
		await expect(page.locator('h3:has-text("データ分析")')).toBeVisible();
	});

	test('should display pricing plans', async ({ page }) => {
		// Verify free plan
		await expect(page.locator('h4:has-text("無料プラン")')).toBeVisible();
		await expect(page.locator('li:has-text("基本的な水槽管理")')).toBeVisible();

		// Verify paid plan
		await expect(page.locator('h4:has-text("有料プラン")')).toBeVisible();
		await expect(page.locator('li:has-text("高度なアルバム機能")')).toBeVisible();
	});

	test('should have proper meta tags for SEO', async ({ page }) => {
		// Verify meta description
		const metaDescription = await page
			.locator('meta[name="description"]')
			.first()
			.getAttribute('content');
		expect(metaDescription).toContain('アクアリウム愛好家のための水槽管理アプリ');

		// Verify OG tags
		const ogTitle = await page.locator('meta[property="og:title"]').first().getAttribute('content');
		expect(ogTitle).toBe('Aqua Note - 水槽管理をもっとシンプルに');

		const ogUrl = await page.locator('meta[property="og:url"]').first().getAttribute('content');
		expect(ogUrl).toBe('https://aqua-note.app');
	});

	test('should be responsive', async ({ page }) => {
		// Desktop view
		await page.setViewportSize({ width: 1920, height: 1080 });
		await expect(page.locator('.md\\:text-6xl')).toBeVisible();

		// Mobile view
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('.text-5xl')).toBeVisible();

		// Verify grid layout (1 column on mobile)
		const gridContainer = page.locator('.grid').first();
		await expect(gridContainer).toHaveClass(/grid-cols-1/);
	});
});
