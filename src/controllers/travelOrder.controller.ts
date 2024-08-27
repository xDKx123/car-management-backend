import { NextFunction, Request, Response } from "express";
import CarQuery from "../database/queries/car.query";
import TravelOrderQuery from "../database/queries/travelOrder.query";
import logger from "../logging/config";
import CarBrand from "../models/carBrand";
import CarModel from "../models/carModel";
import TravelOrder from "../models/travelOrder";
import { getPdfFolder, metersToKilometers } from "../utils/utils";

import fs from 'fs';
import path from "path";
import PDFDocument from 'pdfkit';

class TravelOrderController {
    public static add = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        //const session = await mongoose.startSession();
        //session.startTransaction();

        const dataWithUser = {
            ...data,
            user: req.user._id,
            mileage: metersToKilometers(data.mileage)
        }
        
        try {
            

            const newTravelOrder = await TravelOrderQuery.add(dataWithUser)

            if (!newTravelOrder) {
                res.status(400).send({
                    message: 'Failed to create travel order'
                });
                return;
            }

            const carId = dataWithUser.car;

            const updatedCar = await CarQuery.increaseMileage(carId, dataWithUser.mileage);

            res.status(201).send({
                travelOrder: newTravelOrder,
                updatedCar: updatedCar,
            })
        }
        catch (e) {
            next(e)
        }
    }

    public static load = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)
        
        try {
            const page = data.page;
            const rowsPerPage = data.rowsPerPage;

            let travelOrders = [];
            const allData = await TravelOrder.countDocuments();

            if (page >= 0 && rowsPerPage > 0) {
                //allData = await TravelOrder.countDocuments();
                travelOrders = await TravelOrder.find().sort('id').skip(page * rowsPerPage).limit(rowsPerPage).populate({
                    path: 'car',
                    model: 'Car',
                    populate: {
                        path: 'modelCar',
                        model: CarModel,
                        populate: {
                            path: 'brand',
                            model: CarBrand
                        }
                    }

                }).populate('user').populate('employee');
            }
            else {
                //allData = await TravelOrder.countDocuments();
                travelOrders = await TravelOrder.find().populate({
                    path: 'car',
                    model: 'Car',
                    populate: {
                        path: 'modelCar',
                        model: CarModel,
                        populate: {
                            path: 'brand',
                            model: CarBrand
                        }
                    }

                }).populate('user').populate('employee');
            }



            res.status(200).send({
                travelOrders: travelOrders,
                allData: allData
            });
        }
        catch (e) {
            next(e)
        }
    }

    public static createPdf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        let fileStream: fs.WriteStream | null = null;
        
        try {
            const travelOrder = await TravelOrder.findById(data.id).populate({
                path: 'car',
                model: 'Car',
                populate: {
                    path: 'modelCar',
                    model: CarModel,
                    populate: {
                        path: 'brand',
                        model: CarBrand
                    }
                }

            }).populate('user').populate('employee');

            if (!travelOrder) {
                res.status(400).send({
                    message: 'Travel order not found'
                });
                return;
            }
            


            const doc = new PDFDocument();
            const fileName = travelOrder.id + '.pdf';

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');

            const filePath = path.join(getPdfFolder(), fileName);
            logger.info(filePath);

            fileStream = fs.createWriteStream(filePath);
            doc.pipe(fileStream);

            doc.fontSize(25).text('Travel Order', {
                align: 'center'
            });

            doc.end();

            /*doc.on('end', () => {
                res.download(filePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    fileStream?.destroy(); // delete the file after download
                });
            });*/

            let index = 0;
            while (!fileStream.writableEnded) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                index++;
                if (index > 3) {
                    throw new Error('Error while creating pdf');
                }
            }

            res.download(filePath, (err) => {
                if (err) {
                    logger.error(err);
                }
                fileStream?.destroy(); // delete the file after download
            });
        }
        catch (e) {
            fileStream?.destroy();
            next(e)
        }
    }
}

export default TravelOrderController;