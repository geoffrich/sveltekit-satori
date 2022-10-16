<script>
	import { page } from '$app/stores';
	import Image from '../lib/Dots.svelte';
	import { parseQuery } from '$lib/parse';
	import '../app.css';
	import { goto } from '$app/navigation';

	/** @type {import("./$types").PageData} */
	export let data;

	$: ({ width, height } = parseQuery($page.url.searchParams));

	$: title = `Dynamic Svelte social image - "${data.seed}"`;
	$: description = 'This card was generated from a Svelte component.';
</script>

<svelte:head>
	<title>{title}</title><meta content="summary_large_image" name="twitter:card" /><meta
		content="Dynamic Svelte social images"
		property="og:site_name"
	/><meta content={title} property="og:title" /><meta
		content="https://sveltekit-satori.vercel.app"
		property="og:url"
	/><meta content={description} name="description" /><meta
		content={description}
		property="og:description"
	/><meta
		content="https://sveltekit-satori.vercel.app/satori?seed={data.seed}"
		property="og:image"
	/></svelte:head
>

<h1>Dynamic social images with Svelte</h1>
{#key data.seed}
	<Image seed={data.seed} {width} {height} />
{/key}
<form
	action="/"
	on:submit|preventDefault={(e) => {
		const data = new FormData(e.target);
		const searchParams = new URLSearchParams(data);
		goto(`/?${searchParams.toString()}`, { keepfocus: true, noscroll: true });
	}}
>
	<input type="hidden" name="seed" value={data.nextSeed} />
	<button>New seed</button>
</form>
<p>
	Share <a href={$page.url.toString()}>this URL</a> and the
	<a href="/satori?seed={data.seed}">social image</a> will be dynamically generated from the Svelte component
	above. The SVG pattern is randomly generated using the word as a seed, so the same word will produce
	the same pattern.
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
