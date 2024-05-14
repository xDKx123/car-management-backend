import { Request, Response } from 'express';
import Car from '../models/car';
import CarBody from '../models/carBody';
import CarBrand from '../models/carBrand';
import CarFuel from '../models/carFuel';
import CarModel from '../models/carModel';
import CarTransmission from '../models/carTransmission';
import { checkIsValidVin } from '../utils/utils';
import logger from '../logging/config';

class CarController {
    public static addCar = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

    const carModel = await CarModel.findOne();

    if (!carModel) {
        res.status(500).send({
                                 error: 'No car model found'
                             })
        return;
    }

    try {
        const newCar = new Car({
                                   modelCar: carModel._id,
                                   vin: 'WVWZZZ1JZ1W123456',
                                   registrationPlate: 'LJ-123-AB',
                                   km: 100000,
                                   isFree: true,
                                   fuel: 'DIESEL',
                                   bodyType: 'HATCHBACK',

                               })

        await newCar.save();

        res.status(200).send({
                                 car: newCar
                             });
    }
    catch (error) {
        res.status(500).send({
                                 error: error
                             })
    }
    };

    public static loadCars = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

    /*try {
     const page = data.page - 1;
     const rowsPerPage = data.rowsPerPage;
     }
     catch (error) {
     res.status(400).send({
     error: error
     })
     }*/
    //const cars = await Car.find().populate({path: 'carModel', populate: {path: 'brand', model:
    // 'CarBrand'}}).skip(page * rowsPerPage).limit(rowsPerPage);
    try {
        const cars = await Car.find().populate({
                                                   path: 'modelCar',
                                                   model: CarModel,
                                                   populate: {
                                                       path: 'brand',
                                                       model: CarBrand
                                                   }
                                               })

        res.status(200).send({
                                 cars: cars
                             });
    }
    catch (error) {
        logger.info(error)
        res.status(500).send({
                                 error: error
                             })

    }
    };

    public static isValidVin = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)
    
        if (!data.vin) {
            res.status(400).send({
                                     error: 'Vin is required'
                                 })
            return
        }
    
        try {
            res.status(200).send({
                                     isValid: checkIsValidVin(data.vin)
                                 })
        }
        catch (error) {
            res.status(500).send({
                                     error: error
                                 })
        }
    };


    public static loadCarBodyTypes = async (req: Request, res: Response): Promise<void> => {
        const carBodyTypes: CarBody[] = Object.values(CarBody);

        res.status(200).send({
                                 carBodyTypes: carBodyTypes
                             })
    };

    public static loadCarFuelTypes = async (req: Request, res: Response): Promise<void> => {
        const carFuelTypes: CarFuel[] = Object.values(CarFuel);

        res.status(200).send({
                                 carFuelTypes: carFuelTypes
                             })
    };

    public static loadCarTransmissionTypes = async (req: Request, res: Response): Promise<void> => {
        const carTransmissionTypes: CarTransmission[] = Object.values(CarTransmission);

        res.status(200).send({
                                 carTransmissionTypes: carTransmissionTypes
                             })
    };
}

export default CarController;