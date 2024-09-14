const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
// Sample login route
router.post("/login", authController.login);

router.post("/signup", authController.signup);

module.exports = router;
