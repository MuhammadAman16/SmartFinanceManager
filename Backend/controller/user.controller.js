const { User } = require('../models');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/errorHandler');

// Update user's full name
exports.updateFullName = async (req, res, next) => {
  const { userId } = req.query; // User ID from query
  const { fullName } = req.body; // New full name from body

  if (!userId) {
    return next(errorHandler(400, 'User ID is required.'));
  }

  if (!fullName) {
    return next(errorHandler(400, 'Full name is required.'));
  }

  try {
    // Find the user by userId from query
    const user = await User.findByPk(userId);

    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Update the fullName
    user.fullName = fullName;
    await user.save();

    return res.status(200).json({
      message: 'Full name updated successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.log('Error updating full name:', error);
    return next(error);
  }
};

// Update user's password
exports.updatePassword = async (req, res, next) => {
  const { userId } = req.query; // User ID from query
  const { currentPassword, newPassword } = req.body; // Current and new password from body

  if (!userId) {
    return next(errorHandler(400, 'User ID is required.'));
  }

  if (!currentPassword || !newPassword) {
    return next(errorHandler(400, 'Both current password and new password are required.'));
  }

  try {
    // Find the user by userId from query
    const user = await User.findByPk(userId);

    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Compare the current password with the stored hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return next(errorHandler(400, 'Current password is incorrect.'));
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: 'Password updated successfully.',
    });
  } catch (error) {
    console.log('Error updating password:', error);
    return next(error);
  }
};

exports.sendMessage = async (phoneNumber, message) => {
  try {

    const accountSid = 'ACa8f41f9830e890f8260be0c610577d03';
    const authToken = '0205dd85068cc1351c454731000e39fc';

    const client = require('twilio')(accountSid, authToken);
    message = 'awdawCongrats, awdwyour request is succesfully processed!'
    client.messages
    // .create({
    //   to: `whatsapp:${phoneNumber}`,
    //   // from: 'whatsapp:+12314034142',
    //   from: 'whatsapp:+14155238886',
    //   body: message || "Your request has been successfully processed!",
    // })
    // .then(() => {
    //   console.log("message delivered successfully")
    //   // // Access details about the last request
    //   // console.log(client.lastRequest.method);
    //   // console.log(client.lastRequest.url);
    //   // console.log(client.lastRequest.auth);
    //   // console.log(client.lastRequest.params);
    //   // console.log(client.lastRequest.headers);
    //   // console.log(client.lastRequest.data);

      //   // Access details about the last response
      //   // console.log(client.httpClient.lastResponse.statusCode);
      //   // console.log(client.httpClient.lastResponse.body);
      // }).catch(err => {
      //   console.log(":- err", err)
      // });
      .create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${phoneNumber}`
      })
      .then(message => console.log(message.sid))

  } catch (error) {
    console.log(" error:", error);
  }
}
