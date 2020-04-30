var bcrypt = require("bcrypt");

var db = require("../db");

module.exports.login = function(request, response) {
  response.render("login");
};

module.exports.postLogin = function(request, response) {
  var email = request.body.email;
  var password = request.body.password;

  var user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    response.render("login", {
      errors: ["User does not exit."],
      values: request.body
    });
    return;
  }

  var result = bcrypt.compareSync(password, user.password);

  if (!result) {
    db.get("users")
      .find({ email: email })
      .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
      .write();

    if (user.wrongLoginCount >= 4) {
      response.render("login", {
        errors: ["Your account has been locked"],
        values: request.body
      });
      return;
    }
    response.render("login", {
      errors: ["Wrong password!"],
      values: request.body
    });
    return;
  }

  console.log(user.wrongLoginCount);

  if (user.wrongLoginCount >= 4) {
    response.render("login", {
      errors: ["Your account has been locked"],
      values: request.body
    });
    return;
  }

  response.cookie("userId", user.id, {
    signed: true
  });
  response.cookie("isAdmin", user.isAdmin);
  response.redirect("/users");
};
