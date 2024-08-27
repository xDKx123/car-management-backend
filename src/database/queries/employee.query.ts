import Employee, { IEmployee } from "../../models/employee";


class EmployeeQuery {
    public static add = async (data: Partial<IEmployee>): Promise<any> => { 
        return await new Employee(data).save();
    };

    public static update = async (id: string, data: Partial<IEmployee>): Promise<any> => { 
        return await Employee.findByIdAndUpdate(id, data)
    }
}

export default EmployeeQuery;