import PromoCode, { IPromoCode } from "../../models/promoCode";

class PromoCodeQuery {
    static async getByCode(code: string) {
        const promoCode = await PromoCode.findOne({
        where: {
            code,
        },
        });
        return promoCode;
    }

    static async add(data: Partial<IPromoCode>): Promise<any> {
        return await new PromoCode(data).save();
    }
}

export default PromoCodeQuery;