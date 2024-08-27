import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import logger from '../logging/config';
import { v4 } from 'uuid';

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

    public static requestId = (req: Request, res: Response, next: NextFunction) => {
        const requestId = AuthMiddleware.generateRequestId();
        res.set('X-Request-Id', requestId);
        next();
     }

    /**
     * 
     * @param email we are only using users email to generate the token
     * @param secret the secret key to sign the token
     * @param expiresIn the time the token will expire in milliseconds
     * @returns 
     */
    public static generateToken = (email: string, secret: string, expiresIn: number): string => {
        const accessToken = jwt.sign({ email: email }, secret, { expiresIn: expiresIn });

        return accessToken;
    }

    public static generateRequestId = (): string => {
        const requestId: string = v4();
        return requestId;
     };
}

export default AuthMiddleware;