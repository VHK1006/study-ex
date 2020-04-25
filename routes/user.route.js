var express = require('express');
var shortid = require("shortid");

var db = require('../db');

var router = express.Router();

//find
router.get("/", function(request, response) {
  var q = request.query.q;
  if (q === undefined) {
    response.render("users", {
      users: db.get("users").value()
    });
  } else {
    var matchUser = db
      .get("users")
      .value()
      .filter(function(user) {
        return (user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1) ||
          (user.phonenumber.indexOf(q) !== -1);
      });
    response.render("users", {
      users: matchUser
    });
  }
});

//delete
router.get("/:id/delete", function(request, response) {
  var id = request.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  response.redirect("/users");
});

//create
router.get("/create", function(request, response) {
  response.render("createUser");
});

router.post("/create", function(request, response) {
  request.body.id = shortid.generate();
  db.get("users")
    .push(request.body)
    .write();
  response.redirect("/users");
});

//update
router.get("/update", function(request, response) {
  var name = request.query.name;
  var phoneNumber = request.query.phonenumber;
  var newPhoneNumber = request.query.newphonenumber;
  db.get("users")
    .find({ phonenumber: phoneNumber })
    .assign({ phonenumber: newPhoneNumber })
    .write();
  response.redirect("back");
});










module.exports = router;