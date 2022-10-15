import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import sourceSerifPro from '$lib/fonts/SourceSerifPro-Regular.ttf';

export async function componentToPng(component, props, height, width) {
	const result = component.render(props);
	const markup = toReactNode(result.html);

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Source Serif Pro',
				data: Buffer.from(sourceSerifPro),
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
}
