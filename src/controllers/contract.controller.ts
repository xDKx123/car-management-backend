import { NextFunction, Request, Response } from "express";
import SendGrid, { AttachmentData } from "../core/sendgrid";
import logger from "../logging/config";
import Car from "../models/car";
import CarBrand from "../models/carBrand";
import CarModel from "../models/carModel";
import Contract from "../models/contract";
import Customer from "../models/customer"; 

import fs from 'fs';
import path from "path";
import PDFDocument from 'pdfkit';
import { getPdfFolder } from "../utils/utils";

class ContractController {
    public static loadContractsLeavingToday = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            next(error)
        }
    }

    public static loadContractsReturningToday = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            next(error)
        }
    }

    public static loadContracts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            next(error)
        }
    }

    public static addContract = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
                returnDate: contractData.returnDate,
                gps: contractData.gpsId,
                winterChains: contractData.winterChains,
                childSeat: contractData.childSeatId,
                additionalDriverId: contractData.additionalDriverId,
                carRoofBox: contractData.carRoofBoxId,
                amount: contractData.amount,
                discount: contractData.discount,
            })

            const contract = await newContract.save();

            const customer = await Customer.findById(contractData.customerId);

            if (!customer || !customer.email) {
                res.status(500).send({
                    error: 'No customer found'
                })
                return;
            }

            const pdf = await ContractController.createPdf(contract);

            const attachment: AttachmentData[] = [
                {
                    content: pdf,
                    filename: 'contract.pdf',
                    type: 'application/pdf',
                    disposition: 'attachment',
                }
            ]

            const mail = new SendGrid({
                to: customer?.email,
                from: 'dejvidkovac@gmail.com',
                subject: 'Contract' + contract.createdAt.toDateString(),
                text: 'New contract created',
                attachments: attachment
            });

            mail.sendEmail().then(() => {
                logger.info('Email sent successfully')
            }).catch((error) => {
                logger.error('Error sending email:', error);
            });


            res.status(200).send({
                contract: newContract
            });
        }
        catch (error) {
            next(error)
        }
    }

    private static createPdf = async (contract: any) => {
        const doc = new PDFDocument();
        const fileName = contract.id + '.pdf';

        const filePath = path.join(getPdfFolder(), fileName);
        logger.info(filePath);

        const fileStream = fs.createWriteStream(filePath);
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

        // read file and cast it to base64
        const file = fs.readFileSync(filePath).toString('base64');

        return file;
    }
}

export default ContractController;