const { Template } = require("../models");
const {
  TemplateCategory,
  TemplateLabel,
  Category,
  Label,
} = require("../models");
const { errorHandler } = require("../utils/errorHandler");

exports.getAllTemplates = async (req, res, next) => {
  try {
    const templates = await Template.findAll({
      include: [
        {
          model: Category,
          as: "categories",
        },
        {
          model: Label,
          as: "labels",
        },
      ],
    });
    return res.status(200).json(templates);
  } catch (error) {
    console.log("Error fetching templates:", error);
    next(error);
  }
};

exports.getTemplateById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const template = await Template.findByPk(id, {
      include: [
        {
          model: Category,
          as: "categories", // Use the alias you provided in your association
        },
        {
          model: Label,
          as: "labels",
        },
      ],
    });
    if (!template) {
      return next(errorHandler(404, "Template not found"));
    }
    return res.status(200).json(template);
  } catch (error) {
    console.log("Error fetching template:", error);
    next(error);
  }
};

exports.createTemplate = async (req, res, next) => {
  const {
    name,
    userId,
    amount,
    currency,
    paymentType,
    note,
    payee,
    type,
    place,
    categoryIds,
    labelIds,
  } = req.body;

  // Validation
  if (!name || !amount || !currency || !paymentType || !type || !userId) {
    return next(
      errorHandler(
        400,
        "All fields are required: name, userId, amount, currency, paymentType, type"
      )
    );
  }

  try {
    const newTemplate = await Template.create({
      name,
      userId,
      amount,
      currency,
      paymentType,
      note,
      payee,
      type,
      place,
    });

    if (categoryIds?.length) {
      const TemplateCategoriesPayload = categoryIds.map((id) => {
        return { templateId: newTemplate.id, categoryId: id };
      });

      await TemplateCategory.bulkCreate(TemplateCategoriesPayload);
    }

    if (labelIds?.length) {
      const TemplateLabelPayload = labelIds.map((id) => {
        return { templateId: newTemplate.id, labelId: id };
      });

      await TemplateLabel.bulkCreate(TemplateLabelPayload);
    }

    return res.status(201).json(newTemplate);
  } catch (error) {
    console.log("Error creating template:", error);
    next(error);
  }
};

exports.updateTemplate = async (req, res, next) => {
  const { id } = req.params;
  const { name, amount, currency, paymentType, note, payee, type, place } =
    req.body;

  try {
    const template = await Template.findByPk(id);
    if (!template) {
      return next(errorHandler(404, "Template not found"));
    }

    await template.update({
      name,
      amount,
      currency,
      paymentType,
      note,
      payee,
      type,
      place,
    });

    return res.status(200).json(template);
  } catch (error) {
    console.log("Error updating template:", error);
    next(error);
  }
};

exports.deleteTemplate = async (req, res, next) => {
  const { id } = req.params;

  try {
    const template = await Template.findByPk(id);
    if (!template) {
      return next(errorHandler(404, "Template not found"));
    }

    await template.setCategories([]); // Remove all associations with Categories
    await template.setLabels([]); // Remove all associations with Labels

    await template.destroy();
    return res
      .status(204)
      .json({ message: "Deleted Successfully", data: template }); // No content
  } catch (error) {
    console.log("Error deleting template:", error);
    next(error);
  }
};
