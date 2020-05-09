// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config();

var express = require("express");
var pug = require("pug");
var shortid = require("shortid");
var cookieParser = require("cookie-parser");
var csurf = require('csurf');

var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var transactionRoute = require("./routes/transaction.route");
var productRoute = require("./routes/product.route");
var authRoute = require("./routes/auth.route");
var cartRoute = require("./routes/cart.route");
var transferRoute = require("./routes/transfer.route");

var apiProductRoute = require("./api/routes/product.route");
var apiTransactionRoute = require("./api/routes/transaction.route");

var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware = require("./middlewares/session.middleware");

var db = require("./db");

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(cookieParser(process.env.SESSION_SECRET));

app.get("/", function(request, response) {
  response.render("index");
});

app.use("/books", sessionMiddleware.requireSession, bookRoute);
app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/transactions", authMiddleware.requireAuth, transactionRoute);
app.use("/transfer", authMiddleware.requireAuth, transferRoute);
app.use("/auth", authRoute);
app.use("/api/products", apiProductRoute);
app.use("/api/transactions", apiTransactionRoute);
app.use(csurf({ cookie: true }));

app.use("/products", productRoute);
app.use("/cart", cartRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
