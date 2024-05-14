import { NextFunction, Request, Response } from "express";
import CarBrand, { ICarBrand } from "../models/carBrand";
import logger from "../logging/config";
import CarBrandQuery from "../database/queries/carBrand.query";

class CarBrandController {
    public static loadCarBrands = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const carBrands = await CarBrand.find();

            res.status(200).send({
                carBrands: carBrands
            })
        }
        catch (error) {
            next(error)
        }
    }

    public static addCarBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const newCarBrandData: Partial<ICarBrand> = {
                name: data.name
            }

            const newCarBrand = await CarBrandQuery.add(newCarBrandData);

            res.status(200).send({
                carBrand: newCarBrand
            })
            return;
        } catch (error) {
            next(error)
        }
    }

}
export default CarBrandController;