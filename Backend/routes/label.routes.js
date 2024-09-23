const express = require('express');
const router = express.Router();
const labelsController = require('../controller/label.controller');

// Get all labels
router.get('/', labelsController.getAllLabels);

// Create a new label
router.post('/', labelsController.createLabel);

module.exports = router;
