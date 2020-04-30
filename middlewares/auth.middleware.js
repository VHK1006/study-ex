var db = require('../db');

module.exports.requireAuth = function(request, response, next) {
	if (!request.cookies.userId) {
		response.redirect("/auth/login");
		return;
	}

	var user = db.get("users").find({ id: request.cookies.userId }).value();

	if (!user) {
		response.redirect("/auth/login");
		return;
	}

	var filterTransaction = db.get("collections").filter((x) => x.userId === request.cookies.userId).value();
	console.log(filterTransaction);
	if (request.cookies.isAdmin === 'false') {
		response.render("transactions", {
			collections: filterTransaction
		});
	}

	next();
};