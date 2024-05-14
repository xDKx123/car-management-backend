import mongoose from 'mongoose';
import { ICar } from './car';
import { ICustomer } from './customer';

interface IContract extends mongoose.Document {
    name: string,
    customer: ICustomer['_id'],
    car: ICar['_id'],
    returnDate: Date,
    leavingDate: Date
    createAt: Date,
    gps: boolean,
    winterChains: boolean,
    childSeat: boolean,
    additionalDriverId: ICustomer['_id']
    carRoofBox: boolean,
    amount: number,
    updatedAt: Date | null,
    deletedAt: Date | null,
    //images
}

const contractSchema = new mongoose.Schema<IContract>(
    {
        name: {
            type: String,
            required: true
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
            required: true
        },
        returnDate: {
            type: Date,
            required: true
        },
        leavingDate: {
            type: Date,
            required: true
        },
        createAt: {
            type: Date,
            default: Date.now
        },
        gps: {
            type: Boolean,
            default: false
        },
        winterChains: {
            type: Boolean,
            default: false
        },
        childSeat: {
            type: Boolean,
            default: false
        },
        additionalDriverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            default: null,
        },
        carRoofBox: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
            required: true
        },
        updatedAt: {
            type: Date,
            default: null,
            required: false
        },
        deletedAt: {
            type: Date,
            default: null,
            required: false,

        }
    }
)

export type {
    IContract
};

const Contract = mongoose.model<IContract>('Contract', contractSchema);

export default Contract;