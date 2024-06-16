'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const sequelize = require('../config/database');
module.exports = sequelize.define('employeedetail', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.ENUM("MALE", "FEMALE", "UNSPECIFIED")
  },
  salutation: {
    type: Sequelize.ENUM("MR", "MRS", "MS", "DR", "MX")
  },
  employee_number: {
    type: Sequelize.STRING,
    unique: true
  },
  gross_salary: {
    type: Sequelize.DECIMAL
  },
  profile_color: {
    type: Sequelize.STRING
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deleted_at: {

    type: Sequelize.DATE
  }

}
  , {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    paranoid: true,
    tableName: 'peanut_butter_employee_details'
  },
);