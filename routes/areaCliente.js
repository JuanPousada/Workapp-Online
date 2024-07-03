var express = require("express");
var router = express.Router();

const connection = require("../bbdd")

router.get("/", function (req, res, next) {
  res.render("areaCliente");
});

router.get("/miCuenta", function (req, res, next) {
  res.render("miCuenta");
});

module.exports = router;
