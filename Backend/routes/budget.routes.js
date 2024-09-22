const express = require("express");
const router = express.Router();
const budgetController = require("../controller/budget.controller");

// Route to get all budgets
router.get("/", budgetController.getAllBudgets);

// Route to get a specific budget by ID
router.get("/:id", budgetController.getBudgetById);

// Route to create a new budget
router.post("/", budgetController.createBudget);

// Route to update a budget by ID
router.put("/:id", budgetController.updateBudget);

// Route to delete a budget by ID
router.delete("/:id", budgetController.deleteBudget);

module.exports = router;
