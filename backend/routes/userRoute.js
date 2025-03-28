import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/UserController.js";
const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);


export default router;


