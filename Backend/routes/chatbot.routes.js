const express = require("express");
const router = express.Router();
const chatbotController = require("../controller/chatbot.controller");

router.get("/", chatbotController.initiateChatbot);

router.post("/", chatbotController.generateResponse);

module.exports = router;