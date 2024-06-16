const {Sequelize} = require('sequelize');
require("dotenv").config();
const env = process.env.ENV || "development";
const config = require('./config')
const sequelize = new Sequelize(config[env]);

module.exports = sequelize