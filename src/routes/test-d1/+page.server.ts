import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ platform }) => {
	if (!platform) {
		return {
			d1Status: 'error',
			message: 'Platform object not available. Make sure to run with wrangler dev.',
			timestamp: new Date().toISOString()
		};
	}

	try {
		const db = getDb(platform);

		// Test query to check D1 connection - count users
		await db.select({ count: table.user.id }).from(table.user).limit(1);

		return {
			d1Status: 'connected',
			message: 'D1 database is successfully connected!',
			timestamp: new Date().toISOString(),
			debug: `Query executed successfully. User table accessible.`
		};
	} catch (error) {
		return {
			d1Status: 'error',
			message: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString()
		};
	}
};
