var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(request, response) {
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
        return (
          user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
          user.phonenumber.indexOf(q) !== -1
        );
      });
    response.render("users", {
      users: matchUser
    });
  }
};

module.exports.delete = function(request, response) {
  var id = request.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  response.redirect("/users");
};

module.exports.create = function(request, response) {
  response.render("createUser");
};

module.exports.postCreate = function(request, response) {
  request.body.id = shortid.generate();

  db.get("users")
    .push(request.body)
    .write();
  response.redirect("/users");
};

module.exports.update = function(request, response) {
  var name = request.query.name;
  var phoneNumber = request.query.phonenumber;
  var newPhoneNumber = request.query.newphonenumber;
  db.get("users")
    .find({ phonenumber: phoneNumber })
    .assign({ phonenumber: newPhoneNumber })
    .write();
  response.redirect("back");
};
