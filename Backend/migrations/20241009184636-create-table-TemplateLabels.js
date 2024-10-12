"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TemplateLabels", {
      templateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Templates", // Reference to the Templates table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
      },
      labelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Labels", // Reference to the Labels table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
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

    // Adding unique constraint for templateId and labelId combination
    await queryInterface.addConstraint("TemplateLabels", {
      fields: ["templateId", "labelId"],
      type: "unique",
      name: "template_label_unique",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TemplateLabels");
  },
};
