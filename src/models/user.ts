import mongoose from 'mongoose';
interface IUser extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    verified: Boolean,
    active: Boolean
    verifiedAt: Date | null
    createdAt: Date,
    updatedAt: Date | null,
    salt: string,
    isSuperAdmin: Boolean
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: false,
            unique: false,
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        },
        verifiedAt: {
            type: Date,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            required: false,
            default: null
        },
        salt: {
            type: String,
            required: true
        },
        isSuperAdmin: {
            type: Boolean,
            default: false
        }
    }
)

export type {
    IUser
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;