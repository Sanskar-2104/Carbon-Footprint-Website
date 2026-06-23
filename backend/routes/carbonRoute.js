import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { calculate, history, summary, save } from '../controllers/CarbonController.js';

const router = express.Router();

router.post('/calculate', authenticateToken, calculate);
router.get('/history', authenticateToken, history);
router.get('/summary', authenticateToken, summary);
router.post('/save', authenticateToken, save);

export default router;
