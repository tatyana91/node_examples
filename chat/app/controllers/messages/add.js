import Messages from '#app/models/message.js';
import MessageAppendEvent from '#app/events/messages/append.js'

export default async (request, response) => {
	let { user, text } = request.body;

	if (!user || !text)  {
		response.writeHead(400);
		response.end();
	}

	let message = await Messages.create({ user, text });

	new MessageAppendEvent(message);
	response.end(JSON.stringify(true));
}