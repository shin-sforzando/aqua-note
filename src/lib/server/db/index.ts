import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import type { D1Database } from '@cloudflare/workers-types';

/**
 * Get database instance from platform
 * Works with both local development (wrangler dev) and production
 */
export function getDb(platform: App.Platform) {
	if (!platform?.env?.aqua_note_db) {
		throw new Error(
			'D1 database binding not found. Make sure to run with wrangler dev or deploy to Cloudflare.'
		);
	}

	return drizzle(platform.env.aqua_note_db as D1Database, { schema });
}

// Export schema for convenience
export { schema };
