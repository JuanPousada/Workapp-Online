var express = require("express");
var router = express.Router();

const connection = require("../bbdd")

router.get("/", function (req, res, next) {
  res.render("home");
});

module.exports = router;
