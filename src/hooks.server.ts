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

	try {
		const sessionToken = event.cookies.get(auth.sessionCookieName);

		if (!sessionToken) {
			logger.logAuth('No session token found', requestContext);
			event.locals.user = null;
			event.locals.session = null;
			return resolve(event);
		}

		const timer = new PerformanceTimer('session_validation');
		const { session, user } = await auth.validateSessionToken(event.platform!, sessionToken);

		if (session) {
			auth.setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt));
			logger.logAuth('Session validated successfully', {
				...requestContext,
				userId: user?.id,
				sessionId: session.id
			});
			timer.end(true, { userId: user?.id });
		} else {
			auth.deleteSessionTokenCookie(event);
			logger.logAuth('Invalid session token', requestContext);
			timer.end(false);
		}

		event.locals.user = user;
		event.locals.session = session;
		return resolve(event);
	} catch (error) {
		logger.logError(error as Error, 'Authentication error', requestContext);
		// 認証エラーでもアプリは継続動作させる
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
};

// グローバルエラーハンドリングとリクエストログ
const handleLogging: Handle = async ({ event, resolve }) => {
	const requestContext = createRequestContext(event);
	const timer = new PerformanceTimer(`${event.request.method} ${requestContext.url}`);

	logger.logRequestStart(requestContext);

	try {
		const response = await resolve(event);

		const finalContext = {
			...requestContext,
			statusCode: response.status,
			userId: event.locals.user?.id,
			sessionId: event.locals.session?.id
		};

		logger.logRequestEnd(finalContext);
		timer.end(response.status < 400, { statusCode: response.status });

		return response;
	} catch (error) {
		const finalContext = {
			...requestContext,
			statusCode: 500,
			userId: event.locals.user?.id,
			sessionId: event.locals.session?.id
		};

		logger.logError(error as Error, 'Unhandled request error', finalContext);
		timer.end(false, { statusCode: 500 });

		// エラーを再スローして、SvelteKitのデフォルトエラーハンドリングに委ねる
		throw error;
	}
};

export const handle: Handle = sequence(handleParaglide, handleAuth, handleLogging);
