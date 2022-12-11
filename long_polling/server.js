const http = require('http');
const fs = require('fs');
const url = require('url');
const clients = [];
const bets = [];

const server = http.createServer(function(request, response){
	request.connection.addListener('close', function () {
		cleanClient(response);
	});

	const requestUrl = url.parse(request.url, true).pathname;

	switch(requestUrl){
		case '/':
			mainPage(request, response);
			break;
		case '/bets':
			betsStream(request, response);
			break;
		default:
			response.writeHead(404);
			response.end('Page not found');
	}
});

server.listen(3000);

function mainPage(request, response){
	fs.readFile('./index.html', function (err, html) {
		if (err) {
			response.writeHead(500);
			response.end('Server error');
		}
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
}

function betsStream(request, response){
	const params = url.parse(request.url, true).query;
	let clientBets = getClientBets(params.id);
	if (clientBets.length > 0) {
		sendClientBets(response, clientBets);
	}
	else {
		clients.push({response, id: params.id});
	}
}

function randomBet(){
	setTimeout(() => {
		let id = bets.length > 0 ? bets[bets.length - 1].id : 0;
		++id;
		bets.push({ id, value: id * 1000, time: Date.now() });
		checkClients();
		randomBet();
	}, 1000 * ( Math.floor(Math.random() * 20) + 10 ));
}

function checkClients(){
	clients.forEach(data => {
		let clientBets = getClientBets(data.id);
		if (clientBets.length > 0) {
			sendClientBets(data.response, clientBets);
			cleanClient(data.response);
		}
	});
}

function getClientBets(id){
	return bets.filter(item => item.id > id);
}

function sendClientBets(response, clientBets){
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(clientBets));
}

function cleanClient(response){
	let ind = clients.findIndex(client => client.response === response);
	if(ind !== -1){
		clients.splice(ind, 1);
	}
}

randomBet();