// routes/categories.routes.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categories.controller');

// Define a route to get all categories
router.get('/', categoriesController.getAllCategories);

module.exports = router;
