import eventBus from '#app/core/eventbus.js'
import MessagesAppendEvent from '#app/events/messages/append.js'
import { Op } from 'sequelize'
import Message from '#app/models/message.js'

const clients = [];
eventBus.on(MessagesAppendEvent.name, e => clients.forEach(client => sendMessagesToClient(client, [ e.message ])));

export default async (request, response) => {
	const fromId = parseInt(request.query.id ?? '0');
	let immediatelyMessages = await Message.findAll({
		where: {
			id: {
				[ Op.gt ]: fromId
			}
		}
	});

	const client = { request, response, created: new Date() };

	if(immediatelyMessages.length > 0){
		sendMessagesToClient(client, immediatelyMessages);
	}
	else{
		clients.push(client);
		response.on('close', () => cleanClient(response));
	}
}

function sendMessagesToClient(client, messages){
	client.response.end(JSON.stringify(messages));
}

function cleanClient(response){
	let ind = clients.findIndex(client => client.response === response);

	if(ind !== -1){
		clients.splice(ind, 1);
	}
}