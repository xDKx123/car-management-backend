import AuthenticationController from "../controllers/authentication.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const express = require('express');
const router = express.Router();

router.post('/login', AuthenticationController.login)
router.post('/refresh', AuthMiddleware.authenticateRefreshToken, AuthenticationController.refreshToken)
router.post('/validatePassword', AuthenticationController.validatePassword)

export default router;