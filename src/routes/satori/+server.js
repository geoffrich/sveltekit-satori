import satori from 'satori';
import { join } from 'path';
import fs from 'fs/promises';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import Image from '../../lib/Dots.svelte';
import { parseQuery } from '$lib/parse';

// this import won't copy the asset without an import on the client
import sourceSerifPro from '$lib/fonts/SourceSerifPro-Regular.ttf';

/** @type {Record<string, ArrayBuffer>} */
const fontMemo = {};

/**
 * @param {string} path
 * @returns {Promise<ArrayBuffer>}
 */
async function getFont(path) {
	if (fontMemo[path]) return fontMemo[path];
	const result = await fetch(path).then((r) => r.arrayBuffer());
	fontMemo[path] = result;
	return result;
}

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const query = url.searchParams;
	const { seed, width, height } = parseQuery(query);
	const result = Image.render({ seed, width, height, satori: true });
	const fontData = await getFont(`${url.origin}${sourceSerifPro}`);
	const markup = toReactNode(result.html);

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Noto',
				data: fontData,
				style: 'normal'
			}
		],
		height: +height,
		width: +width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: +width
		}
	});

	const png = resvg.render();

	return new Response(png.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};
