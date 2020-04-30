var db = require('../db');

module.exports.login = function(request, response) {
	response.render("login")
};

module.exports.postLogin = function(request, response) {
	var email = request.body.email;
	var password = request.body.password;

	var user = db.get("users")
	  .find({ email: email })
	  .value();

	if (!user) {
		response.render("login", {
			errors: ['User does not exit.'],
			values: request.body
		});
		return;
	}

	if (user.password !== password) {
		response.render("login", {
			errors: ['Wrong password!'],
			values: request.body
		});
		return;
	}

	response.cookie('userId', user.id);
	response.cookie('isAdmin', user.isAdmin);
	response.redirect("/users");

}