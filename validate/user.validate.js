module.exports.postCreate = function(request, response, next) {
  var errors = [];

  if (request.body.name.length > 30) {
    errors.push("Name cannot exceed 30 characters");
  }

  if (!request.body.name) {
    errors.push("Name is required.");
  }

  if (!request.body.phonenumber) {
    errors.push("Phone number is required.");
  }

  if (errors.length) {
    response.render("createUser", {
      errors: errors,
      values: request.body
    });
    return;
  }

  response.locals.success = true;

  next();
};
