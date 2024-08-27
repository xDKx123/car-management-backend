import TravelOrderController from "../controllers/travelOrder.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();



router.post('/add', AuthMiddleware.authenticate, TravelOrderController.add);
router.post('/load', AuthMiddleware.authenticate, TravelOrderController.load);
router.get('/createPdf', TravelOrderController.createPdf);

export default router;