import AdministrationController from "../controllers/administration.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();

router.post('/loadMenu', AuthMiddleware.authenticate, AdministrationController.loadMenu);
router.post('/loadTableColumns', AuthMiddleware.authenticate, AdministrationController.loadColumns);
router.post('/loadTableData', AuthMiddleware.authenticate, AdministrationController.loadTableData);

export default router;