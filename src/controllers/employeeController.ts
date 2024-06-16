import { Request, Response } from 'express';
const EmployeeDetail = require("../models/employeedetail")
import { validationResult } from 'express-validator';
export const createEmployee = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    console.log(errors);
    try {
        const {
            full_name,
            last_name,
            gender,
            salutation,
            gross_salary,
            profile_color,
            employee_number,
        } = req.body;
        console.log(req.body)
        const employee = await EmployeeDetail.create({
            full_name,
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
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const indexEmployee = async (req: Request, res: Response) => {
    return res.status(200).json({
        data: []
    })
}

