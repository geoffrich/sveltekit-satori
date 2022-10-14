<script>
	import { page } from '$app/stores';
	import Image from '../lib/Dots.svelte';
	import { parseQuery } from '$lib/parse';
	import '../app.css';
	// without this import, the asset won't be copied to the assets directory
	// we actually need access on the server
	import sourceSerifPro from '$lib/fonts/SourceSerifPro-Regular.ttf';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	/** @type {import("./$types").PageData} */
	export let data;

	$: browser && goto(`?seed=${data.seed}`, { replaceState: true, keepfocus: true, noscroll: true });

	$: ({ width, height } = parseQuery($page.url.searchParams));
</script>

<h1>Dynamic social images with Svelte</h1>
{#key data.seed}
	<Image seed={data.seed} {width} {height} />
{/key}
<button on:click={() => goto('/', { keepfocus: true, noscroll: true })}>New seed</button>

<p>
	Share this URL and the <a href="/satori?seed={data.seed}">social image</a> will be dynamically generated
	from the Svelte component above. The SVG pattern is randomly generated using the word as a seed, so
	the same word will produce the same pattern.
</p>

<p>This uses:</p>
<ul>
	<li><a href="https://kit.svelte.dev/">SvelteKit</a></li>
	<li>
		Vercel's <a href="https://github.com/vercel/satori">Satori library</a> to convert JSX nodes to SVG
	</li>
	<li>
		Nate Moore's <a href="https://github.com/natemoo-re/satori-html">satori-html</a> to convert HTML
		to JSX nodes
	</li>
</ul>

<p>
	Built by <a href="https://geoffrich.net">Geoff Rich</a>. Source code available
	<a href="https://github.com/geoffrich/sveltekit-satori">on GitHub</a>
</p>

<style>
	button {
		width: 100%;
		max-width: 30ch;
		height: 3rem;
		margin: 1rem auto;
		background-color: var(--primary);
		color: white;
		font-size: 1.5rem;
		border: none;
		border-radius: 8px;
		font-family: inherit;
		cursor: pointer;
		transition: scale 0.3s ease-out;
		display: block;
	}

	button:active {
		transform: scale(0.95);
	}
</style>
