import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	test: {
		expect: { requireAssertions: true },
		coverage: {
			enabled: true,
			provider: 'v8',
			reporter: ['text', 'html', 'json'],
			reportsDirectory: './coverage',
			exclude: [
				'node_modules/**',
				'dist/**',
				'coverage/**',
				'.svelte-kit/**',
				'src/stories/**',
				'**/*.stories.{js,ts,svelte}',
				'**/*.config.{js,ts}',
				'src/app.html',
				'src/hooks.{js,ts}',
				'src/hooks.server.{js,ts}',
				'src/worker-configuration.d.ts',
				'src/lib/paraglide/**',
				'vitest-setup-client.ts'
			],
			include: ['src/**/*.{js,ts,svelte}'],
			thresholds: {
				global: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80
				}
			}
		},
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: [
						'src/**/*.svelte.{test,spec}.{js,ts}',
						'tests/unit/**/*.svelte.{test,spec}.{js,ts}'
					],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}', 'tests/unit/**/*.{test,spec}.{js,ts}'],
					exclude: [
						'src/**/*.svelte.{test,spec}.{js,ts}',
						'tests/unit/**/*.svelte.{test,spec}.{js,ts}'
					]
				}
			}
		]
	}
});
