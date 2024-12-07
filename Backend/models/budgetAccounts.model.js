module.exports = (sequelize, DataTypes) => {
    const BudgetAccounts = sequelize.define('BudgetAccounts', {
      budgetId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Budgets', // The model to reference
          key: 'id', // The key in the referenced model
        },
        allowNull: false,
        primaryKey: true,
      },
      accountId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Accounts', // The model to reference
          key: 'id', // The key in the referenced model
        },
        allowNull: false,
        primaryKey: true,
      },
    }, {
      timestamps: true,
      paranoid: true, // Soft deletes
    });
  
    return BudgetAccounts;
  };
  