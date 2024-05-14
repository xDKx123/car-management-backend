import cors from 'cors';
import express, {
    Express,
    NextFunction,
    Request,
    Response
} from 'express';
import './process';

require('dotenv').config();

import { connectToDatabase } from './database/config';

try {
    connectToDatabase();
}
catch (error) {
    logger.error(error);
    process.exit(1);
}


import path from 'path';
import administrationRouter from './routes/administration.router';
import authRouter from './routes/auth.router';
import carRouter from './routes/car.router';
import carBrandRouter from './routes/carBrand.router';
import carModelRouter from './routes/carModel.router';
import contractRouter from './routes/contract.router';
import customerRouter from './routes/customer.router';
import userRouter from './routes/user.router';
import utilityRouter from './routes/utility.router';
import logger from './logging/config';
import ErrorMiddleware from './middleware/error.middleware';

const app: Express = express();
app.use(cors())
// parse application/json
app.use(express.json());


const customizeResponse = (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function (data) {
        let modifiedResponse = {
            data: data,
            status: res.statusCode,
            error: ''
        }

        if (res.statusCode !== 200) {
            modifiedResponse.error = data;
        }

        return originalSend.call(this, modifiedResponse);
    };

    next();
};
//app.use(customizeResponse);

app.use('/administration', administrationRouter);
app.use('/auth', authRouter);
app.use('/car', carRouter);
app.use('/carBrand', carBrandRouter);
app.use('/carModel', carModelRouter);
app.use('/contract', contractRouter);
app.use('/customer', customerRouter);
app.use('/user', userRouter);
app.use(utilityRouter);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(ErrorMiddleware.logError);
app.use(ErrorMiddleware.handle);
//https://stackoverflow.com/questions/26818071/mongoose-schema-hasnt-been-registered-for-model

app.listen(process.env.BACKEND_PORT!, () => {
    logger.info(`Example app listening at http://localhost:${process.env.BACKEND_PORT}`);
});