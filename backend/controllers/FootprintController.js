import calculateEmissions  from "../services/CarbonCalculator.js";
import GuestCache from "../services/GuestCache.js";

export const guestFootprint = async (req, res) => {
    try {
        const { transport, energy, food, shopping } = req.body;

        // Extract values safely with default fallbacks
        const vehicleType = transport?.vehicleType || "walking"; // Default to walking
        const fuelAmount = parseFloat(transport?.fuelAmount) || 0; // Convert to number, default 0 km

        const electricityBill = parseFloat(energy?.electricityBill) || 0; // Default 0 if missing

        const foodType = food?.food || "vegan"; // Default to vegan

        const shoppingAmount = parseFloat(shopping?.shoppingAmount) || 0; // Default 0 if missing
        const shoppingType = shopping?.shoppingType || "low"; // Default to low
        const ecoFriendly = shopping?.ecoFriendly || "no"; // Default to no

        // Calculate emissions
        const footprint = calculateEmissions({
            vehicleType,
            fuelAmount,
            electricityBill,
            foodType,
            shoppingAmount,
            shoppingType,
            ecoFriendly
        });

        // Store footprint in cache (based on guest IP)
        const guestId = req.ip;
        GuestCache[guestId] = footprint;

        res.json({ success: true, message: "Carbon Footprint Calculated", footprint });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
