const { Budget } = require("../models");
const {
  BudgetCategory,
  BudgetLabel,
  Category,
  Label,
  BudgetAccounts,
  Account,
  Record,
} = require("../models");
const { errorHandler } = require("../utils/errorHandler");
const { Op, literal } = require("sequelize");
const { Sequelize } = require("../models");
const moment = require("moment");
const { sendWhatsAppMessage } = require("../services/messaging.service");
exports.getAllBudgets = async (req, res, next) => {
  try {
    const {
      startDate,
      endDate,
      createdAt,
      to,
      from,
      userId,
      category,
      amount,
      period,
    } = req.query;

    let whereClause = {};

    // Convert 'from' and 'to' to Date objects if they exist
    let fromDate, toDate;
    if (from) fromDate = new Date(from);
    if (to) toDate = new Date(to);

    // Handle startDate and endDate for budget date range filtering
    if (startDate) {
      whereClause.startDate = new Date(startDate);
    }

    if (endDate) {
      whereClause.endDate = new Date(endDate);
    }

    // Handle filtering for createdAt based on 'from' and 'to'
    if (fromDate && toDate) {
      whereClause.createdAt = {
        [Op.between]: [fromDate, toDate],
      };
    } else if (createdAt) {
      whereClause.createdAt = new Date(createdAt); // Convert createdAt to Date
    }

    // Apply other query filters
    if (userId) {
      whereClause.userId = userId;
    }

    if (amount) {
      whereClause.amount = amount;
    }

    if (period) {
      whereClause.period = period;
    }

    if (category) {
      whereClause["$Categories.name$"] = {
        [Op.like]: `%${category}%`,
      };
    }

    // Fetch budgets with applied filters
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
        {
          model: Account,
          as: "Accounts",
        },
      ],
      where: whereClause,
    });

    // Calculate remaining amount for each budget
    await Promise.all(
      budgets.map(async (budget) => {
        const whereClauseForRecord = {
          userId: budget.userId,
          isTemplate: "No",
          accountId: {
            [Op.in]: budget.Accounts.map((account) => account.id),
          },
          categoryId: {
            [Op.in]: budget.Categories.map((category) => category.id),
          },
        };

        if (budget.period === "One-time") {
          whereClauseForRecord["datetime"] = {
            [Op.between]: [budget.startDate, budget.endDate],
          };
        } else {
          let startDate, endDate;
          if (budget.period === "Week") {
            startDate = moment(budget.createdAt).startOf("week").toDate();
            endDate = moment(budget.createdAt).endOf("week").toDate();
          } else if (budget.period === "Month") {
            startDate = moment(budget.createdAt).startOf("month").toDate();
            endDate = moment(budget.createdAt).endOf("month").toDate();
          } else if (budget.period === "Year") {
            startDate = moment(budget.createdAt).startOf("year").toDate();
            endDate = moment(budget.createdAt).endOf("year").toDate();
          }
          whereClauseForRecord["datetime"] = {
            [Op.between]: [startDate, endDate],
          };
        }

        const records = await Record.findAll({
          where: whereClauseForRecord,
          raw: true,
        });

        budget["remainingAmount"] = +budget.amount;
        for (const record of records) {
          if (record.type === "INCOME") {
            budget["remainingAmount"] += +record.amount;
          } else if (record.type === "EXPENSE") {
            budget["remainingAmount"] -= +record.amount;
          }
        }
      })
    );

    // Send WhatsApp message if requested
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(req.user.phoneNumber, JSON.stringify(budgets));
    }

    return res.status(200).json(budgets);
  } catch (error) {
    if (req.body.sendWhatsAppMessage) {
      await sendWhatsAppMessage(req.user.phoneNumber, "Error fetching budgets");
    }
    console.error("Error fetching budgets:", error);
    next(error);
  }
};


// exports.getAllBudgets = async (req, res, next) => {
//   try {
//     const {
//       startDate,
//       endDate,
//       createdAt,
//       to,
//       from,
//       userId,
//       category,
//       amount,
//       period,
//     } = req.query;

//     let whereClause = {};

//     // Convert 'from' and 'to' to Date objects if they exist
//     let fromDate, toDate;
//     if (from) fromDate = new Date(from);
//     if (to) toDate = new Date(to);

//     // Handle startDate and endDate for budget date range filtering
//     if (startDate) {
//       whereClause.startDate = new Date(startDate);
//     }

//     if (endDate) {
//       whereClause.endDate = new Date(endDate);
//     }

//     // Handle filtering for createdAt based on 'from' and 'to'
//     if (fromDate && toDate) {
//       whereClause.createdAt = {
//         [Op.between]: [fromDate, toDate],
//       };
//     } else if (createdAt) {
//       whereClause.createdAt = new Date(createdAt); // Convert createdAt to Date
//     }

//     // Apply other query filters
//     if (userId) {
//       whereClause.userId = userId;
//     }

//     if (amount) {
//       whereClause.amount = amount;
//     }

//     if (period) {
//       whereClause.period = period;
//     }

//     if (category) {
//       whereClause["$Categories.name$"] = {
//         [Op.like]: `%${category}%`,
//       };
//     }

