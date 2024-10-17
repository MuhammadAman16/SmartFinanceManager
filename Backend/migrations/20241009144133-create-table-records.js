"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Records", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      // Record fields
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      labelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Labels", // Name of the referenced table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      payee: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: true,
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
        allowNull: true,
      },
      warranty: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM("Reconciled", "Cleared", "Uncleared"),
        allowNull: true,
        defaultValue: "Cleared",
      },
      attachments: {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "PKR",
      },
      // Template fields
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Accounts", // Name of the referenced table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Categories", // Name of the referenced table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isTemplate: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: false,
        defaultValue: "No",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Records");
  },
};
