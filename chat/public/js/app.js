const messagesBox = document.querySelector('.messages');
const messages = [];

const clientsBox = document.querySelector('.clients');

let user = localStorage.getItem('user') ?? '';
if (!user) {
	window.location.href = '/login';
}
document.getElementById('userName').innerHTML = user;

function loadMessages(){
	let maxId = messages.length > 0 ? messages[messages.length - 1].id : 0;
	let controller = new AbortController();
	let request = fetch(`/messages?id=${maxId}&user=${user}`, {
		signal: controller.signal 
	});
	let repeat = true;

	let timeout = setTimeout(() => {
		controller.abort();
	}, 30000);

	request
		.then(response => response.json())
		.then(applyMessages)
		.catch(e => {
			if(e.code !== 20){
				repeat = false;
			}
			else{
				console.warn(e);
			}
		})
		.finally(data => {
			clearTimeout(timeout);

			if(repeat){
				loadMessages();
			}
		})
}

function applyMessages(updMessages){
	updMessages.forEach(message => {
		messages.push(message);

		let date = new Date(message.createdAt).toLocaleString()

		let messageHtml = `<div class="message-data">
								<span class="message-data-time">${message.user}</span>
								<span class="message-data-time">${date}</span>
							</div>
							<div class="message my-message">${message.text}</div>`;

		let li = document.createElement('li');
		li.classList.add('clearfix');
		li.innerHTML = messageHtml;
		messagesBox.appendChild(li);

		messagesBox.scrollTop = messagesBox.scrollHeight;
	});
}

function sendMessage(e){
	e.preventDefault();
	let text = document.getElementById('text').value;
	if (!text) {
		alert('Error! Empty message');
		return false;
	}

	fetch("/messages/add", {
		method : "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'user': user,
			'text': text
		})
	}).then(
		response => response.text()
	).then(
		html => console.log(html)
	).finally(() => {
		document.getElementById('text').value = ''
	});
}

function unsetUserName(){
	localStorage.removeItem('user');
	window.location.href = '/login';
}

loadMessages();