const betsBox = document.querySelector('.bets');
const bets = [];

function loadBets(){
	let maxId = bets.length > 0 ? bets[bets.length - 1].id : 0;
	let controller = new AbortController();
	let request = fetch(`/bets?id=${maxId}`, { 
		signal: controller.signal 
	});
	let repeat = true;

	let timeout = setTimeout(() => {
		controller.abort();
	}, 30000);

	request
		.then(response => response.json())
		.then(applyBets)
		.catch(e => {
			if(e.code !== 20){
				repeat = false;
			}
			else{
				console.warn(e);
				// client, nice error, connection is problem
			}
		})
		.finally(data => {
			clearTimeout(timeout);

			if(repeat){
				loadBets();
			}
		})
}

function applyBets(updBets){
	updBets.forEach(bet => {
		bets.push(bet);
		let p = document.createElement('p');
		p.innerHTML = JSON.stringify(bet);
		betsBox.appendChild(p);
	});
}

loadBets();