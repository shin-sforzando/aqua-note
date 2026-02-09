import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
				'.svelte-kit/**',
				'**/*.config.{js,ts}',
				'**/*.stories.{js,ts,svelte}',
				'coverage/**',
				'dist/**',
				'node_modules/**',
				'src/app.html',
				'src/hooks.{js,ts}',
				'src/hooks.server.{js,ts}',
				'src/lib/paraglide/**',
				'src/stories/**',
				'src/worker-configuration.d.ts',
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
					browser: {
						enabled: true,
						provider: playwright(),
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
			},
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: path.join(__dirname, '.storybook'),
						storybookScript: 'npm run storybook -- --no-open'
					})
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						provider: playwright(),
						headless: true,
						instances: [{ browser: 'chromium' }]
					},
					setupFiles: ['./.storybook/vitest.setup.ts']
				}
			}
		]
	}
});
