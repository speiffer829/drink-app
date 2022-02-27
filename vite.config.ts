import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
	postcss: true,
	resolve: {
		alias: {
			$lib: '/src/lib',
		},
	},
	plugins: [
		svelte({
			preprocess: [
				preprocess({
					postcss: true,
				}),
			],
		}),
	],
});
