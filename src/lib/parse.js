import randomWord from 'random-words';

const HEIGHT = 630;
const WIDTH = 1200;

/**
 *
 * @param {URLSearchParams} query
 */
export function parseQuery(query) {
	const message = query.get('message') ?? undefined;
	const seed = query.get('seed') ?? randomWord();
	const width = query.get('w') ?? WIDTH;
	const height = query.get('h') ?? HEIGHT;
	return { message, width: +width, height: +height, seed };
}
