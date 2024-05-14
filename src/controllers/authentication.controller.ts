import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import AuthMiddleware from '../middleware/auth.middleware';
import User from "../models/user";
import logger from '../logging/config';
import { comparePassword, validatePassword, concatPasswordAndSalt } from '../middleware/password';
import { UnauthorizedError } from '../middleware/errors';



class AuthenticationController {
    public static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data.username, data.password)

        try {
            // Find the user by username
            const user = await User.findOne({
                $or: [
                    { username: data.username },
                    { email: data.username }
                ]
            });

            if (!user) {
                throw new UnauthorizedError('InvalidCredentials', 'Invalid credentials');
            }
            else {
                // Compare the provided password with the hashed password in the database
                const passwordMatch = await comparePassword(concatPasswordAndSalt(data.password, user.salt), user.password)

                if (passwordMatch) {
                    const accessToken = AuthMiddleware.generateToken(user.email, process.env.ACCESS_TOKEN_SECRET as string, Number(process.env.ACCESS_TOKEN_EXPIRES_IN as string));
                    const refreshToken = AuthMiddleware.generateToken(user.email, process.env.REFRESH_TOKEN_SECRET as string, Number(process.env.REFRESH_TOKEN_EXPIRES_IN as string));


                    res.status(200).send({
                        user: user,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                }
                else {
                    throw new UnauthorizedError('InvalidCredentials', 'Invalid credentials');
                }
            }
        }
        catch (error: unknown) {
            next(error);
        }
    }

    public static refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const accessToken = AuthMiddleware.generateToken(req.user.email, process.env.ACCESS_TOKEN_SECRET as string, Number(process.env.ACCESS_TOKEN_EXPIRES_IN as string));
            const refreshToken = AuthMiddleware.generateToken(req.user.email, process.env.REFRESH_TOKEN_SECRET as string, Number(process.env.REFRESH_TOKEN_EXPIRES_IN as string));

            res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (error) {
            next(error);
        }
    }


    public static validatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        if (!data.password) {
            res.status(400).send({
                error: 'Password is required'
            })
            return
        }

        try {
            res.status(200).send({
                isValid: validatePassword(data.password)
            })
        }
        catch (error) {
            next(error)
        }
    }
}

export default AuthenticationController;