import express from "express";
const router = express.Router();

router.post('/add', addFootprint);
router.get('/:userId', getUserFootprint);


export default router;