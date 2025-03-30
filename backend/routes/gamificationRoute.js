import express from "express";
import { getPoints, redeemReward} from "../controllers/GameController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/points',authenticateToken, getPoints);
// router.get('/badges/:userId', getBadges);
router.post('/redeem-reward',authenticateToken, redeemReward);

export default router;