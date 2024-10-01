'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BudgetCategories', {
      budgetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Budgets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });

    await queryInterface.addConstraint('BudgetCategories', {
      fields: ['budgetId', 'categoryId'],
      type: 'unique',
      name: 'budget_category_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BudgetCategories');
  },
};
