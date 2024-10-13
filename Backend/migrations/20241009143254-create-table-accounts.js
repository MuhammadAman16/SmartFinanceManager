"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Accounts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      accountName: {
        type: Sequelize.STRING,
        allowNull: false, // Account name is compulsory
      },
      bankAccountNumber: {
        type: Sequelize.STRING,
        allowNull: true, // Optional field
      },
      type: {
        type: Sequelize.ENUM(
          "General",
          "Cash",
          "Current account",
          "Credit card",
          "Saving account",
          "Bonus",
          "Insurance",
          "Investment",
          "Loan",
          "Mortgage",
          "Account with overdraft"
        ),
        allowNull: false,
        defaultValue: "General", // Default type is General
      },
      initialValue: {
        type: Sequelize.INTEGER,
        allowNull: true, // Optional field
        defaultValue: 0, // You can set a default value if desired
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true, // Optional field
        defaultValue: "PKR",
      },
      color: {
        type: Sequelize.STRING, // You may choose a specific data type for the color representation (e.g., HEX code)
        allowNull: true, // Optional field
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"), // Automatically set to the current timestamp
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"), // Automatically set to the current timestamp
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true, // For soft deletes
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Accounts");
  },
};
