import satori from 'satori';
import { join } from 'path';
import fs from 'fs/promises';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import Image from '../../lib/Dots.svelte';
import { parseQuery } from '$lib/parse';
import sourceSerifPro from '$lib/fonts/SourceSerifPro-Regular.ttf';

// TODO: better way to load fonts? can they be imported?
// https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-a-custom-font

/** @type {Record<string, Buffer>} */
const fontMemo = {};

/**
 * @returns {Promise<Buffer | ArrayBuffer>}
 */
async function getFont(path) {
	console.log(path);
	return fetch(path).then((r) => r.arrayBuffer());

	const fontPath = join('.', sourceSerifPro);
	if (fontMemo[fontPath]) {
		return fontMemo[fontPath];
	}
	const fontData = await fs.readFile(fontPath);
	fontMemo[fontPath] = fontData;
	return fontData;
}

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	console.log(url.origin);
	console.log(sourceSerifPro);
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
