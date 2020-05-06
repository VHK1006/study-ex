var express = require('express');
var shortid = require("shortid");

var db = require('../db');
var controller = require('../controllers/book.controller');
var router = express.Router();

//find
router.get("/", controller.index);

//delete
router.get("/:id/delete", controller.delete);

//update
router.get("/update", controller.update);

//create
router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.post("/createTransaction", controller.createTransaction);

module.exports = router;