import { deLocalizeUrl } from '$lib/paraglide/runtime';
import type { HandleClientError } from '@sveltejs/kit';

export const reroute = (request) => deLocalizeUrl(request.url).pathname;

// クライアントサイドエラートラッキング
export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	// エラー情報を構造化
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

	// コンソールに出力（Cloudflare Workers Logsが自動収集）
	console.error(JSON.stringify(errorData));

	// サーバーにエラー情報を送信（オプション）
	try {
		await fetch('/api/errors', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(errorData)
		}).catch(() => {
			// エラー送信が失敗してもアプリの動作に影響しないようにする
		});
	} catch {
		// サイレントに失敗させる
	}

	return {
		message: 'An unexpected error occurred'
	};
};
