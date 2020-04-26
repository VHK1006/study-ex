var express = require("express");
var shortid = require("shortid");

var db = require("../db");

var router = express.Router();

router.get("/", function(request, response) {
  response.render("transactions", {
    collections: db.get("collections").value()
  });
});

//delete
router.get("/:id/delete", function(request, response) {
  var id = request.params.id;
  db.get("collections")
    .remove({ id: id })
    .write();
  response.redirect("/transactions");
});

//create
router.get("/create", function(request, response) {
  response.render("createTransaction", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
});

router.post("/create", function(request, response) {
  request.body.id = shortid.generate();

  console.log(request.body.userId);

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

  console.log(user.id);

  request.body.userId = user.id;
  request.body.bookId = book.id;

  db.get("collections")
    .push(request.body)
    .write();
  response.redirect("/transactions");
});

module.exports = router;
