import CarModelController from "../controllers/carModel.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();

router.post('/load', AuthMiddleware.authenticate, CarModelController.loadCarModels);

export default router;