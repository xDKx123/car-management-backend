const express = require('express');
const router = express.Router();

import { Request, Response } from "express";

router.get('/', async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({
        message: 'Welcome to the API'
    });
});

router.get('/ping', async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({
        pong: 'pong'
    });
});

export default router;