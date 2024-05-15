import CustomerController from "../controllers/customer.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();


router.post('/load', AuthMiddleware.authenticate, CustomerController.loadCustomers);
router.post('/getById', AuthMiddleware.authenticate, CustomerController.getCustomer);
router.post('/update', AuthMiddleware.authenticate, CustomerController.updateCustomer);
router.post('/add', AuthMiddleware.authenticate, CustomerController.addCustomer);

export default router;