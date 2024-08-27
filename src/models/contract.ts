import mongoose from 'mongoose';
import { ICar } from './car';
import { ICustomer } from './customer';
import { IGpsPriceHistory } from './gpsPriceHistory';
import { IChildSeatPriceHistory } from './childSeatPriceHistory';
import { IRoofStoragePriceHistory } from './roofStoragePriceHistory';

interface IContract extends mongoose.Document {
    name: string,
    customer: ICustomer['_id'],
    car: ICar['_id'],
    returnDate: Date,
    leavingDate: Date
    createdAt: Date,
    gps: IGpsPriceHistory['_id'] | null,
    winterChains: boolean,
    childSeat: IChildSeatPriceHistory['_id'] | null,
    additionalDriverId: ICustomer['_id'] | null
    carRoofBox: IRoofStoragePriceHistory['_id'] | null,
    amount: number,
    updatedAt: Date | null,
    deletedAt: Date | null,
    discount: number,
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
        createdAt: {
            type: Date,
            default: Date.now
        },
        gps: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GpsPriceHistory',
            default: null,
        },
        winterChains: {
            type: Boolean,
            default: false
        },
        childSeat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChildSeatPriceHistory',
            default: null
        },
        additionalDriverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            default: null,
        },
        carRoofBox: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RoofStoragePriceHistory',
            default: null
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
        },
        discount: {
            type: Number,
            default: 0
        }
    }
)

export type {
    IContract
};

const Contract = mongoose.model<IContract>('Contract', contractSchema);

export default Contract;