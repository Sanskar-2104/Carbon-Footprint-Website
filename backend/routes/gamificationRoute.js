import express from "express";
import { getPoints, redeemReward,updatePoints} from "../controllers/GameController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/points', authenticateToken, getPoints);
router.put('/points', authenticateToken, updatePoints);
// router.get('/badges/:userId', getBadges);
router.put('/redeem-reward',authenticateToken, redeemReward);

export default router;