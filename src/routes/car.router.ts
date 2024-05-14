const express = require('express');
const router = express.Router();

import CarController from "../controllers/car.controller";
import AuthMiddleware from "../middleware/auth.middleware";

router.post('/add', AuthMiddleware.authenticate, CarController.addCar);
router.post('/load', AuthMiddleware.authenticate, CarController.loadCars);
router.post('/isValidVin', AuthMiddleware.authenticate, CarController.isValidVin);

router.post('/loadBodyTypes', AuthMiddleware.authenticate, CarController.loadCarBodyTypes);
router.post('/loadFuelTypes', AuthMiddleware.authenticate, CarController.loadCarFuelTypes);
router.post('/loadTransmissionTypes', AuthMiddleware.authenticate, CarController.loadCarTransmissionTypes);

export default router;