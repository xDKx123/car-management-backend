import mongoose from 'mongoose';
import { IContract } from './contract';

interface IInvoice extends mongoose.Document {
    contract: IContract['_id']
    createdAt: Date,
    paidAt: Date
    paidWith: string,
}

const invoiceSchema = new mongoose.Schema<IInvoice>(
    {
        contract: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contract',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        paidAt: {
            type: Date,
            default: null
        },
        paidWith: {
            type: String,
            default: null
        }
    }
)

export type {
    IInvoice
};

const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema);

export default Invoice;