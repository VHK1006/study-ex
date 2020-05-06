var db = require("../db");

module.exports.requireAuth = function(request, response, next) {
  if (!request.signedCookies.userId) {
    response.redirect("/auth/login");
    return;
  }

  var user = db
    .get("users")
    .find({ id: request.signedCookies.userId })
    .value();

  if (!user) {
    response.redirect("/auth/login");
    return;
  }

  var cart = db
    .get("sessions")
    .filter(x => x.id === request.signedCookies.sessionId)
    .value();

  var filterTransaction = db
    .get("collections")
    .filter(x => x.userId === request.cookies.userId)
    .value();

  if (request.cookies.isAdmin === "false") {
    response.render("books", {
      sessions: cart,
      books: db.get("books").value()
    });
  }
  response.locals.user = user;

  next();
};
