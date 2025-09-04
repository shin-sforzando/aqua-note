import { deLocalizeUrl } from '$lib/paraglide/runtime';
import type { HandleClientError } from '@sveltejs/kit';

export const reroute = (request) => deLocalizeUrl(request.url).pathname;

// Client-side error tracking
export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	// Structure error information
	const errorData = {
		timestamp: new Date().toISOString(),
		level: 'error' as const,
		message: message || 'Client-side error occurred',
		context: {
			requestId: crypto.randomUUID(),
			url: event.url?.pathname,
			userAgent: navigator.userAgent,
			status,
			error:
				error instanceof Error
					? {
							name: error.name,
							message: error.message,
							stack: error.stack
						}
					: String(error)
		}
	};

	// Output to console (automatically collected by Cloudflare Workers Logs)
	console.error(JSON.stringify(errorData));

	// Send error information to server (optional)
	try {
		await fetch('/api/errors', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(errorData)
		}).catch(() => {
			// Don't affect app operation even if error sending fails
		});
	} catch {
		// Fail silently
	}

	return {
		message: 'An unexpected error occurred'
	};
};
