var express = require("express");
var router = express.Router();

var personController = require("../controllers/personController");

/* GET home page. */
router.get("/", personController.test);

module.exports = router;
