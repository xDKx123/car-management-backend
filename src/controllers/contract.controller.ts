import { Request, Response } from "express";
import Car from "../models/car";
import CarBrand from "../models/carBrand";
import CarModel from "../models/carModel";
import Contract from "../models/contract";
import logger from "../logging/config";

class ContractController {
    public static loadContractsLeavingToday = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        try {
            const contracts = await Contract.find({
                leavingDate: {
                    $gte: todayStart,
                    $lte: todayEnd
                }
                //}).populate({path: 'carModel', populate: {path: 'brand', model: 'CarBrand'}}).populate('customer');
            }).populate({
                path: 'car',
                model: Car,
                populate: {
                    path: 'modelCar',
                    model: CarModel,
                    populate: {
                        path: 'brand',
                        model: CarBrand
                    }
                }
            }).populate('customer');

            res.status(200).send({
                contracts: contracts
            });
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }

    public static loadContractsReturningToday = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        try {
            const contracts = await Contract.find({
                returnDate: {
                    $gte: todayStart,
                    $lte: todayEnd
                }
            }).populate({
                path: 'car',
                model: Car,
                populate: {
                    path: 'modelCar',
                    model: CarModel,
                    populate: {
                        path: 'brand',
                        model: CarBrand
                    }
                }
            }).populate('customer');

            res.status(200).send({
                contracts: contracts
            });
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }

    public static loadContracts = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const page = data.page;
            const rowsPerPage = data.rowsPerPage;


            logger.info('page: ' + page, 'rowsPerPage: ' + rowsPerPage)

            let contracts = [];
            let allData = 0
            if (page >= 0 && rowsPerPage >= 0) {
                allData = await Contract.countDocuments();
                contracts = await Contract.find().sort('id').populate({
                    path: 'car',
                    model: Car,
                    populate: {
                        path: 'modelCar',
                        model: CarModel,
                        populate: {
                            path: 'brand',
                            model: CarBrand
                        }
                    }
                }).populate('customer').skip(page * rowsPerPage)
                    .limit(rowsPerPage);
            }
            else {
                allData = await Contract.countDocuments();
                contracts = await Contract.find().sort('id').populate({
                    path: 'car',
                    model: Car,
                    populate: {
                        path: 'modelCar',
                        model: CarModel,
                        populate: {
                            path: 'brand',
                            model: CarBrand
                        }
                    }
                }).populate('customer');
            }

            res.status(200).send({
                contracts: contracts,
                allData: allData
            });
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }

    public static addContract = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        const contractData = data.contract

        //get first customer and car in db
        /*const customer = await Customer.findOne();
         const car = await Car.findOne();
    
         if (!customer || !car) {
         res.status(500).send({
         error: 'No customer or car found'
         })
         return;
         }
    
         try {
         const newContract = new Contract({
         name: 'Test',
         customer: customer._id,
         car: car._id,
         returnDate: new Date(),
         leavingDate: new Date(),
         createdAt: new Date()
         })
    
         await newContract.save();
    
         res.status(200).send({
         contract: newContract
         });
         }*/

        try {
            const newContract = new Contract({
                name: contractData.name,
                car: contractData.carId,
                customer: contractData.customerId,
                leavingDate: contractData.leavingDate,
                returnDate: contractData.returnDate
            })

            await newContract.save();

            res.status(200).send({
                contract: newContract
            });
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }
}

export default ContractController;