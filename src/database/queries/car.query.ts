import Car, { ICar } from "../../models/car";

class CarQuery {
    public static add = async (data: Partial<ICar>): Promise<any> => { 
        return await new Car(data).save();
    };

    public static update = async (id: string, data: Partial<ICar>): Promise<any> => { 
        return await Car.findByIdAndUpdate(id, data)
    }
}

export default CarQuery;