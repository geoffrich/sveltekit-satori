import randomWord from 'random-words';

const HEIGHT = 630;
const WIDTH = 1200;

/**
 *
 * @param {URLSearchParams} query
 */
export function parseQuery(query) {
	const message = query.get('message') ?? undefined;
	const querySeed = query.get('seed') ?? '';
	// only allow seeds in the random word list
	const seed = randomWord.wordList.includes(querySeed) ? querySeed : randomWord();
	const width = query.get('w') ?? WIDTH;
	const height = query.get('h') ?? HEIGHT;
	return { message, width: +width, height: +height, seed };
}
