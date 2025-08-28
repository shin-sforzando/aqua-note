import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({
			// Enable platform emulation for local development
			platformProxy: {
				configPath: 'wrangler.toml',
				environment: undefined,
				persist: true
			}
		}),
		alias: {
			$lib: 'src/lib'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
