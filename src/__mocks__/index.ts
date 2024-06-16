import { faker } from '@faker-js/faker'
const min = 99999
const max = 999999
const minSalary = 28000
const maxSalary = 35000
export const employeeMock = {
    "first_name": faker.person.firstName(),
    "last_name": faker.person.lastName(),
    "gender": "Male",
    "salutation": "Mr",
    "gross_salary": Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary,
    "profile_color": "blue",
    "employee_number": Math.floor(Math.random() * (max - min + 1)) + min
}