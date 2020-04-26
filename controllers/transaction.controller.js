var db = require('../db');
var shortid = require("shortid");

module.exports.index =function(request, response) {
  response.render("transactions", {
      collections: db.get("collections").value()
    });
};

module.exports.delete = function(request, response) {
  var id = request.params.id;
  db.get("collections")
    .remove({ id: id })
    .write();
  response.redirect("/transactions");
};

module.exports.create = function(request, response) {
  response.render("createTransaction", {
    users: db.get("users").value(),
    books: db.get("books").value()
  })
};

module.exports.postCreate = function(request, response) {
  request.body.id = shortid.generate();

  var user = db.get('users').value().find((user) => {
    return user.name === request.body.username;
  });

  var book = db.get('books').value().find((book) => {
    return book.title === request.body.booktitle;
  });

  request.body.userId = user.id;
  request.body.bookId = book.id;

  db.get("collections")
      .push(request.body)
      .write();
    response.redirect("/transactions");
};