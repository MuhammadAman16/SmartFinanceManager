"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the unique constraint from the `name` field
    await queryInterface.changeColumn("Records", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the unique constraint if the migration is reverted
    await queryInterface.changeColumn("Records", "name", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },
};
