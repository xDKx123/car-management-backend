import { NextFunction, Request, Response } from "express";
import CarModel from "../models/carModel";
import logger from "../logging/config";
import CarModelQuery from "../database/queries/carModel.query";

class CarModelController {
    public static loadCarModels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const carModels = await CarModel.find({
                brand: data.brandId
            });

            res.status(200).send({
                carModels: carModels
            })
        }
        catch (error) {
            next(error)
        }
    }

    public static addCarModel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const newCarModelData = {
                name: data.name,
                brand: data.brandId
            }

            const newCarModel = CarModelQuery.add(newCarModelData);

            res.status(200).send({
                carModel: newCarModel
            })
            return;
        } catch (error) {
            next(error)
        }
     }
}

export default CarModelController;