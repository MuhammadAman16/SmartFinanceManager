'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BudgetLabels', {
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
      labelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Labels',
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

    await queryInterface.addConstraint('BudgetLabels', {
      fields: ['budgetId', 'labelId'],
      type: 'unique',
      name: 'budget_label_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BudgetLabels');
  },
};
