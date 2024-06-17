"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRequestValidator = void 0;
const express_validator_1 = require("express-validator");
exports.employeeRequestValidator = [
    (0, express_validator_1.check)('first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required'),
    (0, express_validator_1.check)('last_name')
        .not()
        .isEmpty()
        .withMessage('Last name is required'),
    (0, express_validator_1.check)('gender')
        .not()
        .isEmpty()
        .withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Unspecified', "MALE", "FEMALE", "UNSPECIFIED"])
        .withMessage('Gender must be either Male or Female or Unspecified'),
    (0, express_validator_1.check)('salutation')
        .not()
        .isEmpty()
        .withMessage('Salutation is required')
        .isIn(['Mr', 'Mrs', 'Ms', 'Mx', 'Dr'])
        .withMessage('Salutation must be either Mr, Mrs, Ms or Mx or Dr'),
    (0, express_validator_1.check)('gross_salary')
        .not()
        .isEmpty()
        .withMessage('Gross salary is required')
        .isNumeric()
        .withMessage('Gross salary must be a number'),
    (0, express_validator_1.check)('profile_color')
        .not()
        .isEmpty()
        .withMessage('Profile color is required'),
    (0, express_validator_1.check)('employee_number')
        .not()
        .isEmpty()
        .withMessage('Employee number is required')
        .isNumeric()
        .withMessage('Employee number must be a number'),
];
