const { User } = require("../models");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/errorHandler");
const { sendWhatsAppMessage } = require("../services/messaging.service");

// GET user's full name
exports.getFullName = async (req, res, next) => {
  const { userId } = req.query; // User ID from query

  if (!userId) {
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(req.user.phoneNumber, "User ID is required.");
    }
    return next(errorHandler(400, "User ID is required."));
  }

  try {
    // Find the user by userId from query
    const user = await User.findByPk(userId);
    if (!user) {
      if (req.body.sendWhatsAppMessage) {
        await sendWhatsAppMessage(req.user.phoneNumber, "User not found");
      }
      return next(errorHandler(404, "User not found."));
    }

    return res.status(200).json({
      fullName: user.fullName,
    });
  } catch (error) {
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(req.user.phoneNumber, "Erro getting full name");
    }
    console.log("Error getting full name:", error);
    return next(error);
  }
};

// Update user's full name
exports.updateFullName = async (req, res, next) => {
  const { userId } = req.query; // User ID from query
  const { fullName } = req.body; // New full name from body

  if (!userId) {
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(req.user.phoneNumber, "User ID is required.");
    }
    return next(errorHandler(400, "User ID is required."));
  }

  if (!fullName) {
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(req.user.phoneNumber, "Full name is required");
    }
    return next(errorHandler(400, "Full name is required."));
  }

  try {
    // Find the user by userId from query
    const user = await User.findByPk(userId);

    if (!user) {
      if (req.body.sendWhatsAppMessage) {
        await sendWhatsAppMessage(req.user.phoneNumber, "User not found");
      }
      return next(errorHandler(404, "User not found."));
    }

    // Update the fullName
    user.fullName = fullName;
    await user.save();
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(
        req.user.phoneNumber,
        "Full name updated successfully"
      );
    }
    return res.status(200).json({
      message: "Full name updated successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(
        req.user.phoneNumber,
        "Erro updating full name"
      );
    }
    console.log("Error updating full name:", error);
    return next(error);
  }
};

// Update user's password
exports.updatePassword = async (req, res, next) => {
  const { userId } = req.query; // User ID from query
  const { currentPassword, newPassword } = req.body; // Current and new password from body

  if (!userId) {
    return next(errorHandler(400, "User ID is required."));
  }

  if (!currentPassword || !newPassword) {
    return next(
      errorHandler(400, "Both current password and new password are required.")
    );
  }

  try {
    // Find the user by userId from query
    const user = await User.findByPk(userId);

    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    // Compare the current password with the stored hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return next(errorHandler(400, "Current password is incorrect."));
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(
        req.user.phoneNumber,
        "password updated successfully"
      );
    }
    return res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(
        req.user.phoneNumber,
        "error updating password"
      );
    }
    console.log("Error updating password:", error);
    return next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    await sendWhatsAppMessage(
      "+923343696707",
      "test whatsapp message from api"
    );

    return res.status(200).json({
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.log(" error:", error);
    return next(error);
  }
};
