import { parseQuery, newWord } from '$lib/parse';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = ({ url }) => {
	const { seed } = parseQuery(url.searchParams);
	if (!url.searchParams.has('seed')) {
		redirect(302, `?seed=${seed}`);
	}

	let nextSeed = '';
	do {
		nextSeed = newWord();
	} while (nextSeed === seed);

	return {
		seed,
		nextSeed: newWord()
	};
};
