import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '$lib/../../src/routes/api/errors/+server';

// logger モジュールをモック
vi.mock('$lib/server/logger', () => ({
	logger: {
		error: vi.fn(),
		logError: vi.fn()
	}
}));

// SvelteKit の json ヘルパーをモック
vi.mock('@sveltejs/kit', () => ({
	json: vi.fn(
		(data, options) =>
			new Response(JSON.stringify(data), {
				headers: { 'content-type': 'application/json' },
				status: options?.status || 200
			})
	)
}));

const { logger } = await import('$lib/server/logger');

describe('POST /api/errors', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('正常なエラーレポートを処理できる', async () => {
		const errorData = {
			timestamp: '2024-01-01T00:00:00.000Z',
			level: 'error',
			message: 'Client error occurred',
			context: {
				requestId: 'req-123',
				url: '/test-page',
				userAgent: 'Test Browser',
				status: 500,
				error: {
					name: 'TypeError',
					message: 'Cannot read property of undefined',
					stack: 'TypeError: Cannot read property...'
				}
			}
		};

		const request = new Request('http://localhost/api/errors', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(errorData)
		});

		const response = await POST({
			request,
			getClientAddress: () => '192.168.1.1'
		} as Parameters<typeof POST>[0]);

		expect(response.status).toBe(200);
		const responseData = (await response.json()) as { success: boolean };
		expect(responseData.success).toBe(true);

		// logger.error が正しい引数で呼ばれたかチェック
		expect(logger.error).toHaveBeenCalledWith(
			'Client-side error reported',
			expect.objectContaining({
				requestId: 'req-123',
				url: '/test-page',
				userAgent: 'Test Browser',
				status: 500,
				error: {
					name: 'TypeError',
					message: 'Cannot read property of undefined',
					stack: 'TypeError: Cannot read property...'
				},
				ip: '192.168.1.1',
				clientTimestamp: '2024-01-01T00:00:00.000Z',
				reportedAt: expect.any(String)
			})
		);
	});

	it('文字列形式のエラーを正しく処理する', async () => {
		const errorData = {
			timestamp: '2024-01-01T00:00:00.000Z',
			level: 'error',
			message: 'Client error occurred',
			context: {
				requestId: 'req-123',
				url: '/test-page',
				userAgent: 'Test Browser',
				status: 500,
				error: 'Simple error message'
			}
		};

		const request = new Request('http://localhost/api/errors', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(errorData)
		});

		const response = await POST({
			request,
			getClientAddress: () => '192.168.1.1'
		} as Parameters<typeof POST>[0]);

		expect(response.status).toBe(200);

		// 文字列エラーがオブジェクト形式に変換されているかチェック
		expect(logger.error).toHaveBeenCalledWith(
			'Client-side error reported',
			expect.objectContaining({
				error: {
					name: 'Error',
					message: 'Simple error message'
				}
			})
		);
	});

	it('不正なJSONを処理した際にエラーを返す', async () => {
		const request = new Request('http://localhost/api/errors', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: 'invalid json'
		});

		const response = await POST({
			request,
			getClientAddress: () => '192.168.1.1'
		} as Parameters<typeof POST>[0]);

		expect(response.status).toBe(500);
		const responseData = (await response.json()) as { success: boolean };
		expect(responseData.success).toBe(false);

		// エラーが適切にログ出力されているかチェック
		expect(logger.logError).toHaveBeenCalledWith(
			expect.any(Error),
			'Failed to process client error report'
		);
	});

	it('必要な情報がタイムスタンプと共に記録される', async () => {
		const beforeTime = new Date().toISOString();

		const errorData = {
			timestamp: '2024-01-01T00:00:00.000Z',
			level: 'error',
			message: 'Client error occurred',
			context: {
				requestId: 'req-123',
				url: '/test-page',
				userAgent: 'Test Browser',
				status: 500,
				error: { name: 'Error', message: 'Test error' }
			}
		};

		const request = new Request('http://localhost/api/errors', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(errorData)
		});

		await POST({
			request,
			getClientAddress: () => '192.168.1.1'
		} as Parameters<typeof POST>[0]);

		const afterTime = new Date().toISOString();

		const logCall = (logger.error as ReturnType<typeof vi.fn>).mock.calls[0];
		const context = logCall[1];

		// reportedAt が適切な時間範囲内かチェック
		expect(context.reportedAt).toBeDefined();
		expect(context.reportedAt >= beforeTime).toBe(true);
		expect(context.reportedAt <= afterTime).toBe(true);

		// clientTimestamp が正しく記録されているかチェック
		expect(context.clientTimestamp).toBe('2024-01-01T00:00:00.000Z');

		// IPアドレスが記録されているかチェック
		expect(context.ip).toBe('192.168.1.1');
	});
});
