import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import AuthMiddleware from '../middleware/auth.middleware';
import User from "../models/user";
import logger from '../logging/config';
import { comparePassword, validatePassword, concatPasswordAndSalt } from '../middleware/password';



class AuthenticationController {
    public static login = async (req: Request, res: Response): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            // Find the user by username
            const user = await User.findOne({
                $or: [
                    { username: data.username },
                    { email: data.username }
                ]
            });

            if (!user) {
                res.status(401).send('Invalid credentials');
            }
            else {
                // Compare the provided password with the hashed password in the database
                const passwordMatch = await comparePassword(concatPasswordAndSalt(data.password, user.salt), user.password)

                if (passwordMatch) {
                    const accessToken = AuthMiddleware.generateAccessToken(user.email);
                    const refreshToken = AuthMiddleware.generateRefreshToken(user.email);

                    res.status(200).send({
                        user: user,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                }
                else {
                    res.status(401).send('Invalid credentials');
                }
            }
        }
        catch (error) {
            res.status(500).send('An error occurred');
        }
    }

    public static refreshToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const accessToken = AuthMiddleware.generateAccessToken(req.user.email);
            const refreshToken = AuthMiddleware.generateRefreshToken(req.user.email);

            res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }


    public static validatePassword = async (req: Request, res: Response): Promise<void> => {
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
            res.status(500).send({
                error: error
            })
        }
    }
}

export default AuthenticationController;