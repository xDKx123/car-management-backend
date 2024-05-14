import CarModel, { ICarModel } from "../../models/carModel";

class CarModelQuery {
    public static add = async (data: Partial<ICarModel>) => { 
        return await new CarModel(data).save();
    }
}

export default CarModelQuery;