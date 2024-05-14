import { NotFoundError } from "../middleware/errors";

enum CarTransmission {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC'
}

const carTransmissionFromString = (transmission: string): CarTransmission => {
    switch (transmission) {
        case 'MANUAL':
            return CarTransmission.MANUAL;
        case 'AUTOMATIC':
            return CarTransmission.AUTOMATIC;
        default:
            throw new NotFoundError('Transmission not found');
    }
}

export default CarTransmission;

export {
    carTransmissionFromString
}