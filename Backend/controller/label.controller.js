const { Label } = require('../models');
const { errorHandler } = require('../utils/errorHandler');

// Get all labels
exports.getAllLabels = async (req, res, next) => {
  try {
    const labels = await Label.findAll();
    return res.status(200).json({
      message: 'Labels retrieved successfully',
      labels
    });
  } catch (error) {
    console.error('Error retrieving labels:', error);
    next(errorHandler(500, 'Error retrieving labels!'));
  }
};

// Create a new label
exports.createLabel = async (req, res, next) => {
  const { name, color } = req.body;

  // Validate input
  if (!name || !color) {
    return next(errorHandler(400, 'Name and color are required!'));
  }

  try {
    // Create new label
    const newLabel = await Label.create({ name, color });

    return res.status(201).json({
      message: 'Label created successfully',
      label: newLabel
    });
  } catch (error) {
    console.error('Error creating label:', error);
    next(errorHandler(500, 'Error creating label!'));
  }
};
