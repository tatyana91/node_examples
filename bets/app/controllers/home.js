export default (request, response) => {
	response.render('home', {
		layout: false,
		title: 'Home page'
	});
}