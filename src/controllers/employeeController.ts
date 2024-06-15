import { Request, Response } from 'express';

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const employee = {
            name,
            email,
            password
        }
        return res.status(201).json(employee)
    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        })
    }

}

export const indexEmployee = async (req: Request, res: Response) => {
    return res.status(200).json({
        data: []
    })
}

