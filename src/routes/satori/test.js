// this is the formatted contents of vercel/og
import b, { init as S } from 'satori/wasm';
import E from 'yoga-wasm-web';
import * as i from '@resvg/resvg-wasm';
import N from '../vendor/resvg.simd.wasm?module';
import T from '../vendor/yoga.wasm?module';
var v = String.fromCharCode(8205),
	j = /\uFE0F/g;

function c(t) {
	return y(t.indexOf(v) < 0 ? t.replace(j, '') : t);
}

function y(t) {
	for (var n = [], e = 0, o = 0, s = 0; s < t.length; )
		(e = t.charCodeAt(s++)),
			o
				? (n.push((65536 + ((o - 55296) << 10) + (e - 56320)).toString(16)), (o = 0))
				: 55296 <= e && e <= 56319
				? (o = e)
				: n.push(e.toString(16));
	return n.join('-');
}
var r = {
	twemoji: (t) => 'https://twemoji.maxcdn.com/v/latest/svg/' + t.toLowerCase() + '.svg',
	openmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/',
	blobmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/',
	noto: 'https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/',
	fluent: (t) =>
		'https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/' +
		t.toLowerCase() +
		'_color.svg',
	fluentFlat: (t) =>
		'https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/' +
		t.toLowerCase() +
		'_flat.svg'
};

function m(t, n) {
	(!n || !r[n]) && (n = 'twemoji');
	let e = r[n];
	return fetch(typeof e == 'function' ? e(t) : `${e}${t.toUpperCase()}.svg`);
}
var C = i.initWasm(N),
	_ = E(T).then((t) => S(t)),
	x = fetch(new URL('../vendor/noto-sans-v27-latin-regular.ttf', import.meta.url)).then((t) =>
		t.arrayBuffer()
	),
	p,
	u,
	R =
		((u = (p = globalThis == null ? void 0 : globalThis.process) == null ? void 0 : p.env) == null
			? void 0
			: u.NODE_ENV) === 'development',
	l = {
		zh: 'Noto+Sans+SC',
		ja: 'Noto+Sans+JP',
		ko: 'Noto+Sans+KR',
		th: 'Noto+Sans+Thai',
		he: 'Noto+Sans+Hebrew',
		ar: 'Noto+Sans+Arabic',
		bn: 'Noto+Sans+Bengali',
		ta: 'Noto+Sans+Tamil',
		te: 'Noto+Sans+Telugu',
		ml: 'Noto+Sans+Malayalam',
		devanagari: 'Noto+Sans+Devanagari',
		unknown: 'Noto+Sans'
	};
async function k(t, n) {
	if (!t || !n) return;
	let e = `https://fonts.googleapis.com/css2?family=${t}&text=${encodeURIComponent(n)}`,
		s = (
			await (
				await fetch(e, {
					headers: {
						'User-Agent':
							'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
					}
				})
			).text()
		).match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
	if (!s) throw new Error('Failed to load font');
	return fetch(s[1]).then((a) => a.arrayBuffer());
}
var g = new Map(),
	F = ({ emoji: t }) => {
		let n = async (e, o) => {
			if (e === 'emoji')
				return 'data:image/svg+xml;base64,' + btoa(await (await m(c(o), t)).text());
			l[e] || (e = 'unknown');
			try {
				let s = await k(l[e], o);
				if (s)
					return {
						name: `satori_${e}_fallback_${o}`,
						data: s,
						weight: 400,
						style: 'normal'
					};
			} catch (s) {
				console.error('Failed to load dynamic font for', o, '. Error:', s);
			}
		};
		return async (...e) => {
			let o = JSON.stringify(e),
				s = g.get(o);
			if (s) return s;
			let a = await n(...e);
			return g.set(o, a), a;
		};
	},
	f = class {
		constructor(n, e = {}) {
			let o = Object.assign(
					{
						width: 1200,
						height: 630,
						debug: !1
					},
					e
				),
				s = new ReadableStream({
					async start(a) {
						await _, await C;
						let d = await x,
							h = await b(n, {
								width: o.width,
								height: o.height,
								debug: o.debug,
								fonts: o.fonts || [
									{
										name: 'sans serif',
										data: d,
										weight: 700,
										style: 'normal'
									}
								],
								loadAdditionalAsset: F({
									emoji: o.emoji
								})
							}),
							w = new i.Resvg(h, {
								fitTo: {
									mode: 'width',
									value: o.width
								}
							});
						a.enqueue(w.render()), a.close();
					}
				});
			return new Response(s, {
				headers: {
					'content-type': 'image/png',
					'cache-control': R
						? 'no-cache, no-store'
						: 'public, immutable, no-transform, max-age=31536000',
					...o.headers
				},
				status: o.status,
				statusText: o.statusText
			});
		}
	};
export { f as ImageResponse };
/*! Copyright Twitter Inc. and other contributors. Licensed under MIT */
//# sourceMappingURL=index.js.map
