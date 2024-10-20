module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define(
    "Budget",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // The name of the table you're referencing
          key: "id", // The primary key in the referenced table
        },
      },
      period: {
        type: DataTypes.ENUM("One-time", "Week", "Month", "Year"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true, // Optional
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true, // Optional
      },
    },
    {
      timestamps: true,
      paranoid: true,
      validate: {
        checkDates() {
          if (this.period === "One-time") {
            if (!this.startDate || !this.endDate) {
              throw new Error("Start date and end date are required for 'One-time' period.");
            }
          }
        },
      },
    }
  );

  Budget.associate = (models) => {
    Budget.belongsToMany(models.Label, {
      through: "BudgetLabels",
      foreignKey: "budgetId",
      as: "Labels",
    });
    Budget.belongsToMany(models.Category, {
      through: models.BudgetCategory,
      foreignKey: "budgetId",
      as: "Categories",
    });

    Budget.belongsToMany(models.Account, {
      through: models.BudgetAccounts, // Reference the new link table
      foreignKey: 'budgetId',
      as: 'Accounts',
    });
  };

  return Budget;
};
