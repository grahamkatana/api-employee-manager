import { Request, Response } from 'express';
const EmployeeDetail = require("../models/employeedetail")
import { validationResult } from 'express-validator';
import { CreateEmployeeDto } from '../dtos/CreateEmployeeDto.dto';
const {logger} = require("../utils/logger")
// Create method to create new employee
export const createEmployee = async (req: Request<{}, {}, CreateEmployeeDto>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const {
            first_name,
            last_name,
            gender,
            salutation,
            gross_salary,
            profile_color,
            employee_number,
        } = req.body;
        const employee = await EmployeeDetail.create({
            first_name,
            last_name,
            gender: gender.toUpperCase(),
            salutation: salutation.toUpperCase(),
            gross_salary,
            profile_color,
            employee_number,
        });
        if (employee) return res.status(201).json(employee);
        return res.status(400).json({
            message: "Employee not created",
        });
    } catch (error: any) {
        console.log(error)
        logger.error(error)
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get method to get all employees
export const indexEmployee = async (req: Request, res: Response) => {
    const data = await EmployeeDetail.findAll({})
    return res.status(200).json({
        data: data
    })

}

// Get method to get single employee
export const showEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await EmployeeDetail.findByPk(id);
    if (employee) return res.status(200).json(employee);
    return res.status(404).json({
        message: "Employee not found",
    });
}

// Update method to update employee
export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await EmployeeDetail.findByPk(id);
    if (!employee) return res.status(404).json({
        message: "Employee not found",
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        let data = req.body;
        data.gender = data.gender.toUpperCase(),
        data.salutation=data.salutation.toUpperCase(),
        delete data.employee_number

        await employee.update(data);
        return res.status(200).json(employee);

    } catch (error: any) {
        logger.error(error)
        return res.status(500).json({
            message: error.message,
        });

    }

}
// Delete method
export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await EmployeeDetail.findByPk(id);
    if (!employee) return res.status(404).json({
        message: "Employee not found",
    });
    try {
        await employee.destroy();
        return res.status(200).json({
            message: "Employee deleted successfully",
        });
    } catch (error: any) {
        logger.error(error)
        return res.status(500).json({
            message: error.message,
        });
    }
}

