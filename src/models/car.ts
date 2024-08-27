import mongoose from 'mongoose';
import CarBody from './carBody';
import CarFuel from './carFuel';
import { ICarModel } from './carModel';
import CarTransmission from './carTransmission';


interface ICar extends mongoose.Document {
    modelCar: ICarModel['_id'],
    vin: string,
    registrationPlate: string,
    km: number,
    isFree: Boolean,
    fuel: CarFuel,
    bodyType: CarBody,
    transmission: CarTransmission,
    fuelCapacity: number,
    description: string,
    year: number,
    kw: number
    ccm: number,
    colorExterior: string,
    colorInterior: string,
    numberOfDoors: number,
    numberOfSeats: number,
    fourWheelDrive: Boolean,
    heatedSeatsFront: Boolean,
    heatedSeatsRear: Boolean,
    heatedSteeringWheel: Boolean,
    airConditioning: Boolean,
    cruiseControl: Boolean,
    adaptiveCruiseControl: Boolean,
    webasto: Boolean,
    androidAuto: Boolean,
    appleCarPlay: Boolean,
    dabRadio: Boolean,
    isoFix: Boolean,
    pdcFront: Boolean,
    pdcBack: Boolean,
    rearCamera: Boolean,
    towHook: Boolean,
    deletedAt: Date | null
    createdAt: Date,
    updatedAt: Date,
    fuelConsumption: number
}

const carSchema = new mongoose.Schema<ICar>(
    {
        modelCar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CarModel',
            required: true,
        },
        vin: {
            type: String,
            required: true,
            default: '00000000000000000'
        },
        registrationPlate: {
            type: String,
            required: true,
            default: 'AA000AA'
        },
        km: {
            type: Number,
            required: true,
            default: 0

        },
        isFree: {
            type: Boolean,
            default: false
        },
        fuel: {
            type: String,
            enum: Object.values(CarFuel),
            default: CarFuel.PETROL
        },
        bodyType: {
            type: String,
            enum: Object.values(CarBody),
            default: CarBody.SEDAN
        },
        transmission: {
            type: String,
            enum: Object.values(CarTransmission),
            default: CarTransmission.MANUAL
        },
        fuelCapacity: {
            type: Number,
            default: 50

        },
        description: {
            type: String,
            default: ''

        },
        year: {
            type: Number,
            required: true,
            default: 2021
        },
        kw: {
            type: Number,
            required: true,
            default: 100
        },
        ccm: {
            type: Number,
            required: true,
            default: 1000
        },
        colorExterior: {
            type: String,
            default: 'black'
        },
        colorInterior: {
            type: String,
            default: 'black'
        },
        numberOfDoors: {
            type: Number,
            required: true,
            default: 4
        },
        numberOfSeats: {
            type: Number,
            required: true,
            default: 5
        },
        fourWheelDrive: {
            type: Boolean,
            default: false
        },
        heatedSeatsFront: {
            type: Boolean,
            default: false
        },
        heatedSeatsRear: {
            type: Boolean,
            default: false
        },
        heatedSteeringWheel: {
            type: Boolean,
            default: false
        },
        airConditioning: {
            type: Boolean,
            default: false
        },
        cruiseControl: {
            type: Boolean,
            default: false
        },
        adaptiveCruiseControl: {
            type: Boolean,
            default: false
        },
        webasto: {
            type: Boolean,
            default: false
        },
        androidAuto: {
            type: Boolean,
            default: false
        },
        appleCarPlay: {
            type: Boolean,
            default: false
        },
        dabRadio: {
            type: Boolean,
            default: false
        },
        isoFix: {
            type: Boolean,
            default: false
        },
        pdcFront: {
            type: Boolean,
            default: false
        },
        pdcBack: {
            type: Boolean,
            default: false
        },
        rearCamera: {
            type: Boolean,
            default: false
        },
        towHook: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            required: false,
            default: null
        },
        fuelConsumption: {
            type: Number,
            required: true,
            default: 0
        }
    }
)

export type {
    ICar
};

const Car = mongoose.model<ICar>('Car', carSchema);

export default Car