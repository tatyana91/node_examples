import eventBus from '#app/core/eventbus.js'
import BetsAppendEvent from '#app/events/bets/append.js'
import { Op } from 'sequelize'
import Bet from '#app/models/bet.js'

const clients = [];
eventBus.on(BetsAppendEvent.name, e => clients.forEach(client => sendBetsToClient(client, [ e.bet ])));

export default async (request, response) => {
	const fromId = parseInt(request.query.id ?? '0');
	let immediatelyBets = await Bet.findAll({
		where: {
			id: {
				[ Op.gt ]: fromId
			}
		}
	});

	const client = { request, response, created: new Date() };

	if(immediatelyBets.length > 0){
		sendBetsToClient(client, immediatelyBets);
	}
	else{
		clients.push(client);
		response.on('close', () => cleanClient(response));
	}
}

function sendBetsToClient(client, bets){
	client.response.end(JSON.stringify(bets));
}

function cleanClient(response){
	let ind = clients.findIndex(client => client.response === response);

	if(ind !== -1){
		clients.splice(ind, 1);
	}
}

export function debug(request, response){
	let now = Date.now();

	let debugInfo = clients.map(client => ({
		created: client.created.toLocaleTimeString(),
		agent: client.request.headers['user-agent'],
		long: now - +client.created
	}));

	response.end(JSON.stringify(debugInfo, undefined, 4));
}