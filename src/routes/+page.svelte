<script>
	import { page } from '$app/stores';
	import Image from '../lib/Dots.svelte';
	import { parseQuery } from '$lib/parse';
	import '../app.css';

	/** @type {import("./$types").PageData} */
	export let data;

	$: ({ message, width, height } = parseQuery($page.url.searchParams));
</script>

<div>
	<Image seed={data.seed} {width} {height} />
</div>
