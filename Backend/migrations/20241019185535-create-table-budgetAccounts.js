'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BudgetAccounts', {
      budgetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Budgets', // Referencing the Budgets table
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Define what happens on delete
        onUpdate: 'CASCADE', // Optional: Define what happens on update
        primaryKey: true,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Accounts', // Referencing the Accounts table
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Define what happens on delete
        onUpdate: 'CASCADE', // Optional: Define what happens on update
        primaryKey: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true, // Optional: For soft deletes
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BudgetAccounts');
  },
};
