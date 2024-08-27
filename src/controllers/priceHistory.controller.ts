import { NextFunction, Request, Response } from "express";
import ChildSeatPriceHistory, { IChildSeatPriceHistory } from "../models/childSeatPriceHistory";
import GpsPriceHistory, { IGpsPriceHistory } from "../models/gpsPriceHistory";
import RoofStoragePriceHistory, { IRoofStoragePriceHistory } from "../models/roofStoragePriceHistory";

class PriceHistoryController {
    public static getGpsLatestPrice = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            /*const newGpsPrice: Partial<IGpsPriceHistory> = {
                amount: 15,
                description: 'GPS price',
                validFrom: new Date(),
                validTo: null
            };

            const gpsPrice = new GpsPriceHistory(newGpsPrice);
            await gpsPrice.save();*/


            //const gpsLatestPrice = await GpsPriceHistory.find().where('validTo').equals(null).sort({ validFrom: -1 }).limit(1);
            //use find one
            const gpsLatestPrice = await GpsPriceHistory.findOne().where('validTo').equals(null).sort({ validFrom: -1 });

            res.status(200).send({
                gpsLatestPrice: gpsLatestPrice
            });
        }
        catch (e) {
            next(e)
        }
    }

    public static addGpsPrice = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            //find the latest price and set validTo to now
            const now = new Date();

            const gpsLatestPrice = await GpsPriceHistory.findOne().where('validTo').equals(null);
            if (gpsLatestPrice) {
                gpsLatestPrice.validTo = now;
                await gpsLatestPrice.save();
            }

            const newGpsPrice: Partial<IGpsPriceHistory> = {
                amount: req.body.amount,
                description: req.body.description,
                validFrom: now,
                validTo: null
            };

            const gpsPrice = new GpsPriceHistory(newGpsPrice);
            await gpsPrice.save();

            res.status(200).send({
                message: 'GPS price added successfully'
            });
        }
        catch (e) {
            next(e)
        }
    }

    public static getChildSeatLatestPrice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            /*const newGpsPrice: Partial<IChildSeatPriceHistory> = {
                amount: 10,
                description: 'Child seat price',
                validFrom: new Date(),
                validTo: null
            };

            const gpsPrice = new ChildSeatPriceHistory(newGpsPrice);
            await gpsPrice.save();*/

            const childSeatLatestPrice = await ChildSeatPriceHistory.findOne().where('validTo').equals(null).sort({ validFrom: -1 });

            res.status(200).send({
                childSeatLatestPrice: childSeatLatestPrice
            });
        }
        catch (e) {
            next(e)
        }
    }

    public static addChildSeatPrice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //find the latest price and set validTo to now
            const now = new Date();

            const childSeatLatestPrice = await ChildSeatPriceHistory.findOne().where('validTo').equals(null);
            if (childSeatLatestPrice) {
                childSeatLatestPrice.validTo = now;
                await childSeatLatestPrice.save();
            }

            const newChildSeatPrice: Partial<IChildSeatPriceHistory> = {
                amount: req.body.amount,
                description: req.body.description,
                validFrom: now,
                validTo: null
            };

            const childSeatPrice = new GpsPriceHistory(newChildSeatPrice);
            await childSeatPrice.save();

            res.status(200).send({
                message: 'Child seat price added successfully'
            });
        }
        catch (e) {
            next(e)
        }
    }

    public static getRoofStorageLatestPrice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            /*const newGpsPrice: Partial<IRoofStoragePriceHistory> = {
                amount: 11,
                description: 'Roof storage price',
                validFrom: new Date(),
                validTo: null
            };

            const gpsPrice = new RoofStoragePriceHistory(newGpsPrice);
            await gpsPrice.save();*/

            const roofStorageLatestPrice = await RoofStoragePriceHistory.findOne().where('validTo').equals(null).sort({ validFrom: -1 });

            res.status(200).send({
                roofStorageLatestPrice: roofStorageLatestPrice
            });
        }
        catch (e) {
            next(e)
        }
    }

    public static addRoofStoragePrice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //find the latest price and set validTo to now
            const now = new Date();

            const roofStorageLatestPrice = await ChildSeatPriceHistory.findOne().where('validTo').equals(null);
            if (roofStorageLatestPrice) {
                roofStorageLatestPrice.validTo = now;
                await roofStorageLatestPrice.save();
            }

            const newRoofStoragePrice: Partial<IChildSeatPriceHistory> = {
                amount: req.body.amount,
                description: req.body.description,
                validFrom: now,
                validTo: null
            };

            const roofStoragePrice = new GpsPriceHistory(newRoofStoragePrice);
            await roofStoragePrice.save();

            res.status(200).send({
                message: 'Roof storage price added successfully'
            });
        }
        catch (e) {
            next(e)
        }
    }
}

export default PriceHistoryController;