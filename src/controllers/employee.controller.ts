import {Request, Response, NextFunction } from "express";
import Employee from "../models/employee";
import EmployeeQuery from "../database/queries/employee.query";

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
}

export default EmployeeController;