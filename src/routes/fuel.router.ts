const express = require('express');
const router = express.Router();

import FuelController from "../controllers/fuel.controller";

router.get('/price', FuelController.getFuelPrice);

export default router;