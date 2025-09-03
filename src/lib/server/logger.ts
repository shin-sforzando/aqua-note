export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
	requestId?: string;
	userId?: string;
	sessionId?: string;
	userAgent?: string;
	ip?: string;
	method?: string;
	url?: string;
	statusCode?: number;
	duration?: number;
	error?: {
		name: string;
		message: string;
		stack?: string;
	};
	[key: string]: unknown;
}

export interface LogEntry {
	timestamp: string;
	level: LogLevel;
	message: string;
	context?: LogContext;
}

class Logger {
	private createLogEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
		return {
			timestamp: new Date().toISOString(),
			level,
			message,
			context: context ? this.sanitizeContext(context) : undefined
		};
	}

	private sanitizeContext(context: LogContext): LogContext {
		// Exclude sensitive information for security reasons
		const sanitized = { ...context };
		delete sanitized.password;
		delete sanitized.passwordHash;
		delete sanitized.token;
		delete sanitized.sessionToken;
		return sanitized;
	}

	private shouldLog(level: LogLevel): boolean {
		const env = globalThis.process?.env?.NODE_ENV || 'development';

		// Disable debug logs in production environment
		if (env === 'production' && level === 'debug') {
			return false;
		}

		return true;
	}

	private log(level: LogLevel, message: string, context?: LogContext): void {
		if (!this.shouldLog(level)) {
			return;
		}

		const entry = this.createLogEntry(level, message, context);

		// Use console API as Cloudflare Workers Logs automatically collects them
		// Output structured data as JSON for easier parsing with Logpush
		switch (level) {
			case 'error':
				console.error(JSON.stringify(entry));
				break;
			case 'warn':
				console.warn(JSON.stringify(entry));
				break;
			case 'info':
				console.info(JSON.stringify(entry));
				break;
			case 'debug':
				console.debug(JSON.stringify(entry));
				break;
			default:
				console.log(JSON.stringify(entry));
		}
	}

	debug(message: string, context?: LogContext): void {
		this.log('debug', message, context);
	}

	info(message: string, context?: LogContext): void {
		this.log('info', message, context);
	}

	warn(message: string, context?: LogContext): void {
		this.log('warn', message, context);
	}

	error(message: string, context?: LogContext): void {
		this.log('error', message, context);
	}

	// Automatically convert error objects to context
	logError(error: Error, message?: string, additionalContext?: LogContext): void {
		const context: LogContext = {
			error: {
				name: error.name,
				message: error.message,
				stack: error.stack
			},
			...additionalContext
		};

		this.error(message || `Uncaught error: ${error.message}`, context);
	}

	// Performance metrics log
	logMetrics(
		operation: string,
		duration: number,
		success: boolean,
		additionalData?: Record<string, unknown>
	): void {
		this.info(`Performance: ${operation}`, {
			operation,
			duration,
			success,
			...additionalData
		});
	}

	// Authentication-related log
	logAuth(action: string, context: LogContext): void {
		this.info(`Auth: ${action}`, context);
	}

	// Request start log
	logRequestStart(context: LogContext): void {
		this.info('Request started', context);
	}

	// Request completion log
	logRequestEnd(context: LogContext): void {
		this.info('Request completed', context);
	}
}

// Singleton instance
export const logger = new Logger();

// Helper to generate LogContext from request context
export function createRequestContext(event: {
	request: Request;
	locals?: { user?: { id: string } | null; session?: { id: string } | null };
	getClientAddress?: () => string;
}): LogContext {
	const url = new URL(event.request.url);

	return {
		requestId: crypto.randomUUID(),
		userId: event.locals?.user?.id,
		sessionId: event.locals?.session?.id,
		userAgent: event.request.headers.get('user-agent') || undefined,
		ip: event.getClientAddress?.(),
		method: event.request.method,
		url: `${url.pathname}${url.search}`
	};
}

// Performance measurement helper
export class PerformanceTimer {
	private startTime: number;
	private operation: string;

	constructor(operation: string) {
		this.operation = operation;
		this.startTime = Date.now();
	}

	end(success: boolean = true, additionalData?: Record<string, unknown>): void {
		const duration = Date.now() - this.startTime;
		logger.logMetrics(this.operation, duration, success, additionalData);
	}
}
