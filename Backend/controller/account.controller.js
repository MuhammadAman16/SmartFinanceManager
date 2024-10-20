const { Account,Record } = require("../models");
const { errorHandler } = require("../utils/errorHandler");
const { Op } = require('sequelize');

// Create a new Account
exports.createAccount = async (req, res, next) => {
  const { name, bankAccountNumber, type, initialValue, currency, color,userId } = req.body;

  if (!name || !bankAccountNumber || !type || !initialValue || !currency) {
    return next(errorHandler(400, "All required fields must be provided."));
  }

  try {
    const newAccount = await Account.create({
      name,
      bankAccountNumber,
      type,
      initialValue,
      currency,
      color,
      userId
    });

    return res.status(201).json(newAccount);
  } catch (error) {
    console.log("Error creating account:", error);
    next(error);
  }
};

// Get all Accounts
exports.getAllAccounts = async (req, res, next) => {
    const { createdAt } = req.query; // Extract the createdAt query param

  try {

    let whereClause = {};

    // Apply filtering based on createdAt (if provided in query params)
    if (createdAt) {

        const startOfDay = new Date(createdAt);
      startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day (00:00:00)

      const endOfDay = new Date(createdAt);
      endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day (23:59:59)

      whereClause.createdAt = {
        [Op.between]: [startOfDay, endOfDay], 
      };
    }

    // Fetch accounts with optional filtering by createdAt
    const accounts = await Account.findAll({
      where: whereClause, // Apply the filter here
      raw:true
    });

    await Promise.all(accounts.map(async account => {
      const whereClauseForRecord = {
        userId:account.userId,
        accountId: account.id
      }
  
      const records = await Record.findAll({
        where:whereClauseForRecord,
        raw:true
      })
      account['currentValue'] = +account.initialValue
      for (const record of records) {
        if(record.type == 'INCOME'){
          account['currentValue'] = (+account['currentValue']) + (+record.amount)
        }else if(record.type == 'EXPENSE'){
          account['currentValue'] = (+account['currentValue']) - (+record.amount)
        }
      }
    }))

    return res.status(200).json(accounts);
  } catch (error) {
    console.log("Error fetching accounts:", error);
    next(error);
  }
};

// Get an Account by ID
exports.getAccountById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return next(errorHandler(404, "Account not found"));
    }

    const whereClauseForRecord = {
      userId:account.userId,
      accountId: account.id
    }

    const records = await Record.findAll({
      where:whereClauseForRecord,
      raw:true
    })
    account['currentValue'] = +account.initialValue
    for (const record of records) {
      if(record.type == 'INCOME'){
        account['currentValue'] = (+account['currentValue']) + (+record.amount)
      }else if(record.type == 'EXPENSE'){
        account['currentValue'] = (+account['currentValue']) - (+record.amount)
      }
    }

    return res.status(200).json(account);
  } catch (error) {
    console.log("Error fetching account:", error);
    next(error);
  }
};

// Update an Account by ID
exports.updateAccount = async (req, res, next) => {
  const { id } = req.params;
  const { name, bankAccountNumber, type, initialValue, currency, color } = req.body;

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return next(errorHandler(404, "Account not found"));
    }

    await account.update({
      name,
      bankAccountNumber,
      type,
      initialValue,
      currency,
      color,
    });

    return res.status(200).json(account);
  } catch (error) {
    console.log("Error updating account:", error);
    next(error);
  }
};

// Delete an Account by ID
exports.deleteAccount = async (req, res, next) => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);
    console.log(": account",account)
    if (!account) {
      return next(errorHandler(404, "Account not found"));
    }

    await account.destroy();
    return res.status(204).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log("Error deleting account:", error);
    next(error);
  }
};
