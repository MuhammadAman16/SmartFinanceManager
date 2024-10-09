module.exports = (sequelize, DataTypes) => {
    const BudgetCategory = sequelize.define('BudgetCategory', {
      budgetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Budgets',
          key: 'id',
        },
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        primaryKey: true,
      },
    }, {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['budgetId', 'categoryId'],
        }
      ]
    });
  
    return BudgetCategory;
  };
  