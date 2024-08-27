import { NextFunction, Request, Response } from "express";
import logger from "../logging/config";
import { BaseError } from "./errors";

class ErrorMiddleware {
    public static logError(err: Error, req: Request, res: Response, next: NextFunction): void {
        if (err instanceof BaseError) {
            //log requestId from res headers
            logger.error({ requestId: res.get('X-Request-Id'), error: err.toObject() });
        }
        else {
            logger.error(err.message);
        }
        next(err);
    };

    public static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        if (err instanceof BaseError) {
            res.status(err.status).send(err.toResponse());
        } else {
            res.status(500).send({
                error: {
                    status: 500,
                    error: {
                        code: 'InternalServerError',
                        message: 'An internal server error occurred',
                    },
                },
            });
        }
    }
}

export default ErrorMiddleware;