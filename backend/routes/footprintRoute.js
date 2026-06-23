import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import guestRateLimiter from '../middleware/rateLimitMiddleware.js';
import {
  guestFootprintCalculate,
  footprintCalculate,
  getUserFootprint,
} from '../controllers/FootprintController.js';
const router = express.Router();

router.get('/history', authenticateToken, getUserFootprint);
router.post(
  '/calculate',
  (req, res, next) => {
    if (req.headers['authorization']) {
      return authenticateToken(req, res, next);
    } else {
      req.user = null;
      return next();
    }
  },
  async (req, res) => {
    if (req.user) {
      // Handle logged-in user's footprint calculation
      return footprintCalculate(req, res); // Replace this with actual user footprint function
    } else {
      // Apply rate limiter for guests, then execute guestFootprint
      return guestRateLimiter(req, res, () => guestFootprintCalculate(req, res));
    }
  }
);

export default router;
