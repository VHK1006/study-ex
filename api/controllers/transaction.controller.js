var db = require('../../db');
var shortid = require("shortid");

module.exports.index = function(request, response) {
	var transactions = db.get('collections').value();
	response.json(transactions);
};

module.exports.create = function(request, response) {
	request.body.id = shortid.generate();
	db.get('collections').push(request.body).write();

	var transaction = db.get('collections').find((x) => x.id === request.body.id);
	response.json(transaction);
}