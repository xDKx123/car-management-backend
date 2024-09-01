import { NextFunction, Request, Response } from "express";
import EmployeeQuery from "../database/queries/employee.query";
import Employee from "../models/employee";

class EmployeeController {
    public static load = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const employees = await Employee.find()
            const allData = await Employee.countDocuments();

            res.status(200).send({
                employees: employees,
                allData: allData
            });
        }
        catch (error) {
            next(error)
        }
    };

    public static add = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        try {
            const employee = EmployeeQuery.add(data);

            res.status(200).send({
                employee: employee
            });
        }
        catch (error) {
            next(error)
        }
    };

    public static update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        try {
            const employee = EmployeeQuery.update(data.id, data);

            if (!employee) {
                res.status(404).send({
                    message: 'Employee not found'
                });
            }

            res.status(200).send({
                employee: employee
            });
        }
        catch (error) {
            next(error)
        }
    };
    
    public static getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.body.id;

        try {
            const employee = await Employee.findById(id);

            if (!employee) {
                res.status(404).send({
                    message: 'Employee not found'
                });
            }

            res.status(200).send({
                employee: employee
            });
        }
        catch (error) {
            next(error)
        }
    }
}

export default EmployeeController;