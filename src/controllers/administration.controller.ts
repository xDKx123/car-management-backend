import { Request, Response } from 'express';
import { CollectionInfo } from 'mongodb';
import mongoose from 'mongoose';
import logger from '../logging/config';

class AdministrationController{
    public static loadMenu = async (req: Request, res: Response): Promise<void> => {
    //fetch all tables from db
    //return all tables as string array

    try {
        logger.info(' (await mongoose.connection.db.listCollections().toArray())', (await mongoose.connection.db.listCollections().toArray()))
    const collections: string [] = (await mongoose.connection.db.listCollections().toArray()).map((collection) => {
        return collection.name;
    });

    res.status(200).send({
                             collections: collections
                         })
    }
        catch (error) {
            res.status(500).send({
                                        error: error
                                    })
        }
    };


    public static loadColumns = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)
    
        try {
            const collectionModel: CollectionInfo | Pick<CollectionInfo, "type" | "name"> | undefined = (await mongoose.connection.db.listCollections().toArray()).find((collection) => collection.name === data.collection);
            logger.info('collectionModel', collectionModel)
            if (!collectionModel) {
                res.status(404).send({
                                         error: 'Collection not found'
                                     })
                return
            }
    
            logger.info('mongoose.modelNames()', mongoose.modelNames())
            //get all mongoose models
            //const model = mongoose.modelNames().find((modelName) => mongoose.model(modelName).collection.name === collectionModel.name);
    
            let model = null
    
            for (const modelName of mongoose.modelNames()) {
                if (mongoose.model(modelName).collection.name === collectionModel.name) {
                    model = modelName
                    break
                }
            }
            
    
            logger.info('model', model)   
    
            if (!model) {
                res.status(404).send({
                                         error: 'Model not found'
                                     })
                return
            }
    
    
            logger.info('mongoose.models[model].schema.paths', mongoose.models[model].schema.paths)
    
            const columns = Object.keys(mongoose.models[model].schema.paths);
            logger.info(columns)
    
    
            const columnsWithInstance = columns.map((column) => {
                return {
                    name: column,
                    type: mongoose.models[model].schema.paths[column].instance,
                    required: mongoose.models[model].schema.paths[column].isRequired,
                    default: mongoose.models[model].schema.paths[column].defaultOptions,
                    unique: mongoose.models[model].schema.paths[column].options.unique,
                    ref: mongoose.models[model].schema.paths[column].options.ref,
    
                }
            })
        
            res.status(200).send({
                                     columns:columnsWithInstance
                                 })
        }
        catch (error) {
            logger.error(error)
            res.status(500).send({
                                     error: error
                                 })
        }
    };


    public static loadTableData = async (req: Request, res: Response): Promise<void> => {
        const data = req.body as {
            collection: string,
            page: number,
            rowsPerPage: number,
        };
    
        logger.info(data)
    
        try {
            const collectionModel: CollectionInfo | Pick<CollectionInfo, "type" | "name"> | undefined = (await mongoose.connection.db.listCollections().toArray()).find((collection) => collection.name === data.collection);
            logger.info('collectionModel', collectionModel)
            if (!collectionModel) {
                res.status(404).send({
                                         error: 'Collection not found'
                                     })
                return
            }
    
            logger.info('mongoose.modelNames()', mongoose.modelNames())
            //get all mongoose models
            //const model = mongoose.modelNames().find((modelName) => mongoose.model(modelName).collection.name === collectionModel.name);
    
            let model = null
    
            for (const modelName of mongoose.modelNames()) {
                if (mongoose.model(modelName).collection.name === collectionModel.name) {
                    model = modelName
                    break
                }
            }
            
    
            logger.info('model', model)   
    
            if (!model) {
                res.status(404).send({
                                         error: 'Model not found'
                                     })
                return
            }
    
            logger.info('page: ' + data.page, 'rowsPerPage: ' + data.rowsPerPage)
    
            let tableData = []
            let allData = 0
            if (data.page >= 0 && data.rowsPerPage >= 0) {
                allData = await mongoose.models[model].countDocuments();
                tableData = await mongoose.models[model].find().sort('id').skip(data.page * data.rowsPerPage)
                    .limit(data.rowsPerPage);
            }
            else {
                allData = await mongoose.models[model].countDocuments();
                tableData = await mongoose.models[model].find().sort('id')
            }
    
            res.status(200).send({
                                     tableData: tableData,
                                     allData: allData
                                 })
        }
        catch (error) {
            logger.error(error)
            res.status(500).send({
                                     error: error
                                 })
        }
    }
}

export default AdministrationController;