import satori from 'satori';
import { join } from 'path';
import fs from 'fs/promises';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import Image from '../../lib/Dots.svelte';
import { parseQuery } from '$lib/parse';

// TODO: having trouble loading fonts
// https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-a-custom-font
// next: integrate with https://github.com/natemoo-re/satori-html
// const font = fetch('https://fonts.googleapis.com/css2?family=Noto+Sans&text=test', {
// 	headers: {
// 		'User-Agent':
// 			'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
// 	}
// })
// 	.then((res) => res.arrayBuffer())
// 	.catch((e) => console.log(e));

/** @type {Record<string, Buffer>} */
const fontMemo = {};

/**
 * @param {string} name
 * @returns {Promise<Buffer>}
 */
async function getFont(name) {
	const fontPath = join('.', 'static', name);
	if (fontMemo[fontPath]) {
		return fontMemo[fontPath];
	}
	const fontData = await fs.readFile(fontPath);
	fontMemo[fontPath] = fontData;
	return fontData;
}

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const query = url.searchParams;
	const { seed, width, height } = parseQuery(query);
	const result = Image.render({ seed, width, height, satori: true });
	const fontData = await getFont('SourceSerifPro-Regular.ttf');
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
