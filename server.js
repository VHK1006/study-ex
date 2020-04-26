// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var pug = require("pug");
var shortid = require("shortid");

var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var transactionRoute = require("./routes/transaction.route");

var db = require("./db");

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.get("/", function(request, response) {
  response.render("index");
});

app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/transactions", transactionRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
