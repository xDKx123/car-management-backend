import mongoose from 'mongoose';
import { ICar } from './car';
import { IUser } from './user';
import { IEmployee } from './employee';

interface ITravelOrder extends mongoose.Document {
    car: ICar['_id']
    user: IUser['_id']
    employee: IEmployee['_id']
    latStart: Number,
    lngStart: Number,
    latEnd: Number,
    lngEnd: Number,
    mileage: Number,
    priceOfRefuel: Number,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

const travelOrderSchema = new mongoose.Schema<ITravelOrder>(
    {
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
        latStart: { type: Number, required: true },
        lngStart: { type: Number, required: true },
        latEnd: { type: Number, required: true },
        lngEnd: { type: Number, required: true },
        mileage: { type: Number, required: true },
        priceOfRefuel: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false, default: null },
        deletedAt: { type: Date, default: null }
    }
)

export type {
    ITravelOrder
};

const TravelOrder = mongoose.model<ITravelOrder>('TravelOrder', travelOrderSchema);

export default TravelOrder;