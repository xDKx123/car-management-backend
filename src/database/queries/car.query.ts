import mongoose from "mongoose";
import Car, { ICar } from "../../models/car";

class CarQuery {
    public static add = async (data: Partial<ICar>): Promise<any> => { 
        return await new Car(data).save();
    };

    public static update = async (id: string, data: Partial<ICar>): Promise<any> => { 
        return await Car.findByIdAndUpdate(id, data)
    }

    public static increaseMileage = async (id: string, milage: number, options?: {session?: mongoose.ClientSession}): Promise<any> => {
        /**
         * 1. Find the car by id
         * 2. Increase the milage by the given value
         */

        const car = await Car.findById(id);

        if (!car) {
            throw new Error('Car not found');
        }

        car.km += milage;

        return await car.save({ session: options?.session });
        
    }
}

export default CarQuery;