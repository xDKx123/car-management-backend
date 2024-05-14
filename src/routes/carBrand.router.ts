import CarBrandController from "../controllers/carBrand.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();

router.post('/load', AuthMiddleware.authenticate, CarBrandController.loadCarBrands);

export default router;