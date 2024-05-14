
import mongoose, { Connection } from "mongoose";
import logger from "../logging/config";

mongoose.connect(process.env.MONGO_DB_URL!).then(() => {
    logger.info('Connected to the database', process.env.MONGO_DB_URL);
}).catch((error) => {
    logger.error('Error connecting to the database');
    logger.error(error);
    throw error;
})

mongoose.connection.on('error', (error) => {
    logger.error('Error connecting to the database');
    logger.error(error);
    throw error;
})