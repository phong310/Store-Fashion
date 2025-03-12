const router = require('express').Router();
const AuthController = require('../controller/AuthController')
// REGISTER
router.post("/register", AuthController.registerUser)

// LOGIN
router.post("/login", AuthController.loginUser)

// LOGOUT
router.post("/logout", AuthController.logoutUser)

module.exports = router