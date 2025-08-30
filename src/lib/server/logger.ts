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
		// セキュリティ上の理由で機密情報を除外
		const sanitized = { ...context };
		delete sanitized.password;
		delete sanitized.passwordHash;
		delete sanitized.token;
		delete sanitized.sessionToken;
		return sanitized;
	}

	private shouldLog(level: LogLevel): boolean {
		const env = globalThis.process?.env?.NODE_ENV || 'development';

		// 本番環境ではdebugログを無効化
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

		// Cloudflare Workers Logsが自動収集するため、console APIを使用
		// 構造化データをJSONとして出力することで、Logpushでの解析が容易になる
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

	// エラーオブジェクトを自動的にコンテキストに変換
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

	// パフォーマンスメトリクスのログ
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

	// 認証関連のログ
	logAuth(action: string, context: LogContext): void {
		this.info(`Auth: ${action}`, context);
	}

	// リクエスト開始ログ
	logRequestStart(context: LogContext): void {
		this.info('Request started', context);
	}

	// リクエスト完了ログ
	logRequestEnd(context: LogContext): void {
		this.info('Request completed', context);
	}
}

// シングルトンインスタンス
export const logger = new Logger();

// リクエストコンテキストからLogContextを生成するヘルパー
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

// パフォーマンス計測用のヘルパー
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
