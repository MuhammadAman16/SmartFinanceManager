const { Budget } = require("../models");
const { BudgetCategory, BudgetLabel, Category, Label } = require("../models");
const { errorHandler } = require("../utils/errorHandler");
const { Op } = require('sequelize');

exports.getAllBudgets = async (req, res, next) => {
  try {
    const { startDate, endDate, createdAt } = req.query;

    let whereClause = {};

    // Apply filtering based on startDate and endDate (budget period)
    if (startDate || endDate) {
      whereClause.startDate = {
        ...(startDate && { [Op.gte]: new Date(startDate) }), // Greater than or equal to startDate
        ...(endDate && { [Op.lte]: new Date(endDate) }), // Less than or equal to endDate
      };
    }

    // Apply filtering based on createdAt
    if (createdAt) {
      whereClause.createdAt = {
        [Op.gte]: new Date(createdAt), // Only budgets created after the given createdAt
      };
    }

    const budgets = await Budget.findAll({
      include: [
        {
          model: Category,
          as: "Categories",
        },
        {
          model: Label,
          as: "Labels",
        },
      ],
      where:whereClause
    });
    return res.status(200).json(budgets);
  } catch (error) {
    console.log("Error fetching budgets:", error);
    next(error);
  }
};

exports.getBudgetById = async (req, res, next) => {
  const { id } = req.params;

  try {
    
    const budget = await Budget.findByPk(id, {
      include: [
        {
          model: Category,
          as: "Categories", // Use the alias you provided in your association
        },
        {
          model: Label,
          as: "Labels",
        },
      ],
    });
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
  const {
    name,
    userId,
    period,
    amount,
    currency,
    account,
    startDate,
    endDate,
    categoryIds,
    labelIds,
  } = req.body;

  // Validation
  if (!name || !period || !amount || !currency || !account || !userId) {
    return next(
      errorHandler(
        400,
        "All fields are required: name, userId, period, amount, currency, account"
      )
    );
  }

  try {
    const newBudget = await Budget.create({
      name,
      userId,
      period,
      amount,
      currency,
      account,
      startDate,
      endDate,
    });

    if (categoryIds?.length) {
      const BudgetCategoriesPayload = categoryIds.map((id) => {
        return { budgetId: newBudget.id, categoryId: id };
      });

      await BudgetCategory.bulkCreate(BudgetCategoriesPayload);
    }

    if (labelIds?.length) {
      const BudgetLabelPayload = labelIds.map((id) => {
        return { budgetId: newBudget.id, labelId: id };
      });

      await BudgetLabel.bulkCreate(BudgetLabelPayload);
    }

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

    await budget.setCategories([]); // Remove all associations with Categories
    await budget.setLabels([]); // Remove all associations with Labels

    await budget.destroy();
    return res
      .status(204)
      .json({ message: "Deleted Successfully", data: budget }); // No content
  } catch (error) {
    console.log("Error deleting budget:", error);
    next(error);
  }
};
