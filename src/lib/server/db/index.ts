import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

// For development, use local SQLite file
// For production, use environment variable (should be set in Cloudflare dashboard)
const databaseUrl = env.DATABASE_URL || (dev ? 'file:./local.db' : '');

if (!databaseUrl && !dev) {
	console.warn('DATABASE_URL is not set in production environment');
	// Create a dummy client to prevent initialization errors
	// Real database connection should be configured in Cloudflare dashboard
}

const client = createClient({
	url: databaseUrl || 'libsql://dummy.turso.io',
	authToken: env.DATABASE_AUTH_TOKEN
});

export const db = drizzle(client, { schema });
