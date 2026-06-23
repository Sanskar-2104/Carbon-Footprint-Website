import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import {
  getAllAchievements,
  getEarnedAchievements,
  checkAchievements,
} from '../controllers/AchievementController.js';

const router = express.Router();

// Get all achievements with unlock status
router.get('/all', authenticateToken, getAllAchievements);

// Get user's earned achievements
router.get('/earned', authenticateToken, getEarnedAchievements);

// Check and award achievements
router.post('/check', authenticateToken, checkAchievements);

export default router;
