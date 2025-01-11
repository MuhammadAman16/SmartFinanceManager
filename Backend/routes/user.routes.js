const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");



// Route to update user's full name
router.put("/updateFullName", userController.updateFullName);

// Route to update user's password
router.put("/updatePassword", userController.updatePassword);

router.post("/message", userController.sendMessage)

router.post('/whatsapp-webhook', (req, res) => {
    const { From, Body } = req.body; // Extract sender and message content
    console.log("req.body", req.body);
    console.log(`Message received from ${From}: ${Body}`);

    // Respond to Twilio
    res.set('Content-Type', 'text/xml');
    res.send('<Response></Response>'); // Empty response for Twilio
});

module.exports = router;
