import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger, createRequestContext, PerformanceTimer } from '$lib/server/logger';
import type { LogContext } from '$lib/server/logger';

// console.log, console.error等をモック
const mockConsole = {
	log: vi.fn(),
	info: vi.fn(),
	warn: vi.fn(),
	error: vi.fn(),
	debug: vi.fn()
};

describe('Logger', () => {
	beforeEach(() => {
		// console関数をモック
		vi.stubGlobal('console', mockConsole);
		// 各テスト前にモックをリセット
		vi.clearAllMocks();
	});

	describe('基本的なログ出力', () => {
		it('info レベルのログが正しく出力される', () => {
			const message = 'Test info message';
			const context: LogContext = { userId: 'test-user' };

			logger.info(message, context);

			expect(mockConsole.info).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.info.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.level).toBe('info');
			expect(logEntry.message).toBe(message);
			expect(logEntry.context.userId).toBe('test-user');
			expect(logEntry.timestamp).toBeDefined();
		});

		it('error レベルのログが正しく出力される', () => {
			const message = 'Test error message';
			logger.error(message);

			expect(mockConsole.error).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.error.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.level).toBe('error');
			expect(logEntry.message).toBe(message);
		});

		it('warn レベルのログが正しく出力される', () => {
			const message = 'Test warning message';
			logger.warn(message);

			expect(mockConsole.warn).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.warn.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.level).toBe('warn');
			expect(logEntry.message).toBe(message);
		});

		it('debug レベルのログが正しく出力される', () => {
			const message = 'Test debug message';
			logger.debug(message);

			expect(mockConsole.debug).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.debug.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.level).toBe('debug');
			expect(logEntry.message).toBe(message);
		});
	});

	describe('セキュリティ機能', () => {
		it('機密情報が自動的に除去される', () => {
			const context: LogContext = {
				userId: 'test-user',
				password: 'secret-password',
				passwordHash: 'hash',
				token: 'secret-token',
				sessionToken: 'session-token'
			};

			logger.info('Test with sensitive data', context);

			const logCall = mockConsole.info.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.context.userId).toBe('test-user');
			expect(logEntry.context.password).toBeUndefined();
			expect(logEntry.context.passwordHash).toBeUndefined();
			expect(logEntry.context.token).toBeUndefined();
			expect(logEntry.context.sessionToken).toBeUndefined();
		});
	});

	describe('エラーログ機能', () => {
		it('Errorオブジェクトが正しく処理される', () => {
			const error = new Error('Test error');
			error.stack = 'Error stack trace';

			logger.logError(error, 'Custom error message');

			expect(mockConsole.error).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.error.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.message).toBe('Custom error message');
			expect(logEntry.context.error.name).toBe('Error');
			expect(logEntry.context.error.message).toBe('Test error');
			expect(logEntry.context.error.stack).toBe('Error stack trace');
		});

		it('メッセージが指定されない場合はデフォルトメッセージが使用される', () => {
			const error = new Error('Test error');

			logger.logError(error);

			const logCall = mockConsole.error.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.message).toBe('Uncaught error: Test error');
		});
	});

	describe('認証ログ機能', () => {
		it('認証関連のログが正しく出力される', () => {
			const context: LogContext = {
				userId: 'test-user',
				sessionId: 'session-123'
			};

			logger.logAuth('User login', context);

			expect(mockConsole.info).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.info.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.message).toBe('Auth: User login');
			expect(logEntry.context.userId).toBe('test-user');
			expect(logEntry.context.sessionId).toBe('session-123');
		});
	});

	describe('パフォーマンスメトリクス', () => {
		it('メトリクスが正しく記録される', () => {
			logger.logMetrics('database_query', 150, true, { rowCount: 5 });

			expect(mockConsole.info).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.info.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.message).toBe('Performance: database_query');
			expect(logEntry.context.operation).toBe('database_query');
			expect(logEntry.context.duration).toBe(150);
			expect(logEntry.context.success).toBe(true);
			expect(logEntry.context.rowCount).toBe(5);
		});
	});
});

describe('createRequestContext', () => {
	beforeEach(() => {
		// crypto.randomUUID をモック
		vi.stubGlobal('crypto', {
			randomUUID: vi.fn(() => 'test-uuid')
		});
	});

	it('リクエストコンテキストが正しく生成される', () => {
		const mockEvent = {
			request: new Request('https://example.com/api/test?param=value', {
				method: 'POST',
				headers: { 'user-agent': 'Test Agent' }
			}),
			locals: {
				user: { id: 'user-123' },
				session: { id: 'session-456' }
			},
			getClientAddress: () => '192.168.1.1'
		};

		const context = createRequestContext(mockEvent);

		expect(context.requestId).toBe('test-uuid');
		expect(context.userId).toBe('user-123');
		expect(context.sessionId).toBe('session-456');
		expect(context.userAgent).toBe('Test Agent');
		expect(context.ip).toBe('192.168.1.1');
		expect(context.method).toBe('POST');
		expect(context.url).toBe('/api/test?param=value');
	});

	it('オプショナルフィールドが未定義でも動作する', () => {
		const mockEvent = {
			request: new Request('https://example.com/test', {
				method: 'GET'
			}),
			locals: {}
		};

		const context = createRequestContext(mockEvent);

		expect(context.requestId).toBe('test-uuid');
		expect(context.userId).toBeUndefined();
		expect(context.sessionId).toBeUndefined();
		expect(context.userAgent).toBeUndefined();
		expect(context.ip).toBeUndefined();
		expect(context.method).toBe('GET');
		expect(context.url).toBe('/test');
	});
});

describe('PerformanceTimer', () => {
	beforeEach(() => {
		vi.stubGlobal('console', mockConsole);
		vi.clearAllMocks();
	});

	it('パフォーマンス計測が正しく動作する', () => {
		const timer = new PerformanceTimer('test_operation');
		timer.end(true, { additionalData: 'test' });

		expect(mockConsole.info).toHaveBeenCalledTimes(1);
		const logCall = mockConsole.info.mock.calls[0][0];
		const logEntry = JSON.parse(logCall);

		expect(logEntry.message).toBe('Performance: test_operation');
		expect(logEntry.context.operation).toBe('test_operation');
		expect(logEntry.context.duration).toBeGreaterThanOrEqual(0);
		expect(logEntry.context.success).toBe(true);
		expect(logEntry.context.additionalData).toBe('test');
	});

	it('失敗ケースも正しく記録される', () => {
		const timer = new PerformanceTimer('failed_operation');
		timer.end(false);

		const logCall = mockConsole.info.mock.calls[0][0];
		const logEntry = JSON.parse(logCall);

		expect(logEntry.context.success).toBe(false);
	});
});

describe('環境別ログレベル制御', () => {
	beforeEach(() => {
		vi.stubGlobal('console', mockConsole);
		vi.clearAllMocks();
	});

	it('debugログが出力される', () => {
		logger.debug('Debug message');
		expect(mockConsole.debug).toHaveBeenCalledTimes(1);
	});
});
