var express = require("express");
var shortid = require("shortid");

var db = require("../db");
var controller = require('../controllers/transaction.controller');
var router = express.Router();

router.get("/", controller.index);

//delete
router.get("/:id/delete", controller.delete);

//create
router.get("/create", controller.create);

router.post("/create", controller.postCreate);

module.exports = router;
