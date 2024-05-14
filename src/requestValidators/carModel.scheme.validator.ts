import { checkSchema } from "express-validator"
import CarBrandQuery from "../database/queries/carBrand.query";
import { validateRequest } from "../middleware/validation";

class CarModelSchemeValidator {
    public static addCarModel = () => {
        return [
            checkSchema({
                brandId: {
                    in: ['body'],
                    custom: {
                        options: (value) => {
                            const carBrand = CarBrandQuery.getCarBrand(value)
                            return carBrand
                        },
                        errorMessage: 'Invalid brandId',
                    }
                },
                name: {
                    in: ['body'],
                    errorMessage: 'Invalid name',
                    isString: true,
                }
            }),
            validateRequest
        ]
    }
}

export default CarModelSchemeValidator;