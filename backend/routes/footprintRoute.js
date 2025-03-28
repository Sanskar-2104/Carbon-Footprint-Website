import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import guestRateLimiter from "../middleware/rateLimitMiddleware.js";
import  { guestFootprintCalculate }  from "../controllers/FootprintController.js";
const router = express.Router();


// router.get('/:userId', getUserFootprint);
// router.get('/total/:userId', getTotalFootprint);
router.post('/calculate', authenticateToken, async (req, res, next) => {
    if (req.user) {
        // Handle logged-in user's footprint calculation
        return guestFootprintCalculate(req, res);  // Replace this with actual user footprint function
    } else {
        // Apply rate limiter for guests, then execute guestFootprint
        return guestRateLimiter(req, res, () => guestFootprintCalculate(req, res));
    }
});



export default router;