import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import guestRateLimiter from "../middleware/rateLimitMiddleware.js";
import  { guestFootprint }  from "../controllers/FootprintController.js";
const router = express.Router();


// router.get('/:userId', getUserFootprint);
// router.get('/total/:userId', getTotalFootprint);
router.post('/calculate', authenticateToken, (req, res, next) => {
    if (req.user) return async (req,res) => { };
    else return guestRateLimiter(req, res, () => guestFootprint(req, res));
});




export default router;