import { Request } from "express";
import { checkSchema } from "express-validator";
import UserQuery from "../database/queries/user.query";
import { validatePassword } from "../middleware/password";
import { validateRequest } from "../middleware/validation";
import { checkIsEmailValid } from "../utils/utils";

class UserSchemaValidator {
    public static validateEmail = () => {
        return [
            checkSchema({
                email: {
                    in: ['body'],
                    errorMessage: 'Invalid email',
                    custom: {
                        options: checkIsEmailValid,
                        bail: true
                    }
                }
            }),
            validateRequest
        ]
    };

    public static changePassword = () => {
        return [
            checkSchema({
                id: {
                    in: ['body'],
                    errorMessage: 'Invalid id',
                    isNumeric: true,
                },
                oldPassword: {
                    in: ['body'],
                    errorMessage: 'Invalid password',
                    custom: {
                        options: (value: string) => {
                            return value.length > 0;
                        },
                        bail: true
                    }
                },
                newPassword: {
                    in: ['body'],
                    errorMessage: 'Invalid password',
                    custom: {
                        options: validatePassword,
                        bail: true
                    }
                },
                confirmNewPassword: {
                    in: ['body'],
                    errorMessage: 'Passwords do not match',
                    custom: {
                        options: (value: string, { req }) => {
                            return value === req.body.newPassword;
                        },
                        bail: true,
                    }
                }
            }),
            validateRequest
        ]
    };

    public static getById = () => {
        return [
            checkSchema({
                id: {
                    in: ['body'],
                    errorMessage: 'Invalid id',
                    isNumeric: true
                }
            }),
            validateRequest
        ]
    }

    public static create = () => {
        return [
            checkSchema({
                username: {
                    in: 'body',
                    custom: {
                        options: async (value: string) => {
                            const user = await UserQuery.getUserByUsername(value);

                            return !user;
                        },
                        errorMessage: 'Username exists',
                    }
                },
                email: {
                    in: 'body',
                    custom: {
                        options: async (value: string) => {
                            const user = await UserQuery.getUserByEmail(value);

                            return !user;
                         },
                        errorMessage: 'Invalid email',
                    }
                },
                password: {
                    in: 'body',
                    custom: {
                        options: validatePassword,
                        errorMessage: 'Password does not meet requirements',
                        bail: true
                    }
                },
                validatePassword: {
                    in: 'body',
                    custom: {
                        options: (value: string, { req }: {req: Partial<Request>}) => {
                            return value === req.body.password;
                        },
                        errorMessage: 'Passwords do not match',
                        bail: true,
                    }
                }
            }),
            validateRequest
        ]
    }

    public static createSuperAdmin = () => {
                return [
            checkSchema({
                username: {
                    in: 'body',
                    custom: {
                        options: async (value: string) => {
                            const user = await UserQuery.getUserByUsername(value);

                            return !user;
                        },
                        errorMessage: 'Username exists',
                    }
                },
                password: {
                    in: 'body',
                    custom: {
                        options: async (value: string) => {
                            return value.length > 0;
                        },
                        errorMessage: 'Password does not meet requirements',
                        bail: true
                    }
                },
                validatePassword: {
                    in: 'body',
                    custom: {
                        options: (value: string, { req }: {req: Partial<Request>}) => {
                            return value === req.body.password;
                        },
                        errorMessage: 'Passwords do not match',
                        bail: true,
                    }
                }
            }),
            validateRequest
        ]
    }
}

export default UserSchemaValidator