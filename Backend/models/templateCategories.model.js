module.exports = (sequelize, DataTypes) => {
  const TemplateCategory = sequelize.define(
    "TemplateCategory",
    {
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Templates", // Reference to the Templates table
          key: "id",
        },
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories", // Reference to the Categories table
          key: "id",
        },
        primaryKey: true,
      },
    },
    {
      timestamps: true, // Include createdAt and updatedAt
      indexes: [
        {
          unique: true,
          fields: ["templateId", "categoryId"], // Ensure the combination is unique
        },
      ],
    }
  );

  return TemplateCategory;
};
