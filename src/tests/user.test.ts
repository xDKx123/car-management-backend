import UserQuery from "../database/queries/user.query";
import { IUser } from "../models/user";
import { checkIsEmailValid, checkIsValidVin, validateIdNumber } from "../utils/utils";

import '../database/config';
import { comparePassword, concatPasswordAndSalt, generatePasswordSalt, validatePassword } from "../middleware/password";

const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

describe('User', () => {
    it('should return true if the VIN is valid', () => {
        const vin = '1HGCM82633A123456';
        expect(checkIsValidVin(vin)).toBe(true);
    });

    it('should return false if the VIN is invalid', () => {
        const vin = '1HGCM82633A123453';
        expect(checkIsValidVin(vin)).toBe(true);
    });

    it('should return false if the VIN is invalid', () => {
        const vin = '';
        expect(checkIsValidVin(vin)).toBe(false);
    });

    it('should return true if the EMAIL is valid', () => {
        const email = 'test@test.si';
        expect(checkIsEmailValid(email)).toBe(true);
    })

    it('should return false if the EMAIL is not valid', () => {
        const email = 'test@test';
        expect(checkIsEmailValid(email)).toBe(false);
    });

    it('should return false if the EMAIL is not valid', () => {
        const email = 'test@.si';
        expect(checkIsEmailValid(email)).toBe(false);
    });

    it('should return false if the EMAIL is not valid', () => {
        const email = 'test_name@.';
        expect(checkIsEmailValid(email)).toBe(false);
    });

    it('should return false if the EMAIL is not valid', () => {
        const email = '@.';
        expect(checkIsEmailValid(email)).toBe(false);
    });

    it('should return false if the EMAIL is not valid', () => {
        const email = '@test_domain.test';
        expect(checkIsEmailValid(email)).toBe(false);
    });

    it('should return true if the EMAIL is valid', () => {
        const email = '';
        expect(checkIsEmailValid(email)).toBe(false);
    })

    it('should return true if the id number is valid', () => {
        const idNumber = '0101006500006';
        expect(validateIdNumber(idNumber)).toBe(true);
    });

    it('should return false if the id number is invalid', () => {
        const idNumber = '0101006500005';
        expect(validateIdNumber(idNumber)).toBe(false);
    });

    it('should return true if the password is valid', () => {
        const password = 'Test1234!';
        expect(validatePassword(password)).toBe(true);
    });

    it('should return false if the password is invalid', () => {
        const password = 'testsomething';
        expect(validatePassword(password)).toBe(false);
    });

    it('should return false if the password is invalid', () => {
        const password = 'testsomething!';
        expect(validatePassword(password)).toBe(false);
    });

    it('should return false if the password is invalid', () => {
        const password = 'testsomething!123';
        expect(validatePassword(password)).toBe(false);
    });

    it('should return false if the password is invalid', () => {
        const password = '';
        expect(validatePassword(password)).toBe(false);
    });

    it('should check validity of concat function concatPasswordAndSalt', () => {
        const password = 'TestDavid123!';
        const salt = '$2b$10$2qd3kaO9NwWuwML0wsPPru'

        const concatedPassword = concatPasswordAndSalt(password, salt);

        expect(concatedPassword).toBe(concatedPassword);
    });

    it('should check validity of concat function concatPasswordAndSalt', async () => {
        const password = 'TestDavid123!';
        const salt = '$2b$10$2qd3kaO9NwWuwML0wsPPru'

        const concatedPassword = concatPasswordAndSalt(password, salt);

        const comparison = await comparePassword(concatedPassword, '$2b$10$axctyDRLvO/La64mXEfbOeZ1CXVNTkF2SA1YvrEpAjZxjHt8ZjzCm');

        expect(comparison).toBeTruthy();
    });

    it('should generate salt', async () => {
        const salt = await generatePasswordSalt()
        expect(salt).toBeDefined();
    });

    it('should return false if the password is invalid', () => {
        const password = 'Test1234';
        const salt = 'somerandomsalt';
        expect(validatePassword(password)).toBe(false);
    });

    it('should return new user', async () => {
        const salt = await generatePasswordSalt();

        const user: Partial<IUser> = {
            username: 'test2',
            email: 'test2@test.si',
            password: 'Test1234!',
            salt: salt,
        };

        const insertedUser = await UserQuery.addUser(user);

        expect(insertedUser.username).toBe(user.username);
        expect(insertedUser.email).toBe(user.email);
        expect(insertedUser._id).toBeDefined();
        expect(insertedUser.verified).toBe(false);
        expect(insertedUser.verifiedAt).toBeNull();
        expect(insertedUser.active).toBe(true);
        expect(insertedUser.createdAt).toBeDefined();
        expect(insertedUser.updatedAt).toBeNull();
        expect(insertedUser.salt).toBe(user.salt);

        const removedUser = await UserQuery.removeUser(insertedUser.id);
        expect(removedUser).toBeDefined();

        const userById = await UserQuery.getUserById(insertedUser.id);

        expect(userById).toBeNull();
    });
});