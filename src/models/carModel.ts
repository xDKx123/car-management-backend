import mongoose from 'mongoose';
import {ICarBrand} from './carBrand';
interface ICarModel extends mongoose.Document {
    name: string,
    brand: ICarBrand['_id']
}

const carModelSchema = new mongoose.Schema<ICarModel>(
    {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CarBrand',
            required: true
        }
    }
)

export type {
    ICarModel
};

const CarModel = mongoose.model<ICarModel>('CarModel', carModelSchema);

export default CarModel;