"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Templates", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentType: {
        type: Sequelize.ENUM(
          "Cash",
          "Debit Card",
          "Credit Card",
          "Bank Transfer",
          "Voucher",
          "Mobile Payment",
          "Web Payment"
        ),
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true, // Optional
      },
      payee: {
        type: Sequelize.STRING,
        allowNull: true, // Optional
      },
      type: {
        type: Sequelize.ENUM("Income", "Expenses"),
        allowNull: false,
      },
      place: {
        type: Sequelize.GEOGRAPHY, // For storing map coordinates
        allowNull: true, // Optional
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Reference to the Users table
          key: "id", // Primary key in the Users table
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true, // For soft deletes
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Templates");
  },
};
