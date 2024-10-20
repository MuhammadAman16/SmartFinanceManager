"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RecordLabels", {
      recordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Records", // Reference to the Records table
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Name of the referenced table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });

    await queryInterface.addConstraint("RecordLabels", {
      fields: ["recordId", "labelId"],
      type: "unique",
      name: "record_label_unique",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RecordLabels");
  },
};
