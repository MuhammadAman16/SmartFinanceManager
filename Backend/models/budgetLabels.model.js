module.exports = (sequelize, DataTypes) => {
    const BudgetLabel = sequelize.define('BudgetLabel', {
      budgetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Budgets',
          key: 'id',
        },
        primaryKey: true,
      },
      labelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Labels',
          key: 'id',
        },
        primaryKey: true,
      },
    }, {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['budgetId', 'labelId'],
        }
      ]
    });
  
    return BudgetLabel;
  };
  