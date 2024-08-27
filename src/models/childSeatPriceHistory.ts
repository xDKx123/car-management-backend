import mongoose from "mongoose";

interface IChildSeatPriceHistory extends mongoose.Document {
    amount: number,
    description: string,
    validFrom: Date,
    validTo: Date | null
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

const childSeatPriceHistorySchema = new mongoose.Schema<IChildSeatPriceHistory>(
    {
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
    IChildSeatPriceHistory
};

const ChildSeatPriceHistory = mongoose.model<IChildSeatPriceHistory>('ChildSeatPriceHistory', childSeatPriceHistorySchema);
export default ChildSeatPriceHistory;