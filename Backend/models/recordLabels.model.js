module.exports = (sequelize, DataTypes) => {
  const RecordLabel = sequelize.define(
    "RecordLabel",
    {
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Records",
          key: "id",
        },
        primaryKey: true,
        field: "recordId",
      },
      labelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Labels",
          key: "id",
        },
        primaryKey: true,
        field: "labelId",
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["recordId", "labelId"],
        },
      ],
    }
  );

  return RecordLabel;
};
