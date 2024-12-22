const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const categoryRoutes = require("./categories.routes");
const labelRoutes = require("./label.routes");
const recordRoutes = require("./record.routes");
const accountRoutes = require("./account.routes");

const budgetRoutes = require("./budget.routes");
const chatbotRoutes = require("./chatbot.routes");
const userRoutes = require("./user.routes")

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/label", labelRoutes);
router.use("/budget", budgetRoutes);
router.use("/record", recordRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/accounts",accountRoutes)
router.use("/user",userRoutes)

module.exports = router;
