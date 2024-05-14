import ContractController from "../controllers/contract.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();

router.post('/loadLeavingToday', AuthMiddleware.authenticate, ContractController.loadContractsLeavingToday);
router.post('/loadReturningToday', AuthMiddleware.authenticate, ContractController.loadContractsReturningToday);
router.post('/load', AuthMiddleware.authenticate, ContractController.loadContracts);
router.post('/add', AuthMiddleware.authenticate, ContractController.addContract);

export default router;