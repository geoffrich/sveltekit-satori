<script>
	import { page } from '$app/stores';
	import Image from '../lib/Dots.svelte';
	import { parseQuery } from '$lib/parse';
	import '../app.css';
	// without this import, the asset won't be copied to the assets directory
	// we actually need access on the server
	import sourceSerifPro from '$lib/fonts/SourceSerifPro-Regular.ttf';

	/** @type {import("./$types").PageData} */
	export let data;

	$: ({ message, width, height } = parseQuery($page.url.searchParams));
</script>

<h1>Dynamic social images with Svelte and Satori</h1>
<Image seed={data.seed} {width} {height} />
