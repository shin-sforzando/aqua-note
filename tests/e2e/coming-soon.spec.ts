import { test, expect } from '@playwright/test';

test.describe('Coming Soon Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should display the coming soon page', async ({ page }) => {
		// タイトル確認
		await expect(page).toHaveTitle('Aqua Note - 水槽管理をもっとシンプルに');

		// メインヘッダー確認
		await expect(page.locator('h1')).toContainText('Aqua Note');

		// Coming Soonバッジ確認
		await expect(page.locator('text=COMING SOON')).toBeVisible();

		// 公開予定メッセージ確認
		await expect(page.locator('h2')).toContainText('まもなく公開予定');
	});

	test('should display service description', async ({ page }) => {
		// サービス説明文確認
		await expect(page.locator('text=アクアリウム愛好家のためのWebアプリケーション')).toBeVisible();

		// 無料・有料プラン説明確認
		await expect(page.locator('text=無料プランで基本機能をお使いいただけます')).toBeVisible();
		await expect(page.locator('text=有料プランもご用意する予定です')).toBeVisible();
	});

	test('should display feature preview', async ({ page }) => {
		// 3つの主要機能確認
		await expect(page.locator('h3:has-text("水槽管理")')).toBeVisible();
		await expect(page.locator('h3:has-text("記録管理")')).toBeVisible();
		await expect(page.locator('h3:has-text("データ分析")')).toBeVisible();
	});

	test('should display pricing plans', async ({ page }) => {
		// 無料プラン確認
		await expect(page.locator('h4:has-text("無料プラン")')).toBeVisible();
		await expect(page.locator('li:has-text("基本的な水槽管理")')).toBeVisible();

		// 有料プラン確認
		await expect(page.locator('h4:has-text("有料プラン")')).toBeVisible();
		await expect(page.locator('li:has-text("高度なアルバム機能")')).toBeVisible();
	});

	test('should have proper meta tags for SEO', async ({ page }) => {
		// メタディスクリプション確認
		const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
		expect(metaDescription).toContain('アクアリウム愛好家のための水槽管理アプリ');

		// OGタグ確認
		const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
		expect(ogTitle).toBe('Aqua Note - 水槽管理をもっとシンプルに');

		const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
		expect(ogUrl).toBe('https://aqua-note.app');
	});

	test('should be responsive', async ({ page }) => {
		// デスクトップビュー
		await page.setViewportSize({ width: 1920, height: 1080 });
		await expect(page.locator('.md\\:text-6xl')).toBeVisible();

		// モバイルビュー
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('.text-5xl')).toBeVisible();

		// グリッドレイアウト確認（モバイルでは1列）
		const gridContainer = page.locator('.grid').first();
		await expect(gridContainer).toHaveClass(/grid-cols-1/);
	});
});
