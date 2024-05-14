import { NotFoundError } from "../middleware/errors";

enum CarFuel {
    DIESEL = 'DIESEL',
    PETROL = 'PETROL',
    EV = 'EV'
}

const carFuelFromString = (fuel: string): CarFuel => {
    switch (fuel) {
        case 'DIESEL':
            return CarFuel.DIESEL;
        case 'PETROL':
            return CarFuel.PETROL;
        case 'EV':
            return CarFuel.EV;
        default:
            throw new NotFoundError('Fuel not found');
    }
}

export default CarFuel;

export {
    carFuelFromString
}