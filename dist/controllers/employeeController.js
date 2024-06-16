"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.showEmployee = exports.indexEmployee = exports.createEmployee = void 0;
const EmployeeDetail = require("../models/employeedetail");
const express_validator_1 = require("express-validator");
const { logger } = require("../utils/logger");
// Create method to create new employee
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { first_name, last_name, gender, salutation, gross_salary, profile_color, employee_number, } = req.body;
        const employee = yield EmployeeDetail.create({
            first_name,
            last_name,
            gender: gender.toUpperCase(),
            salutation: salutation.toUpperCase(),
            gross_salary,
            profile_color,
            employee_number,
        });
        if (employee)
            return res.status(201).json(employee);
        return res.status(400).json({
            message: "Employee not created",
        });
    }
    catch (error) {
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createEmployee = createEmployee;
// Get method to get all employees
const indexEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield EmployeeDetail.findAll({});
    return res.status(200).json({
        data: data
    });
});
exports.indexEmployee = indexEmployee;
// Get method to get single employee
const showEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const employee = yield EmployeeDetail.findByPk(id);
    if (employee)
        return res.status(200).json(employee);
    return res.status(404).json({
        message: "Employee not found",
    });
});
exports.showEmployee = showEmployee;
// Update method to update employee
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const employee = yield EmployeeDetail.findByPk(id);
    if (!employee)
        return res.status(404).json({
            message: "Employee not found",
        });
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        let data = req.body;
        delete data.employee_number;
        yield employee.update(data);
        return res.status(200).json(employee);
    }
    catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updateEmployee = updateEmployee;
// Delete method
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const employee = yield EmployeeDetail.findByPk(id);
    if (!employee)
        return res.status(404).json({
            message: "Employee not found",
        });
    try {
        yield employee.destroy();
        return res.status(200).json({
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteEmployee = deleteEmployee;
