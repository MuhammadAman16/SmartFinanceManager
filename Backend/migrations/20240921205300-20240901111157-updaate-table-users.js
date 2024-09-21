'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'username');

    await queryInterface.renameColumn('Users', 'name', 'fullName');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
    
    await queryInterface.renameColumn('Users', 'fullName', 'name');
  }
};
