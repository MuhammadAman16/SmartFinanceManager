const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const chatController=require("../controller/chatbot.controller");
const { User } = require('../models'); // Make sure to import the User model



// Route to update user's full name
router.put("/updateFullName", userController.updateFullName);

// Route to update user's password
router.put("/updatePassword", userController.updatePassword);

router.post("/send-message", userController.sendMessage)

router.post('/whatsapp-webhook', async (req, res) => {
    const { From, Body } = req.body; // Extract sender and message content
    console.log("req.body", req.body);
    console.log(`Message received from ${From}: ${Body}`);
    let phoneNumber = From.replace('whatsapp:', ''); // Extract phone number by removing 'whatsapp:' prefix
    
    try {
        // Find the user by phoneNumber in the Users table
        console.log(":- phoneNumber", phoneNumber)
        const user = JSON.parse(JSON.stringify(await User.findOne({ where: { phoneNumber }, logging: true })));
        console.log(":- user", user)
        if (!user) {
            // If no user found with the phone number, return an error message
            return res.status(404).json({ error: 'User not found' });
        }
        
        req.body = {
            ...req.body,
            query: Body,
            sendWhatsAppMessage: true
        }

        req.user = user
        // Call the getResponse function with the user's ID and the message
        await chatController.getResponse(req, res);

        // Respond to Twilio (empty response)
        res.set('Content-Type', 'text/xml');
        res.send('<Response></Response>'); // Empty response for Twilio
    } catch (error) {
        console.error("Error processing WhatsApp message:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/message-status', async (req, res) => {
    const { MessageSid, MessageStatus } = req.body;

    console.log(`Message SID: ${MessageSid}`);
    console.log(`Message Status: ${MessageStatus}`);

    // Respond to Twilio to acknowledge the callback
    res.status(200).send('Status received');

});

module.exports = router;