//     // Fetch budgets with applied filters
//     const budgets = await Budget.findAll({
//       include: [
//         {
//           model: Category,
//           as: "Categories",
//         },
//         {
//           model: Label,
//           as: "Labels",
//         },
//         {
//           model: Account,
//           as: "Accounts",
//         },
//       ],
//       where: whereClause,
//     });

//     // Calculate remaining amount for each budget
//     await Promise.all(
//       budgets.map(async (budget) => {
//         const whereClauseForRecord = {
//           userId: budget.userId,
//           isTemplate: "No",
//           accountId: {
//             [Op.in]: budget.Accounts.map((account) => account.id),
//           },
//           categoryId: {
//             [Op.in]: budget.Categories.map((category) => category.id),
//           },
//         };

//         if (budget.period === "One-time") {
//           whereClauseForRecord["datetime"] = {
//             [Op.between]: [budget.startDate, budget.endDate],
//           };
//         } else {
//           let startDate, endDate;
//           if (budget.period === "Week") {
//             startDate = moment(budget.createdAt).startOf("week").toDate();
//             endDate = moment(budget.createdAt).endOf("week").toDate();
//           } else if (budget.period === "Month") {
//             startDate = moment(budget.createdAt).startOf("month").toDate();
//             endDate = moment(budget.createdAt).endOf("month").toDate();
//           } else if (budget.period === "Year") {
//             startDate = moment(budget.createdAt).startOf("year").toDate();
//             endDate = moment(budget.createdAt).endOf("year").toDate();
//           }
//           whereClauseForRecord["datetime"] = {
//             [Op.between]: [startDate, endDate],
//           };
//         }

//         const records = await Record.findAll({
//           where: whereClauseForRecord,
//           raw: true,
//         });

//         budget["remainingAmount"] = +budget.amount;
//         for (const record of records) {
//           if (record.type === "INCOME") {
//             budget["remainingAmount"] += +record.amount;
//           } else if (record.type === "EXPENSE") {
//             budget["remainingAmount"] -= +record.amount;
//           }
//         }
//       })
//     );

//     // Send WhatsApp message if requested
//     if (req.body.sendWhatsAppMessage) {
//       await sendWhatsAppMessage(req.user.phoneNumber, JSON.stringify(budgets));
//     }

//     return res.status(200).json(budgets);
//   } catch (error) {
//     if (req.body.sendWhatsAppMessage) {
//       await sendWhatsAppMessage(req.user.phoneNumber, "Error fetching budgets");
//     }
//     console.error("Error fetching budgets:", error);
//     next(error);
//   }
// };


exports.getBudgetById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const budget = JSON.parse(
      JSON.stringify(
        await Budget.findByPk(id, {
          include: [
            {
              model: Category,
              as: "Categories", // Use the alias you provided in your association
            },
            {
              model: Label,
              as: "Labels",
            },
            {
              model: Account,
              as: "Accounts",
            },
          ],
        })
      )
    );
    if (!budget) {
      return next(errorHandler(404, "Budget not found"));
    }

    const whereClauseForRecord = {
      userId: budget.userId,
      isTemplate: "No",
      accountId: {
        [Op.in]: budget.Accounts.map((account) => account.id),
      },
      categoryId: {
        [Op.in]: budget.Categories.map((category) => category.id),
      },
    };

    if (budget.period == "One-time") {
      whereClauseForRecord["datetime"] = {
        [Op.between]: [budget.startDate, budget.endDate],
      };
    } else {
      let startDate, endDate;
      if (budget.period == "Week") {
        startDate = moment(budget.createdAt).startOf("week").toDate();
        endDate = moment(budget.createdAt).endOf("week").toDate();
      } else if (budget.period === "Month") {
        startDate = moment(budget.createdAt).startOf("month").toDate();
        endDate = moment(budget.createdAt).endOf("month").toDate();
      } else if (budget.period === "Year") {
        startDate = moment(budget.createdAt).startOf("year").toDate();
        endDate = moment(budget.createdAt).endOf("year").toDate();
      }
      whereClauseForRecord["datetime"] = {
        [Op.between]: [startDate, endDate],
      };
      console.log("budget.period", budget.period);
    }

    const records = await Record.findAll({
      where: whereClauseForRecord,
      raw: true,
    });
    budget["remainingAmount"] = +budget.amount;
    for (const record of records) {
      if (record.type == "INCOME") {
        budget["remainingAmount"] = +budget["remainingAmount"] + +record.amount;
      } else if (record.type == "EXPENSE") {
        budget["remainingAmount"] = +budget["remainingAmount"] - +record.amount;
      }
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
    accountIds,
    startDate,
    endDate,
    categoryIds,
    labelIds,
  } = req.body;

  // Validation
  if (
    !name ||
    !period ||
    !amount ||
    !currency ||
    !accountIds?.length ||
    !userId
  ) {
    return next(
      errorHandler(
        400,
        "All fields are required: name, userId, period, amount, currency, accounts"
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

    if (accountIds?.length) {
      const BudgetAccountsPayload = accountIds.map((id) => {
        return { budgetId: newBudget.id, accountId: id };
      });

      await BudgetAccounts.bulkCreate(BudgetAccountsPayload);
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
