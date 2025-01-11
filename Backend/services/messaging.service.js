exports.sendWhatsAppMessage = async (phoneNumber, message) => {
    const accountSid = 'ACa8f41f9830e890f8260be0c610577d03';
    const authToken = '483b8f58314890e0dec0af4cac90266e';

    const client = require('twilio')(accountSid, authToken);

    return client.messages
        .create({
            body: message.substring(0, 1500),
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${phoneNumber}`
        })
}