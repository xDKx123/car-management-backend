import mongoose from 'mongoose';
import CarBody from './carBody';

interface IPriceList extends mongoose.Document {
    carType: CarBody,
    amount: number,
    description: string,
    validFrom: Date,
    validTo: Date
}

const priceListSchema = new mongoose.Schema<IPriceList>(
    {
        carType: {
            type: String,
            enum: Object.values(CarBody),
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
            required: true
        }
    }
)

export type {
    IPriceList
};

const PriceList = mongoose.model<IPriceList>('PriceList', priceListSchema);

export default PriceList;