import Customer, { ICustomer } from "../../models/customer";

class CustomerQuery {
    static async getById(id: string) {
        const customer = await Customer.findById(id);
        return customer;
    }

    static async add(customer: Partial<ICustomer>) { 
        const newCustomer = await new Customer(customer).save();
        
        return newCustomer;
    }

    static async update(customer: Partial<ICustomer>) { 
        const updatedCustomer = await Customer.findByIdAndUpdate(customer.id, customer);
        
        return updatedCustomer;
    }
}

export default CustomerQuery;