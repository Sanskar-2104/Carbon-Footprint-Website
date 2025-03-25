import calculateEmissions  from "../services/CarbonCalculator.js";
import GuestCache from "../services/GuestCache.js";

export const guestFootprint = async (req, res) => {
    try {
        const { transport, vehicleType, energy, food, shopping } = req.body;
        if (!transport
            && !vehicleType
            && !energy
            && !food
            && !shopping
        ) return res.status(400).json({ error: "Atleast one field is required" });

        const footprint = await calculateEmissions({ transport, vehicleType, energy, food, shopping });

        const guestId = req.ip;
        GuestCache[guestId] = footprint;
        res.json({ success: true, message: "Carbon Footprint Calculated", footprint });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

