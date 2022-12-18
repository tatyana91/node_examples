import { addBet, getBets } from '#app/stores/bets.js';

export default (request, response, parsedUrl) => {
	let bets = getBets();
	let id = bets.length > 0 ? bets[bets.length - 1].id : 0;
	++id;
	let bet = { id, value: id * 1000, time: Date.now() };
	addBet(bet);
	
	response.end(JSON.stringify(true));
}