const { Budget } = require("../models");
const { errorHandler } = require("../utils/errorHandler");

exports.getAllBudgets = async (req, res, next) => {
  try {
    const budgets = await Budget.findAll();
    return res.status(200).json(budgets);
  } catch (error) {
    console.log("Error fetching budgets:", error);
    next(error);
    console.log("hhjgj");
  }
};

exports.getBudgetById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findByPk(id);
    if (!budget) {
      return next(errorHandler(404, "Budget not found"));
    }
    return res.status(200).json(budget);
  } catch (error) {
    console.log("Error fetching budget:", error);
    next(error);
  }
};

exports.createBudget = async (req, res, next) => {
  const { name, period, amount, currency, account, startDate, endDate } =
    req.body;

  // Validation
  if (!name || !period || !amount || !currency || !account) {
    return next(
      errorHandler(
        400,
        "All fields are required: name, period, amount, currency, account"
      )
    );
  }

  try {
    const newBudget = await Budget.create({
      name,
      period,
      amount,
      currency,
      account,
      startDate,
      endDate,
    });
    return res.status(201).json(newBudget);
  } catch (error) {
    console.log("Error creating budget:", error);
    next(error);
  }
};

exports.updateBudget = async (req, res, next) => {
  const { id } = req.params;
  const { name, period, amount, currency, account, startDate, endDate } =
    req.body;

  try {
    const budget = await Budget.findByPk(id);
    if (!budget) {
      return next(errorHandler(404, "Budget not found"));
    }

    await budget.update({
      name,
      period,
      amount,
      currency,
      account,
      startDate,
      endDate,
    });

    return res.status(200).json(budget);
  } catch (error) {
    console.log("Error updating budget:", error);
    next(error);
  }
};

exports.deleteBudget = async (req, res, next) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findByPk(id);
    if (!budget) {
      return next(errorHandler(404, "Budget not found"));
    }

    await budget.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    console.log("Error deleting budget:", error);
    next(error);
  }
};
