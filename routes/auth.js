var express = require("express");
const authController =require('../controllers/auth')
var router = express.Router();

router.get('/login', authController.login);
router.post('/register', authController.register);

module.exports =router;