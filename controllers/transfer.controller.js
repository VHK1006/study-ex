var db = require('../db');
var shortid = require("shortid");

module.exports.create = function(request, response, next) {
	response.render('transfer/create', {
		csrfToken: request.csrfToken()
	});
};

module.exports.postCreate = function(request, response, next) {
	var data = {
		id: shortid.generate(),
		amount: parseInt(request.body.amount),
		accountId: request.body.accountId,
		userId: request.signedCookies.userId
	}
	db.get('transfers').push(data).write();
	response.redirect('/transfer/create');
}