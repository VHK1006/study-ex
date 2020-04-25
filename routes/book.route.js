var express = require('express');
var shortid = require("shortid");

var db = require('../db');

var router = express.Router();

//find
router.get("/", function(request, response) {
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
});

//delete
router.get("/:id/delete", function(request, response) {
  var id = request.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  response.redirect("/books");
});

//update
router.get("/update", function(request, response) {
  var title = request.query.title;
  var newTitle = request.query.newtitle;
  db.get("books")
    .find({ title: title })
    .assign({ title: newTitle })
    .write();
  response.redirect("back");
});

//create
router.get("/create", function(request, response) {
  response.render("createBook");
})

router.post("/create", function(request, response) {
  request.body.id = shortid.generate();
  db.get("books")
    .push(request.body)
    .write();
  response.redirect("/books");
});


module.exports = router;