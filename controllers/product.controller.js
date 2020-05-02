var db = require('../db');

module.exports.index = function(request, response) {
	var page = parseInt(request.query.page) || 1;
	var perPage = 8;

	var start = (page - 1) * perPage;
	var end = page * perPage;
	response.render('products/index', {
		products: db.get('products').drop(page).take(perPage).value()
	})
};