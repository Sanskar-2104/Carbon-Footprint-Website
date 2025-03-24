import express from "express";
import { register, login, verifyEmail, resetPassword } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);

export default router;