// controller/categories.controller.js
const { Category } = require("../models"); // Assuming your model is named Category
const { errorHandler } = require("../utils/errorHandler");

exports.getAllCategories = async (req, res, next) => {
  try {
    // Get all categories from the database
    const categories = await Category.findAll();

    // Return the categories in the response
    return res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    console.log("error", error);
    // Pass the error to the error handling middleware
    next(errorHandler(500, "Error retrieving categories!"));
  }
};
