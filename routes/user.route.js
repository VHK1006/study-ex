var express = require("express");
var shortid = require("shortid");
var multer = require("multer");

var db = require("../db");
var controller = require("../controllers/user.controller");
var validate = require("../validate/user.validate");

var upload = multer({ dest: "./public/uploads/" });

var router = express.Router();

//find
router.get("/", controller.index);

//delete
router.get("/:id/delete", controller.delete);

//create
router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  validate.postCreate,
  controller.postCreate
);

//update
router.get("/update", controller.update);

module.exports = router;
