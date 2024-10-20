module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(
    "Record",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      // Record fields
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // labelId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: "Labels",
      //     key: "id",
      //   },
      // },
      payee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: true,
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
        allowNull: true,
      },
      warranty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: DataTypes.ENUM("Reconciled", "Cleared", "Uncleared"),
        allowNull: true,
        defaultValue: "Cleared",
      },

      attachments: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "PKR",
      },
      // Template fields
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Category",
          key: "id",
        },
      },
      type: {
        type: DataTypes.ENUM("INCOME", "EXPENSE"),
        allowNull: true,
        defaultValue: "EXPENSE",
      },
      // Template toggle
      isTemplate: {
        type: DataTypes.ENUM("Yes", "No"),
        allowNull: false,
        defaultValue: "No",
      },
    },
    {
      timestamps: true,
      paranoid: true, // For soft deletes
    }
  );

  // Add a hook to set the proper fields to null based on isTemplate value
  Record.addHook("beforeSave", (record, options) => {
    if (record.isTemplate === "Yes") {
      // If it is a template, set Record-specific fields to null
      record.date = null;
      record.time = null;
      record.warranty = null;
      record.status = null;
      record.attachments = null;
    } else if (record.isTemplate === "No") {
      // If it is a record, set Template-specific fields to null
      record.name = null;
    }
  });

  // Define associations for one-to-many relationships with User and Account
  Record.associate = (models) => {
    Record.belongsToMany(models.Label, {
      through: "RecordLabels",
      foreignKey: "recordId",
      otherKey:'labelId',
      as: "Labels",
    });

    Record.belongsTo(models.User, {
      foreignKey: "userId",
      as: "User", // A Record belongs to one User
    });

    Record.belongsTo(models.Account, {
      foreignKey: "accountId",
      as: "Account", // A Record belongs to one Account
    });
    Record.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "Category", // A Record belongs to one Account
    });
  };

  return Record;
};
