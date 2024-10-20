const { Record, Account, Category, Label } = require("../models");
const { errorHandler } = require("../utils/errorHandler");
const { Op } = require("sequelize");

exports.createRecord = async (req, res, next) => {
  const {
    userId,
    note,
    payee,
    datetime,
    paymentType,
    warranty,
    status, // Record-specific field
    place,
    attachment,
    labelIds,
    accountId, // Template-specific field
    categoryId, // One-to-one with Category
    amount, // Record-specific field
    currency, // Record-specific field
    name, // Template-specific field
    type, // Template-specific field
    isTemplate, // Template toggle
  } = req.body;

  // Validation for required fields based on isTemplate value
  if (!userId || !isTemplate) {
    return next(errorHandler(400, "Required fields: userId and isTemplate"));
  }

  if (isTemplate === "Yes" && (!name || !accountId)) {
    return next(
      errorHandler(400, "Required fields for template: name, accountId")
    );
  }

  if (isTemplate === "No" && (!amount || !currency || !status || !type)) {
    return next(
      errorHandler(400, "Required fields for record: amount, currency, status,type")
    );
  }

  if (isTemplate === "No" && (type != 'INCOME' && type != 'EXPENSE')) {
    return next(
      errorHandler(400, "Invalid value for record type")
    );
  }

  try {

    if(isTemplate === "No"){
      // await Budget.findAll({
      //   where:{
      //     userId,

      //   }
      // })
    }
    // Create the record with conditional field assignments
    const newRecord = await Record.create({
      userId,
      note,
      payee,
      datetime,
      paymentType,
      warranty,
      status: isTemplate === "No" ? status : null, // Include status only if it's a record
      place,
      attachment,
      accountId, // Set accountId only if it's a template
      amount, // Set amount only if it's a record
      currency, // Set currency only if it's a record
      name: isTemplate === "Yes" ? name : null, // Set name only if it's a template
      type, // Set type only if it's a template
      isTemplate,
      categoryId, // Always include categoryId for one-to-one relation
    });

    // If labelIds are provided, associate them with the record
    if (labelIds?.length) {
      const RecordLabelsPayload = labelIds.map((id) => ({
        recordId: newRecord.id,
        labelId: id,
      }));
      await RecordLabel.bulkCreate(RecordLabelsPayload);
    }

    return res.status(201).json(newRecord);
  } catch (error) {
    console.log("Error creating record:", error);
    next(error);
  }
};

exports.updateRecord = async (req, res, next) => {
  const { id } = req.params;
  const {
    note,
    payee,
    date,
    time,
    paymentType,
    warranty,
    status, // Record-specific field
    place,
    attachment,
    labelIds,
    accountId, // Template-specific field
    categoryId, // One-to-one with Category
    amount, // Record-specific field
    currency, // Record-specific field
    name, // Template-specific field
    type, // Template-specific field
    isTemplate, // Template toggle
  } = req.body;

  try {
    const record = await Record.findByPk(id);
    if (!record) {
      return next(errorHandler(404, "Record not found"));
    }

    // Validation for required fields based on isTemplate value
    if (isTemplate === "Yes" && (!name || !accountId)) {
      return next(
        errorHandler(400, "Required fields for template: name, accountId")
      );
    }

    if (isTemplate === "No" && (!amount || !currency || !status)) {
      return next(
        errorHandler(
          400,
          "Required fields for record: amount, currency, status"
        )
      );
    }

    // Update the record's fields with conditional field assignments
    await record.update({
      note,
      payee,
      date,
      time,
      paymentType,
      warranty,
      status: isTemplate === "No" ? status : null, // Update status only if it's a record
      place,
      attachment,
      accountId, // Update accountId only if it's a template
      amount, // Update amount only if it's a record
      currency, // Update currency only if it's a record
      name: isTemplate === "Yes" ? name : null, // Update name only if it's a template
      type, // Update type only if it's a template
      isTemplate,
      categoryId, // Always include categoryId for one-to-one relation
    });

    // Update Labels association if labelIds are provided
    if (labelIds?.length) {
      await record.setLabels(labelIds); // Update many-to-many labels
    }

    return res.status(200).json(record);
  } catch (error) {
    console.log("Error updating record:", error);
    next(error);
  }
};

exports.deleteRecord = async (req, res, next) => {
  const { id } = req.params;

  try {
    const record = await Record.findByPk(id);
    if (!record) {
      return next(errorHandler(404, "Record not found"));
    }

    // Remove associations with labels
    // If there are labels associated, remove them
    if (record.labelId) {
      await record.setLabels([]); // Remove all associated labels
    }

    await record.destroy(); // Delete the record

    return res.status(204).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.log("Error deleting record:", error);
    next(error);
  }
};

exports.getAllRecords = async (req, res, next) => {
  const { createdAt } = req.query; // Extract the createdAt query param

  try {
    // Build the where clause for filtering by createdAt
    let whereClause = {};

    if (createdAt) {

      const startOfDay = new Date(createdAt);
    startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day (00:00:00)

    const endOfDay = new Date(createdAt);
    endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day (23:59:59)

    whereClause.createdAt = {
      [Op.between]: [startOfDay, endOfDay], 
    };
  }

    const records = await Record.findAll({
      where: whereClause,
      include: [
        {
          model: Account,
          as: "Account", // Include associated account
        },
        {
          model: Category,
          as: "Category", // Include associated category
        },
        {
          model: Label,
          as: "Labels", // Include associated labels
        },
      ],
    });

    return res.status(200).json(records);
  } catch (error) {
    console.log("Error fetching records:", error);
    next(error);
  }
};

exports.getRecordById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const record = await Record.findByPk(id, {
      include: [
        {
          model: Account,
          as: "Account", // Include associated account
        },
        {
          model: Category,
          as: "Category", // Include associated category
        },
        {
          model: Label,
          as: "Labels", // Include associated labels
        },
      ],
    });

    if (!record) {
      return next(errorHandler(404, "Record not found"));
    }

    return res.status(200).json(record);
  } catch (error) {
    console.log("Error fetching record:", error);
    next(error);
  }
};
