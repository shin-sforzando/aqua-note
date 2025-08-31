import { sequence } from '@sveltejs/kit/hooks';
import * as auth from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { logger, createRequestContext, PerformanceTimer } from '$lib/server/logger';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(
		event.request,
		({ request, locale }: { request: Request; locale: string }) => {
			event.request = request;

			return resolve(event, {
				transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
			});
		}
	);

const handleAuth: Handle = async ({ event, resolve }) => {
	const requestContext = createRequestContext(event);
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		logger.logAuth('No session token found', requestContext);
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const timer = new PerformanceTimer('session_validation');
	let session = null;
	let user = null;

	try {
		const result = await auth.validateSessionToken(event.platform!, sessionToken);
		session = result.session;
		user = result.user;

		if (session) {
			auth.setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt));
			logger.logAuth('Session validated successfully', {
				...requestContext,
				userId: user?.id,
				sessionId: session.id
			});
		} else {
			auth.deleteSessionTokenCookie(event);
			logger.logAuth('Invalid session token', requestContext);
		}
	} catch (error) {
		logger.logError(error as Error, 'Authentication error', requestContext);
		// 認証エラーでもアプリは継続動作させる
		auth.deleteSessionTokenCookie(event);
	} finally {
		// タイマーは必ず終了させる
		timer.end(!!session, { userId: user?.id });
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

// グローバルエラーハンドリングとリクエストログ
const handleLogging: Handle = async ({ event, resolve }) => {
	const requestContext = createRequestContext(event);
	const timer = new PerformanceTimer(`${event.request.method} ${requestContext.url}`);
	let response: Response;
	let statusCode = 500;

	logger.logRequestStart(requestContext);

	try {
		response = await resolve(event);
		statusCode = response.status;
		response.headers.set('x-request-id', requestContext.requestId || '');

		const finalContext = {
			...requestContext,
			statusCode: response.status,
			userId: event.locals.user?.id,
			sessionId: event.locals.session?.id
		};

		logger.logRequestEnd(finalContext);
		return response;
	} catch (error) {
		const finalContext = {
			...requestContext,
			statusCode: 500,
			userId: event.locals.user?.id,
			sessionId: event.locals.session?.id
		};

		logger.logError(error as Error, 'Unhandled request error', finalContext);

		// エラーを再スローして、SvelteKitのデフォルトエラーハンドリングに委ねる
		throw error;
	} finally {
		// タイマーは必ず終了させる
		timer.end(statusCode < 400, { statusCode });
	}
};

export const handle: Handle = sequence(handleParaglide, handleAuth, handleLogging);
