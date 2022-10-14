import { sveltekit } from '@sveltejs/kit/vite';
import wasm from 'vite-plugin-wasm';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [wasm(), sveltekit()],
	optimizeDeps: {
		exclude: ['@vercel/og']
	}
};

export default config;
