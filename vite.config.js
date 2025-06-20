import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	resolve: {
		alias: {
			'$routes': path.resolve(__dirname, 'src/routes'),
			'$lib': path.resolve(__dirname, 'src/lib'),
			'$assets': path.resolve(__dirname, 'src/assets'),
			'$components': path.resolve(__dirname, 'src/components'),
			'$directives': path.resolve(__dirname, 'src/directives'),
			'$middleware': path.resolve(__dirname, 'src/middleware'),
		},
	},
});
