var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(request, response) {
  var page = parseInt(request.query.page) || 1;
  var perPage = 8;

  var start = (page - 1) * perPage;
  var end = page * perPage;
  response.render("transactions", {
    collections: db.get("collections").drop(page).take(perPage).value()
  });
};

module.exports.delete = function(request, response) {
  var id = request.params.id;
  db.get("collections")
    .remove({ id: id })
    .write();
  response.render("transactions", {
    collections: db.get("collections").value(),
    errors: []
  });
};

module.exports.create = function(request, response) {
  response.render("createTransaction", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
};

module.exports.postCreate = function(request, response) {
  request.body.id = shortid.generate();

  var user = db
    .get("users")
    .value()
    .find(user => {
      return user.name === request.body.username;
    });

  var book = db
    .get("books")
    .value()
    .find(book => {
      return book.title === request.body.booktitle;
    });

  request.body.userId = user.id;
  request.body.bookId = book.id;
  request.body.isComplete = false;

  db.get("collections")
    .push(request.body)
    .write();
  response.redirect("/transactions");
};

//complete
module.exports.complete = function(request, response) {
  var id = request.params.id;

  for (var i = 0; i < db.get("collections").value().length; i++) {
    console.log(db.get("collections").value()[i].id);
    if (db.get("collections").value()[i].id === id) {
      db.get("collections")
        .find({ id: id })
        .assign({ isComplete: true })
        .write();
      response.redirect("/transactions");
    }
  }

  response.render("transactions", {
    collections: db.get("collections").value(),
    errors: ["Does not exit this id"]
  });

  return;
};
