import { NotFoundError } from "../middleware/errors";

enum CarBody {
    SEDAN = 'SEDAN',
    COUPE = 'COUPE',
    CONVERTIBLE = 'CONVERTIBLE',
    HATCHBACK = 'HATCHBACK',
    SUV = 'SUV',
    STATION_WAGON = 'STATION_WAGON',
    MINIVAN = 'MINIVAN',
    PICKUP = 'PICKUP',
    VAN = 'VAN',
    OTHER = 'OTHER'
}

const carBodyFromString = (carBody: string): CarBody => {
    switch (carBody) {
        case 'SEDAN':
            return CarBody.SEDAN;
        case 'COUPE':
            return CarBody.COUPE;
        case 'CONVERTIBLE':
            return CarBody.CONVERTIBLE;
        case 'HATCHBACK':
            return CarBody.HATCHBACK;
        case 'SUV':
            return CarBody.SUV;
        case 'STATION_WAGON':
            return CarBody.STATION_WAGON;
        case 'MINIVAN':
            return CarBody.MINIVAN;
        case 'PICKUP':
            return CarBody.PICKUP;
        case 'VAN':
            return CarBody.VAN;
        case 'OTHER':
            return CarBody.OTHER;
        default:
            throw new NotFoundError('Body type not found');
    }
}

export default CarBody;

export {
    carBodyFromString
}