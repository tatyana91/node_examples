import { HOST } from '#app/config/app.js'
const routes = [];

export function addRoute(url, callback){
	routes.push({ url, callback });
}

export function runRouter(request, response){
	const parsedUrl = new URL(request.url, HOST);
	let is404 = true;

	for(let route of routes){
		if(route.url === parsedUrl.pathname){
			route.callback(request, response, parsedUrl);
			is404 = false;
		}
	}

	if(is404){
		response.writeHead(404);
		response.end('Page not found');
	}
}