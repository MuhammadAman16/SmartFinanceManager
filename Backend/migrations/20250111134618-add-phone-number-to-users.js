'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Add the phoneNumber column without the NOT NULL constraint
    await queryInterface.addColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,  // Initially allow nulls
      unique: true,     // Ensure uniqueness
    });

    // Step 2: Update existing records with a valid phone number
    await queryInterface.sequelize.query(`
      UPDATE "Users"
      SET "phoneNumber" = CONCAT('0000000000', id)  -- Example logic for phoneNumber
      WHERE "phoneNumber" IS NULL;
    `);

    // Step 3: Alter the column to set NOT NULL constraint after populating it
    await queryInterface.changeColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: false,  // Now set to NOT NULL
      unique: true,      // Ensure uniqueness
    });
  },

  async down(queryInterface, Sequelize) {
    // Step 4: Revert the changes by removing the phoneNumber column
    await queryInterface.removeColumn('Users', 'phoneNumber');
  }
};
