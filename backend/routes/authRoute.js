import express from "express";
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify-email/:token', AuthController.verifyEmail);
router.post('/reset-password/:token', AuthController.resetPassword);
router.post('/forgot-password', AuthController.forgotPassword);

export default router;