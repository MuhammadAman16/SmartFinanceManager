"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TemplateCategories", {
      templateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Templates", // Reference to the Templates table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories", // Reference to the Categories table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Adding unique constraint for templateId and categoryId combination
    await queryInterface.addConstraint("TemplateCategories", {
      fields: ["templateId", "categoryId"],
      type: "unique",
      name: "template_category_unique",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TemplateCategories");
  },
};
