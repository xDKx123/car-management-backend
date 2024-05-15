const express = require('express');
const router = express.Router();

import { Request, Response } from "express";
import AuthMiddleware from "../middleware/auth.middleware";

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


router.get('/environment', AuthMiddleware.authenticate, async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({
        environment: process.env.ENV_TYPE
    });
}
);

export default router;