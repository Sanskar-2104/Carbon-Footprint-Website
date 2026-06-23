import express from 'express';
import { getLeaderboard, getQuizLeaderboard } from '../controllers/LeaderboardController.js';

const router = express.Router();

// Endpoint: GET /api/leaderboard/quiz (Quiz Points based) - More specific route first
router.get('/quiz', getQuizLeaderboard);

// Endpoint: GET /api/leaderboard (Carbon Footprint based)
router.get('/', getLeaderboard);

export default router;
