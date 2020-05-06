var express = require('express');
var shortid = require("shortid");

var db = require('../db');
var controller = require('../controllers/cart.controller');


var router = express.Router();


router.get('/add/:bookId', controller.addToCart);

module.exports = router;