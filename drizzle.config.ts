import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	// No driver specification needed for local generation
	// D1 uses SQLite dialect
	verbose: true,
	strict: true
});
