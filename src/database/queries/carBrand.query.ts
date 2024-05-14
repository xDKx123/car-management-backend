import CarBrand, { ICarBrand } from "../../models/carBrand";

class CarBrandQuery {
    public static async add(data: Partial<ICarBrand>) {
    return await new CarBrand(data).save();
    }
    
    public static async getCarBrand(id: string) {
    return await CarBrand.findById(id);
     }
}

export default CarBrandQuery;