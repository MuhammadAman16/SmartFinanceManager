module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Account name is compulsory
      },
      bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
      },
      type: {
        type: DataTypes.ENUM(
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
        type: DataTypes.INTEGER,
        allowNull: true, // Optional field
        defaultValue: 0, // You can set a default value if desired
      },
      currentValue: {
        type: DataTypes.FLOAT,
        allowNull: true, // Optional field
        defaultValue: 0, // You can set a default value if desired
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
        defaultValue: "PKR",
      },
      color: {
        type: DataTypes.STRING, // You may choose a specific data type for the color representation (e.g., HEX code)
        allowNull: true, // Optional field
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Reference the Users table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      timestamps: true,
      paranoid: true, // For soft deletes
    }
  );

  Account.associate = (models) => {
    // One Account has many Records
    Account.hasMany(models.Record, {
      foreignKey: "accountId", // The foreign key in the Record model
      as: "Records", // Alias for the association
    });

    Account.belongsTo(models.User, {
      foreignKey: "userId",
      as: "User", // A Record belongs to one User
    });
  };

  return Account;
};