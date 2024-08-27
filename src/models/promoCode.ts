import mongoose from 'mongoose';
import { IContract } from './contract';

interface IPromoCode extends mongoose.Document {
    discount: number,
    code: string,
    isUsed: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    validFrom: Date
    validUntil: Date
    usedAt: Date | null
    usedBy: IContract['_id'] | null
    deletedAt: Date | null
}

const promoCodeSchema = new mongoose.Schema<IPromoCode>(
    {
        discount: {
            type: Number,
            required: true,
            range: [1, 99]
        },
        code: {
            type: String,
            required: true,
            unique: true,
            minlength: [4, 'The value of `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).']
        },
        isUsed: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        validFrom: {
            type: Date,
            required: true
        },
        validUntil: {
            type: Date,
            required: true
        },
        usedAt: {
            type: Date,
            default: null
        },
        usedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contract',
            default: null
        },
        deletedAt: {
            type: Date,
            default: null
        }

    }
)

export type {
    IPromoCode
};

const PromoCode = mongoose.model<IPromoCode>('PromoCode', promoCodeSchema);

export default PromoCode;