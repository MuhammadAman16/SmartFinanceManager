const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Load environment variables (if using dotenv)
require('dotenv').config();
const config = require(__dirname + '/../config/config.js')[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  logging: false, // Disable logging; set to `console.log` for verbose output
});

const db = {};

// Load all models dynamically
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Add Sequelize instance to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
