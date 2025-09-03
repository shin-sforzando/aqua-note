import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger, createRequestContext, PerformanceTimer } from '$lib/server/logger';
import type { LogContext } from '$lib/server/logger';

// Mock console.log, console.error, etc.
const mockConsole = {
	log: vi.fn(),
	info: vi.fn(),
	warn: vi.fn(),
	error: vi.fn(),
	debug: vi.fn()
};

describe('Logger', () => {
	beforeEach(() => {
		// Mock console functions
		vi.stubGlobal('console', mockConsole);
		// Reset mocks before each test
		vi.clearAllMocks();
	});

	describe('Basic log output', () => {
		it('info level logs are output correctly', () => {
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

		it('error level logs are output correctly', () => {
			const message = 'Test error message';
			logger.error(message);

			expect(mockConsole.error).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.error.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.level).toBe('error');
			expect(logEntry.message).toBe(message);
		});

		it('warn level logs are output correctly', () => {
			const message = 'Test warning message';
			logger.warn(message);

			expect(mockConsole.warn).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.warn.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.level).toBe('warn');
			expect(logEntry.message).toBe(message);
		});

		it('debug level logs are output correctly', () => {
			const message = 'Test debug message';
			logger.debug(message);

			expect(mockConsole.debug).toHaveBeenCalledTimes(1);
			const logCall = mockConsole.debug.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.level).toBe('debug');
			expect(logEntry.message).toBe(message);
		});
	});

	describe('Security features', () => {
		it('sensitive information is automatically removed', () => {
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

	describe('Error logging functionality', () => {
		it('Error objects are processed correctly', () => {
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

		it('default message is used when message is not specified', () => {
			const error = new Error('Test error');

			logger.logError(error);

			const logCall = mockConsole.error.mock.calls[0][0];
			const logEntry = JSON.parse(logCall);

			expect(logEntry.message).toBe('Uncaught error: Test error');
		});
	});

	describe('Authentication log functionality', () => {
		it('authentication-related logs are output correctly', () => {
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

	describe('Performance metrics', () => {
		it('metrics are recorded correctly', () => {
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
		// Mock crypto.randomUUID
		vi.stubGlobal('crypto', {
			randomUUID: vi.fn(() => 'test-uuid')
		});
	});

	it('request context is generated correctly', () => {
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

	it('works even when optional fields are undefined', () => {
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

	it('performance measurement works correctly', () => {
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

	it('failure cases are also recorded correctly', () => {
		const timer = new PerformanceTimer('failed_operation');
		timer.end(false);

		const logCall = mockConsole.info.mock.calls[0][0];
		const logEntry = JSON.parse(logCall);

		expect(logEntry.context.success).toBe(false);
	});
});

describe('Environment-specific log level control', () => {
	beforeEach(() => {
		vi.stubGlobal('console', mockConsole);
		vi.clearAllMocks();
	});

	it('debug logs are output', () => {
		logger.debug('Debug message');
		expect(mockConsole.debug).toHaveBeenCalledTimes(1);
	});
});
