import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import logger from "../logging/config";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: Result<ValidationError> = validationResult(req);

        if (!result.isEmpty()) {
            const errors = result.array().map((error: ValidationError) => error.msg);
            return res.status(400).json({ errors: errors });
        }

        next()
    } catch (error) {
        next(error)
    }
}

export {
    validateRequest
}