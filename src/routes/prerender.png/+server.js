export const prerender = true;

import Image from '$lib/Dots.svelte';
import { componentToPng } from '$lib/renderImage';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	const width = 1200;
	const height = 600;
	return componentToPng(
		Image,
		{ seed: 'prerendered image', width, height, satori: true },
		height,
		width
	);
};
