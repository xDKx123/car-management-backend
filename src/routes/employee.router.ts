
import EmployeeController from "../controllers/employee.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();


router.get('/load', AuthMiddleware.authenticate, EmployeeController.load);
router.post('/add', AuthMiddleware.authenticate, EmployeeController.add);
router.post('/update', AuthMiddleware.authenticate, EmployeeController.update);
router.post('/getById', AuthMiddleware.authenticate, EmployeeController.getById);

export default router;