import Image from '../../lib/Dots.svelte';
import { parseQuery } from '$lib/parse';
import { componentToPng } from '$lib/renderImage';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const query = url.searchParams;
	const { seed, width, height } = parseQuery(query);
	return componentToPng(Image, { seed, width, height, satori: true }, height, width);
};
