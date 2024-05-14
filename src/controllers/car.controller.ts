import { NextFunction, Request, Response } from 'express';
import Car, { ICar } from '../models/car';
import CarBody, { carBodyFromString } from '../models/carBody';
import CarBrand from '../models/carBrand';
import CarFuel, { carFuelFromString } from '../models/carFuel';
import CarModel from '../models/carModel';
import CarTransmission, { carTransmissionFromString } from '../models/carTransmission';
import { checkIsValidVin } from '../utils/utils';
import logger from '../logging/config';
import CarQuery from '../database/queries/car.query';

class CarController {
    public static addCar = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const newCarData: Partial<ICar> = {
                modelCar: data.model,
                vin: data.vin,
                registrationPlate: data.registrationPlate,
                km: data.km,
                isFree: data.isFree,
                fuel: CarFuel.DIESEL, //TODO: change to data.fuel
                bodyType: CarBody.SEDAN, //TODO: change to data.bodyType
                transmission: CarTransmission.AUTOMATIC, //TODO: change to data.transmission
                fuelCapacity: data.fuelCapacity,
                description: data.description,
                year: data.year,
                kw: data.kw,
                ccm: data.ccm,
                colorExterior: data.colorExterior,
                colorInterior: data.colorInterior,
                numberOfDoors: data.numberOfDoors,
                numberOfSeats: data.numberOfSeats,
                fourWheelDrive: data.fourWheelDrive,
                heatedSeatsFront: data.heatedSeatsFront,
                heatedSeatsRear: data.heatedSeatsRear,
                heatedSteeringWheel: data.heatedSteeringWheel,
                airConditioning: data.airConditioning,
                cruiseControl: data.cruiseControl,
                adaptiveCruiseControl: data.adaptiveCruiseControl,
                webasto: data.webasto,
                androidAuto: data.androidAuto,
                appleCarPlay: data.appleCarPlay,
                dabRadio: data.dabRadio,
                isoFix: data.isoFix,
                pdcFront: data.pdcFront,
                pdcBack: data.pdcBack,
                rearCamera: data.rearCamera,
                towHook: data.towHook,
            }

            const addedCar = await CarQuery.add(newCarData);

            res.status(200).send({
                car: addedCar
            });
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    };

    public static updateCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const carData: Partial<ICar> = {
                modelCar: data.model,
                vin: data.vin,
                registrationPlate: data.registrationPlate,
                km: data.km,
                isFree: data.isFree,
                fuel: carFuelFromString(data.fuel), //TODO: change to data.fuel
                bodyType: carBodyFromString(data.bodyType), //TODO: change to data.bodyType
                transmission: carTransmissionFromString(data.transmission), //TODO: change to data.transmission
                fuelCapacity: data.fuelCapacity,
                description: data.description,
                year: data.year,
                kw: data.kw,
                ccm: data.ccm,
                colorExterior: data.colorExterior,
                colorInterior: data.colorInterior,
                numberOfDoors: data.numberOfDoors,
                numberOfSeats: data.numberOfSeats,
                fourWheelDrive: data.fourWheelDrive,
                heatedSeatsFront: data.heatedSeatsFront,
                heatedSeatsRear: data.heatedSeatsRear,
                heatedSteeringWheel: data.heatedSteeringWheel,
                airConditioning: data.airConditioning,
                cruiseControl: data.cruiseControl,
                adaptiveCruiseControl: data.adaptiveCruiseControl,
                webasto: data.webasto,
                androidAuto: data.androidAuto,
                appleCarPlay: data.appleCarPlay,
                dabRadio: data.dabRadio,
                isoFix: data.isoFix,
                pdcFront: data.pdcFront,
                pdcBack: data.pdcBack,
                rearCamera: data.rearCamera,
                towHook: data.towHook,
            }

            const updatedCar = await CarQuery.update(data.id, carData);

            res.status(200).send({
                car: updatedCar
            });
        }
        catch (error) {
            next(error)
        }
    };

    public static loadCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            next(error)
        }
    };

    public static isValidVin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            next(error)
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