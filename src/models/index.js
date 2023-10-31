const config = require('../configs/database');
const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

//db settings
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.user = require('./User.js')(sequelize, DataTypes);

module.exports = db;
