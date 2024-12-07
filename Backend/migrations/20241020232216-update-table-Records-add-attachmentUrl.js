'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Records', 'attachmentUrl', {
      type: Sequelize.STRING, // This is the appropriate type for URLs
      allowNull: true, // Optional, since not all records might have attachments
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Records', 'attachmentUrl');
  }
};
