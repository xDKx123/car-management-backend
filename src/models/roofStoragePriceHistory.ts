import mongoose from "mongoose";

interface IRoofStoragePriceHistory extends mongoose.Document {
    amount: number,
    description: string,
    validFrom: Date,
    validTo: Date | null,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

const roofStoragePriceHistorySchema = new mongoose.Schema<IRoofStoragePriceHistory>(
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
    IRoofStoragePriceHistory
};

const RoofStoragePriceHistory = mongoose.model<IRoofStoragePriceHistory>('RoofStoragePriceHistory', roofStoragePriceHistorySchema);
export default RoofStoragePriceHistory;