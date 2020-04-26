var db = require('../db');
var shortid = require("shortid");

module.exports.index = function(request, response) {
  var q = request.query.q;
  if (q === undefined) {
    response.render("books", {
      books: db.get("books").value()
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