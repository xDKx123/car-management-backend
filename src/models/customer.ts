import mongoose from 'mongoose';

interface ICustomer extends mongoose.Document {
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    isLegalPerson: boolean,
    idNumber: string,
    idValidFrom: Date,
    idValidTo: Date,
    drivingLicenseNumber: string,
    drivingLicenseValidFrom: Date,
    drivingLicenseValidTo: Date,
    street: string,
    postalCode: number,
    city: string,
    birthDate: Date
    birthPlace: string
}

const customerSchema = new mongoose.Schema<ICustomer>(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        isLegalPerson: {
            type: Boolean,
            required: true,
            default: false
        },
        idNumber: {
            type: String,
            required: true
        },
        idValidFrom: {
            type: Date,
            required: true
        },
        idValidTo: {
            type: Date,
            required: true
        },
        drivingLicenseNumber: {
            type: String,
            required: true
        },
        drivingLicenseValidFrom: {
            type: Date,
            required: true
        },
        drivingLicenseValidTo: {
            type: Date,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        },
        birthPlace: {
            type: String,
            required: true
        }
    }
)

export type {
    ICustomer
};

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;