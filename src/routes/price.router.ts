import CarController from "../controllers/car.controller";
import PriceHistoryController from "../controllers/priceHistory.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();

router.get('/getGpsLatestPrice', AuthMiddleware.authenticate, PriceHistoryController.getGpsLatestPrice);
router.get('/getChildSeatLatestPrice', AuthMiddleware.authenticate, PriceHistoryController.getChildSeatLatestPrice);
router.get('/getRoofStorageLatestPrice', AuthMiddleware.authenticate, PriceHistoryController.getRoofStorageLatestPrice);

router.post('/loadCarPrice', AuthMiddleware.authenticate, CarController.loadCarPrice);

export default router;