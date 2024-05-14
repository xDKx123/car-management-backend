import { Request, Response } from "express";
import CarModel from "../models/carModel";
import logger from "../logging/config";

class CarModelController {
    public static loadCarModels = async (req: Request, res: Response): Promise<void> => {
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
            res.status(500).send({
                error: error
            })
        }
    }
}

export default CarModelController;