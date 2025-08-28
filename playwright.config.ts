import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run dev',
		port: 5173,
		reuseExistingServer: !process.env.CI
	},
	testDir: 'e2e'
});
