import cors from 'cors';
import express, {
    Express
} from 'express';
import './logging/config';
import './process';

require('dotenv').config();

import { connectToDatabase } from './database/config';

try {
    connectToDatabase();
}
catch (error) {
    //logger.error(error);
    console.log(error)
    process.exit(1);
}


import path from 'path';
import logger from './logging/config';
import AuthMiddleware from './middleware/auth.middleware';
import ErrorMiddleware from './middleware/error.middleware';
import administrationRouter from './routes/administration.router';
import authRouter from './routes/auth.router';
import carRouter from './routes/car.router';
import carBrandRouter from './routes/carBrand.router';
import carModelRouter from './routes/carModel.router';
import contractRouter from './routes/contract.router';
import customerRouter from './routes/customer.router';
import employeeRouter from './routes/employee.router';
import fuelRouter from './routes/fuel.router';
import travelOrderRouter from './routes/travelOrder.router';
import userRouter from './routes/user.router';
import utilityRouter from './routes/utility.router';
import priceRouter from './routes/price.router';

const app: Express = express();
app.use(cors())
// parse application/json
app.use(express.json());

app.use(AuthMiddleware.requestId);

app.use('/administration', administrationRouter);
app.use('/auth', authRouter);
app.use('/car', carRouter);
app.use('/carBrand', carBrandRouter);
app.use('/carModel', carModelRouter);
app.use('/contract', contractRouter);
app.use('/customer', customerRouter);
app.use('/user', userRouter);
app.use('/fuel', fuelRouter);
app.use('/employee', employeeRouter);
app.use('/travelOrder', travelOrderRouter);
app.use('/price', priceRouter)
app.use(utilityRouter);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(ErrorMiddleware.logError);
app.use(ErrorMiddleware.handle);
//https://stackoverflow.com/questions/26818071/mongoose-schema-hasnt-been-registered-for-model

app.listen(Number(process.env.BACKEND_PORT)!, 'localhost', () => {
    logger.info(`Example app listening at http://${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`);
});