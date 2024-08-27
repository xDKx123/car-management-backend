import mongoose from 'mongoose';

interface IEmployee extends mongoose.Document {
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    street: string,
    postalCode: number,
    city: string,
    birthDate: Date
    birthPlace: string,
    createdAt: Date,
    updatedAt: Date |null,
    deletedAt: Date | null,
}

const employeeSchema = new mongoose.Schema<IEmployee>(
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
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
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
            required: true,
            default: Date.now
        },
        birthPlace: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            required: false,
            default: null
        },
        deletedAt: {
            type: Date,
            required: false,
            default: null
        }
    }
)

export type {
    IEmployee
};

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;