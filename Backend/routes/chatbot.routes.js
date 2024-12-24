const express = require("express");
const chatbotController = require("../controller/chatbot.controller");
const userMiddleware = require("../middlewares/userMiddleware");

const router = express.Router();
// router.get("/", chatbotController.initiateChatbot);

// router.post("/", chatbotController.generateResponse);

router.post("/", userMiddleware, chatbotController.getResponse);

module.exports = router;
