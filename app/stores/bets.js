import BetsAppendEvent from '#app/events/bets/apennd.js'

const bets = [];

export function getBets(){
	return bets;
}

export function addBet(bet){
	bets.push(bet);
	new BetsAppendEvent(bet);
}