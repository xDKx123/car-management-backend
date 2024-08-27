import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation";
import UserSchemaValidator from "../requestValidators/user.schema.validator";

const express = require('express');
const router = express.Router();

router.post('/validateEmail', AuthMiddleware.authenticate, UserSchemaValidator.validateEmail(), UserController.validateEmail);
router.post('/validatePhoneNumber', AuthMiddleware.authenticate, UserController.validatePhoneNumber);
router.post('/validateIdNumber', AuthMiddleware.authenticate, UserController.validateIdNumber);
router.post('/changePassword', AuthMiddleware.authenticate, UserSchemaValidator.changePassword(), UserController.changePassword);
router.post('/getById', AuthMiddleware.authenticate, UserSchemaValidator.getById(), UserController.userById);
router.post('/checkIfEmailExists', AuthMiddleware.authenticate, UserController.checkIfEmailExists);
router.post('/create', UserSchemaValidator.create(), UserController.create);
router.post('/createSuperAdmin', UserSchemaValidator.createSuperAdmin(), UserController.createSuperAdmin);

router.get('/current', AuthMiddleware.authenticate, UserController.current);


export default router;