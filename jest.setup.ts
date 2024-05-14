import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: './.test.env' });

import { closeConnection, connectToDatabase } from './src/database/config';

let server: any;
beforeAll(() => {
    connectToDatabase();

});

afterAll(() => {
    closeConnection();
});