var express = require("express");
const authController =require('../controllers/auth')
var router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports =router;