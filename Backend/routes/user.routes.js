const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");



// Route to update user's full name
router.put("/updateFullName", userController.updateFullName);

// Route to update user's password
router.put("/updatePassword", userController.updatePassword);

router.post("/message", userController.sendMessage)

module.exports = router;
