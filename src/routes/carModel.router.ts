import CarModelController from "../controllers/carModel.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import CarModelSchemeValidator from "../requestValidators/carModel.scheme.validator";

const express = require('express');
const router = express.Router();

router.post('/load', AuthMiddleware.authenticate, CarModelController.loadCarModels);
router.post('/add', AuthMiddleware.authenticate, CarModelSchemeValidator.addCarModel(), CarModelController.addCarModel);

export default router;