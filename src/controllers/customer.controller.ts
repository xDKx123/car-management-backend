import { Request, Response } from 'express';
import Customer from '../models/customer';
import logger from '../logging/config';


interface SaveCustomerReturnType {
    customer: (typeof Customer) | null,
    created: boolean,
}

class CustomerController {
    public static loadCustomers = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const page = data.page;
            const rowsPerPage = data.rowsPerPage;

            logger.info('page: ' + page, 'rowsPerPage: ' + rowsPerPage)

            let customers = [];
            let allData = 0
            if (page >= 0 && rowsPerPage >= 0) {
                allData = await Customer.countDocuments();
                customers = await Customer.find().sort('id').skip(page * rowsPerPage).limit(rowsPerPage);
            }
            else {
                allData = await Customer.countDocuments();
                customers = await Customer.find().sort('id')
            }

            res.status(200).send({
                customers: customers,
                allData: allData
            });
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }

    public static getCustomer = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {


            const customer = await Customer.findById(data.id)

            res.status(200).send({
                customer: customer
            })
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }

    public static saveCustomer = async (req: Request, res: Response): Promise<void> => {
        const requestData = req.body;

        const data = requestData.customer;
        logger.info(data)

        const customerData = {
            name: data.name,
            surname: data.surname,
            email: data.email,
            phoneNumber: data.phoneNumber,
            isLegalPerson: data.isLegalPerson,
            idNumber: data.idNumber,
            idValidFrom: data.idValidFrom,
            idValidTo: data.idValidTo,
            drivingLicenseNumber: data.drivingLicenseNumber,
            drivingLicenseValidFrom: data.drivingLicenseValidFrom,
            drivingLicenseValidTo: data.drivingLicenseValidTo,
            street: data.street,
            postalCode: data.postalCode,
            city: data.city,
            birthDate: data.birthDate,
            birthPlace: data.birthPlace
        }

        try {
            let returnData: SaveCustomerReturnType = {
                customer: null,
                created: false,
            }

            if (data.id) {
                const customer = await Customer.findByIdAndUpdate(data.id, customerData)

                returnData = {
                    customer: customer as typeof Customer | null,
                    created: false
                }
            }
            else {
                const newCustomer = new Customer(customerData)
                await newCustomer.save();

                returnData = {
                    customer: newCustomer as unknown as typeof Customer | null,
                    created: true
                }
            }

            res.status(200).send(returnData);
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }


    public static addCustomer = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const newCustomer = new Customer({
                name: data.name,
                surname: data.surname,
                email: data.email,
                phoneNumber: data.phoneNumber
            })

            await newCustomer.save();

            res.status(200).send({
                car: newCustomer
            })
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }
}

export default CustomerController;