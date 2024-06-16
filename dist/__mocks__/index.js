"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeMock = void 0;
const faker_1 = require("@faker-js/faker");
const min = 99999;
const max = 999999;
const minSalary = 28000;
const maxSalary = 35000;
exports.employeeMock = {
    "first_name": faker_1.faker.person.firstName(),
    "last_name": faker_1.faker.person.lastName(),
    "gender": "Male",
    "salutation": "Mr",
    "gross_salary": Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary,
    "profile_color": "blue",
    "employee_number": Math.floor(Math.random() * (max - min + 1)) + min
};
