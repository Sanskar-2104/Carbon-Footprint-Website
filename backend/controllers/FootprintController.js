import calculateEmissions from "../services/CarbonCalculator.js";
import Footprint from "../models/Footprint.js";
import GuestCache from "../services/GuestCache.js";

export const guestFootprintCalculate = async (req, res) => {
    try {
        const { transport, energy, food, shopping } = req.body;

        // Extract values safely with default fallbacks
        const mode = transport?.mode || "walking"; // Default to walking
        const dailyDistance = parseFloat(transport?.dailyDistance) || 0; // Convert to number, default 0 km
        const carpool = transport?.carpool || "no"; // Default to no carpool
        const noOfPassenger = transport?.noOfPassenger || 1;
        const driveFrequency = transport?.driveFrequency || "never"; // Default to never driving
        const meatFrequency = food?.meatFrequency || "never"; // Default to never eating meat
        const meatLover = food?.meatLover || "5"; // Default to no meat lover
        const dairyFrequency = food?.dairyFrequency || "never"; // Default to never eating dairy
        const restaurantChoice = food?.restaurantChoice || "vegan"; // Default to vegan restaurant  

        const electricityBill = parseFloat(energy?.electricityBill) || 0; // Default 0 if missing
        const energyType = energy?.energyType || "fossil"; // Default to electricity
        

        const shoppingAmount = parseFloat(shopping?.shoppingAmount) || 0; // Default 0 if missing
        // const shoppingType = shopping?.shoppingType || "low"; // Default to low
        const ecoFriendly = shopping?.ecoFriendly || "no"; // Default to no

        // Calculate emissions
        const footprint = calculateEmissions({
            mode, carpool,noOfPassenger, driveFrequency, dailyDistance, 
            energyType,  electricityBill, 
            meatFrequency, meatLover, dairyFrequency, restaurantChoice, 
            shoppingAmount,  ecoFriendly 
        });

        // Store footprint in cache (based on guest IP)
        const guestId = req.ip;
        GuestCache[guestId] = footprint;

        res.json({ success: true, message: "Carbon Footprint Calculated", footprint });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const footprintCalculate = async (req, res) => {
    try {
        const mode = transport?.mode || "walking"; // Default to walking
        const dailyDistance = parseFloat(transport?.dailyDistance) || 0; // Convert to number, default 0 km
        const carpool = transport?.carpool || "no"; // Default to no carpool
        const noOfPassenger = transport?.noOfPassenger || 1;
        const driveFrequency = transport?.driveFrequency || "never"; // Default to never driving
        const meatFrequency = food?.meatFrequency || "never"; // Default to never eating meat
        const meatLover = food?.meatLover || "5"; // Default to no meat lover
        const dairyFrequency = food?.dairyFrequency || "never"; // Default to never eating dairy
        const restaurantChoice = food?.restaurantChoice || "vegan"; // Default to vegan restaurant  

        const electricityBill = parseFloat(energy?.electricityBill) || 0; // Default 0 if missing
        const energyType = energy?.energyType || "fossil"; // Default to electricity
        

        const shoppingAmount = parseFloat(shopping?.shoppingAmount) || 0; // Default 0 if missing
        // const shoppingType = shopping?.shoppingType || "low"; // Default to low
        const ecoFriendly = shopping?.ecoFriendly || "no"; // Default to no

        // Calculate emissions
        const footprint = calculateEmissions({
            mode, carpool, driveFrequency, dailyDistance, 
            energyType,  electricityBill, 
            meatFrequency, meatLover, dairyFrequency, restaurantChoice, 
            shoppingAmount,  ecoFriendly 
        });

        



        res.json({ success: true, message: "Carbon Footprint Calculated", footprint });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
