module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    "Template",
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
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.ENUM(
          "Cash",
          "Debit Card",
          "Credit Card",
          "Bank Transfer",
          "Voucher",
          "Mobile Payment",
          "Web Payment"
        ),
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true, // Optional
      },
      payee: {
        type: DataTypes.STRING,
        allowNull: true, // Optional
      },
      type: {
        type: DataTypes.ENUM("Income", "Expenses"),
        allowNull: false,
      },
      place: {
        type: DataTypes.GEOGRAPHY, // For storing map coordinates
        allowNull: true, // Optional
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // The name of the table you're referencing
          key: "id", // The primary key in the referenced table
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

  Template.associate = (models) => {
    // Many-to-many association with the Category model
    Template.belongsToMany(models.Category, {
      through: "TemplateCategories", // Pivot table for many-to-many association
      foreignKey: "templateId",
      as: "categories",
    });

    // Association with the Label model (many-to-many)
    Template.belongsToMany(models.Label, {
      through: "TemplateLabels", // Pivot table for many-to-many association
      foreignKey: "templateId",
      as: "labels",
    });

    // Association with the User model
    Template.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Template;
};
