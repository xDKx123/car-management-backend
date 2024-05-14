import CustomerController from "../controllers/customer.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();


router.post('/load', AuthMiddleware.authenticate, CustomerController.loadCustomers);
router.post('/getById', AuthMiddleware.authenticate, CustomerController.getCustomer);
router.post('/save', AuthMiddleware.authenticate, CustomerController.saveCustomer);
router.post('/add', AuthMiddleware.authenticate, CustomerController.addCustomer);

export default router;