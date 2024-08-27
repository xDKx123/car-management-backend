import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { checkIsEmailValid, validateIdNumber } from '../utils/utils';
import UserQuery from '../database/queries/user.query';
import logger from '../logging/config';
import { validationResult } from 'express-validator';
import { concatPasswordAndSalt, encodePassword, generatePasswordSalt } from '../middleware/password';

class UserController {
    public static validateEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        try {

            res.status(200).send({
                isValid: true
            })

            return
        }
        catch (error) {
            next(error)
        }
    }


    public static validatePhoneNumber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        if (!data.phoneNumber) {
            res.status(400).send({
                error: 'Phone number is required'
            })
            return
        }

        try {
            // Phone number validation regex
            const phoneNumberRegex = /^\d{9}$/;

            res.status(200).send({
                isValid: phoneNumberRegex.test(data.phoneNumber)
            })
        }
        catch (error) {
            next(error)
        }
    }

    public static validateIdNumber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        if (!data.idNumber) {
            res.status(400).send({
                error: 'Id number is required'
            })
            return
        }

        try {
            res.status(200).send({
                isValid: validateIdNumber(data.idNumber)
            })
        }
        catch (error) {
            next(error)
        }
    };


    public static changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        if (!data.id || !data.oldPassword || !data.newPassword || !data.confirmNewPassword) {
            res.status(400).send({
                error: 'Id and password are required'
            })
            return
        }

        try {
            const salt = await generatePasswordSalt();

            const encodedPassword = await encodePassword(data.newPassword + salt);

            await User.updateOne({ _id: data.id }, { password: encodedPassword });

            res.status(200).send({
                success: true
            });
            return
        }
        catch (error) {
            next(error)
        }
    }


    public static userById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        const data = req.body;

        logger.info(data)

        try {
            const user = await User.findById(data.id);

            res.status(200).send({
                user: user
            })
        }
        catch (error) {
            next(error)
        }
    }

    public static checkIfEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        const user = await UserQuery.getUserByEmail(data.email);

        try {
            if (user) {
                res.status(409).send({
                    isValid: false
                })

                return
            }
            res.status(200).send({
                isValid: true
            })

            return
        }
        catch (error: any) {
            next(error)
        }
    }
    public static current = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const user = req.user;

            res.status(200).send({
                user: user
            })

            return
        }
        catch (error) {
            next(error)
        }
    }

    public static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const salt = await generatePasswordSalt();

            const combinedPassword = concatPasswordAndSalt(data.password, salt);

            const encodedPassword = await encodePassword(combinedPassword);

            const userData: Partial<IUser> = {
                username: data.username,
                email: data.email,
                password: encodedPassword,
                salt: salt,
            }

            const user = await UserQuery.addUser(userData);

            res.status(200).send({
                user: user
            })

            return
        }
        catch (error) {
            next(error)
        }
    };

    public static createSuperAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const salt = await generatePasswordSalt();

            const combinedPassword = concatPasswordAndSalt(data.password, salt);

            const encodedPassword = await encodePassword(combinedPassword);

            const userData: Partial<IUser> = {
                username: data.username,
                password: encodedPassword,
                salt: salt,
                isSuperAdmin: true,
            }

            const user = await UserQuery.addUser(userData);

            res.status(200).send({
                user: user
            })

            return
        }
        catch (error) {
            next(error)
        }
    };
}

export default UserController;