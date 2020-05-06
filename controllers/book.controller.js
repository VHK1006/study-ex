var db = require('../db');
var shortid = require("shortid");

module.exports.index = function(request, response) {
  var q = request.query.q;
  var page = parseInt(request.query.page) || 1;
  var perPage = 8;

  var start = (page - 1) * perPage;
  var end = page * perPage;
  if (q === undefined) {
    response.render("books", {
      books: db.get("books").drop(page).take(perPage).value()
    });
  } else {
    var matchBook = db
      .get("books")
      .value()
      .filter(function(book) {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
    response.render("books", {
      books: matchBook
    });
  }
};

module.exports.delete = function(request, response) {
  var id = request.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  response.redirect("/books");
};

module.exports.update = function(request, response) {
  var title = request.query.title;
  var newTitle = request.query.newtitle;
  db.get("books")
    .find({ title: title })
    .assign({ title: newTitle })
    .write();
  response.redirect("back");
};

module.exports.create = function(request, response) {
  response.render("createBook");
};

module.exports.postCreate = function(request, response) {
  request.body.id = shortid.generate();
  db.get("books")
    .push(request.body)
    .write();
  response.redirect("/books");
};

module.exports.createTransaction = function(request, response) {
  request.body.id = shortid.generate();

  var user = db.get('users').value().find((user) => {
    return user.id === request.signedCookies.userId;
  });

  var session = db.get('sessions').value().find((x) => x.id === request.signedCookies.sessionId);


  request.body.userId = user.id;
  request.body.username = user.name;

  var carts = [];

  for (var key in session.cart) {
    for (var book of db.get('books').value()) {
      if (book.id === key) {
        carts.push(book);
      }
    }
  }

  for(var book of carts) {
    request.body.bookId = book.id;
    request.body.booktitle = book.title;
  }

  request.body.isComplete = false;

  db.get("collections")
      .push(request.body)
      .write();
    response.redirect("/transactions");
};