import express from "express";
import multer from "multer";
import { verifyElectricityBill } from "../controllers/ServiceController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/verify", authenticateToken, upload.single("bill"), verifyElectricityBill);

export default router;
