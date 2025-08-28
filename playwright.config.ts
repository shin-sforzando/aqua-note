import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: process.env.CI ? 'npm run db:migrate:local && npm run dev' : 'npm run dev',
		port: 5173,
		reuseExistingServer: !process.env.CI,
		timeout: 180 * 1000 // 3 minutes timeout for server startup
	},
	testDir: 'tests/e2e'
});
