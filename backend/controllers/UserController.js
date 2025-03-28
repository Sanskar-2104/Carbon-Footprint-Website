import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userProfile = await User.findById(user._id).select("-password");
        if (!userProfile) { 
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(userProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};