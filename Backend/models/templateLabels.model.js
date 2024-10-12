module.exports = (sequelize, DataTypes) => {
  const TemplateLabel = sequelize.define(
    "TemplateLabel",
    {
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Templates",
          key: "id",
        },
        primaryKey: true,
      },
      labelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Labels",
          key: "id",
        },
        primaryKey: true,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["templateId", "labelId"],
        },
      ],
    }
  );

  return TemplateLabel;
};
