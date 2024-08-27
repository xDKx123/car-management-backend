import { NextFunction, Request, Response } from "express";
import PromoCodeQuery from "../database/queries/promoCode.query";

class PromoCodeController{
    static checkIfPromoCodeIsValid = async(currentDate: Date, code: string): Promise<boolean> => {
        const promoCode = await PromoCodeQuery.getByCode(code);

        if(!promoCode){
            return false;
        }

        if (promoCode.isUsed) {
            return false;
        }

        if (promoCode.validFrom > currentDate && promoCode.validUntil < currentDate) {
            return false;
        }

        return true
    }

    public static isPromoCodeValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
        const data = req.body;
        const promoCode = data.promoCode;

        const now = new Date();
    
        try {
            // Check if the promo code is valid
            const isValid = await PromoCodeController.checkIfPromoCodeIsValid(now, promoCode);
    
            res.status(200).send({
                isValid: isValid
            });
        }
        catch (error) {
            next(error)
        }
    }

    public static addPromoCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;
        try {
            await PromoCodeQuery.add(data);
            res.status(200).send({
                message: 'Promo code added successfully'
            });
        }
        catch (error) {
            next(error)
        }
    }
}

export default PromoCodeController;