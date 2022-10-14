import randomWord from 'random-words';
import { parseQuery } from '$lib/parse';

/** @type {import('./$types').PageServerLoad} */
export const load = ({ url }) => {
	const { seed } = parseQuery(url.searchParams);
	return {
		seed
	};
};
