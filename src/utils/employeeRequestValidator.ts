
import { check } from "express-validator";

export const employeeRequestValidator = [
    check('first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required'),
    check('last_name')
        .not()
        .isEmpty()
        .withMessage('Last name is required'),
    check('gender')
        .not()
        .isEmpty()
        .withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Unspecified'])
        .withMessage('Gender must be either Male or Female or Unspecified'),
    check('salutation')
        .not()
        .isEmpty()
        .withMessage('Salutation is required')
        .isIn(['Mr', 'Mrs', 'Ms', 'Mx', 'Dr'])
        .withMessage('Salutation must be either Mr, Mrs, Ms or Mx or Dr'),
    check('gross_salary')
        .not()
        .isEmpty()
        .withMessage('Gross salary is required')
        .isNumeric()
        .withMessage('Gross salary must be a number'),
    check('profile_color')
        .not()
        .isEmpty()
        .withMessage('Profile color is required'),
    check('employee_number')
        .not()
        .isEmpty()
        .withMessage('Employee number is required')
        .isNumeric()
        .withMessage('Employee number must be a number'),

];