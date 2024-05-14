import { Request, Response } from "express";
import CarBrand from "../models/carBrand";
import logger from "../logging/config";

class CarBrandController {
    public static loadCarBrands = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

    try {
        const carBrands = await CarBrand.find();

        res.status(200).send({
                                 carBrands: carBrands
                             })
    }
    catch (error) {
        res.status(500).send({
                                 error: error
                             })
    }
    }
}

export default CarBrandController;