import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/UserController.js';
const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

export default router;
