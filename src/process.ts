import { closeConnection } from "./database/config";
import logger from "./logging/config";

/**
 * Function is used to when the process gets a SIGINT signal (ex. ctrl + c) we close all connections and exit the process
 */
process.on('SIGINT', () => {
    try {
        closeConnection();
        logger.info('Successfully closed all connections');
        process.exit(0);
    }
    catch (error) {
        logger.error(error);
        process.exit(1);
    }
});