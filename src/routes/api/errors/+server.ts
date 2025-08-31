import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { logger } from '$lib/server/logger';

interface ClientErrorData {
	timestamp: string;
	level: string;
	message: string;
	context: {
		requestId: string;
		url?: string;
		userAgent: string;
		status: number;
		error:
			| {
					name: string;
					message: string;
					stack?: string;
			  }
			| string;
	};
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const errorData = (await request.json()) as ClientErrorData;

		// クライアントからのエラー情報をサーバーログに記録
		const { error: clientError, ...restContext } = errorData.context;
		const processedError =
			typeof clientError === 'string' ? { name: 'Error', message: clientError } : clientError;

		logger.error('Client-side error reported', {
			...restContext,
			error: processedError,
			ip: getClientAddress(),
			clientTimestamp: errorData.timestamp,
			reportedAt: new Date().toISOString()
		});

		return json({ success: true });
	} catch (error) {
		logger.logError(error as Error, 'Failed to process client error report');
		return json({ success: false }, { status: 500 });
	}
};
