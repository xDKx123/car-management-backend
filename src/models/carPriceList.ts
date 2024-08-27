import mongoose from 'mongoose';
import { ICar } from './car';

interface ICarPriceHistory extends mongoose.Document {
    car: ICar['_id'],
    amount: number,
    description: string,
    validFrom: Date,
    validTo: Date | null,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

const carPriceHistorySchema = new mongoose.Schema<ICarPriceHistory>(
    {
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        validFrom: {
            type: Date,
            required: true
        },
        validTo: {
            type: Date,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: null
        },
        deletedAt: {
            type: Date,
            default: null
        }
    }
)

export type {
    ICarPriceHistory
};

const CarPriceHistory = mongoose.model<ICarPriceHistory>('CarPriceHistory', carPriceHistorySchema);

export default CarPriceHistory;