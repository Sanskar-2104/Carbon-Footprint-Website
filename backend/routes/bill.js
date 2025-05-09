import express from "express";
import { verifyElectricityBill } from "../controllers/ServiceController.js";
import authenticateToken from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/verify", authenticateToken,upload.single("bill"), verifyElectricityBill);

export default router;
