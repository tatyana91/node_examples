export default (request, response) => {
	response.render('login', {
		layout: false,
		title: 'Login page'
	});
}