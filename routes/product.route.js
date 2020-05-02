var express = require('express');
var shortid = require("shortid");

var db = require('../db');
var controller = require('../controllers/product.controller');

var router = express.Router();

router.get("/", controller.index);

module.exports = router;