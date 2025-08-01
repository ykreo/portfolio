import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			'$components/*': 'src/lib/components/*',
			$utils: 'src/lib/utils',
			'$utils/*': 'src/lib/utils/*',
			$styles: 'src/styles',
			'$styles/*': 'src/styles/*'
		}
	}
};

export default config;
