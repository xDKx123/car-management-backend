import mongoose from "mongoose";
import TravelOrder, { ITravelOrder } from "../../models/travelOrder";

class TravelOrderQuery {
    public static add = async (data: Partial<ITravelOrder>, options?: {session?: mongoose.ClientSession}): Promise<any> => {
        const newTravelOrder = await new TravelOrder(data).save({ session: options?.session });
        
        return newTravelOrder;
    }
}

export default TravelOrderQuery