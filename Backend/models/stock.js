const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assuming you have a config for DB

class Stock extends Model {}

Stock.init(
  {
    stock_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    stock_symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Stock",
    tableName: "Stocks",
    timestamps: true, // Enable createdAt and updatedAt
  }
);

module.exports = Stock;
