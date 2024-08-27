import mongoose from "mongoose";

interface IGpsPriceHistory extends mongoose.Document {
    amount: number,
    description: string,
    validFrom: Date,
    validTo: Date | null
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

const gpsPriceHistorySchema = new mongoose.Schema<IGpsPriceHistory>(
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
    IGpsPriceHistory
};

const GpsPriceHistory = mongoose.model<IGpsPriceHistory>('GpsPriceHistory', gpsPriceHistorySchema);
export default GpsPriceHistory;