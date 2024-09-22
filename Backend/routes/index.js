const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const budgetRoutes = require("./budget.routes");

router.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);

module.exports = router;
