const db = require('../models'); // Adjust path if necessary

const syncDatabase = async () => {
  try {
    await db.sequelize.sync({ force: false }); // Set `force: true` to drop and recreate tables on every sync
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = syncDatabase;
