const bets = [];
const listeners = [];

export function getBets(){
	return bets;
}

export function addBet(bet){
	bets.push(bet);
	listeners.forEach(listener => listener(bet));
}

export function onBet(listener){
	listeners.push(listener);
}