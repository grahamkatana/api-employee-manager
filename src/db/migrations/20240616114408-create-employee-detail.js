'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('peanut_butter_employee_details', {
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
        type: Sequelize.ENUM("MALE", "FEMALE","UNSPECIFIED")
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EmployeeDetails');
  }
};