module.exports = (sequelize, DataTypes) => {
    const Label = sequelize.define('Label', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        timestamps: true,
        paranoid: true // This will add `deletedAt` for soft delete
      });

      Label.associate = (models) => {
        Label.belongsToMany(models.Budget, { through: 'BudgetLabels', foreignKey: 'labelId' });
      };
    
      return Label;
  };
  