import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import logger from '../logging/config';

class AuthMiddleware {
    public static authenticate = (req: Request, res: Response, next: NextFunction) => {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

        if (!token) {
            return res.status(401).send({ message: 'Token is required' });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err: any, decoded: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const decodedUser = await User.findOne({ email: decoded.email });

                logger.info(decodedUser);

                if (!decodedUser) {
                    return res.sendStatus(403);
                }

                //ts-ignore
                req.user = decodedUser;
                next();
            }
            catch (error) {
                return res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    };

    public static authenticateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

        if (!token) {
            return res.status(401).send({ message: 'Token is required' });
        }

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, async (err: any, decoded: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const decodedUser = await User.findOne({ email: decoded.email });

                logger.info(decodedUser);

                if (!decodedUser) {
                    return res.sendStatus(403);
                }

                req.user = decodedUser;
                next();
            }
            catch (error) {
                return res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    };

    public static generateAccessToken = (email: string): string => {
        const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

        return accessToken;
    }

    public static generateRefreshToken = (email: string): string => {
        const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

        return refreshToken;
    }

}

export default AuthMiddleware;