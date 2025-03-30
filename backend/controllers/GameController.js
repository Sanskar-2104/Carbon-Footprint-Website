import User from "../models/User.js";

export const getPoints = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await User.findById(req.user.id).select("points");
        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }

        res.status(200).json({ points: user.points });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const redeemReward = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ error:"Unauthorized",message: "Login to redeem rewards" });
        }
        const user = await User.findById(req.user.id);
        const { pointsToRedeem } = req.body;
        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }

        if (user.points < pointsToRedeem) {
            return res.status(400).json({ message: "Insufficient points" });
        }
        user.points -= pointsToRedeem; 
        
        await user.save();
        res.status(200).json({ message: "Reward redeemed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
};