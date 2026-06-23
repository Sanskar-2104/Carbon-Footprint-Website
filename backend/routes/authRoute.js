import express from 'express';
import AuthController from '../controllers/AuthController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify-email/:token', AuthController.verifyEmail);
router.put('/reset-password/:token', AuthController.resetPassword);
router.post('/forgot-password', AuthController.forgotPassword);
router.get('/me', authenticateToken, AuthController.getMe);

export default router;
