var db = require('../../db');
var shortid = require("shortid");

module.exports.index = function(request, response) {
	var products = db.get('products').value();
	response.json(products);
};

module.exports.create = function(request, response) {
	request.body.id = shortid.generate();
	db.get('products').push(request.body).write();

	var product = db.get('products').find((x) => x.id === request.body.id);
	response.json(product);
}