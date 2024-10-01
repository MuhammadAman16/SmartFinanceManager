module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        parentCategoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'Categories',
            key: 'id'
          }
        },
        icon: {
          type: DataTypes.STRING,
          allowNull: true
        }
      }, {
        timestamps: true, 
        paranoid: true 
      });

      Category.associate = (models) => {
        Category.belongsToMany(models.Budget, { through: models.BudgetCategory, foreignKey: 'categoryId',as:"Budgets" });
      };
  
    return Category;
  };
  