import mongoose from 'mongoose';
interface ICarBrand extends mongoose.Document {
    name: string,
}

const carBrandSchema = new mongoose.Schema<ICarBrand>(
    {
        name: {
            type: String,
            required: true,
            default: ''
        }
    }
)

export type {
    ICarBrand as CarBrand
};

const CarBrand = mongoose.model<ICarBrand>('CarBrand', carBrandSchema);

export default CarBrand;