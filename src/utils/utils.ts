import path from "path";
import logger from "../logging/config";

const checkIsEmailValid = (email: string): boolean => {
    if (!email) {
        return false;
    }

    if (typeof email !== 'string') {
        return false;
    }

    if (email.length > 254) {   //By standard, email can be up to 254 characters long
        return false;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

}

const checkIsValidVin = (vin: string): boolean => {
    const regex: RegExp = /^[A-HJ-NPR-Z0-9]{17}$/;
    return regex.test(vin);
}

const validateIdNumber = (idNumber: string): boolean => {
    if (!idNumber || idNumber.length !== 13 || isNaN(Number(idNumber))) {
        logger.info('input validation failed')
        return false;
    }

    let emsoSum = 0;
    for (let i = 7; i > 1; i--) {
        emsoSum += i * (Number(idNumber.charAt(7 - i)) + Number(idNumber.charAt(13 - i)));
    }

    const controlDigit = emsoSum % 11 == 0 ? 0 : 11 - (emsoSum % 11);

    let isValid = idNumber.charAt(12) === controlDigit.toString()

    return isValid;
};

const metersToKilometers = (meters: number): number => {
    return meters / 1000;
}

const getPdfFolder = (): string => { 
    return path.join(__dirname, '..', 'fileStorage');
};

export {
    checkIsEmailValid,
    checkIsValidVin,
    validateIdNumber,
    metersToKilometers,
    getPdfFolder
};
