
import EmployeeController from "../controllers/employee.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();


router.get('/load', AuthMiddleware.authenticate, EmployeeController.load);
router.post('/add', AuthMiddleware.authenticate, EmployeeController.add);

export default router;