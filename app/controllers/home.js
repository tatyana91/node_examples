import { readFile } from 'fs'

export default (request, response, parsedUrl) => {
	readFile('./index.html', (err, buffer) => {
		if(err !== null){
			response.writeHead(500);
			response.end('error');
		}
		else{
			response.end(buffer.toString());
		}
	});
}