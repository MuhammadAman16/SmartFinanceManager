const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const categoryRoutes = require("./categories.routes");
const labelRoutes = require("./label.routes");

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/label", labelRoutes);

module.exports = router;
