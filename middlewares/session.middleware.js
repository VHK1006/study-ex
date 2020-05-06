var shortid = require('shortid');
var db = require("../db");

module.exports.requireSession = function(request, response, next) {
	if (!request.signedCookies.sessionId) {
		var sessionId = shortid.generate();
		response.cookie('sessionId', sessionId, {
			signed: true
		});

		db.get('sessions').push({
			id: sessionId
		}).write();
	}

	next();
}